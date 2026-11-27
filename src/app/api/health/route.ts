import { NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { requireAdmin } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "OK";
  let dbLatencyMs = 0;

  try {
    const t0 = Date.now();
    const productCount = dataStore.getProducts().length;
    dbLatencyMs = Date.now() - t0;
    if (productCount === 0) dbStatus = "EMPTY_CATALOG";
  } catch {
    dbStatus = "ERROR";
  }

  const healthStatus = dbStatus === "OK" ? "HEALTHY" : "DEGRADED";
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
    });
  }

  const memoryUsage = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());

  const serviceIntegrations = {
    database: {
      type: process.env.DATABASE_URL?.startsWith("mysql://") ? "Aiven Cloud MySQL" : "Local DataStore",
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    resend: {
      configured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_resend_api_key_here"),
      fromEmail: process.env.EMAIL_FROM || "orders@shreevidhiorganics.com",
    },
    fast2sms: {
      configured: Boolean(process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY !== "your_fast2sms_api_key"),
    },
    shiprocket: {
      configured: Boolean(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD),
    },
    whatsapp: {
      configured: Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
    },
    aiAssistant: {
      model: process.env.GEMINI_API_KEY ? "Gemini 1.5 Flash" : "Ayurvedic Knowledge Engine (Heuristic)",
      status: "ONLINE",
    },
  };

  return NextResponse.json({
    status: dbStatus === "OK" ? "HEALTHY" : "DEGRADED",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}m`,
    responseTimeMs: Date.now() - startTime,
    memory: {
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
    },
    services: serviceIntegrations,
  });
}
