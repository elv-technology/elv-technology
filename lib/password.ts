// Node-only password verification (scrypt). Do not import from middleware.
import { scryptSync, timingSafeEqual } from "crypto";

/**
 * Verifies a password against a hash in the format `scrypt:<saltHex>:<hashHex>`.
 * Generate one with: node scripts/hash-password.mjs "<password>"
 */
export function verifyPassword(password: string, stored: string | undefined): boolean {
    if (!stored) return false;
    const [scheme, saltHex, hashHex] = stored.split(":");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function safeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}
