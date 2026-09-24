"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPublicRanking, type PublicTeam } from "@/src/lib/firebase-client";
import styles from "./ranking.module.css";

export default function RankingClient() {
  const params = useSearchParams();
  const token = params.get("token");
  const [teams, setTeams] = useState<PublicTeam[]>([]);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void getPublicRanking().then(setTeams).catch(() => undefined);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/ranking/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, teamName }) });
      const data = (await response.json()) as { error?: string; name?: string };
      if (!response.ok) throw new Error(data.error ?? "Não foi possível registrar");
      setMessage(`Pontuação registrada para ${data.name}.`);
      setTeams(await getPublicRanking());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível registrar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <img className={styles.logo} src="/logo.svg" alt="Arena SJPII" />
        <h1>RANKING</h1>

        {token ? <div className={styles.pending}><h2>Registrar resultado</h2><form className={styles.form} onSubmit={submit}><input className={styles.input} value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Nome da dupla" required minLength={2} maxLength={80} /><button className={styles.button} type="submit" disabled={submitting}>{submitting ? "Registrando..." : "Registrar pontuação"}</button></form>{message && <p className={message.startsWith("Pontuação") ? styles.success : styles.error} aria-live="polite">{message}</p>}</div> : null}

        <h2>Classificação</h2>
        {teams.length === 0 ? <div className={styles.empty}>O ranking ainda não possui equipes cadastradas.</div> : <ol className={styles.list}>{teams.map((team, index) => <li className={styles.item} key={team.id}><span className={styles.position}>{index + 1}</span><span className={styles.name}>{team.name}</span><span className={styles.score}>{team.totalScore}</span></li>)}</ol>}
      </section>
    </main>
  );
}
