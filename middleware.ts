import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

/**
 * Lightweight route guard. It only checks for the presence of the session
 * cookie (no token verification — that requires the auth secret and Node
 * `crypto`, which Edge middleware lacks). Real validation happens when the
 * dashboard/setup pages call the Super Admin API; a rejected token sends the
 * user back to sign in.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/setup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname === "/" ||
    PROTECTED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

  if (isProtected && !request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/setup/:path*"],
};
