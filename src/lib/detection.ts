import Fuse from "fuse.js";

export interface DetectionResult {
  falouProibida: boolean;
  palavraDetectada: string | null;
  santoDetectado: string | null;
  confidence: number;
}

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text: string): string[] {
  return normalizeText(text).split(/\s+/).filter(Boolean);
}

function containsPhrase(words: string[], phrase: string[]): boolean {
  if (phrase.length === 0 || phrase.length > words.length) return false;
  return words.some((_, start) => phrase.every((word, offset) => words[start + offset] === word));
}

function singularForms(word: string): Set<string> {
  const forms = new Set([word]);
  if (word.length >= 5 && word.endsWith("s")) forms.add(word.slice(0, -1));
  if (word.length >= 6 && word.endsWith("oes")) forms.add(`${word.slice(0, -3)}ao`);
  if (word.length >= 6 && word.endsWith("aes")) forms.add(`${word.slice(0, -3)}al`);
  return forms;
}

function wordsMatch(spoken: string, forbidden: string): boolean {
  if (spoken === forbidden) return true;
  const spokenForms = singularForms(spoken);
  const forbiddenForms = singularForms(forbidden);
  for (const form of spokenForms) {
    if (forbiddenForms.has(form)) return true;
  }
  // Fuzzy fallback for ASR mishearings (e.g. "pobresa" → "pobreza")
  if (spoken.length >= 4 && forbidden.length >= 4) {
    const fuse = new Fuse([forbidden], { includeScore: true, threshold: 0.3 });
    const r = fuse.search(spoken);
    const first = r[0];
    if (first && (1 - (first.score ?? 0)) >= 0.82) return true;
  }
  return false;
}

export function detectForbiddenWords(
  transcription: string,
  forbiddenList: string[],
): { falouProibida: boolean; palavraDetectada: string | null; confidence: number } {
  const words = tokenize(transcription);

  for (const forbidden of forbiddenList) {
    const phrase = tokenize(forbidden);
    if (phrase.length > 1 && containsPhrase(words, phrase)) {
      console.log(`[detect] forbidden: trans="${transcription}" word="${forbidden}" conf=1.00`);
      return { falouProibida: true, palavraDetectada: forbidden, confidence: 1 };
    }
  }

  for (const forbidden of forbiddenList) {
    const phrase = tokenize(forbidden);
    if (phrase.length !== 1) continue;
    if (words.some((spoken) => wordsMatch(spoken, phrase[0]))) {
      console.log(`[detect] forbidden: trans="${transcription}" word="${forbidden}" conf=1.00`);
      return { falouProibida: true, palavraDetectada: forbidden, confidence: 1 };
    }
  }

  return { falouProibida: false, palavraDetectada: null, confidence: 0 };
}

const STOP_WORDS = new Set(["de", "da", "do", "das", "dos"]);
function meaningfulTokens(value: string): string[] {
  return tokenize(value).filter((word) => !STOP_WORDS.has(word));
}

/*
 * The Emoji game requires the displayed saint's full name. Accepted names are
 * kept only when they identify a complete multi-word form (for example,
 * "Nossa Senhora da Aparecida"). One-word nicknames and partial names cannot
 * score a point.
 */
export function detectSaint(
  transcription: string,
  saintName: string,
  acceptedNames: string[] = [],
): { santoDetectado: string | null; confidence: number } {
  const spoken = tokenize(transcription);
  const canonical = tokenize(saintName);
  const candidates = [canonical];

  for (const acceptedName of acceptedNames) {
    const candidate = tokenize(acceptedName);
    const content = meaningfulTokens(acceptedName);
    if (candidate.length >= 2 && content.length >= 2) candidates.push(candidate);
  }

  for (const candidate of candidates) {
    if (containsPhrase(spoken, candidate)) {
      return { santoDetectado: saintName, confidence: 1 };
    }
  }

  return { santoDetectado: null, confidence: 0 };
}

function emptyResult(): DetectionResult {
  return { falouProibida: false, palavraDetectada: null, santoDetectado: null, confidence: 0 };
}

export function isRelevantTranscription(text: string): boolean {
  return tokenize(text).length > 0;
}

export function analyzeForbiddenAccumulated(
  current: string[],
  history: string[],
  forbiddenList: string[],
): DetectionResult {
  const pool = [...history, ...current];
  for (const text of pool) {
    const forbidden = detectForbiddenWords(text, forbiddenList);
    if (forbidden.falouProibida) {
      return { ...emptyResult(), falouProibida: true, palavraDetectada: forbidden.palavraDetectada, confidence: forbidden.confidence };
    }
  }
  return emptyResult();
}

export function analyzeEmojiAccumulated(
  current: string[],
  history: string[],
  saintName: string,
  acceptedNames: string[] = [],
): DetectionResult {
  for (const text of [...history, ...current]) {
    const saint = detectSaint(text, saintName, acceptedNames);
    if (saint.santoDetectado) {
      return { ...emptyResult(), santoDetectado: saint.santoDetectado, confidence: saint.confidence };
    }
  }
  return emptyResult();
}
