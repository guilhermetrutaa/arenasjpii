import { getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, orderBy, query, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let database: Firestore | null = null;

export function getPublicDatabase(): Firestore | null {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) return null;
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  database ??= getFirestore(app);
  return database;
}

export type PublicTeam = {
  id: string;
  name: string;
  totalScore: number;
  totalGames: number;
};

export async function getPublicRanking(): Promise<PublicTeam[]> {
  const db = getPublicDatabase();
  if (!db) return [];
  const snapshot = await getDocs(query(collection(db, "teams"), orderBy("totalScore", "desc"), limit(100)));
  return snapshot.docs.map((document) => {
    const data = document.data();
    return {
      id: document.id,
      name: String(data.name ?? "Equipe"),
      totalScore: Number(data.totalScore ?? 0),
      totalGames: Number(data.totalGames ?? 0),
    };
  });
}
