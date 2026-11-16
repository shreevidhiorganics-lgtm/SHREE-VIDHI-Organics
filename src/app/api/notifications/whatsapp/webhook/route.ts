import { NextRequest, NextResponse } from "next/server";

/**
 * Meta WhatsApp Cloud API Webhook Verification & Event Ingestion
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "shree_vidhi_wa_verify_2026";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("[WhatsApp:Webhook] Webhook verified successfully with Meta.");
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[WhatsApp:Webhook] Inbound event received:", JSON.stringify(body).slice(0, 300));

    // Handle status updates (delivered, read) or customer support inbound messages
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0]?.value;

    if (changes?.statuses) {
      const status = changes.statuses[0];
      console.log(`[WhatsApp:Webhook] Message ${status.id} status updated to: ${status.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[WhatsApp:Webhook] Processing error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
