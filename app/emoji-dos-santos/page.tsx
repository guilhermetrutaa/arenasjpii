import type { Metadata } from "next";
import EmojiGame from "./EmojiGame";

export const metadata: Metadata = {
  title: "Emojis dos Santos | Arena SJPII",
  description: "Jogo de emojis dos santos da Arena SJPII",
};

export default function Page() {
  return <EmojiGame />;
}
