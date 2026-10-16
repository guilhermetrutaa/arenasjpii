"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CONTROL_GAMES,
  CONTROL_STALE_MS,
  type ControlCommandAction,
  type ControlEvent,
  type ControlGameId,
  type ControlHeard,
  type ControlState,
} from "@/src/lib/control";
import { openPanelChannel } from "@/src/lib/control-client";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";
import RankingBoard from "./RankingBoard";
import styles from "./admin.module.css";

const ACTION_LABEL: Record<ControlCommandAction, string> = {
  hit: "acerto",
  skip: "pular",
  fault: "erro",
};

function formatClock(at: number) {
  return new Date(at).toLocaleTimeString("pt-BR", { hour12: false });
}

function formatTimer(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function verdictTone(verdict: string | null) {
  if (!verdict) return "idle";
  if (verdict === "hit") return "hit";
  if (verdict === "partial") return "partial";
  if (verdict === "wrong" || verdict === "proibida") return "fault";
  return "idle";
}

function toneClass(verdict: string | null) {
  return styles[`tone_${verdictTone(verdict)}` as keyof typeof styles] ?? styles.tone_idle;
}

type GameCardProps = {
  game: ControlGameId;
  label: string;
  short: string;
  state: ControlState | undefined;
  heard: ControlHeard[];
  online: boolean;
  selected: boolean;
  onSelect: () => void;
  onCommand: (action: ControlCommandAction) => void;
};

function GameCard({ game, label, short, state, heard, online, selected, onSelect, onCommand }: GameCardProps) {
  const [flash, setFlash] = useState<ControlCommandAction | null>(null);
  const flashTimerRef = useRef<number | null>(null);
  const pointerGuardRef = useRef(0);
  const live = online && state?.started === true;
  const status = !online
    ? "aguardando o jogo"
    : state?.finished
      ? "finalizado"
      : state?.started
        ? "em andamento"
        : "tela aberta";

  useEffect(
    () => () => {
      if (flashTimerRef.current !== null) window.clearTimeout(flashTimerRef.current);
    },
    [],
  );

  // The panel re-renders several times per second while a game streams its
  // state, so waiting for `mouseup` to resolve a `click` risks losing the
  // press entirely. Acknowledge locally on `pointerdown` instead, and keep
  // `click` for keyboard activation only.
  const fire = useCallback(
    (action: ControlCommandAction) => {
      onCommand(action);
      setFlash(action);
      if (flashTimerRef.current !== null) window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = window.setTimeout(() => {
        flashTimerRef.current = null;
        setFlash(null);
      }, 240);
    },
    [onCommand],
  );

  return (
    <section className={`${styles.card} ${selected ? styles.cardActive : ""}`} data-game={game}>
      <header className={styles.cardHeader}>
        <button type="button" className={styles.cardSelect} onClick={onSelect} aria-pressed={selected}>
          <span className={styles.cardShort}>{short}</span>
          <span className={styles.cardLabel}>{label}</span>
        </button>
        <span className={`${styles.badge} ${live ? styles.badgeLive : ""}`}>{live ? "AO VIVO" : status.toUpperCase()}</span>
      </header>

      <div className={styles.promptBox}>
        <p className={styles.promptTitle}>{state?.promptLabel ?? "—"}</p>
        {game === "emoji-dos-santos" && <p className={styles.promptEmojis}>{state?.promptItems.join(" ") || "— — —"}</p>}
        <ul className={styles.promptItems}>
          {(state?.promptItems ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {state?.answer && (
          <p className={styles.answer}>
            Santo: <strong>{state.answer}</strong>
          </p>
        )}
      </div>

      <div className={styles.counters}>
        <div className={`${styles.counter} ${styles.counterHit}`}>
          <span>ACERTOS</span>
          <strong>{state?.hits ?? 0}</strong>
        </div>
        <div className={`${styles.counter} ${styles.counterFault}`}>
          <span>ERROS</span>
          <strong>{state?.faults ?? 0}</strong>
        </div>
        <div className={`${styles.counter} ${styles.counterSkip}`}>
          <span>PULOS</span>
          <strong>{state?.skips ?? 0}</strong>
        </div>
        <div className={`${styles.counter} ${styles.counterTime}`}>
          <span>TEMPO</span>
          <strong>{formatTimer(state?.seconds ?? 0)}</strong>
        </div>
      </div>

      <p className={styles.roundInfo}>
        {state?.rounds ? `Rodada ${state.round} de ${state.rounds}` : "Sem rodadas"} · {state?.speechMessage || "sem status de microfone"}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${styles.actionHit} ${flash === "hit" ? styles.actionFired : ""}`}
          onPointerDown={(event) => {
            event.preventDefault();
            pointerGuardRef.current = Date.now();
            fire("hit");
          }}
          onClick={() => {
            // Browsers that still emit `click` after a prevented `pointerdown`
            // would otherwise send the command twice.
            if (Date.now() - pointerGuardRef.current < 600) {
              pointerGuardRef.current = 0;
              return;
            }
            fire("hit");
          }}
          disabled={!selected}
        >
          ACERTO <em>PageUp</em>
        </button>
        <button
          type="button"
          className={`${styles.action} ${styles.actionSkip} ${flash === "skip" ? styles.actionFired : ""}`}
          onPointerDown={(event) => {
            event.preventDefault();
            pointerGuardRef.current = Date.now();
            fire("skip");
          }}
          onClick={() => {
            if (Date.now() - pointerGuardRef.current < 600) {
              pointerGuardRef.current = 0;
              return;
            }
            fire("skip");
          }}
          disabled={!selected}
        >
          PULAR <em>PageDown</em>
        </button>
        <button
          type="button"
          className={`${styles.action} ${styles.actionFault} ${flash === "fault" ? styles.actionFired : ""}`}
          onPointerDown={(event) => {
            event.preventDefault();
            pointerGuardRef.current = Date.now();
            fire("fault");
          }}
          onClick={() => {
            if (Date.now() - pointerGuardRef.current < 600) {
              pointerGuardRef.current = 0;
              return;
            }
            fire("fault");
          }}
          disabled={!selected}
        >
          ERRO <em>Enter</em>
        </button>
      </div>

      <div className={styles.heardBox}>
        <h3>O que o microfone detectou</h3>
        {heard.length === 0 ? (
          <p className={styles.heardEmpty}>Nada captado ainda.</p>
        ) : (
          <ul className={styles.heardList}>
            {heard
              .slice()
              .reverse()
              .map((item) => (
                <li key={item.id} className={toneClass(item.verdict)}>
                  <span className={styles.heardTime}>{formatClock(item.at)}</span>
                  <span className={styles.heardText}>“{item.text}”</span>
                  <span className={styles.heardVerdict}>{item.final ? item.verdict ?? "final" : "parcial"}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function AdminPanel() {
  const channelRef = useRef(openPanelChannel());
  const [states, setStates] = useState<Partial<Record<ControlGameId, ControlState>>>({});
  const [heard, setHeard] = useState<ControlHeard[]>([]);
  const [notes, setNotes] = useState<Array<{ id: number; at: number; text: string }>>([]);
  const [connected, setConnected] = useState(false);
  const [chosen, setChosen] = useState<ControlGameId>("palavra-proibida");
  const [now, setNow] = useState(() => Date.now());

  // Keeps "iniciado há", the online badge and the countdown honest.
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(
    () =>
      channelRef.current.subscribe((event: ControlEvent) => {
        switch (event.kind) {
          case "snapshot":
            setStates(event.snapshot.states);
            setHeard(event.snapshot.heard);
            setNotes(event.snapshot.notes);
            break;
          case "state":
            setStates((current) => ({ ...current, [event.state.game]: event.state }));
            break;
          case "heard":
            setHeard((current) => [...current, event.heard].slice(-60));
            break;
          case "note":
            setNotes((current) => [...current, event.note].slice(-20));
            break;
          default:
            break;
        }
      }, setConnected),
    [],
  );

  const isOnline = useCallback(
    (game: ControlGameId) => {
      const state = states[game];
      return state !== undefined && now - state.updatedAt < CONTROL_STALE_MS;
    },
    [now, states],
  );

  const running = useMemo(
    () => CONTROL_GAMES.map((game) => game.id).filter((id) => isOnline(id) && states[id]?.started === true && states[id]?.finished !== true),
    [isOnline, states],
  );

  // A single running game takes over the Air Mouse keys, but only while the
  // operator has not picked a live screen themselves. A selection that flips
  // under the cursor disables the button they are aiming at, which reads as
  // "the first click does nothing".
  const chosenIsLive = isOnline(chosen) && states[chosen]?.started === true;
  const selected = chosenIsLive ? chosen : running.length === 1 ? running[0] : chosen;
  const activeState = states[selected];
  const activeLabel = CONTROL_GAMES.find((item) => item.id === selected)?.label ?? "";
  const activeHeard = heard.filter((item) => item.game === selected);
  const elapsed = activeState?.started ? Math.max(0, Math.floor((now - activeState.startedAt) / 1000)) : 0;

  const send = useCallback((action: ControlCommandAction) => channelRef.current.sendCommand(selected, action, "admin"), [selected]);

  useAirMouseControls({
    onCorrect: () => send("hit"),
    onSkip: () => send("skip"),
    onFault: () => send("fault"),
    onChooseForbidden: () => setChosen("palavra-proibida"),
    onChooseEmoji: () => setChosen("emoji-dos-santos"),
  });

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <h1>PAINEL DE CONTROLE</h1>
          <p className={styles.subtitle}>Arena SJPII · comando em tempo real</p>
        </div>
        <div className={styles.statusBox}>
          <span className={`${styles.badge} ${connected ? styles.badgeLive : ""}`}>{connected ? "PAINEL ONLINE" : "RECONECTANDO"}</span>
          <span className={styles.statusText}>
            {running.length > 0 ? `Jogo em andamento: ${CONTROL_GAMES.find((item) => item.id === running[0])?.label}` : "Nenhum jogo iniciado"}
          </span>
        </div>
      </header>

      <section className={styles.summary}>
        <div className={styles.summaryItem}>
          <span>Comando em</span>
          <strong>{activeLabel}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span>Rodada</span>
          <strong>{activeState?.rounds ? `${activeState.round}/${activeState.rounds}` : "—"}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span>Tempo</span>
          <strong>{formatTimer(activeState?.seconds ?? 0)}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span>Iniciado há</span>
          <strong>{activeState?.started ? formatTimer(elapsed) : "—"}</strong>
        </div>
        <div className={styles.summaryItem}>
          <span>Microfone</span>
          <strong>{activeState?.speechMessage ?? "—"}</strong>
        </div>
      </section>

      <section className={styles.feedBox}>
        <h2>Microfone em tempo real · {activeLabel}</h2>
        {activeHeard.length === 0 ? (
          <p className={styles.heardEmpty}>O microfone ainda não falou.</p>
        ) : (
          <ul className={styles.feed}>
            {activeHeard
              .slice(-12)
              .reverse()
              .map((item) => (
                <li key={item.id} className={toneClass(item.verdict)}>
                  <span className={styles.heardTime}>{formatClock(item.at)}</span>
                  <span className={styles.heardText}>“{item.text}”</span>
                  <span className={styles.heardVerdict}>{item.final ? item.verdict ?? "final" : "parcial"}</span>
                </li>
              ))}
          </ul>
        )}
      </section>

      <div className={styles.cards}>
        {CONTROL_GAMES.map((game) => (
          <GameCard
            key={game.id}
            game={game.id}
            label={game.label}
            short={game.short}
            state={states[game.id]}
            heard={heard.filter((item) => item.game === game.id)}
            online={isOnline(game.id)}
            selected={selected === game.id}
            onSelect={() => setChosen(game.id)}
            onCommand={send}
          />
        ))}
      </div>

      <RankingBoard />

      <section className={styles.logBox}>
        <h2>Eventos</h2>
        {notes.length === 0 ? (
          <p className={styles.heardEmpty}>Sem eventos registrados.</p>
        ) : (
          <ul className={styles.log}>
            {notes
              .slice()
              .reverse()
              .map((note) => (
                <li key={note.id}>
                  <span className={styles.heardTime}>{formatClock(note.at)}</span> {note.text}
                </li>
              ))}
          </ul>
        )}
      </section>

      <footer className={styles.footer}>
        Air Mouse: <strong>PageUp</strong> {ACTION_LABEL.hit} · <strong>PageDown</strong> {ACTION_LABEL.skip} · <strong>Enter</strong>{" "}
        {ACTION_LABEL.fault} · <strong>ArrowUp</strong>/<strong>ArrowDown</strong> escolhem o jogo · <strong>Mute</strong> volta para a home.
      </footer>
    </main>
  );
}