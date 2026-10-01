import { sanitizeHtml } from "@/lib/sanitize";

const toStringArray = (value: unknown): string[] | undefined =>
    Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : undefined;

const toOptionalString = (value: unknown): string | undefined =>
    typeof value === "string" ? value : undefined;

/** Only the editable case-study fields, with rich text sanitized. Unknown keys (id, createdAt, ...) are dropped. */
export function pickCaseStudyData(body: any) {
    const solution = body?.solution && typeof body.solution === "object" && !Array.isArray(body.solution)
        ? {
            ...body.solution,
            ...(typeof body.solution.html === "string" ? { html: sanitizeHtml(body.solution.html) } : {}),
        }
        : undefined;

    const priority = body?.priority === undefined || body?.priority === "" ? undefined : Number(body.priority);

    const data = {
        slug: toOptionalString(body?.slug),
        project: toOptionalString(body?.project),
        client: toOptionalString(body?.client),
        image: toOptionalString(body?.image),
        overview: toOptionalString(body?.overview),
        location: toOptionalString(body?.location),
        challenges: toStringArray(body?.challenges),
        gallery: toStringArray(body?.gallery),
        outcomes: toStringArray(body?.outcomes),
        solution,
        isFeatured: typeof body?.isFeatured === "boolean" ? body.isFeatured : undefined,
        priority: Number.isFinite(priority) ? priority : undefined,
    };

    // Drop undefined keys so PATCH only updates what was sent.
    return Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
}
