import { randomBytes, scryptSync } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { createSessionToken, verifySessionToken } from "@/lib/auth";
import { safeEqual, verifyPassword } from "@/lib/password";

beforeAll(() => {
  process.env.SESSION_SECRET = "x".repeat(48);
});

describe("session tokens", () => {
  it("round-trips a valid token", async () => {
    const token = await createSessionToken("admin");
    expect((await verifySessionToken(token))?.sub).toBe("admin");
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken("admin");
    const [body, sig] = token.split(".");
    expect(await verifySessionToken(`${body}x.${sig}`)).toBeNull();
    expect(await verifySessionToken(`${body}.${sig.slice(0, -2)}AA`)).toBeNull();
  });

  it("rejects missing tokens", async () => {
    expect(await verifySessionToken(undefined)).toBeNull();
    expect(await verifySessionToken("")).toBeNull();
  });
});

describe("verifyPassword", () => {
  const salt = randomBytes(16);
  const stored = `scrypt:${salt.toString("hex")}:${scryptSync("correct horse battery", salt, 64).toString("hex")}`;

  it("accepts the right password and rejects others", () => {
    expect(verifyPassword("correct horse battery", stored)).toBe(true);
    expect(verifyPassword("wrong", stored)).toBe(false);
    expect(verifyPassword("correct horse battery", undefined)).toBe(false);
    expect(verifyPassword("correct horse battery", "plain:text")).toBe(false);
  });

  it("compares strings safely", () => {
    expect(safeEqual("admin", "admin")).toBe(true);
    expect(safeEqual("admin", "admin2")).toBe(false);
  });
});
