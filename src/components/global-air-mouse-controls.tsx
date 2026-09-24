"use client";

import { useRouter } from "next/navigation";
import { useAirMouseControls } from "@/src/hooks/use-air-mouse-controls";

export function GlobalAirMouseControls() {
  const router = useRouter();
  useAirMouseControls({ onHome: () => router.push("/") });
  return null;
}
