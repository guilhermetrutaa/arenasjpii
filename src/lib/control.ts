// Shared contract between the running games (publisher) and the `/admin`
// panel (subscriber). Kept free of server-only imports so both sides can
// import it.

export type ControlGameId = "palavra-proibida" | "emoji-dos-santos";

// `resetDeck` is an operator command rather than a round outcome: it makes the
// whole deck available again after an interrupted round.
export type ControlCommandAction = "hit" | "skip" | "fault" | "resetDeck";

export const CONTROL_GAMES: Array<{ id: ControlGameId; label: string; short: string }> = [
  { id: "palavra-proibida", label: "Palavra Proibida", short: "PP" },
  { id: "emoji-dos-santos", label: "Emoji dos Santos", short: "ES" },
];

// What the game currently shows, mirrored to the panel on every change.
export type ControlState = {
  game: ControlGameId;
  started: boolean;
  finished: boolean;
  startedAt: number;
  updatedAt: number;
  score: number;
  hits: number;
  skips: number;
  faults: number;
  seconds: number;
  round: number;
  rounds: number;
  // "Palavra Proibida": size of the whole deck. The operator reads it next to
  // `rounds`, which now counts only the cards a player has not faced yet.
  deckTotal: number;
  speechMessage: string;
  // "Palavra Proibida": the saint name. "Emoji dos Santos": "Emojis".
  promptLabel: string;
  promptItems: string[];
  // "Emoji dos Santos" only: which saint the emojis actually point to.
  answer: string | null;
  // "Emoji dos Santos" only: chosen level with its multiplier, e.g. "Fácil (×1)".
  difficulty?: string | null;
};

export type ControlHeard = {
  id: number;
  at: number;
  game: ControlGameId;
  text: string;
  final: boolean;
  verdict: string | null;
};

export type ControlSnapshot = {
  states: Partial<Record<ControlGameId, ControlState>>;
  heard: ControlHeard[];
  notes: Array<{ id: number; at: number; text: string }>;
};

export type ControlCommand = {
  id: number;
  at: number;
  game: ControlGameId;
  action: ControlCommandAction;
  source: string;
};

export type ControlEvent =
  | { kind: "snapshot"; snapshot: ControlSnapshot }
  | { kind: "state"; state: ControlState }
  | { kind: "heard"; heard: ControlHeard }
  | { kind: "note"; note: { id: number; at: number; text: string } }
  | { kind: "command"; command: ControlCommand }
  | { kind: "bye"; game: ControlGameId };

// A game is considered live while it keeps publishing state.
export const CONTROL_STALE_MS = 8000;