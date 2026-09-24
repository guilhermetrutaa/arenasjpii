import type { Metadata } from "next";
import ForbiddenGame from "./ForbiddenGame";

export const metadata: Metadata = {
  title: "Palavra Proibida | Arena SJPII",
  description: "Jogo de palavras proibidas da Arena SJPII",
};

export default function Page() {
  return <ForbiddenGame />;
}
