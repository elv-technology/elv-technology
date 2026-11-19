import { describe, expect, it } from "vitest";
import { htmlToExcerpt, slugify } from "@/lib/utils";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Ritz Carlton AV Upgrade!")).toBe("ritz-carlton-av-upgrade");
  });

  it("returns an empty string when nothing usable is left", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("htmlToExcerpt", () => {
  it("strips tags and decodes entities", () => {
    expect(htmlToExcerpt("<p>Fish &amp; chips&nbsp;<strong>today</strong></p>")).toBe("Fish & chips today");
  });

  it("does not double-decode entities", () => {
    expect(htmlToExcerpt("&amp;lt;b&amp;gt;")).toBe("&lt;b&gt;");
  });

  it("truncates long text with an ellipsis", () => {
    const result = htmlToExcerpt(`<p>${"word ".repeat(100)}</p>`, 20);
    expect(result.length).toBeLessThanOrEqual(21);
    expect(result.endsWith("…")).toBe(true);
  });
});
