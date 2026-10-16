import { NextResponse } from "next/server";
import { getAdminDatabase, describeAdminWriteFailure } from "@/src/lib/firebase-admin";
import { verifyResult } from "@/src/lib/ranking-token";
import { RANKING_EVENT_ID, isValidNormalizedTeamName, normalizeTeamName, teamId } from "@/src/lib/team-identity";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string; teamName?: string };
    const token = body.token ?? "";
    const name = (body.teamName ?? "").trim();
    const normalizedName = normalizeTeamName(name);
    const payload = verifyResult(token);

    if (!payload) return NextResponse.json({ error: "QR Code inválido ou expirado" }, { status: 400 });
    if (!isValidNormalizedTeamName(normalizedName)) {
      return NextResponse.json({ error: "Informe um nome válido" }, { status: 400 });
    }

    const database = getAdminDatabase();
    const tokenReference = database.collection("submissionTokens").doc(payload.resultId);
    const teamReference = database.collection("teams").doc(teamId(normalizedName));
    const resultReference = database.collection("gameResults").doc(payload.resultId);
    let displayName = name;

    await database.runTransaction(async (transaction) => {
      if ((await transaction.get(tokenReference)).exists) throw new Error("RESULT_ALREADY_SUBMITTED");
      const teamSnapshot = await transaction.get(teamReference);
      const teamData = teamSnapshot.data();
      const currentScore = Number(teamData?.totalScore ?? 0);
      const currentGames = Number(teamData?.totalGames ?? 0);
      // Keep the spelling the team registered first: a later participant typing
      // an unaccented variant must not downgrade the public leaderboard entry.
      displayName = teamSnapshot.exists ? String(teamData?.name ?? name) : name;

      transaction.set(teamReference, {
        name: displayName,
        normalizedName,
        totalScore: currentScore + payload.score,
        totalGames: currentGames + 1,
        createdAt: teamSnapshot.exists ? teamData?.createdAt : new Date(),
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
        eventId: RANKING_EVENT_ID,
        createdAt: new Date(),
        submittedAt: new Date(),
      });
      transaction.set(tokenReference, { resultId: payload.resultId, submittedAt: new Date() });
    });

    return NextResponse.json({ ok: true, name: displayName }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.message === "RESULT_ALREADY_SUBMITTED") {
      return NextResponse.json({ error: "Este resultado já foi registrado" }, { status: 409 });
    }
    // Kept server-side: without it a revoked credential and a transient network
    // fault are indistinguishable to whoever is trying to fix the ranking.
    console.error("[ranking/submit] falha ao registrar resultado", error);
    return NextResponse.json({ error: describeAdminWriteFailure(error) }, { status: 500 });
  }
}