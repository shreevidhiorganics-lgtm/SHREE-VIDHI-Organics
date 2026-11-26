export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  context?: Record<string, any>;
  error?: string;
  stack?: string;
}

export function logEvent(
  level: LogLevel,
  service: string,
  message: string,
  context?: Record<string, any>,
  err?: Error | any
) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
    context,
    error: err ? err.message || String(err) : undefined,
    stack: err?.stack,
  };

  const output = `[${entry.timestamp}] [${level.toUpperCase()}] [${service}]: ${message}`;

  if (level === "error") {
    console.error(output, context || "", err || "");
  } else if (level === "warn") {
    console.warn(output, context || "");
  } else {
    console.log(output, context || "");
  }

  return entry;
}

export function logPaymentFailure(gateway: "RAZORPAY", orderId: string, error: string, details?: any) {
  return logEvent("error", `PaymentGateway:${gateway}`, `Payment failed for order ${orderId}`, {
    orderId,
    gateway,
    error,
    details,
  });
}
