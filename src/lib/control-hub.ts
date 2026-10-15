import type {
  ControlCommand,
  ControlCommandAction,
  ControlEvent,
  ControlGameId,
  ControlHeard,
  ControlSnapshot,
  ControlState,
} from "@/src/lib/control";

type Listener = (event: ControlEvent) => void;

type ControlHub = {
  states: Partial<Record<ControlGameId, ControlState>>;
  heard: ControlHeard[];
  notes: Array<{ id: number; at: number; text: string }>;
  listeners: Set<Listener>;
  sequence: number;
  online: Partial<Record<ControlGameId, boolean>>;
};

const HEARD_LIMIT = 60;
const NOTE_LIMIT = 20;

// Next.js re-evaluates route modules on every dev request, so the hub has to
// live on `globalThis` to survive HMR and to be shared by the stream and the
// publish routes.
const scope = globalThis as typeof globalThis & { __arenaControlHub?: ControlHub };

function createHub(): ControlHub {
  return { states: {}, heard: [], notes: [], listeners: new Set(), sequence: 0, online: {} };
}

export function getControlHub(): ControlHub {
  if (!scope.__arenaControlHub) scope.__arenaControlHub = createHub();
  return scope.__arenaControlHub;
}

function nextId(hub: ControlHub) {
  hub.sequence += 1;
  return hub.sequence;
}

export function subscribeControl(listener: Listener) {
  const hub = getControlHub();
  hub.listeners.add(listener);
  return () => {
    hub.listeners.delete(listener);
  };
}

export function publishControl(event: ControlEvent) {
  const hub = getControlHub();
  for (const listener of [...hub.listeners]) {
    try {
      listener(event);
    } catch {
      hub.listeners.delete(listener);
    }
  }
}

export function getControlSnapshot(): ControlSnapshot {
  const hub = getControlHub();
  return {
    states: { ...hub.states },
    heard: [...hub.heard],
    notes: [...hub.notes],
  };
}

export function recordGameState(state: ControlState) {
  const hub = getControlHub();
  const previous = hub.states[state.game];
  hub.states[state.game] = state;
  const justStarted = !previous || (!previous.started && state.started);
  if (justStarted) {
    hub.online[state.game] = true;
    addNote(`${state.game === "palavra-proibida" ? "Palavra Proibida" : "Emoji dos Santos"} iniciado`);
  }
  publishControl({ kind: "state", state });
}

export function recordGameHeard(heard: Omit<ControlHeard, "id" | "at">) {
  const hub = getControlHub();
  const entry: ControlHeard = { ...heard, id: nextId(hub), at: Date.now() };
  hub.heard.push(entry);
  if (hub.heard.length > HEARD_LIMIT) hub.heard.splice(0, hub.heard.length - HEARD_LIMIT);
  publishControl({ kind: "heard", heard: entry });
}

export function recordGameOffline(game: ControlGameId) {
  const hub = getControlHub();
  hub.online[game] = false;
  publishControl({ kind: "bye", game });
}

export function addNote(text: string) {
  const hub = getControlHub();
  const note = { id: nextId(hub), at: Date.now(), text };
  hub.notes.push(note);
  if (hub.notes.length > NOTE_LIMIT) hub.notes.splice(0, hub.notes.length - NOTE_LIMIT);
  publishControl({ kind: "note", note });
}

export function recordCommand(game: ControlGameId, action: ControlCommandAction, source: string) {
  const hub = getControlHub();
  const command: ControlCommand = { id: nextId(hub), at: Date.now(), game, action, source };
  publishControl({ kind: "command", command });
  return command;
}