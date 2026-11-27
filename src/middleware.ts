import { NextRequest, NextResponse } from "next/server";
import { verifySignedToken } from "@/lib/auth/token";
import { SessionData } from "@/lib/auth/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/account/:path*", "/checkout/:path*"],
};

export async function middleware(request: NextRequest) {
  // Defense-in-depth against CVE-2025-29927 x-middleware-subrequest header spoofing
  if (request.headers.has("x-middleware-subrequest")) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { pathname, search } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/admin");
  const isCustomerProtectedRoute =
    pathname.startsWith("/account") || pathname.startsWith("/checkout");
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

  if (!session) {
    return handleUnauthorized();
  }

  // Account & Checkout routes allow any authenticated customer or admin
  if (isCustomerProtectedRoute) {
    return NextResponse.next();
  }

  // OWASP A01: Broken Access Control & Privilege Escalation Defense
  if (
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
