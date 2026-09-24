import { Suspense } from "react";
import RankingClient from "./RankingClient";

export default function Page() {
  return <Suspense fallback={null}><RankingClient /></Suspense>;
}
