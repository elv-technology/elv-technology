import type { Blog, CaseStudy } from "@prisma/client";

// Shapes returned by lib/db.ts and passed from server pages to client components.
// Date fields stay Date objects across the server -> client boundary (RSC props support Date);
// rows from the local JSON fallback dataset carry strings instead, so consumers wrap them in new Date().

/** A published blog post as listed on /blog (no content). `description` only exists in the local sample dataset. */
export type BlogSummary = Pick<
    Blog,
    "id" | "slug" | "title" | "excerpt" | "image" | "category" | "author" | "date" | "createdAt" | "updatedAt" | "seoTitle" | "seoDescription"
> & { description?: string };

/** A single blog post with its content (HTML, plain text, or JSON sections in the sample dataset). */
export type BlogPost = BlogSummary & Pick<Blog, "content">;

/** A case study as listed (no long-form content). */
export type CaseStudySummary = Pick<
    CaseStudy,
    "id" | "slug" | "project" | "client" | "image" | "location" | "isFeatured" | "priority" | "createdAt" | "updatedAt" | "seoTitle" | "seoDescription"
>;

/** A case study as listed on cards, with `overview` reduced to a plain-text excerpt. */
export type CaseStudyListItem = CaseStudySummary & { overview: string };

/** A single case study with its content. */
export type CaseStudyDetail = CaseStudySummary & Pick<CaseStudy, "overview" | "challenges" | "solution" | "gallery" | "outcomes">;

/** The case study `solution` JSON column (rich-text HTML from the admin, or structured points in older data). */
export interface CaseStudySolution {
    title?: string;
    components?: Array<{
        name: string;
        details: string;
    }>;
    points?: string[];
    html?: string;
}

/** A case study as rendered by the detail page, with its solution HTML already sanitized. */
export type CaseStudyView = Omit<CaseStudyDetail, "solution"> & { solution: CaseStudySolution | null };

export interface FaqItem {
    question: string;
    answer: string;
}
