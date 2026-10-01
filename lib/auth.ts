// Edge-compatible session helpers (Web Crypto only) — used by middleware and route handlers.
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

interface SessionPayload {
    sub: string;
    exp: number; // unix seconds
}

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

async function getKey(): Promise<CryptoKey | null> {
    const secret = process.env.SESSION_SECRET;
    // Fail closed: without a strong secret no session is ever valid.
    if (!secret || secret.length < 32) return null;
    return crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );
}

export async function createSessionToken(subject: string): Promise<string> {
    const key = await getKey();
    if (!key) throw new Error("SESSION_SECRET is missing or shorter than 32 characters");

    const payload: SessionPayload = {
        sub: subject,
        exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    };
    const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(body)));
    return `${body}.${base64UrlEncode(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
    if (!token) return null;
    const [body, signature] = token.split(".");
    if (!body || !signature) return null;

    const key = await getKey();
    if (!key) return null;

    try {
        const valid = await crypto.subtle.verify(
            "HMAC",
            key,
            base64UrlDecode(signature),
            encoder.encode(body)
        );
        if (!valid) return null;

        const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(body))) as SessionPayload;
        if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
        return payload;
    } catch {
        return null;
    }
}

function readCookie(req: Request, name: string): string | undefined {
    const header = req.headers.get("cookie");
    if (!header) return undefined;
    for (const part of header.split(";")) {
        const [k, ...v] = part.trim().split("=");
        if (k === name) return decodeURIComponent(v.join("="));
    }
    return undefined;
}

export async function isAdminRequest(req: Request): Promise<boolean> {
    return !!(await verifySessionToken(readCookie(req, SESSION_COOKIE)));
}

/**
 * Defence in depth for admin route handlers (middleware already checks).
 * Returns a 401 response when the caller is not an authenticated admin, otherwise null.
 */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
    if (await isAdminRequest(req)) return null;
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        maxAge,
        path: "/",
    };
}
