"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./admin.module.css";

type AdminTeam = {
  id: string;
  name: string;
  totalScore: number;
  totalGames: number;
};

type RankingResponse = {
  writable: boolean;
  error?: string;
  teams?: AdminTeam[];
};

const QUICK_POINTS = [1, 2, 3, 5, 10];

function newOperationId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `op-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// Kept free of component state so the effect can stay a single `.then` chain,
// matching how `/ranking` loads its data.
async function fetchRanking(): Promise<RankingResponse | null> {
  try {
    const response = await fetch("/api/admin/ranking", { cache: "no-store" });
    return (await response.json()) as RankingResponse;
  } catch {
    return null;
  }
}

export default function RankingBoard() {
  const [teams, setTeams] = useState<AdminTeam[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "blocked">("loading");
  const [statusError, setStatusError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const applyRanking = useCallback((data: RankingResponse | null) => {
    if (!data) {
      setStatus("blocked");
      setStatusError("Não foi possível falar com o servidor.");
      return;
    }
    setTeams(data.teams ?? []);
    if (data.writable) {
      setStatus("ready");
      setStatusError("");
    } else {
      setStatus("blocked");
      setStatusError(data.error ?? "O ranking está indisponível no servidor.");
    }
  }, []);

  const load = useCallback(() => {
    void fetchRanking().then(applyRanking);
  }, [applyRanking]);

  useEffect(() => {
    let active = true;
    void fetchRanking().then((data) => {
      if (active) applyRanking(data);
    });
    return () => {
      active = false;
    };
  }, [applyRanking]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, points, note, operationId: newOperationId() }),
      });
      const data = (await response.json()) as {
        error?: string;
        name?: string;
        points?: number;
        totalScore?: number;
        totalGames?: number;
        clamped?: boolean;
        alreadyApplied?: boolean;
      };

      if (!response.ok) {
        setFeedback({ tone: "error", text: data.error ?? "Não foi possível atribuir a pontuação." });
        return;
      }

      const applied = data.points ?? Number(points);
      const clamped = data.clamped ? " O total foi limitado a zero." : "";
      setFeedback({
        tone: "ok",
        text: `${data.name} ${applied >= 0 ? "+" : ""}${applied} → ${data.totalScore} pts em ${data.totalGames} registros.${clamped}`,
      });
      setTeamName("");
      setPoints("");
      setNote("");
      await load();
    } catch {
      setFeedback({ tone: "error", text: "Não foi possível falar com o servidor." });
    } finally {
      setSaving(false);
    }
  };

  const blocked = status === "blocked";

  return (
    <section className={styles.rankingBox}>
      <div className={styles.rankingHead}>
        <h2>Ranking manual</h2>
        <button type="button" className={styles.rankingRefresh} onClick={() => void load()} disabled={saving}>
          Atualizar
        </button>
      </div>

      <p className={styles.rankingHint}>
        A pontuação digitada <strong>soma</strong> ao total da equipe. Equipe nova é criada automaticamente.
      </p>

      {blocked && (
        <p className={styles.rankingAlert} role="alert">
          <strong>Ranking indisponível.</strong> {statusError} Sem isso nenhuma pontuação pode ser gravada — o painel de
          comando acima continua funcionando.
        </p>
      )}

      <form className={styles.rankingForm} onSubmit={submit}>
        <div className={styles.rankingField}>
          <label htmlFor="ranking-team">Equipe</label>
          <input
            id="ranking-team"
            list="ranking-team-options"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            placeholder="Nome da dupla"
            autoComplete="off"
            minLength={2}
            maxLength={80}
            required
            disabled={blocked}
          />
          <datalist id="ranking-team-options">
            {teams.map((team) => (
              <option key={team.id} value={team.name} />
            ))}
          </datalist>
        </div>

        <div className={styles.rankingField}>
          <label htmlFor="ranking-points">Pontos</label>
          <input
            id="ranking-points"
            type="number"
            inputMode="numeric"
            step={1}
            value={points}
            onChange={(event) => setPoints(event.target.value)}
            placeholder="0"
            required
            disabled={blocked}
          />
        </div>

        <div className={styles.rankingFieldWide}>
          <label htmlFor="ranking-note">Observação (opcional)</label>
          <input
            id="ranking-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ex.: final da etapa 1"
            autoComplete="off"
            maxLength={140}
            disabled={blocked}
          />
        </div>

        <div className={styles.rankingQuick}>
          {QUICK_POINTS.map((value) => (
            <button
              key={value}
              type="button"
              className={styles.rankingChip}
              onClick={() => setPoints((current) => (current === String(value) ? "" : String(value)))}
              disabled={blocked}
            >
              +{value}
            </button>
          ))}
        </div>

        <button type="submit" className={styles.rankingSubmit} disabled={saving || blocked}>
          {saving ? "Registrando..." : "Somar pontuação"}
        </button>
      </form>

      {feedback && (
        <p className={feedback.tone === "ok" ? styles.rankingOk : styles.rankingError} aria-live="polite">
          {feedback.text}
        </p>
      )}

      <div className={styles.rankingListBox}>
        {status === "loading" ? (
          <p className={styles.rankingEmpty}>Carregando classificação…</p>
        ) : teams.length === 0 ? (
          <p className={styles.rankingEmpty}>Nenhuma equipe no ranking ainda.</p>
        ) : (
          <ol className={styles.rankingList}>
            {teams.map((team, index) => (
              <li key={team.id}>
                <span className={styles.rankingPosition}>{index + 1}</span>
                <button
                  type="button"
                  className={styles.rankingTeamName}
                  onClick={() => setTeamName(team.name)}
                  disabled={blocked}
                  title="Usar esta equipe"
                >
                  {team.name}
                </button>
                <span className={styles.rankingGames}>{team.totalGames} {team.totalGames === 1 ? "registro" : "registros"}</span>
                <span className={styles.rankingScore}>{team.totalScore}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}