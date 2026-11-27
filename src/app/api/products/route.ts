import { NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = dataStore.getProducts().filter((p) => p.status === "PUBLISHED");
  return NextResponse.json({ products });
}
