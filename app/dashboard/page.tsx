import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchMe } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { ThemeForm } from "@/components/ThemeForm";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
};

const FRONTEND_DOMAIN =
  process.env.NEXT_PUBLIC_FRONTEND_DOMAIN ?? "localhost:5000";
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

export default async function DashboardPage() {
  const token = await getSessionToken();
  if (!token) redirect("/signin");

  const result = await fetchMe(token);
  if (!result.ok) {
    // Token rejected/expired or API unreachable — send back to sign in.
    redirect("/signin");
  }

  const { user, stores } = result.data;

  // A brand-new account hasn't finished setup yet.
  if (stores.length === 0) redirect("/setup");

  return (
    <div>
      <section className="mx-auto max-w-4xl">
        <p className="text-sm text-zinc-600">
          Signed in as{" "}
          <span className="font-medium text-zinc-900">{user.name}</span> (
          {user.email})
        </p>

        <div className="mt-5 grid gap-5">
          {stores.map((store) => {
            const url = `${protocol}://${store.subdomain}.${FRONTEND_DOMAIN}`;
            return (
              <div
                key={store.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">
                      {store.name}
                    </h2>
                    <span
                      className="mt-1 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${store.settings.primaryColor}1a`,
                        color: store.settings.primaryColor,
                      }}
                    >
                      {store.theme}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-zinc-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Your website
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {store.subdomain}.{FRONTEND_DOMAIN}
                  </a>
                  <p className="mt-1 text-xs text-zinc-500">
                    Click to open your live storefront in a new tab.
                  </p>
                </div>

                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <ThemeForm
                    subdomain={store.subdomain}
                    currentTheme={store.theme}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
