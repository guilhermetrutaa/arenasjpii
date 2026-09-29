"use client";

import styles from "./cartas.module.css";

export default function PrintButton() {
  return (
    <button type="button" className={styles.printButton} onClick={() => window.print()}>
      Imprimir / Salvar PDF
    </button>
  );
}
