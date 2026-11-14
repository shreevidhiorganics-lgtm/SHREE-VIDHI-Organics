import { NextRequest, NextResponse } from "next/server";
import { verifySignedToken } from "@/lib/auth/token";
import { SessionData } from "@/lib/auth/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get("svo_session_token");

  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifySignedToken<SessionData>(sessionCookie.value);

  if (
    !session ||
    session.role !== "ADMIN" ||
    session.email?.toLowerCase().trim() !== "shreevidhiorganics@gmail.com"
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
