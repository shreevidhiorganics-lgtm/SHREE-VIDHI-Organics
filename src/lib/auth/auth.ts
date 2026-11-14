import { cookies } from "next/headers";
import { UserRole, Address } from "@/types";
import { createSignedToken, verifySignedToken } from "./token";

export const SESSION_COOKIE_NAME = "svo_session_token";

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  address?: Address;
}

// Encodes session data securely into a cryptographically signed HMAC-SHA256 token
export async function createSessionToken(data: SessionData): Promise<string> {
  return createSignedToken(data, 7 * 24 * 60 * 60 * 1000); // 7 days
}

// Parses and cryptographically verifies the session token
export async function parseSessionToken(token: string): Promise<SessionData | null> {
  const verified = await verifySignedToken<SessionData>(token);
  if (!verified) return null;

  return {
    userId: verified.userId,
    email: verified.email,
    name: verified.name,
    phone: verified.phone,
    role: verified.role,
    address: verified.address,
  };
}

export async function getCurrentUser(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie?.value) return null;
  return parseSessionToken(sessionCookie.value);
}

// Constant-time string equality to prevent timing attacks
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<SessionData | null> {
  // Admin authentication - strictly only shreevidhiorganics@gmail.com
  const adminEmail = "shreevidhiorganics@gmail.com";
  const configuredPassword = process.env.ADMIN_PASSWORD || "Admin@ShreeVidhi2026";

  if (email.toLowerCase().trim() !== adminEmail) {
    return null;
  }

  if (constantTimeEqual(password, configuredPassword)) {
    return {
      userId: "usr-admin-1",
      email: "shreevidhiorganics@gmail.com",
      name: "Shree Vidhi Admin",
      role: "ADMIN",
    };
  }

  return null;
}
