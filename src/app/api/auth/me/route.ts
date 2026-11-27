import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    await ensureDatabaseHydrated();

    const fullUser = dataStore.getUserById(session.userId);

    // OWASP A02: Information Exposure Defense - Return strictly safe user profile attributes
    const safeUser = {
      id: fullUser?.id || session.userId,
      name: fullUser?.name || session.name,
      email: fullUser?.email || session.email,
      role: fullUser?.role || session.role,
      phone: fullUser?.phone || session.phone,
      address: fullUser?.address || session.address,
    };

    return NextResponse.json({
      authenticated: true,
      user: safeUser,
    });
  } catch (_error: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}

