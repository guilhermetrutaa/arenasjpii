import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { signResult, type GameKind, type ResultPayload } from "@/src/lib/ranking-token";
import { EMOJI_DIFFICULTY_BY_ID, EMOJI_MAX_ROUND_POINTS, type EmojiDifficultyId } from "@/src/data/emoji-dos-santos";

const games = new Set<GameKind>(["palavra-proibida", "emoji-dos-santos"]);

// O token carrega o nível para que a pontuição possa ser conferida servidor a
// servidor: pontos = acertos × multiplicador do nível.
function readDifficulty(value: unknown): EmojiDifficultyId | null {
  return typeof value === "string" && value in EMOJI_DIFFICULTY_BY_ID ? (value as EmojiDifficultyId) : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ResultPayload>;
    const score = Number(body.score);
    const hits = Number(body.hits);
    const skips = Number(body.skips);
    const faults = Number(body.faults);
    const total = Number(body.total);
    const game = body.game as GameKind;

    if (!games.has(game) || ![score, hits, skips, faults, total].every(Number.isInteger)) {
      return NextResponse.json({ error: "Resultado inválido" }, { status: 400 });
    }
    if (score < 0 || hits < 0 || skips < 0 || faults < 0 || total < 1) {
      return NextResponse.json({ error: "Resultado inválido" }, { status: 400 });
    }
    // "Emoji dos Santos" pays per correct round, so its score is points rather
    // than a count, and the operator's `fault` is an event outside the eight
    // rounds: only acertos and non-scored rounds have to add up. "Palavra
    // Proibida" keeps the original rule, where a fault consumes the card.
    const roundsConsistent = game === "emoji-dos-santos"
      ? hits + skips === total
      : hits + skips + faults === total;
    if (!roundsConsistent) {
      return NextResponse.json({ error: "Resultado inconsistente" }, { status: 400 });
    }
    const difficulty = game === "emoji-dos-santos" ? readDifficulty(body.difficulty) : null;
    const scoreIsConsistent = game === "emoji-dos-santos"
      ? difficulty
        ? score === hits * EMOJI_DIFFICULTY_BY_ID[difficulty].multiplier
        : score <= hits * EMOJI_MAX_ROUND_POINTS
      : score <= total;
    if (!scoreIsConsistent) {
      return NextResponse.json({ error: "Resultado inconsistente" }, { status: 400 });
    }

    const now = Date.now();
    const payload: ResultPayload = {
      resultId: randomUUID(),
      game,
      score,
      hits,
      skips,
      faults,
      total,
      ...(game === "emoji-dos-santos" && difficulty ? { difficulty } : {}),
      createdAt: now,
      expiresAt: now + 1000 * 60 * 60 * 24 * 30,
    };

    return NextResponse.json({ token: signResult(payload) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Não foi possível criar o resultado" }, { status: 500 });
  }
}
