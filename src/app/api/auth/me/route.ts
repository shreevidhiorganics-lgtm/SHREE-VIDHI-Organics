import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const fullUser = dataStore.getUserById(session.userId);

    return NextResponse.json({
      authenticated: true,
      user: fullUser || session,
    });
  } catch (_error: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}

