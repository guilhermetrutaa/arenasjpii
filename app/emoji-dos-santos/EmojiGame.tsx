"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { EMOJI_GAME_ROUNDS, EMOJI_ROUND_SECONDS, emojiSaints, type EmojiSaint } from "@/src/data/emoji-dos-santos";
import { classifySaintAttempt, isRelevantTranscription, type SaintAttempt } from "@/src/lib/detection";
import { startContinuousSpeechRecognition } from "@/src/lib/speech-recognition";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";
import styles from "@/app/game-runtime.module.css";
import feedbackStyles from "./emoji-feedback.module.css";

type Outcome = "hit" | "skip";
type Feedback = Exclude<SaintAttempt, "hit">;
type SpeechControl = ReturnType<typeof startContinuousSpeechRecognition>;

const FEEDBACK_MS = 1200;
const FEEDBACK_LABEL: Record<Feedback, string> = { wrong: "Errado", partial: "Quase" };

// Temporary: shows on localhost what AssemblyAI heard and how it was graded.
const SHOW_DEBUG = process.env.NODE_ENV !== "production";

// Scoped to this route on purpose: the file is 516 KB and the announcement is
// the only thing that uses it.
const spudCrisp = localFont({
  src: "../../public/fonts/Spud AF Crisp W00 Regular.ttf",
  display: "swap",
  weight: "400",
});

function shuffle<T>(values: T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export default function EmojiGame() {
  const router = useRouter();
  const [saints, setSaints] = useState<EmojiSaint[]>([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(EMOJI_ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<Array<{ outcome: Outcome }>>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("Microfone desativado");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [heard, setHeard] = useState<{ final: boolean; text: string; verdict: string } | null>(null);
  const speechRef = useRef<SpeechControl>(null);
  const saintRef = useRef<EmojiSaint | null>(null);
  const historyRef = useRef(history);
  const finishedRef = useRef(false);
  const advanceRef = useRef<(outcome: Outcome, timeout?: boolean) => void>(() => undefined);
  const initializedRef = useRef(false);
  const feedbackRef = useRef<Feedback | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  const current = saints[index];

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

  useEffect(() => { saintRef.current = current ?? null; }, [current]);
  useEffect(() => { historyRef.current = history; }, [history]);

  const finish = useCallback(async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    speechRef.current?.stop();
    const result = {
      game: "emoji-dos-santos",
      score,
      hits: score,
      skips: historyRef.current.filter((item) => item.outcome === "skip").length,
      faults: 0,
      total: Math.max(historyRef.current.length, 1),
    };
    window.sessionStorage.setItem("arena:last-result", JSON.stringify(result));
    try {
      const response = await fetch("/api/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result) });
      const data = (await response.json()) as { token?: string };
      router.push(data.token ? `/resultado?token=${encodeURIComponent(data.token)}` : "/resultado?game=emoji-dos-santos");
    } catch {
      router.push("/resultado?game=emoji-dos-santos");
    }
  }, [router, score]);

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setMessage(`Tempo esgotado: ${saintRef.current?.name ?? ""}`);
          advanceRef.current("skip", true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished, started]);

  useEffect(() => () => {
    speechRef.current?.stop();
    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
  }, []);

  const begin = () => {
    clearFeedback();
    setSaints(shuffle(emojiSaints).slice(0, EMOJI_GAME_ROUNDS));
    setIndex(0);
    setSeconds(EMOJI_ROUND_SECONDS);
    setScore(0);
    setHistory([]);
    historyRef.current = [];
    finishedRef.current = false;
    setFinished(false);
    setStarted(true);
  };

  const advance = (outcome: Outcome, timeout = false) => {
    if (!started || finished || !current) return;
    clearFeedback();
    const nextHistory = [...historyRef.current, { outcome }];
    historyRef.current = nextHistory;
    setHistory(nextHistory);
    if (outcome === "hit") {
      setScore((value) => value + 1);
      setMessage("Acertou!");
    } else if (timeout) {
      setMessage(`Tempo esgotado: ${current.name}`);
    } else {
      setMessage("Rodada pulada");
    }
    window.setTimeout(() => {
      if (finishedRef.current) return;
      if (index >= saints.length - 1) {
        void finish();
      } else {
        setIndex((value) => value + 1);
        setSeconds(EMOJI_ROUND_SECONDS);
        setMessage("");
      }
    }, timeout ? 650 : 350);
  };

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  const startMicrophone = () => {
    speechRef.current?.stop();
    const control = startContinuousSpeechRecognition(
      ({ alternatives, isFinal }) => {
        const transcription = alternatives[0] ?? "";
        const saint = saintRef.current;
        if (!saint || finishedRef.current) return;
        if (!isFinal) {
          if (SHOW_DEBUG) setHeard({ final: false, text: transcription, verdict: "ouvindo..." });
          return;
        }
        if (!isRelevantTranscription(transcription)) return;
        const attempt = classifySaintAttempt(transcription, saint.name, saint.acceptedNames);
        console.log(`[emoji] "${transcription}" -> ${attempt} (esperado: ${saint.name})`);
        if (SHOW_DEBUG) setHeard({ final: true, text: transcription, verdict: attempt });
        if (attempt === "hit") {
          clearFeedback();
          advanceRef.current("hit");
          return;
        }
        showFeedback(attempt);
      },
      {
        shouldStayAlive: () => !finishedRef.current,
        onListeningChange: (value) => { setSpeechMessage(value ? "Microfone do headset escutando" : "Microfone do headset desativado"); },
        onError: (error) => setSpeechMessage(error === "not-allowed" ? "Permissão de microfone negada" : "Falha no reconhecimento de voz"),
      },
    );
    speechRef.current = control;
    setSpeechMessage("Solicitando microfone");
  };

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    begin();
    startMicrophone();
    return () => {
      initializedRef.current = false;
    };
  }, []);

  useAirMouseControls({
    onCorrect: () => advance("hit"),
    onSkip: () => advance("skip"),
  });

  if (!started) {
    return (
      <main className={styles.gamePage}><section className={styles.gameCanvas}>
        <header className={styles.gameHeader}><img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" /><img src="/logo.svg" alt="Arena SJPII" /><img src="/brasao-diocese.svg" alt="Brasão da Diocese" /></header>
        <h1 className={styles.gameTitle}>EMOJIS DOS SANTOS</h1>
        <p className={styles.speechStatus}>Preparando jogo e conectando o headset...</p>
      </section></main>
    );
  }

  return (
    <main className={styles.gamePage}><section className={styles.gameCanvas}>
      <header className={styles.gameHeader}><img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" /><img src="/logo.svg" alt="Arena SJPII" /><img src="/brasao-diocese.svg" alt="Brasão da Diocese" /></header>
      <h1 className={styles.gameTitle}>EMOJIS DOS SANTOS</h1>
      <div className={`${styles.prompt} ${styles.emojiPrompt}`}><p>{current?.emojis.join(" ")}</p></div>
      <div className={styles.stats}>
        <section className={`${styles.stat} ${styles.score}`}><h2>ACERTOS</h2><p>{score}</p></section>
        <section className={`${styles.stat} ${styles.time}`}><h2>TEMPO</h2><p>{String(seconds).padStart(2, "0")}</p></section>
      </div>
      <p className={styles.speechStatus} aria-live="polite">{message || speechMessage}</p>
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
