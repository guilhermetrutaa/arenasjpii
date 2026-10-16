import { DATA, shuffleInterleaved, type ForbiddenCard } from "@/src/data/forbidden-cards";

// Remembers which target words a player has already faced, so a new round is
// drawn only from the cards still missing from the deck. The forgotten half of
// the request is deliberate: the five forbidden words MAY repeat, and they are
// display content plus the speech-detection input, never a draw filter.
const STORAGE_KEY = "arena:palavra-proibida:usadas";

export const DECK_TOTAL = DATA.length;

// Identity by content rather than by array position. The deck is edited
// directly in `src/data/forbidden-cards.ts`, and a positional key would shift
// with every insertion: renames would resurrect an already-used card, and new
// cards would inherit the memory of the card that used to sit in their slot.
function cardKey(card: ForbiddenCard) {
  return `${card.category}|${card.saint}`;
}

function knownKeys() {
  return new Set(DATA.map(cardKey));
}

// Anything unreadable, from another version of the app or a hand-edited
// storage value, degrades to "nothing used yet" instead of breaking the game.
// Keys whose card no longer exists are dropped here, so removing a card also
// cleans up its leftover entry.
function readUsed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    const known = knownKeys();
    return new Set(parsed.filter((key): key is string => typeof key === "string" && known.has(key)));
  } catch {
    return new Set();
  }
}

function writeUsed(used: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...used]));
  } catch {
    // A full or blocked storage must not stop a round from being dealt.
  }
}

// Called as soon as a card reaches the screen, not when the round ends: a team
// that saw a word keeps it seen even if the round is interrupted.
export function rememberCard(card: ForbiddenCard) {
  const key = cardKey(card);
  const used = readUsed();
  if (used.has(key)) return;
  used.add(key);
  writeUsed(used);
}

export function clearDeckMemory() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do: an unreachable storage already behaves as "all available".
  }
}

// Builds the deck for a round from the cards that have not been used yet. Once
// every card has been faced the cycle restarts, so the whole deck becomes
// available again instead of the game running out of cards to deal.
export function createDeck(): ForbiddenCard[] {
  const used = readUsed();
  const remaining = DATA.filter((card) => !used.has(cardKey(card)));
  if (remaining.length === 0) {
    clearDeckMemory();
    return shuffleInterleaved(DATA);
  }
  return shuffleInterleaved(remaining);
}