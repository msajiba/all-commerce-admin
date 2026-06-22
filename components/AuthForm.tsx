"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAction, signUpAction, type AuthState } from "@/app/actions";

const initialState: AuthState = {};

const inputClass =
  "rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const [state, formAction, pending] = useActionState(
    isSignup ? signUpAction : signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {isSignup ? (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-zinc-700">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Merchant"
            className={inputClass}
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-zinc-700">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-zinc-700">Password</span>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          placeholder="••••••••"
          className={inputClass}
        />
      </label>

      {state.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {pending
          ? isSignup
            ? "Creating account…"
            : "Signing in…"
          : isSignup
            ? "Create account"
            : "Sign in"}
      </button>

      <p className="text-center text-sm text-zinc-500">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-zinc-900 hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/signup" className="font-medium text-zinc-900 hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
