import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { dataStore } from "@/lib/db/data-store";
import "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({ products: dataStore.getProducts() });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body?.name) {
      return NextResponse.json({ error: "Product name is required." }, { status: 400 });
    }

    const created = dataStore.createProduct(body);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create product." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Product id is required." }, { status: 400 });
    }

    const updated = dataStore.updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated, products: dataStore.getProducts() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product id is required." }, { status: 400 });
    }

    const deleted = dataStore.deleteProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, products: dataStore.getProducts() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to delete product." }, { status: 500 });
  }
}
