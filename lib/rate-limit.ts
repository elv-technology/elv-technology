import "server-only";

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

// In-memory fallback. On Vercel each serverless instance has its own memory, so this is
// best-effort only — set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN for a shared limit.
const rates = new Map<string, { count: number; resetAt: number }>();
const MAX_TRACKED_KEYS = 5000;

function memoryRateLimit(key: string, options: RateLimitOptions): boolean {
  const now = Date.now();

  if (rates.size > MAX_TRACKED_KEYS) {
    for (const [k, v] of rates) {
      if (v.resetAt <= now) rates.delete(k);
    }
  }

  const rate = rates.get(key);
  if (!rate || rate.resetAt <= now) {
    rates.set(key, { count: 1, resetAt: now + options.windowMs });
    return true;
  }

  rate.count++;
  return rate.count <= options.limit;
}

async function upstashRateLimit(key: string, options: RateLimitOptions): Promise<boolean | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const windowSeconds = Math.ceil(options.windowMs / 1000);
    const bucket = Math.floor(Date.now() / options.windowMs);
    const redisKey = `ratelimit:${key}:${bucket}`;

    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, String(windowSeconds)],
      ]),
      cache: "no-store",
    });
    if (!res.ok) return null;

    const [incr] = (await res.json()) as Array<{ result: number }>;
    return incr.result <= options.limit;
  } catch {
    return null;
  }
}

/**
 * Returns true when the request is allowed, false when the limit is exceeded.
 * `key` should include a purpose prefix, e.g. `contact:${ip}`.
 */
export async function rateLimit(key: string, options: RateLimitOptions): Promise<boolean> {
  const shared = await upstashRateLimit(key, options);
  if (shared !== null) return shared;
  return memoryRateLimit(key, options);
}

export function getIp(req: Request) {
  // On Vercel (and most proxies) the first x-forwarded-for entry is the client address.
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  for (const header of ["x-real-ip", "cf-connecting-ip"]) {
    const value = req.headers.get(header)?.trim();
    if (value) return value;
  }
  return "unknown";
}
