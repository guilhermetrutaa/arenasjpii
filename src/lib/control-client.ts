"use client";

import type {
  ControlCommandAction,
  ControlEvent,
  ControlGameId,
  ControlSnapshot,
  ControlState,
} from "@/src/lib/control";

const ENDPOINT = "/api/control/message";
const STREAM = "/api/control/stream";

// While someone is talking the recogniser emits interim results several times
// per second and the round ticks its clock every second. Publishing all of that
// verbatim saturates the browser's per-origin connection pool, so the
// operator's command ends up queued behind the flood. Coalescing the mirrors
// keeps the panel live without starving `/api/control/message`.
const HEARD_INTERVAL_MS = 400;
const STATE_INTERVAL_MS = 250;

function post(payload: Record<string, unknown>, keepalive = false) {
  // Fire and forget: the panel must never break a game because of telemetry.
  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // `keepalive` is only worth its 64 KB budget on the way out of a page.
    ...(keepalive ? { keepalive: true } : {}),
  }).catch(() => undefined);
}

// Leading-edge throttle with a trailing flush: the first message goes out
// immediately, everything else inside the window replaces the pending one.
function createThrottle(intervalMs: number) {
  let last = 0;
  let timer: number | null = null;
  let pending: Record<string, unknown> | null = null;

  const flush = () => {
    timer = null;
    const payload = pending;
    if (!payload) return;
    pending = null;
    last = Date.now();
    post(payload);
  };

  return (payload: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    const elapsed = Date.now() - last;
    if (elapsed >= intervalMs) {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      pending = null;
      last = Date.now();
      post(payload);
      return;
    }
    pending = payload;
    if (timer === null) timer = window.setTimeout(flush, intervalMs - elapsed);
  };
}

export type GameChannel = {
  publishState: (state: Omit<ControlState, "game" | "updatedAt">) => void;
  publishHeard: (heard: { text: string; final: boolean; verdict?: string | null }) => void;
  publishNote: (text: string) => void;
  close: () => void;
};

// Opens the realtime channel used by a running game: it publishes state and
// microphone transcripts and applies the commands coming from `/admin`.
export function openGameChannel(options: { game: ControlGameId; onCommand: (action: ControlCommandAction) => void }): GameChannel {
  const { game, onCommand } = options;
  let source: EventSource | null = null;
  let closed = false;
  const throttleState = createThrottle(STATE_INTERVAL_MS);
  const throttleHeard = createThrottle(HEARD_INTERVAL_MS);

  const handleCommand = (event: MessageEvent<string>) => {
    const parsed = safeParse<ControlEvent>(event.data);
    if (!parsed || parsed.kind !== "command") return;
    if (parsed.command.game !== game) return;
    onCommand(parsed.command.action);
  };

  const connect = () => {
    if (closed || typeof window === "undefined") return;
    source = new EventSource(STREAM);
    source.addEventListener("command", handleCommand as EventListener);
    source.addEventListener("error", () => {
      // EventSource reconnects on its own; this only refreshes the route.
      if (closed) return;
      source?.close();
      source = null;
      window.setTimeout(connect, 2000);
    });
  };

  connect();

  return {
    publishState(state) {
      if (closed) return;
      throttleState({ role: "game", kind: "state", game, state });
    },
    publishHeard(heard) {
      if (closed) return;
      const payload = { role: "game", kind: "heard", game, ...heard };
      // What the team actually said is worth an immediate round trip; the
      // running commentary is not.
      if (heard.final) post(payload);
      else throttleHeard(payload);
    },
    publishNote(text) {
      if (closed) return;
      post({ role: "game", kind: "note", game, text });
    },
    close() {
      if (closed) return;
      closed = true;
      source?.close();
      source = null;
      post({ role: "game", kind: "bye", game }, true);
    },
  };
}

export type PanelChannel = {
  subscribe: (onEvent: (event: ControlEvent) => void, onStatus: (connected: boolean) => void) => () => void;
  sendCommand: (game: ControlGameId, action: ControlCommandAction, source?: string) => void;
};

export function openPanelChannel(): PanelChannel {
  return {
    subscribe(onEvent, onStatus) {
      const source = new EventSource(STREAM);
      const handler = (event: MessageEvent<string>) => {
        const parsed = safeParse<ControlEvent>(event.data);
        if (parsed) onEvent(parsed);
      };
      for (const kind of ["snapshot", "state", "heard", "note", "command", "bye"]) {
        source.addEventListener(kind, handler as EventListener);
      }
      source.onopen = () => onStatus(true);
      source.onerror = () => onStatus(false);
      return () => source.close();
    },
    sendCommand(game, action, source = "admin") {
      post({ role: "admin", game, action, source });
    },
  };
}

export function emptySnapshot(): ControlSnapshot {
  return { states: {}, heard: [], notes: [] };
}

function safeParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}