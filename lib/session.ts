import { cookies } from "next/headers";

/**
 * The admin app does not own the auth secret — it simply holds the opaque
 * session token issued by the Super Admin API in an httpOnly cookie and
 * forwards it as a bearer token on each API call. Validity is enforced by the
 * API (a 401 means the token is expired/invalid).
 */

export const SESSION_COOKIE = "admin_session";

const MAX_AGE = 7 * 24 * 60 * 60; // seconds

export async function setSession(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}
