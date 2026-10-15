import { describe, expect, it } from "vitest";
import { escapeHtml, toHeaderSafe } from "@/lib/escape-html";
import { getIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeHtml } from "@/lib/sanitize";

describe("sanitizeHtml", () => {
  it("removes scripts and event handlers but keeps formatting", () => {
    const clean = sanitizeHtml('<p onclick="x()"><strong>Bold</strong></p><script>alert(1)</script><a href="javascript:alert(1)">x</a>');
    expect(clean).toContain("<strong>Bold</strong>");
    expect(clean).not.toMatch(/script|onclick|javascript:/i);
  });

  it("returns an empty string for non-strings", () => {
    expect(sanitizeHtml(undefined)).toBe("");
  });
});

describe("escapeHtml / toHeaderSafe", () => {
  it("escapes markup", () => {
    expect(escapeHtml('<b>"Tom" & Jerry</b>')).not.toMatch(/[<>"]/);
  });

  it("strips line breaks from header values", () => {
    expect(toHeaderSafe("Name\r\nBcc: evil@example.com")).not.toMatch(/[\r\n]/);
  });
});

describe("rateLimit", () => {
  it("blocks after the limit within the window", async () => {
    const key = `test:${Math.random()}`;
    const opts = { limit: 2, windowMs: 60_000 };
    expect(await rateLimit(key, opts)).toBe(true);
    expect(await rateLimit(key, opts)).toBe(true);
    expect(await rateLimit(key, opts)).toBe(false);
  });
});

describe("getIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    const req = new Request("https://x", { headers: { "x-forwarded-for": "1.2.3.4, 10.0.0.1" } });
    expect(getIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    expect(getIp(new Request("https://x", { headers: { "x-real-ip": "5.6.7.8" } }))).toBe("5.6.7.8");
  });
});
