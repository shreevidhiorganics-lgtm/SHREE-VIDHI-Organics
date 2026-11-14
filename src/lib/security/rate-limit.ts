interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean expired entries periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      if (record.resetTime < now) {
        rateLimitStore.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * In-memory sliding window rate limiter
 * @param key Unique identifier (e.g. `ip:phone` or `ip:login`)
 * @param maxAttempts Maximum allowed attempts in the time window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || record.resetTime < now) {
    // New or expired window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetInSec: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetInSec: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
  };
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}
