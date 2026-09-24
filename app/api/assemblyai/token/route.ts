import { NextResponse } from "next/server";

export async function POST() {
  const key = process.env.ASSEMBLYAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Reconhecimento de voz não configurado" }, { status: 503 });

  const url = new URL("https://streaming.assemblyai.com/v3/token");
  url.searchParams.set("expires_in_seconds", "60");
  const response = await fetch(url, { headers: { Authorization: key }, cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (!response.ok) return NextResponse.json({ error: "Serviço de voz indisponível" }, { status: 503 });
  const data = (await response.json()) as { token?: string };
  if (!data.token) return NextResponse.json({ error: "Token de voz inválido" }, { status: 503 });
  return NextResponse.json({ token: data.token }, { headers: { "Cache-Control": "no-store" } });
}
