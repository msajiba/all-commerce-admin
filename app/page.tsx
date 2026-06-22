import { redirect } from "next/navigation";

export default function Home() {
  // Middleware redirects unauthenticated visitors to /signin before this runs.
  redirect("/dashboard");
}
