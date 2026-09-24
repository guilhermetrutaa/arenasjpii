"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DATA, type ForbiddenCard } from "@/src/data/forbidden-cards";
import { detectForbiddenWords } from "@/src/lib/detection";
import { startContinuousSpeechRecognition } from "@/src/lib/speech-recognition";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";
import styles from "@/app/game-runtime.module.css";

type Outcome = "hit" | "fault" | "skip";
type SpeechControl = ReturnType<typeof startContinuousSpeechRecognition>;

function shuffle<T>(values: T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export default function ForbiddenGame() {
  const router = useRouter();
  const [deck, setDeck] = useState<ForbiddenCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [seconds, setSeconds] = useState(90);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<Array<{ outcome: Outcome }>>([]);
  const [started, setStarted] = useState(false);
  const [fault, setFault] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("Microfone desativado");
  const [finished, setFinished] = useState(false);
  const speechRef = useRef<SpeechControl>(null);
  const cardRef = useRef<ForbiddenCard | null>(null);
  const historyRef = useRef(history);
  const finishedRef = useRef(false);
  const startedRef = useRef(false);
  const advanceRef = useRef<(outcome: Outcome) => void>(() => undefined);
  const initializedRef = useRef(false);

  const current = deck[cardIndex];

  useEffect(() => {
    cardRef.current = current ?? null;
  }, [current]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const finish = useCallback(async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    speechRef.current?.stop();
    const result = {
      game: "palavra-proibida",
      score,
      hits: score,
      skips: historyRef.current.filter((item) => item.outcome === "skip").length,
      faults: historyRef.current.filter((item) => item.outcome === "fault").length,
      total: Math.max(historyRef.current.length, 1),
    };
    window.sessionStorage.setItem("arena:last-result", JSON.stringify(result));
    try {
      const response = await fetch("/api/results", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result) });
      const data = (await response.json()) as { token?: string };
      router.push(data.token ? `/resultado?token=${encodeURIComponent(data.token)}` : "/resultado?game=palavra-proibida");
    } catch {
      router.push("/resultado?game=palavra-proibida");
    }
  }, [router, score]);

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          void finish();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finish, finished, started]);

  useEffect(() => () => speechRef.current?.stop(), []);

  const begin = () => {
    const nextDeck = shuffle(DATA);
    startedRef.current = true;
    setDeck(nextDeck);
    setCardIndex(0);
    setSeconds(90);
    setScore(0);
    setHistory([]);
    historyRef.current = [];
    finishedRef.current = false;
    setFinished(false);
    setStarted(true);
  };

  const advance = (outcome: Outcome) => {
    if (!startedRef.current || finishedRef.current) return;
    const nextHistory = [...historyRef.current, { outcome }];
    historyRef.current = nextHistory;
    setHistory(nextHistory);
    if (outcome === "hit") setScore((value) => value + 1);
    if (outcome === "fault") {
      setFault(true);
      const audio = new Audio("/som-error.mp3");
      audio.volume = 0.7;
      void audio.play().catch(() => undefined);
      window.setTimeout(() => setFault(false), 420);
    }
    if (deck.length > 0) setCardIndex((value) => (value + 1) % deck.length);
  };

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  const startMicrophone = () => {
    speechRef.current?.stop();
    const control = startContinuousSpeechRecognition(
      ({ alternatives, isFinal }) => {
        if (!isFinal) return;
        const transcription = alternatives[0] ?? "";
        const card = cardRef.current;
        if (!card) return;
        const detection = detectForbiddenWords(transcription, card.forbidden);
        if (detection.falouProibida) advanceRef.current("fault");
      },
      {
        shouldStayAlive: () => !finishedRef.current,
        onListeningChange: (value) => {
          setSpeechMessage(value ? "Microfone do headset escutando" : "Microfone do headset desativado");
        },
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
      <main className={styles.gamePage}>
        <section className={styles.gameCanvas}>
          <header className={styles.gameHeader}><img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" /><img src="/logo.svg" alt="Arena SJPII" /><img src="/brasao-diocese.svg" alt="Brasão da Diocese" /></header>
          <h1 className={styles.gameTitle}>PALAVRA PROIBIDA</h1>
          <p className={styles.speechStatus}>Preparando jogo e conectando o headset...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.gamePage}>
      <section className={styles.gameCanvas}>
        <header className={styles.gameHeader}><img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" /><img src="/logo.svg" alt="Arena SJPII" /><img src="/brasao-diocese.svg" alt="Brasão da Diocese" /></header>
        <h1 className={`${styles.gameTitle} ${styles.roundTitle}`}>{current?.saint ?? "Palavra Proibida"}</h1>
        <div className={`${styles.prompt} ${styles.promptWords}`}><span>{current?.forbidden.join(", ") ?? ""}</span></div>
        <div className={styles.stats}>
          <section className={`${styles.stat} ${styles.score}`}><h2>ACERTOS</h2><p>{score}</p></section>
          <section className={`${styles.stat} ${styles.time}`}><h2>TEMPO</h2><p>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</p></section>
        </div>
        <p className={`${styles.speechStatus} ${fault ? styles.fault : ""}`} aria-live="polite">{fault ? "Palavra proibida!" : speechMessage}</p>
      </section>
    </main>
  );
}
