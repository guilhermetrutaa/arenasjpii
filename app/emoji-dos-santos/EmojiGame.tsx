"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import {
  EMOJI_BASE_POINTS,
  EMOJI_DIFFICULTIES,
  EMOJI_DIFFICULTY_BY_ID,
  EMOJI_GAME_ROUNDS,
  EMOJI_ROUND_SECONDS,
  emojiHintsRevealed,
  emojiPointsLabel,
  emojiRoundPoints,
  getEmojiSaintsRound,
  type EmojiDifficultyId,
  type EmojiSaint,
} from "@/src/data/emoji-dos-santos";
import { classifySaintAttempt, isRelevantTranscription, type SaintAttempt } from "@/src/lib/detection";
import { startContinuousSpeechRecognition } from "@/src/lib/speech-recognition";
import { openGameChannel, type GameChannel } from "@/src/lib/control-client";
import type { ControlCommandAction } from "@/src/lib/control";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";
import styles from "@/app/game-runtime.module.css";
import feedbackStyles from "./emoji-feedback.module.css";
import gameStyles from "./emoji-game.module.css";

// A partida termina indo direto para a tela do QR Code: não há uma tela de
// "fim de jogo" intermediária, a revelação da última rodada fica visível
// enquanto o resultado assinado é preparado.
type Phase = "setup" | "playing" | "reveal";
/** `skip` é a rodada que terminou sem acerto. Um `fault` é do operador e não fecha a rodada. */
type Outcome = "hit" | "skip";
type Feedback = Exclude<SaintAttempt, "hit">;
type RoundRecord = { outcome: Outcome; points: number };
type Reveal = { saint: EmojiSaint; outcome: Outcome; points: number };
type SpeechControl = ReturnType<typeof startContinuousSpeechRecognition>;

const FEEDBACK_MS = 1200;
const FEEDBACK_LABEL: Record<Feedback, string> = { wrong: "Errado", partial: "Quase" };

// Tempo de leitura da revelação antes de a próxima rodada começar sozinha.
// O operador pode pular esse tempo com PageUp.
const REVEAL_MS: Record<Outcome, number> = { hit: 2800, skip: 3600 };

// Temporary: shows on localhost what AssemblyAI heard and how it was graded.
const SHOW_DEBUG = process.env.NODE_ENV !== "production";

// Scoped to this route on purpose: the file is 516 KB and the announcement is
// the only thing that uses it.
const spudCrisp = localFont({
  src: "../../public/fonts/Spud AF Crisp W00 Regular.ttf",
  display: "swap",
  weight: "400",
});

export default function EmojiGame() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("setup");
  const [difficulty, setDifficulty] = useState<EmojiDifficultyId | null>(null);
  const [saints, setSaints] = useState<EmojiSaint[]>([]);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(EMOJI_ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<RoundRecord[]>([]);
  const [faults, setFaults] = useState(0);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [matchId, setMatchId] = useState(0);
  // A partida acabou e o jogo já está indo para a tela do QR Code.
  const [finishing, setFinishing] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("Microfone desativado");
  const [speechFailed, setSpeechFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [heard, setHeard] = useState<{ final: boolean; text: string; verdict: string } | null>(null);
  const [faultFlash, setFaultFlash] = useState(false);

  const speechRef = useRef<SpeechControl>(null);
  const channelRef = useRef<GameChannel | null>(null);
  const feedbackRef = useRef<Feedback | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  const advanceTimerRef = useRef<number | null>(null);
  const faultTimerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  // Espelhos de estado: os manipuladores são estáveis e leem o valor mais
  // recente por referência, sem recriar cronômetros a cada render.
  const phaseRef = useRef<Phase>(phase);
  const indexRef = useRef(index);
  const saintsRef = useRef<EmojiSaint[]>(saints);
  const difficultyRef = useRef<EmojiDifficultyId | null>(difficulty);
  const historyRef = useRef<RoundRecord[]>(history);
  const faultsRef = useRef(faults);
  const lockedRef = useRef(false);
  const finishedRef = useRef(false);
  const resolveRef = useRef<(outcome: Outcome, viaTimeout?: boolean) => void>(() => undefined);
  const nextRef = useRef<() => void>(() => undefined);
  const startRef = useRef<(level: EmojiDifficultyId) => void>(() => undefined);
  const faultRef = useRef<() => void>(() => undefined);
  const commandRef = useRef<(action: ControlCommandAction) => void>(() => undefined);

  const current = saints[index];
  const level = difficulty ? EMOJI_DIFFICULTY_BY_ID[difficulty] : null;
  const roundPoints = difficulty ? emojiRoundPoints(difficulty) : 0;
  const hits = history.filter((round) => round.outcome === "hit").length;
  const elapsed = EMOJI_ROUND_SECONDS - secondsLeft;
  // As dicas são derivadas do relógio da rodada: 0s→nenhuma, 10s→primeira,
  // 20s→as duas. Sem temporizador extra e sempre cumulativas.
  const hintsShown = phase === "setup" ? 0 : emojiHintsRevealed(elapsed);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { saintsRef.current = saints; }, [saints]);
  useEffect(() => { difficultyRef.current = difficulty; }, [difficulty]);
  useEffect(() => { historyRef.current = history; }, [history]);
  useEffect(() => { faultsRef.current = faults; }, [faults]);

  // The announcement restarts on every finalized utterance so it always
  // expires 1.2s after the last thing the player actually said.
  const showFeedback = useCallback((value: Feedback) => {
    if (feedbackRef.current !== value) {
      feedbackRef.current = value;
      setFeedback(value);
    }
    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => {
      feedbackTimerRef.current = null;
      feedbackRef.current = null;
      setFeedback(null);
    }, FEEDBACK_MS);
  }, []);

  const clearFeedback = useCallback(() => {
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (feedbackRef.current !== null) {
      feedbackRef.current = null;
      setFeedback(null);
    }
  }, []);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => {
    speechRef.current?.stop();
    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current);
    if (faultTimerRef.current !== null) window.clearTimeout(faultTimerRef.current);
  }, []);

  const startMicrophone = () => {
    speechRef.current?.stop();
    const control = startContinuousSpeechRecognition(
      ({ alternatives, isFinal }) => {
        const transcription = alternatives[0] ?? "";
        const saint = saintsRef.current[indexRef.current];
        if (!saint || finishedRef.current) return;
        if (phaseRef.current !== "playing") return;
        if (!isFinal) {
          if (SHOW_DEBUG) setHeard({ final: false, text: transcription, verdict: "ouvindo..." });
          channelRef.current?.publishHeard({ text: transcription, final: false, verdict: "ouvindo..." });
          return;
        }
        if (!isRelevantTranscription(transcription)) return;
        const attempt = classifySaintAttempt(transcription, saint.name, saint.acceptedNames);
        console.log(`[emoji] "${transcription}" -> ${attempt} (esperado: ${saint.name})`);
        if (SHOW_DEBUG) setHeard({ final: true, text: transcription, verdict: attempt });
        channelRef.current?.publishHeard({ text: transcription, final: true, verdict: attempt });
        if (attempt === "hit") {
          clearFeedback();
          resolveRef.current("hit");
          return;
        }
        showFeedback(attempt);
      },
      {
        // O microfone só vive enquanto há partida em jogo: a tela de escolha do
        // nível não pede permissão e a partida encerrada não o reconecta.
        shouldStayAlive: () => !finishedRef.current && phaseRef.current !== "setup",
        onListeningChange: (value) => {
          setSpeechFailed(false);
          setSpeechMessage(value ? "Microfone do headset escutando" : "Microfone do headset desativado");
        },
        onError: (error) => {
          // Falha técnica nunca vira resposta errada: não pontua, não encerra
          // a rodada e não reinicia o relógio. Só avisa e oferece nova tentativa.
          const reason = error === "not-allowed"
            ? "Permissão de microfone negada"
            : error === "token"
              ? "Não foi possível conectar o reconhecimento de voz"
              : "Falha no reconhecimento de voz";
          setSpeechFailed(true);
          setSpeechMessage(`${reason}. Tente reconectar ou responda pelo Air Mouse / painel.`);
        },
      },
    );
    speechRef.current = control;
    setSpeechMessage("Solicitando microfone");
  };

  // Fecha a rodada atual. A trava garante uma única pontuação por rodada, mesmo
  // se o microfone, o Air Mouse e o painel chegarem juntos com a resposta certa.
  // `viaTimeout` distingue o fim natural dos 30 segundos de um pulo do operador:
  // os dois encerram a rodada sem pontos, mas só o primeiro esgotou o tempo.
  const resolveRound = (outcome: Outcome, viaTimeout = false) => {
    if (lockedRef.current || finishedRef.current || phaseRef.current !== "playing") return;
    const saint = saintsRef.current[indexRef.current];
    if (!saint) return;
    lockedRef.current = true;
    clearFeedback();
    // A partida só existe depois de um nível escolhido, então há sempre um
    // multiplicador definido aqui; o `?? "facil"` é apenas uma rede de segurança.
    const points = outcome === "hit" ? emojiRoundPoints(difficultyRef.current ?? "facil") : 0;
    const nextHistory = [...historyRef.current, { outcome, points }];
    historyRef.current = nextHistory;
    setHistory(nextHistory);
    setScore((value) => value + points);
    setReveal({ saint, outcome, points });
    setPhase("reveal");
    setMessage(
      outcome === "hit"
        ? `Acertou! +${emojiPointsLabel(points)}`
        : viaTimeout
          ? `Tempo esgotado: ${saint.displayName}`
          : `Rodada pulada: ${saint.displayName}`,
    );
    channelRef.current?.publishNote(
      outcome === "hit"
        ? `Acerto: ${saint.displayName} (+${emojiPointsLabel(points)})`
        : viaTimeout
          ? `Sem acerto: ${saint.displayName}`
          : `Rodada pulada: ${saint.displayName}`,
    );
    clearAdvanceTimer();
    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;
      nextRef.current();
    }, REVEAL_MS[outcome]);
  };

  // Um erro do operador não encerra a rodada: ele marca o erro, avisa a sala e
  // deixa o time tentar de novo, como antes desta versão.
  const fault = () => {
    if (phaseRef.current !== "playing") return;
    faultsRef.current += 1;
    setFaults(faultsRef.current);
    setMessage("Erro do operador — a rodada continua");
    setFaultFlash(true);
    if (faultTimerRef.current !== null) window.clearTimeout(faultTimerRef.current);
    faultTimerRef.current = window.setTimeout(() => {
      faultTimerRef.current = null;
      setFaultFlash(false);
    }, 420);
    const audio = new Audio("/som-error.mp3");
    audio.volume = 0.7;
    void audio.play().catch(() => undefined);
  };

  // Ao terminar as oito rodadas o jogo vai direto para a tela do QR Code: a
  // revelação da última rodada fica visível enquanto o token é preparado, para
  // que ninguém perca a curiosidade que acabou de aparecer.
  const finishMatch = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearAdvanceTimer();
    clearFeedback();
    setFinishing(true);
    setMessage("");
    speechRef.current?.stop();

    const rounds = historyRef.current;
    const points = rounds.reduce((total, round) => total + round.points, 0);
    const scoredRounds = rounds.filter((round) => round.outcome === "hit").length;
    const missedRounds = rounds.filter((round) => round.outcome === "skip").length;
    const result = {
      game: "emoji-dos-santos",
      score: points,
      hits: scoredRounds,
      skips: missedRounds,
      faults: faultsRef.current,
      total: Math.max(rounds.length, 1),
      difficulty: difficultyRef.current,
    };
    window.sessionStorage.setItem("arena:last-result", JSON.stringify(result));
    channelRef.current?.publishNote(
      `Partida encerrada: ${points} ponto(s) em ${scoredRounds} acerto(s)`,
    );

    const goToResult = (token?: string) => {
      router.push(token ? `/resultado?token=${encodeURIComponent(token)}` : "/resultado?game=emoji-dos-santos");
    };

    void fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    })
      .then((response) => response.json() as Promise<{ token?: string }>)
      .then((data) => goToResult(data.token))
      .catch(() => goToResult());
  };

  const advanceRound = () => {
    clearAdvanceTimer();
    if (finishedRef.current) return;
    const nextIndex = indexRef.current + 1;
    if (nextIndex >= saintsRef.current.length) {
      finishMatch();
      return;
    }
    lockedRef.current = false;
    setIndex(nextIndex);
    setSecondsLeft(EMOJI_ROUND_SECONDS);
    setReveal(null);
    setMessage("");
    setPhase("playing");
    clearFeedback();
  };

  const startMatch = (level: EmojiDifficultyId) => {
    clearAdvanceTimer();
    clearFeedback();
    lockedRef.current = false;
    finishedRef.current = false;
    setDifficulty(level);
    difficultyRef.current = level;
    const drawn = getEmojiSaintsRound(EMOJI_GAME_ROUNDS, level);
    saintsRef.current = drawn;
    setSaints(drawn);
    setIndex(0);
    setSecondsLeft(EMOJI_ROUND_SECONDS);
    setScore(0);
    setHistory([]);
    historyRef.current = [];
    faultsRef.current = 0;
    setFaults(0);
    setReveal(null);
    setFinishing(false);
    setMessage("");
    startedAtRef.current = Date.now();
    setMatchId((value) => value + 1);
    setPhase("playing");
    startMicrophone();
  };

  const moveSelection = (step: number) => {
    setDifficulty((current2) => {
      if (!current2) return step >= 0 ? EMOJI_DIFFICULTIES[0].id : EMOJI_DIFFICULTIES[EMOJI_DIFFICULTIES.length - 1].id;
      const position = EMOJI_DIFFICULTIES.findIndex((item) => item.id === current2);
      const nextPosition = (position + step + EMOJI_DIFFICULTIES.length) % EMOJI_DIFFICULTIES.length;
      return EMOJI_DIFFICULTIES[nextPosition].id;
    });
  };

  useEffect(() => { resolveRef.current = resolveRound; });
  useEffect(() => { nextRef.current = advanceRound; });
  useEffect(() => { startRef.current = startMatch; });
  useEffect(() => { faultRef.current = fault; });

  // Um único relógio por rodada: ele nasce com a rodada e é destruído quando a
  // rodada muda, quando ela é encerrada ou quando a tela é desmontada.
  useEffect(() => {
    if (phase !== "playing") return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, matchId, index]);

  // Fim do tempo: fecha a rodada uma única vez e revela a resposta.
  useEffect(() => {
    if (phase !== "playing" || secondsLeft > 0) return;
    resolveRef.current("skip", true);
  }, [phase, secondsLeft]);

  const handleCommand = (action: ControlCommandAction) => {
    // `resetDeck` exists for the Palavra Proibida deck and has no meaning
    // for the eight-round emoji deck.
    if (action === "resetDeck") return;
    const currentPhase = phaseRef.current;
    if (currentPhase === "setup") {
      if (action === "hit" && difficultyRef.current) startRef.current(difficultyRef.current);
      return;
    }
    if (currentPhase === "reveal") {
      nextRef.current();
      return;
    }
    if (action === "hit") resolveRef.current("hit");
    else if (action === "skip") resolveRef.current("skip");
    else faultRef.current();
  };

  useEffect(() => { commandRef.current = handleCommand; });

  useAirMouseControls({
    onCorrect: () => {
      if (phaseRef.current === "setup") { if (difficultyRef.current) startRef.current(difficultyRef.current); return; }
      if (phaseRef.current === "reveal") { nextRef.current(); return; }
      resolveRef.current("hit");
    },
    onSkip: () => {
      if (phaseRef.current === "setup") { moveSelection(1); return; }
      if (phaseRef.current === "reveal") { nextRef.current(); return; }
      resolveRef.current("skip");
    },
    onFault: () => faultRef.current(),
    onChooseForbidden: () => { if (phaseRef.current === "setup") moveSelection(-1); },
    onChooseEmoji: () => { if (phaseRef.current === "setup") moveSelection(1); },
  });

  // Admin panel bridge: mirrors the round, the hidden answer and the
  // microphone transcript in real time and accepts commands from `/admin`.
  useEffect(() => {
    const channel = openGameChannel({
      game: "emoji-dos-santos",
      onCommand: (action) => commandRef.current(action),
    });
    channelRef.current = channel;
    channel.publishNote("Tela de Emoji dos Santos conectada ao painel");
    return () => {
      channelRef.current = null;
      channel.close();
    };
  }, []);

  useEffect(() => {
    channelRef.current?.publishState({
      started: phase !== "setup",
      finished: finishing,
      startedAt: startedAtRef.current,
      score,
      hits,
      skips: history.length - hits,
      faults,
      seconds: secondsLeft,
      round: saints.length === 0 ? 0 : index + 1,
      rounds: saints.length,
      deckTotal: saints.length,
      speechMessage: message || speechMessage,
      promptLabel: "Emojis",
      promptItems: current?.emojis ?? [],
      answer: current?.displayName ?? null,
      difficulty: !level ? null : `${level.label} (×${level.multiplier})`,
    });
  }, [current, difficulty, faults, finishing, history.length, hits, index, level, message, phase, saints.length, score, secondsLeft, speechMessage]);

  const header = (
    <header className={styles.gameHeader}>
      <img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" />
      <img src="/logo.svg" alt="Arena SJPII" />
      <img src="/brasao-diocese.svg" alt="Brasão da Diocese" />
    </header>
  );

  if (phase === "setup") {
    return (
      <main className={styles.gamePage}><section className={styles.gameCanvas}>
        {header}
        <h1 className={styles.gameTitle}>EMOJIS DOS SANTOS</h1>
        <p className={gameStyles.subtitle}>Escolha o nível da partida · {EMOJI_GAME_ROUNDS} rodadas de {EMOJI_ROUND_SECONDS} segundos</p>
        <div className={gameStyles.difficultyGrid} role="radiogroup" aria-label="Nível de dificuldade">
          {EMOJI_DIFFICULTIES.map((option) => {
            const active = option.id === difficulty;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${gameStyles.difficultyCard} ${active ? gameStyles.difficultyCardActive : ""}`}
                onClick={() => startMatch(option.id)}
              >
                <span className={gameStyles.difficultyLabel}>{option.label}</span>
                <span className={gameStyles.difficultyTagline}>{option.tagline}</span>
                <span className={gameStyles.difficultyMultiplier}>×{option.multiplier}</span>
                <span className={gameStyles.difficultyPoints}>{emojiPointsLabel(EMOJI_BASE_POINTS * option.multiplier)} por acerto</span>
                <span className={gameStyles.difficultyDescription}>{option.description}</span>
              </button>
            );
          })}
        </div>
      </section></main>
    );
  }

  return (
    <main className={styles.gamePage}><section className={styles.gameCanvas}>
      {header}
      <h1 className={styles.gameTitle}>EMOJIS DOS SANTOS</h1>
      <div className={`${styles.prompt} ${styles.emojiPrompt} ${gameStyles.emojiPrompt}`}>
        <p>{current?.emojis.join(" ")}</p>
      </div>

      {reveal ? (
        <section
          className={`${gameStyles.reveal} ${reveal.outcome === "hit" ? gameStyles.revealHit : ""}`}
          aria-live="polite"
        >
          <h2 className={gameStyles.revealName}>{reveal.saint.displayName}</h2>
          <p className={gameStyles.revealPoints}>
            {reveal.points > 0
              ? <><span className={gameStyles.revealPointsValue}>+{reveal.points}</span> pontos</>
              : "Nenhum ponto nesta rodada"}
          </p>
          <p className={gameStyles.revealCuriosity}>{reveal.saint.curiosity}</p>
        </section>
      ) : hintsShown > 0 ? (
        <section className={gameStyles.hints} aria-live="polite">
          {current && hintsShown >= 1 && <p className={gameStyles.hint}><span className={gameStyles.hintBadge}>Dica 1</span>{current.hint1}</p>}
          {current && hintsShown >= 2 && <p className={gameStyles.hint}><span className={gameStyles.hintBadge}>Dica 2</span>{current.hint2}</p>}
        </section>
      ) : (
        <p className={gameStyles.hintPlaceholder}></p>
      )}

      <div className={gameStyles.roundStats}>
        <section className={`${gameStyles.stat} ${gameStyles.statPoints}`}><h2>PONTOS</h2><p>{score}</p></section>
        <section className={`${gameStyles.stat} ${gameStyles.statTime}`}><h2>TEMPO</h2><p>{String(secondsLeft).padStart(2, "0")}</p></section>
      </div>

      <p className={`${styles.speechStatus} ${faultFlash ? styles.fault : ""}`} aria-live="polite">{message || speechMessage}</p>
      {speechFailed && (
        <div className={styles.controls}>
          <button type="button" className={styles.secondary} onClick={startMicrophone}>Reconectar microfone</button>
        </div>
      )}
      {feedback && (
        <p
          className={`${feedbackStyles.speechFeedback} ${spudCrisp.className} ${feedback === "wrong" ? feedbackStyles.speechFeedbackWrong : feedbackStyles.speechFeedbackPartial}`}
          aria-live="assertive"
        >
          {FEEDBACK_LABEL[feedback]}
        </p>
      )}
      {SHOW_DEBUG && (
        <pre className={feedbackStyles.debug}>
          {heard ? `${heard.final ? "FINAL" : "parcial"} | ${heard.verdict} | "${heard.text}"` : "aguardando microfone..."}
        </pre>
      )}
    </section></main>
  );
}
