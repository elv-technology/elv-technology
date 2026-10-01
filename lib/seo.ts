// Search engines truncate titles at roughly 60 characters and descriptions at roughly 155–160.
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 155;

/**
 * Returns the first candidate that fits within the title limit, so the brand suffix is only added
 * when there is room. Falls back to the last (shortest) candidate.
 * e.g. fitTitle([`${t} | Case Study – ETS Smart`, `${t} | ETS Smart`, t])
 */
export function fitTitle(candidates: string[], max: number = MAX_TITLE_LENGTH): string {
    const clean = candidates.map((c) => c.replace(/\s+/g, " ").trim()).filter(Boolean);
    return clean.find((c) => c.length <= max) ?? clean[clean.length - 1] ?? "";
}

/** "Main headline: long subtitle" -> "Main headline" (only when there is a real subtitle). */
function beforeColon(title: string): string | null {
    const i = title.indexOf(":");
    return i > 10 ? title.slice(0, i).trim() : null;
}

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/**
 * Search title for a blog post. A custom SEO title from the admin wins; otherwise the post title,
 * with " | ETS Smart" only when it fits, shortened to the part before a colon when the title is too long.
 */
export function blogMetaTitle(title: string, seoTitle?: string | null): string {
    if (clean(seoTitle)) return clean(seoTitle);
    const short = beforeColon(title);
    return fitTitle([
        `${title} | ETS Smart`,
        title,
        ...(short ? [`${short} | ETS Smart`, short] : []),
        title,
    ]);
}

/** Search title for a case study, same rules as blog posts with a longer preferred suffix. */
export function caseStudyMetaTitle(project: string, seoTitle?: string | null): string {
    if (clean(seoTitle)) return clean(seoTitle);
    const short = beforeColon(project);
    return fitTitle([
        `${project} | Case Study – ETS Smart`,
        `${project} | ETS Smart`,
        project,
        ...(short ? [`${short} | ETS Smart`, short] : []),
        project,
    ]);
}

/** Meta description: custom SEO description from the admin, else the fallback text, trimmed to fit. */
export function metaDescription(seoDescription: string | null | undefined, fallback: string | null | undefined): string {
    return fitDescription(clean(seoDescription) || fallback);
}

/** Plain-text description trimmed at a word boundary, with an ellipsis when shortened. */
export function fitDescription(text: string | null | undefined, max: number = MAX_DESCRIPTION_LENGTH): string {
    const plain = String(text ?? "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (plain.length <= max) return plain;

    const cut = plain.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—|]+$/, "")}…`;
}
