import type { Metadata } from "next";
import { CATEGORY_LABELS, DATA, type ForbiddenCard } from "@/src/data/forbidden-cards";
import PrintButton from "./PrintButton";
import styles from "./cartas.module.css";

export const metadata: Metadata = {
  title: "Cartas | Palavra Proibida | Arena SJPII",
  description: "Cartas do jogo Palavra Proibida para impressão",
};

const CARDS_PER_SHEET = 9;
const CATEGORY_ORDER: ForbiddenCard["category"][] = ["saint", "priest", "object", "church"];

type Sheet = { category: ForbiddenCard["category"]; cards: ForbiddenCard[]; part: number; parts: number };

function buildSheets(): Sheet[] {
  return CATEGORY_ORDER.flatMap((category) => {
    const cards = DATA.filter((card) => card.category === category);
    const parts = Math.ceil(cards.length / CARDS_PER_SHEET);
    return Array.from({ length: parts }, (_, index) => ({
      category,
      cards: cards.slice(index * CARDS_PER_SHEET, (index + 1) * CARDS_PER_SHEET),
      part: index + 1,
      parts,
    }));
  });
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.brandCompact : styles.brand}>
      <img src="/brasao-sjpii.svg" alt="Brasão de São João Paulo II" />
      <img src="/logo.svg" alt="Arena SJPII" />
      <img src="/brasao-diocese.svg" alt="Brasão da Diocese" />
    </div>
  );
}

function Card({ card }: { card: ForbiddenCard }) {
  const long = card.saint.length > 24;
  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <span className={styles.cardCategory}>{CATEGORY_LABELS[card.category]}</span>
        <h3 className={long ? styles.cardWordLong : styles.cardWord}>{card.saint}</h3>
      </header>
      <div className={styles.cardBody}>
        <p className={styles.cardLabel}>Não pode falar</p>
        <ul className={styles.forbiddenList}>
          {card.forbidden.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
      <footer className={styles.cardFoot}>
        <Brand compact />
      </footer>
    </article>
  );
}

export default function Page() {
  const sheets = buildSheets();
  const totalPages = sheets.length + 1;

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <p>
          {DATA.length} cartas em {totalPages} páginas A4. Use <strong>Imprimir → Salvar como PDF</strong> com margens
          &quot;Nenhuma&quot; e &quot;Gráficos de plano de fundo&quot; ativado.
        </p>
        <PrintButton />
      </div>

      <section className={`${styles.sheet} ${styles.cover}`}>
        <Brand />
        <img className={styles.coverArt} src="/palavra-proibida.svg" alt="Jogo Palavra Proibida" />
        <h1 className={styles.coverTitle}>PALAVRA PROIBIDA</h1>
        <p className={styles.coverSubtitle}>Arena SJPII · Paróquia São João Paulo II · Campina Grande</p>

        <div className={styles.coverColumns}>
          <div className={styles.coverBox}>
            <h2>Como jogar</h2>
            <ol className={styles.rulesList}>
              <li>Joga-se em dupla: um jogador fica vendado e o outro fica com o microfone.</li>
              <li>Quem está com o microfone dá dicas sobre a palavra principal da carta.</li>
              <li>As cinco palavras da lista &quot;Não pode falar&quot; são proibidas nas dicas.</li>
              <li>Falou uma palavra proibida? A carta é perdida e passa para a próxima.</li>
              <li>Acertem o máximo de cartas em 1 minuto e 30 segundos.</li>
            </ol>
          </div>
          <div className={styles.coverBox}>
            <h2>Cartas do jogo</h2>
            <ul className={styles.countList}>
              {CATEGORY_ORDER.map((category) => (
                <li key={category}>
                  <span>{CATEGORY_LABELS[category]}</span>
                  <strong>{DATA.filter((card) => card.category === category).length}</strong>
                </li>
              ))}
              <li className={styles.countTotal}>
                <span>Total</span>
                <strong>{DATA.length}</strong>
              </li>
            </ul>
          </div>
        </div>
        <p className={styles.pageNumber}>1 / {totalPages}</p>
      </section>

      {sheets.map((sheet, index) => (
        <section key={`${sheet.category}-${sheet.part}`} className={styles.sheet}>
          <header className={styles.sheetHead}>
            <img src="/logo.svg" alt="Arena SJPII" />
            <div>
              <p>Palavra Proibida</p>
              <h2>
                {CATEGORY_LABELS[sheet.category]}
                {sheet.parts > 1 ? <span> · {sheet.part}/{sheet.parts}</span> : null}
              </h2>
            </div>
          </header>
          <div className={styles.grid}>
            {sheet.cards.map((card) => (
              <Card key={card.saint} card={card} />
            ))}
          </div>
          <p className={styles.pageNumber}>{index + 2} / {totalPages}</p>
        </section>
      ))}
    </main>
  );
}
