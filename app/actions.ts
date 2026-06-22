"use server";

import { redirect } from "next/navigation";
import * as api from "@/lib/api";
import { clearSession, getSessionToken, setSession } from "@/lib/session";

export type AuthState = { error?: string };
export type SetupState = { error?: string };

export async function signUpAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  const result = await api.signUp({ name, email, password });
  if (!result.ok) return { error: result.error };

  await setSession(result.data.token);
  redirect("/setup");
}

export async function signInAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const result = await api.signIn({ email, password });
  if (!result.ok) return { error: result.error };

  await setSession(result.data.token);
  redirect("/dashboard");
}

export async function createStoreAction(
  _prevState: SetupState,
  formData: FormData,
): Promise<SetupState> {
  const token = await getSessionToken();
  if (!token) redirect("/signin");

  const theme = String(formData.get("theme") ?? "");
  const subdomain = String(formData.get("subdomain") ?? "").trim();

  if (!theme) return { error: "Please select a theme." };
  if (!subdomain) return { error: "Please enter a subdomain." };

  const result = await api.createStore(token, { subdomain, theme });
  if (!result.ok) {
    if (result.status === 401) {
      await clearSession();
      redirect("/signin");
    }
    return { error: result.error };
  }

  redirect("/dashboard");
}

export async function signOutAction(): Promise<void> {
  await clearSession();
  redirect("/signin");
}
