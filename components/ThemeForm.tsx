"use client";

import { useActionState, useState } from "react";
import { updateThemeAction, type UpdateThemeState } from "@/app/actions";
import { THEME_OPTIONS } from "@/lib/themes";

const initialState: UpdateThemeState = {};

export function ThemeForm({
  subdomain,
  currentTheme,
}: {
  subdomain: string;
  currentTheme: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateThemeAction,
    initialState,
  );
  const [theme, setTheme] = useState<string>(currentTheme);

  return (
    <form action={formAction} className="mt-5">
      <input type="hidden" name="subdomain" value={subdomain} />

      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        Theme
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map((option) => {
          const selected = theme === option.id;
          return (
            <label
              key={option.id}
              className={`cursor-pointer rounded-xl border p-4 transition ${
                selected
                  ? "border-zinc-900 ring-2 ring-zinc-900/10"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={option.id}
                checked={selected}
                onChange={() => setTheme(option.id)}
                className="sr-only"
              />
              <span
                className="block h-8 w-full rounded-lg"
                style={{ backgroundColor: option.primaryColor }}
              />
              <span className="mt-2 block text-sm font-semibold text-zinc-900">
                {option.label}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                {option.description}
              </span>
            </label>
          );
        })}
      </div>

      {state.error ? (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : state.success ? (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Theme updated.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || theme === currentTheme}
        className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save theme"}
      </button>
    </form>
  );
}
