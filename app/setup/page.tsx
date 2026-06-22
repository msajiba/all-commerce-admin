import type { Metadata } from "next";
import { SetupForm } from "@/components/SetupForm";

export const metadata: Metadata = {
  title: "Set up your store — Admin",
};

export default function SetupPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Step 1 of 1
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900">
            Set up your store
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Pick a theme and claim your subdomain.
          </p>
        </div>
        <SetupForm />
      </div>
    </main>
  );
}
