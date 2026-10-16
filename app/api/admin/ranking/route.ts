import { NextResponse } from "next/server";
import { getAdminConfiguration, getAdminDatabase, describeAdminWriteFailure } from "@/src/lib/firebase-admin";
import {
  RANKING_EVENT_ID,
  isValidNormalizedTeamName,
  normalizeTeamName,
  teamId,
} from "@/src/lib/team-identity";

const MAX_POINTS = 1000;
const MAX_TEAMS = 200;

type AdminTeam = {
  id: string;
  name: string;
  totalScore: number;
  totalGames: number;
};

function rankTeams(teams: AdminTeam[]) {
  return teams.sort(
    (left, right) =>
      right.totalScore - left.totalScore ||
      right.totalGames - left.totalGames ||
      left.name.localeCompare(right.name, "pt-BR"),
  );
}

export async function GET() {
  const configuration = getAdminConfiguration();

  if (!configuration.configured) {
    return NextResponse.json(
      {
        configured: false,
        writable: false,
        error: "Credenciais do Firebase Admin ausentes no servidor.",
        teams: [],
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const database = getAdminDatabase();
    // Ordered client-side on purpose: the public ranking query only needs the
    // single-field index, and this route must work before any index is deployed.
    const snapshot = await database.collection("teams").limit(MAX_TEAMS).get();
    const teams = snapshot.docs.map((document) => {
      const data = document.data();
      return {
        id: document.id,
        name: String(data.name ?? "Equipe"),
        totalScore: Number(data.totalScore ?? 0),
        totalGames: Number(data.totalGames ?? 0),
      };
    });

    return NextResponse.json(
      {
        configured: true,
        writable: true,
        projectId: configuration.projectId,
        teams: rankTeams(teams),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[admin/ranking] falha ao ler as equipes", error);
    return NextResponse.json(
      {
        configured: true,
        writable: false,
        error: describeAdminWriteFailure(error),
        teams: [],
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  let body: { teamName?: string; points?: unknown; operationId?: string; note?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const name = String(body.teamName ?? "").trim();
  const normalizedName = normalizeTeamName(name);
  if (!isValidNormalizedTeamName(normalizedName)) {
    return NextResponse.json({ error: "Informe um nome de equipe válido" }, { status: 400 });
  }

  const points = Number(body.points);
  if (!Number.isInteger(points) || Math.abs(points) > MAX_POINTS) {
    return NextResponse.json({ error: `Informe um número inteiro entre -${MAX_POINTS} e ${MAX_POINTS}` }, { status: 400 });
  }
  if (points === 0) {
    return NextResponse.json({ error: "Informe uma pontuação diferente de zero" }, { status: 400 });
  }

  const operationId = String(body.operationId ?? "").trim();
  if (!/^[\w-]{8,64}$/.test(operationId)) {
    return NextResponse.json({ error: "Identificador da operação inválido" }, { status: 400 });
  }

  const note = String(body.note ?? "").trim().slice(0, 140);

  try {
    const database = getAdminDatabase();
    const operationReference = database.collection("manualOperations").doc(operationId);
    const id = teamId(normalizedName);
    const teamReference = database.collection("teams").doc(id);
    const resultReference = database.collection("gameResults").doc(`manual-${operationId}`);

    const outcome = await database.runTransaction(async (transaction) => {
      // Every read has to precede every write inside a transaction.
      const operationSnapshot = await transaction.get(operationReference);
      const operationData = operationSnapshot.data();
      if (operationSnapshot.exists) {
        return {
          alreadyApplied: true as const,
          name: String(operationData?.name ?? name),
          totalScore: Number(operationData?.resultingScore ?? 0),
          totalGames: Number(operationData?.resultingGames ?? 0),
        };
      }

      const teamSnapshot = await transaction.get(teamReference);
      const teamData = teamSnapshot.data();
      const currentScore = Number(teamData?.totalScore ?? 0);
      const currentGames = Number(teamData?.totalGames ?? 0);
      // A correction can overshoot; the ranking shows totals, never negatives.
      const totalScore = Math.max(0, currentScore + points);
      const totalGames = currentGames + 1;
      const now = new Date();
      // Typing "Paroquia Sao Jose" must not downgrade a leaderboard entry that
      // already reads "Paróquia São José", so the first registered spelling wins.
      const displayName = teamSnapshot.exists ? String(teamData?.name ?? name) : name;

      transaction.set(teamReference, {
        name: displayName,
        normalizedName,
        totalScore,
        totalGames,
        createdAt: teamSnapshot.exists ? teamData?.createdAt : now,
        updatedAt: now,
      });
      transaction.set(resultReference, {
        teamId: id,
        game: "manual",
        source: "admin",
        operationId,
        score: points,
        note,
        eventId: RANKING_EVENT_ID,
        createdAt: now,
        submittedAt: now,
      });
      transaction.set(operationReference, {
        operationId,
        teamId: id,
        name: displayName,
        normalizedName,
        points,
        note,
        resultingScore: totalScore,
        resultingGames: totalGames,
        appliedAt: now,
      });

      return { alreadyApplied: false as const, name: displayName, totalScore, totalGames };
    });

    if (outcome.alreadyApplied) {
      return NextResponse.json(
        { ok: true, alreadyApplied: true, name: outcome.name, totalScore: outcome.totalScore, totalGames: outcome.totalGames },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        alreadyApplied: false,
        name: outcome.name,
        points,
        totalScore: outcome.totalScore,
        totalGames: outcome.totalGames,
        clamped: outcome.totalScore === 0 && points < 0,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[admin/ranking] falha ao atribuir pontuação", error);
    return NextResponse.json({ error: describeAdminWriteFailure(error) }, { status: 500 });
  }
}