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

function post(payload: Record<string, unknown>) {
  // Fire and forget: the panel must never break a game because of telemetry.
  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
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
      post({ role: "game", kind: "state", game, state });
    },
    publishHeard(heard) {
      if (closed) return;
      post({ role: "game", kind: "heard", game, ...heard });
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
      post({ role: "game", kind: "bye", game });
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