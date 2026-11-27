import { NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDatabaseHydrated();
  const products = dataStore.getProducts().filter((p) => p.status === "PUBLISHED");
  return NextResponse.json({ products });
}
