const encoder = new TextEncoder();
const decoder = new TextDecoder();

const DEFAULT_SECRET = "shree_vidhi_super_secret_jwt_key_2026_at_least_32_chars_long";

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET || DEFAULT_SECRET;
}

function base64urlEncode(buf: Uint8Array): string {
  let binary = "";
  const len = buf.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buf[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token using the Web Crypto API
 * Works natively in both Edge Runtime (middleware) and Node.js
 */
export async function createSignedToken<T extends object>(
  data: T,
  expiresInMs = 7 * 24 * 60 * 60 * 1000
): Promise<string> {
  const secret = getAuthSecret();
  const payload = JSON.stringify({
    ...data,
    exp: Date.now() + expiresInMs,
    iat: Date.now(),
  });

  const encodedPayload = base64urlEncode(encoder.encode(payload));
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(encodedPayload)
  );

  const signature = base64urlEncode(new Uint8Array(sigBuffer));
  return `${encodedPayload}.${signature}`;
}

/**
 * Cryptographically verifies the HMAC-SHA256 signature and checks expiry
 * Universal Web Crypto API implementation
 */
export async function verifySignedToken<T extends object>(
  token: string
): Promise<(T & { exp: number; iat: number }) | null> {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const secret = getAuthSecret();

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64urlDecode(signature);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as BufferSource,
      encoder.encode(encodedPayload)
    );

    if (!isValid) {
      return null; // Signature verification failed
    }

    const payloadJson = decoder.decode(base64urlDecode(encodedPayload));
    const parsed = JSON.parse(payloadJson);

    if (parsed.exp && parsed.exp < Date.now()) {
      return null; // Token expired
    }

    return parsed;
  } catch {
    return null;
  }
}
