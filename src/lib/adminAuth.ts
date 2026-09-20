/**
 * Admin session helpers — stored in sessionStorage as a JSON object with an
 * expiry timestamp so stale sessions are automatically rejected.
 *
 * SESSION_TTL: how long a login stays valid (default 4 hours).
 * Navigating away and coming back within the TTL keeps the session alive.
 * After TTL, the guard redirects to /admin/login automatically.
 */

export const SESSION_KEY = "sn_admin_session";
export const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

interface SessionData {
  auth: true;
  at: number; // epoch ms when the session was created
}

/** Persist a fresh session (called after successful login). */
export function setSession(): void {
  if (typeof window === "undefined") return;
  const data: SessionData = { auth: true, at: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

/** Return true if a valid, non-expired session exists. */
export function isSessionValid(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const data: SessionData = JSON.parse(raw);
    return data.auth === true && Date.now() - data.at < SESSION_TTL_MS;
  } catch {
    return false;
  }
}

/** Clear the session (called on logout or expiry). */
export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  // Also clear the old key in case it exists from a previous implementation
  sessionStorage.removeItem("sn_admin_auth");
}
