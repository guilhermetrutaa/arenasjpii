"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";

export default function Home() {
  const router = useRouter();
  useAirMouseControls({
    onChooseForbidden: () => router.push("/palavra-proibida"),
    onChooseEmoji: () => router.push("/emoji-dos-santos"),
  });

  return (
    <main className="arena-page">
      <section className="arena-canvas" aria-label="Arena SJPII">
        <img className="saint-image" src="/SJPII.svg" alt="São João Paulo II" />

        <header className="arena-header">
          <img className="sjpii-crest" src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" />
          <img className="arena-logo" src="/logo.svg" alt="Arena SJPII" />
          <img className="diocese-crest" src="/brasao-diocese.svg" alt="Brasão da Diocese" />
        </header>

        <section className="games" aria-label="Jogos disponíveis">
          <Link className="game-card" href="/palavra-proibida" aria-label="Abrir jogo Palavra Proibida">
            <img src="/palavra-proibida.svg" alt="Jogo Palavra Proibida" />
            <h2>Palavra Proibida</h2>
          </Link>
          <Link className="game-card" href="/emoji-dos-santos" aria-label="Abrir jogo Emojis dos Santos">
            <img src="/emoji-dos-santos.svg" alt="Jogo Emoji dos Santos" />
            <h2>Emoji dos Santos</h2>
          </Link>
        </section>
      </section>
    </main>
  );
}
