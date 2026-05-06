import { NextResponse } from "next/server";

const rates = new Map<string, { count: number; lastReset: number }>();

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export function rateLimit(ip: string, options: RateLimitOptions) {
  const now = Date.now();
  const rate = rates.get(ip) || { count: 0, lastReset: now };

  if (now - rate.lastReset > options.windowMs) {
    rate.count = 0;
    rate.lastReset = now;
  }

  rate.count++;
  rates.set(ip, rate);

  return rate.count <= options.limit;
}

export function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";
  return ip;
}
