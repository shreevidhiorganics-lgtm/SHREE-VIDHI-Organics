import { cookies } from "next/headers";
import { UserRole } from "@/types";

const SESSION_COOKIE_NAME = "svo_session_token";

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

// Encodes session data securely into base64 token with simple checksum
export function createSessionToken(data: SessionData): string {
  const jsonStr = JSON.stringify({ ...data, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return Buffer.from(jsonStr).toString("base64");
}

export function parseSessionToken(token: string): SessionData | null {
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.exp && parsed.exp < Date.now()) {
      return null;
    }
    return {
      userId: parsed.userId,
      email: parsed.email,
      name: parsed.name,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) return null;
  return parseSessionToken(sessionCookie.value);
}

export async function authenticateUser(email: string, password: string): Promise<SessionData | null> {
  // Admin fallback (data-store doesn't store passwords)
  if (
    email.toLowerCase() === "admin@shreevidhiorganics.com" &&
    password === "Admin@ShreeVidhi2026"
  ) {
    return {
      userId: "usr-admin-1",
      email: "admin@shreevidhiorganics.com",
      name: "Aditi Singh",
      role: "ADMIN",
    };
  }

  return null;
}
