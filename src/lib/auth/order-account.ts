import { NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { createSessionToken, SessionData } from "@/lib/auth/auth";
import { Address } from "@/types";

/**
 * Ensures a customer account exists for an order and issues a session cookie
 * when a new customer checks out without being signed in.
 */
export async function resolveOrderCustomer(params: {
  currentUser: SessionData | null;
  guestEmail?: string;
  guestPhone?: string;
  shippingAddress: Address;
}): Promise<{ userId?: string; sessionToken?: string }> {
  const { currentUser, guestEmail, guestPhone, shippingAddress } = params;

  if (currentUser) {
    return { userId: currentUser.userId };
  }

  const rawPhone = guestPhone?.trim() || shippingAddress.phone || "";
  const cleanPhone = rawPhone.replace(/\D/g, "").slice(-10);
  const rawEmail = (guestEmail || "").trim().toLowerCase();

  // Never auto-register or auto-login with the reserved admin email
  if (!cleanPhone || cleanPhone.length !== 10 || rawEmail === "shreevidhiorganics@gmail.com") {
    return {};
  }

  const existingByPhone = dataStore.getUserByPhone(cleanPhone);
  if (existingByPhone) {
    // Link the order to the existing customer without bypassing OTP login for prior orders
    return { userId: existingByPhone.id };
  }

  const fallbackEmail = rawEmail || `customer.${cleanPhone}@shreevidhiorganics.com`;
  try {
    const newUser = dataStore.registerCustomer({
      name: shippingAddress.fullName || "Customer",
      email: fallbackEmail,
      phone: cleanPhone,
      address: {
        houseFlat: shippingAddress.houseFlat || "",
        street: shippingAddress.street || "",
        landmark: shippingAddress.landmark || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "Uttar Pradesh",
        pinCode: shippingAddress.pinCode || "",
      },
    });

    const sessionToken = await createSessionToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      address: newUser.address,
    });

    return { userId: newUser.id, sessionToken };
  } catch {
    return {};
  }
}

export function attachSessionCookie(response: NextResponse, token?: string) {
  if (!token) return;
  response.cookies.set({
    name: "svo_session_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}
