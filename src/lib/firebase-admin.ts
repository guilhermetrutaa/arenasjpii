import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminDatabase() {
  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = privateKeyBase64
    ? Buffer.from(privateKeyBase64, "base64").toString("utf8")
    : rawPrivateKey?.includes("-----BEGIN")
      ? rawPrivateKey.replace(/\\n/g, "\n")
      : rawPrivateKey
        ? Buffer.from(rawPrivateKey, "base64").toString("utf8")
        : undefined;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin não configurado");
  }

  const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return getFirestore(app);
}
