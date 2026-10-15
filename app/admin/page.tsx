import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "Painel de Controle | Arena SJPII",
  description: "Comando em tempo real dos jogos da Arena SJPII",
};

export default function Page() {
  return <AdminPanel />;
}