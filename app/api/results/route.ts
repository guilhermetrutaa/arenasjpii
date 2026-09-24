import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { signResult, type GameKind, type ResultPayload } from "@/src/lib/ranking-token";

const games = new Set<GameKind>(["palavra-proibida", "emoji-dos-santos"]);

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
    if (score > total || hits + skips + faults !== total) {
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
      createdAt: now,
      expiresAt: now + 1000 * 60 * 60 * 24 * 30,
    };

    return NextResponse.json({ token: signResult(payload) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Não foi possível criar o resultado" }, { status: 500 });
  }
}
