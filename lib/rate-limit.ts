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
  // Vercel sets x-real-ip itself; x-forwarded-for's first entry can be supplied by the client.
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}
