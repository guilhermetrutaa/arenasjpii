import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function adminCredentials() {
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

  return { projectId, clientEmail, privateKey };
}

export function getAdminDatabase() {
  const credentials = adminCredentials();
  const app = getApps()[0] ?? initializeApp({ credential: cert(credentials) });
  return getFirestore(app);
}

/**
 * Cheap configuration check for the admin panel. It does not touch Firestore, so
 * it answers "are the variables present?" and not "is the key still valid?" —
 * a revoked key looks identical here. Callers must treat a successful write as
 * the only proof that the credentials actually work.
 */
export function getAdminConfiguration() {
  try {
    const { projectId, clientEmail } = adminCredentials();
    return { configured: true as const, projectId, clientEmail };
  } catch {
    return { configured: false as const, projectId: null, clientEmail: null };
  }
}

const CREDENTIAL_ERROR_CODES = new Set([16, 7]);

/**
 * A service account key that was deleted or rotated still parses as a valid
 * PEM, so the failure only surfaces when Firestore rejects the signed JWT with
 * `UNAUTHENTICATED` / "Invalid JWT Signature". That is an environment problem,
 * not a bug in the request, and must not be reported as a generic failure.
 */
export function isAdminCredentialError(error: unknown) {
  if (error instanceof Error && error.message === "Firebase Admin não configurado") return true;
  const code = typeof error === "object" && error !== null && "code" in error ? Number((error as { code: unknown }).code) : NaN;
  if (CREDENTIAL_ERROR_CODES.has(code)) return true;
  const message = error instanceof Error ? error.message : String(error);
  return /invalid authentication credentials|invalid jwt signature|invalid_grant|credential/i.test(message);
}

export function describeAdminWriteFailure(error: unknown) {
  if (isAdminCredentialError(error)) {
    return "Credenciais do Firebase Admin ausentes ou revogadas no servidor.";
  }
  return "Não foi possível gravar no ranking.";
}