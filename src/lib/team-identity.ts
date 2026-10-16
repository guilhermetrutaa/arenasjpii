import { createHash } from "node:crypto";

export const RANKING_EVENT_ID = "arena-10-days";

export const TEAM_NAME_MIN = 2;
export const TEAM_NAME_MAX = 80;

export function normalizeTeamName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isValidNormalizedTeamName(normalizedName: string) {
  return normalizedName.length >= TEAM_NAME_MIN && normalizedName.length <= TEAM_NAME_MAX;
}

/**
 * Deterministic document id: the same normalized name always addresses the same
 * team, which is what keeps a name from creating duplicates. Shared by the QR
 * submission route and the admin panel.
 */
export function teamId(normalizedName: string) {
  return createHash("sha256").update(normalizedName).digest("hex");
}