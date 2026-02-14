import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Temporary middleware: serves the /usd1 landing page for ALL routes.
 * Remove this file when the edu site is ready to launch.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let /usd1 and static assets through unchanged
  if (
    pathname === "/usd1" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/icon.svg" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Rewrite everything else to the landing page (URL stays clean)
  return NextResponse.rewrite(new URL("/usd1", request.url));
}

export const config = {
  matcher: ["/((?!_next|images|icon\\.svg|favicon\\.ico).*)"],
};
