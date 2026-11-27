import { NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ settings: dataStore.getSettings() });
}
