import { NextResponse } from "next/server";
import { getCuratedBundles } from "@/lib/retention/bundles";

export async function GET() {
  const bundles = getCuratedBundles();
  return NextResponse.json({ bundles });
}
