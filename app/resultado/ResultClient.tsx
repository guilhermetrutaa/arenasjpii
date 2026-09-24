"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import styles from "@/app/game-runtime.module.css";

type Result = {
  game: "palavra-proibida" | "emoji-dos-santos";
  score: number;
  hits: number;
  skips: number;
  faults: number;
  total: number;
};

type TokenPayload = Result & { resultId: string; createdAt: number; expiresAt: number };

function decodeToken(token: string): TokenPayload | null {
  try {
    const encoded = token.split(".")[0].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(encoded)) as TokenPayload;
  } catch {
    return null;
  }
}

export default function ResultClient() {
  const params = useSearchParams();
  const token = params.get("token");
  const [result, setResult] = useState<Result | null>(token ? decodeToken(token) : null);
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (!token) {
      const stored = window.sessionStorage.getItem("arena:last-result");
      if (stored) window.setTimeout(() => setResult(JSON.parse(stored) as Result), 0);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arenasjpii.vercel.app";
    const url = `${siteUrl.replace(/\/$/, "")}/ranking?token=${encodeURIComponent(token)}`;
    void QRCode.toDataURL(url, { width: 280, margin: 2, color: { dark: "#14345d", light: "#ffffff" } }).then(setQrCode);
  }, [token]);

  if (!result) {
    return <main className={`${styles.gamePage} ${styles.resultPage}`}><section className={styles.gameCanvas}><h1 className={styles.gameTitle}>Resultado indisponível</h1><p className={styles.speechStatus}>Finalize uma partida para gerar o resultado.</p></section></main>;
  }

  const gameName = result.game === "palavra-proibida" ? "Palavra Proibida" : "Emojis dos Santos";
  return (
    <main className={`${styles.gamePage} ${styles.resultPage}`}>
      <section className={styles.gameCanvas}>
        <header className={styles.gameHeader}><img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" /><img src="/logo.svg" alt="Arena SJPII" /><img src="/brasao-diocese.svg" alt="Brasão da Diocese" /></header>
        <h1 className={styles.gameTitle}>FIM DE JOGO</h1>
        <div className={styles.resultGrid}>
          <div className={styles.resultSummary}>
            <div className={styles.prompt}><strong>{gameName}</strong><span>Compartilhe o resultado com sua equipe</span></div>
            <div className={styles.stats}>
              <section className={`${styles.stat} ${styles.score}`}><h2>ACERTOS</h2><p>{result.hits}</p></section>
              <section className={`${styles.stat} ${styles.time}`}><h2>ERROS</h2><p>{result.faults}</p></section>
            </div>
          </div>
          <div className={styles.resultQr}>
            {qrCode ? <img src={qrCode} alt="QR Code para registrar o resultado" width={220} height={220} /> : <p className={styles.speechStatus}>Configure as variáveis de ranking para gerar o QR Code.</p>}
            <p>Use o QR Code para registrar a pontuação da equipe.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
