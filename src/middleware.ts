import { NextRequest, NextResponse } from "next/server";
import { verifySignedToken } from "@/lib/auth/token";
import { SessionData } from "@/lib/auth/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/admin");
  const sessionCookie = request.cookies.get("svo_session_token");

  // Helper for unauthorized responses
  const handleUnauthorized = () => {
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Unauthorized. Admin privileges required." },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  };

  if (!sessionCookie?.value) {
    return handleUnauthorized();
  }

  const session = await verifySignedToken<SessionData>(sessionCookie.value);

  // OWASP A01: Broken Access Control & Privilege Escalation Defense
  if (
    !session ||
    session.role !== "ADMIN" ||
    session.email?.toLowerCase().trim() !== "shreevidhiorganics@gmail.com"
  ) {
    console.warn(`[SECURITY] Blocked unauthorized attempt on ${pathname} by: ${session?.email || "anonymous"}`);
    return handleUnauthorized();
  }

  const response = NextResponse.next();

  // Add security headers on passing responses
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}
