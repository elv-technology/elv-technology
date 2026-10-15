import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { sanitizeHtml } from "@/lib/sanitize";

/** Optional plain-text field: trimmed, empty becomes null (cleared), capped in length. */
export const optionalText = (value: unknown, maxLength = 300): string | null =>
    typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : null;

const requiredText = (max: number) => z.string().trim().min(1, "Required").max(max);
const url = z.string().trim().min(1, "Required").max(2048);
const stringList = (maxItems: number, maxLength: number) => z.array(z.string().max(maxLength)).max(maxItems);
const richText = z.string().max(500_000).transform(sanitizeHtml);

/** null / "" / undefined all clear the value; missing keys stay undefined so PATCH leaves them untouched. */
const nullableText = (max = 300) =>
    z.string().nullish().transform((v) => (v === undefined ? undefined : optionalText(v, max)));

/** Empty inputs (e.g. NaN from parseInt, serialized as null) mean "use the default". */
const priority = z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.number().int().min(-1_000_000).max(1_000_000).optional()
);

const date = z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.date().optional()
);

export const blogSchema = z.object({
    title: requiredText(300),
    slug: requiredText(200),
    excerpt: z.string().trim().max(2000),
    content: richText,
    image: url,
    category: requiredText(100),
    author: requiredText(150),
    date,
    seoTitle: nullableText(),
    seoDescription: nullableText(),
});

export const caseStudySchema = z.object({
    slug: z.string().max(200).optional(),
    project: requiredText(300),
    client: requiredText(300),
    image: url,
    overview: z.string().max(100_000),
    location: z.string().trim().max(200).default(""),
    challenges: stringList(100, 5000).default([]),
    gallery: stringList(100, 2048).default([]),
    outcomes: stringList(100, 5000).default([]),
    solution: z
        .object({ title: z.string().max(300).optional(), html: z.string().max(500_000).optional() })
        .passthrough()
        .transform((s) => (typeof s.html === "string" ? { ...s, html: sanitizeHtml(s.html) } : s) as Prisma.InputJsonObject)
        .default({}),
    isFeatured: z.boolean().default(false),
    priority,
    seoTitle: nullableText(),
    seoDescription: nullableText(),
});

export const careerSchema = z.object({
    title: requiredText(200),
    department: z.string().trim().max(100).transform((v) => v || "General").default("General"),
    location: requiredText(200),
    type: requiredText(100),
    description: z.string().trim().min(1, "Required").max(50_000),
    requirements: stringList(100, 2000).default([]),
});

export const faqSchema = z.object({
    question: requiredText(500),
    answer: z.string().trim().min(1, "Required").max(20_000),
    category: nullableText(100),
});

export const testimonialSchema = z.object({
    content: z.string().trim().min(1, "Required").max(5000),
    rating: z.coerce.number().int().min(1).max(5).default(5),
    date: z.string().trim().max(100).default(""),
    isNew: z.boolean().default(false),
});

export const clientSchema = z.object({
    name: requiredText(200),
    logo: url,
    category: nullableText(100),
    priority,
});

export const partnerSchema = clientSchema.extend({
    website: nullableText(2048),
});

export const INQUIRY_STATUSES = ["new", "read", "replied"] as const;

export const inquiryUpdateSchema = z.object({
    status: z.enum(INQUIRY_STATUSES),
});
