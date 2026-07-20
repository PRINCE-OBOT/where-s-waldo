import type { StoredSession } from "../types";

const keyFor = (caseId: string) => `waldo:session:${caseId}`;

export function loadSession(caseId: string): StoredSession | null {
  try {
    const raw = localStorage.getItem(keyFor(caseId));
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: StoredSession): void {
  localStorage.setItem(keyFor(session.caseId), JSON.stringify(session));
}

export function clearSession(caseId: string): void {
  localStorage.removeItem(keyFor(caseId));
}
