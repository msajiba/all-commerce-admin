import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign up — Admin",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Store Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Sign up to launch your store.
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
