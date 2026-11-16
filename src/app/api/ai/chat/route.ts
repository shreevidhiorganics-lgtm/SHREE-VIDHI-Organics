import { NextRequest, NextResponse } from "next/server";
import { getAIAssistantResponse } from "@/lib/ai/assistant";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

    // OWASP A04: DoS & Cost Attack Defense - Rate limit AI queries (20 requests per 5 mins per IP)
    const rateLimit = checkRateLimit(`ai_chat:${clientIp}`, 20, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many AI assistant requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const query = body.query?.trim();
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    if (!query) {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query is too long. Please keep your question under 500 characters." },
        { status: 400 }
      );
    }

    const response = await getAIAssistantResponse(history, query);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("[API:AI:Chat] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate Ayurvedic assistant response." },
      { status: 500 }
    );
  }
}
