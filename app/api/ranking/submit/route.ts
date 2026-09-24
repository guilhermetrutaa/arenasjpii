import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getAdminDatabase } from "@/src/lib/firebase-admin";
import { verifyResult } from "@/src/lib/ranking-token";

function normalizeTeamName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function teamId(normalizedName: string) {
  return createHash("sha256").update(normalizedName).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string; teamName?: string };
    const token = body.token ?? "";
    const name = (body.teamName ?? "").trim();
    const normalizedName = normalizeTeamName(name);
    const payload = verifyResult(token);

    if (!payload) return NextResponse.json({ error: "QR Code inválido ou expirado" }, { status: 400 });
    if (normalizedName.length < 2 || normalizedName.length > 80) {
      return NextResponse.json({ error: "Informe um nome válido" }, { status: 400 });
    }

    const database = getAdminDatabase();
    const tokenReference = database.collection("submissionTokens").doc(payload.resultId);
    const teamReference = database.collection("teams").doc(teamId(normalizedName));
    const resultReference = database.collection("gameResults").doc(payload.resultId);

    await database.runTransaction(async (transaction) => {
      if ((await transaction.get(tokenReference)).exists) throw new Error("RESULT_ALREADY_SUBMITTED");
      const teamSnapshot = await transaction.get(teamReference);
      const currentScore = Number(teamSnapshot.data()?.totalScore ?? 0);
      const currentGames = Number(teamSnapshot.data()?.totalGames ?? 0);

      transaction.set(teamReference, {
        name,
        normalizedName,
        totalScore: currentScore + payload.score,
        totalGames: currentGames + 1,
        createdAt: teamSnapshot.exists ? teamSnapshot.data()?.createdAt : new Date(),
        updatedAt: new Date(),
      });
      transaction.set(resultReference, {
        teamId: teamReference.id,
        game: payload.game,
        score: payload.score,
        hits: payload.hits,
        skips: payload.skips,
        faults: payload.faults,
        total: payload.total,
        eventId: "arena-10-days",
        createdAt: new Date(),
        submittedAt: new Date(),
      });
      transaction.set(tokenReference, { resultId: payload.resultId, submittedAt: new Date() });
    });

    return NextResponse.json({ ok: true, name }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.message === "RESULT_ALREADY_SUBMITTED") {
      return NextResponse.json({ error: "Este resultado já foi registrado" }, { status: 409 });
    }
    return NextResponse.json({ error: "Não foi possível registrar no ranking" }, { status: 500 });
  }
}
