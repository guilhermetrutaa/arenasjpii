import { NextResponse } from "next/server";
import { CONTROL_GAMES, CONTROL_STALE_MS, type ControlCommandAction, type ControlGameId, type ControlState } from "@/src/lib/control";
import { addNote, recordCommand, recordGameHeard, recordGameOffline, recordGameState } from "@/src/lib/control-hub";

const GAME_IDS = new Set<string>(CONTROL_GAMES.map((game) => game.id));
const ACTIONS = new Set<string>(["hit", "skip", "fault"]);

function isGameId(value: unknown): value is ControlGameId {
  return typeof value === "string" && GAME_IDS.has(value);
}

function isAction(value: unknown): value is ControlCommandAction {
  return typeof value === "string" && ACTIONS.has(value);
}

function readString(value: unknown, max = 400) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function readStringList(value: unknown, max = 12) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").slice(0, max).map((item) => item.slice(0, 120));
}

function readCount(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
}

// Single entry point for both directions: the games publish their state and
// what the microphone heard, the admin panel publishes commands.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  if (body.role === "admin") {
    if (!isGameId(body.game) || !isAction(body.action)) {
      return NextResponse.json({ error: "Comando inválido" }, { status: 400 });
    }
    const command = recordCommand(body.game, body.action, readString(body.source, 40) || "admin");
    return NextResponse.json({ command }, { headers: { "Cache-Control": "no-store" } });
  }

  if (body.role !== "game") {
    return NextResponse.json({ error: "Papel inválido" }, { status: 400 });
  }

  if (!isGameId(body.game)) {
    return NextResponse.json({ error: "Jogo inválido" }, { status: 400 });
  }
  const game = body.game;

  if (body.kind === "bye") {
    recordGameOffline(game);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  if (body.kind === "note") {
    const text = readString(body.text, 160).trim();
    if (text) addNote(text);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  if (body.kind === "heard") {
    const text = readString(body.text);
    if (!text.trim()) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    recordGameHeard({
      game,
      text,
      final: body.final !== false,
      verdict: typeof body.verdict === "string" && body.verdict ? body.verdict.slice(0, 40) : null,
    });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  if (body.kind === "state") {
    const source = (body.state ?? {}) as Record<string, unknown>;
    const now = Date.now();
    const state: ControlState = {
      game,
      started: source.started === true,
      finished: source.finished === true,
      startedAt: typeof source.startedAt === "number" ? source.startedAt : now,
      updatedAt: now,
      score: readCount(source.score),
      hits: readCount(source.hits),
      skips: readCount(source.skips),
      faults: readCount(source.faults),
      seconds: readCount(source.seconds),
      round: readCount(source.round),
      rounds: readCount(source.rounds),
      speechMessage: readString(source.speechMessage, 120),
      promptLabel: readString(source.promptLabel, 120),
      promptItems: readStringList(source.promptItems),
      answer: typeof source.answer === "string" ? source.answer.slice(0, 120) : null,
    };
    recordGameState(state);
    return NextResponse.json({ ok: true, staleMs: CONTROL_STALE_MS }, { headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ error: "Mensagem desconhecida" }, { status: 400 });
}