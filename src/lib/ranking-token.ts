import { createHmac, timingSafeEqual } from "node:crypto";

export type GameKind = "palavra-proibida" | "emoji-dos-santos";

export type ResultPayload = {
  resultId: string;
  game: GameKind;
  score: number;
  hits: number;
  skips: number;
  faults: number;
  total: number;
  createdAt: number;
  expiresAt: number;
};

function secret() {
  const value = process.env.RANKING_SIGNING_SECRET;
  if (!value) throw new Error("RANKING_SIGNING_SECRET não configurado");
  return value;
}

export function signResult(payload: ResultPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifyResult(token: string): ResultPayload | null {
  // Exactly `data.signature`. A longer token is malformed rather than valid:
  // silently ignoring trailing segments would let a tampered token through the
  // length check that guards `timingSafeEqual`.
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  if (!data || !signature) return null;
  const expected = createHmac("sha256", secret()).update(data).digest("base64url");
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length || !timingSafeEqual(receivedBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as ResultPayload;
    if (!payload.resultId || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
