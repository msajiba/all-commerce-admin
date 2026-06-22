"use client";

import { useActionState, useState } from "react";
import { createStoreAction, type SetupState } from "@/app/actions";
import { THEME_OPTIONS } from "@/lib/themes";

const initialState: SetupState = {};

const FRONTEND_DOMAIN =
  process.env.NEXT_PUBLIC_FRONTEND_DOMAIN ?? "localhost:5000";

export function SetupForm() {
  const [state, formAction, pending] = useActionState(
    createStoreAction,
    initialState,
  );
  const [theme, setTheme] = useState<string>(THEME_OPTIONS[0].id);
  const [subdomain, setSubdomain] = useState("");

  // Mirror the server-side sanitization so the preview matches what gets saved.
  const preview = subdomain
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium text-zinc-700">
          Choose a theme
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
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
                  className="block h-10 w-full rounded-lg"
                  style={{ backgroundColor: option.primaryColor }}
                />
                <span className="mt-3 block text-sm font-semibold text-zinc-900">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-zinc-700">Subdomain</span>
        <input
          type="text"
          name="subdomain"
          required
          value={subdomain}
          onChange={(event) => setSubdomain(event.target.value)}
          placeholder="store-1"
          autoCapitalize="none"
          spellCheck={false}
          className="rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
        />
        <span className="text-xs text-zinc-500">
          Your store will be available at{" "}
          <span className="font-medium text-zinc-700">
            {preview || "store-1"}.{FRONTEND_DOMAIN}
          </span>
        </span>
      </label>

      {state.error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {pending ? "Creating store…" : "Create store"}
      </button>
    </form>
  );
}
