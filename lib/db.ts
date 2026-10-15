import "server-only";
import { cache } from "react";
import type { Career, Client, FAQ, Partner, Prisma, Testimonial } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { htmlToExcerpt } from "@/lib/utils";
import type { BlogPost, BlogSummary, CaseStudyDetail, CaseStudyListItem } from "@/lib/types";

export interface FetchOptions {
    skip?: number;
    take?: number;
}

/** Row type returned for each public collection. */
export interface CollectionTypes {
    blogs: BlogSummary;
    "case-studies": CaseStudyListItem;
    careers: Career;
    testimonials: Testimonial;
    faqs: FAQ;
    partners: Partner;
    clients: Client;
}

export type CollectionName = keyof CollectionTypes;

const blogSummarySelect = {
    id: true,
    slug: true,
    title: true,
    excerpt: true,
    image: true,
    category: true,
    author: true,
    date: true,
    createdAt: true,
    updatedAt: true,
    seoTitle: true,
    seoDescription: true,
} satisfies Prisma.BlogSelect;

const blogPostSelect = { ...blogSummarySelect, content: true } satisfies Prisma.BlogSelect;

const caseStudySummarySelect = {
    id: true,
    slug: true,
    project: true,
    client: true,
    image: true,
    location: true,
    isFeatured: true,
    priority: true,
    createdAt: true,
    updatedAt: true,
    seoTitle: true,
    seoDescription: true,
} satisfies Prisma.CaseStudySelect;

const caseStudyDetailSelect = {
    ...caseStudySummarySelect,
    overview: true,
    challenges: true,
    solution: true,
    gallery: true,
    outcomes: true,
} satisfies Prisma.CaseStudySelect;

/** List cards show a short plain-text overview instead of the full rich-text HTML. */
function toCaseStudySummary<T extends { overview: string }>(row: T): Omit<T, "overview"> & { overview: string } {
    return { ...row, overview: htmlToExcerpt(row.overview) };
}

const caseStudyOrder = [
    { isFeatured: 'desc' as const },
    { priority: 'asc' as const },
    { createdAt: 'desc' as const },
];

type Loader<T> = (skip: number, take: number) => Promise<T[]>;

const loaders: { [K in CollectionName]: Loader<CollectionTypes[K]> } = {
    blogs: (skip, take) => prisma.blog.findMany({
        where: { published: true },
        select: blogSummarySelect,
        orderBy: { createdAt: 'desc' },
        skip,
        take
    }),
    "case-studies": async (skip, take) => {
        const rows = await prisma.caseStudy.findMany({
            select: { ...caseStudySummarySelect, overview: true },
            orderBy: caseStudyOrder,
            skip,
            take
        });
        return rows.map(toCaseStudySummary);
    },
    careers: (skip, take) => prisma.career.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    testimonials: (skip, take) => prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    faqs: (skip, take) => prisma.fAQ.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    partners: (skip, take) => prisma.partner.findMany({ orderBy: { priority: 'asc' }, skip, take }),
    clients: (skip, take) => prisma.client.findMany({ orderBy: { priority: 'asc' }, skip, take }),
};

// The local JSON dataset is only used when the database cannot be reached, and only outside production
// (or when USE_LOCAL_DATA_FALLBACK=true, e.g. for an offline test build).
// In production a database error is re-thrown instead: pages are cached (ISR), and when a background
// regeneration fails Next.js keeps serving the last good version. Falling back would instead cache sample
// content, or a 404 for real case studies, for up to an hour.
// An empty table is a valid state (e.g. all FAQs deleted) and must not bring back sample content.
const allowJsonFallback = process.env.NODE_ENV !== "production" || process.env.USE_LOCAL_DATA_FALLBACK === "true";

function handleDbError(what: string, error: unknown) {
    if (!allowJsonFallback) throw error;
    console.warn(`Prisma error for ${what}, falling back to local JSON dataset:`, error);
}

// Sample rows are looser than the database (e.g. string dates, JSON blog content); callers treat them like Prisma results.
interface JsonDataset {
    blogs?: (BlogPost & { published?: boolean })[];
    caseStudies?: CaseStudyDetail[];
    careers?: Career[];
    testimonials?: Testimonial[];
    faqs?: FAQ[];
}

/** Loaded on demand so the sample dataset is never bundled into the normal (database) path. */
async function loadJsonDataset(): Promise<JsonDataset> {
    return (await import("@/data/db.json")).default as unknown as JsonDataset;
}

const isPublished = (row: { published?: boolean }) => row.published !== false;

async function jsonFallback<K extends CollectionName>(collection: K, skip: number, take: number): Promise<CollectionTypes[K][]> {
    const data = await loadJsonDataset();
    const rows: { [C in CollectionName]?: CollectionTypes[C][] } = {
        blogs: data.blogs?.filter(isPublished),
        "case-studies": data.caseStudies?.map(toCaseStudySummary),
        careers: data.careers,
        testimonials: data.testimonials,
        faqs: data.faqs,
    };
    return (rows[collection] ?? []).slice(skip, skip + take);
}

export async function getCollection<K extends CollectionName>(collection: K, options: FetchOptions = {}): Promise<CollectionTypes[K][]> {
    const { skip = 0, take = 10 } = options;

    try {
        return await loaders[collection](skip, take);
    } catch (error) {
        handleDbError(`collection '${collection}'`, error);
        return await jsonFallback(collection, skip, take);
    }
}

/** Fetches one published blog post by slug (with content). Cached per request, so metadata and page share one query. */
export const getBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
    try {
        return await prisma.blog.findFirst({
            where: { slug, published: true },
            select: blogPostSelect,
        });
    } catch (error) {
        handleDbError(`blog '${slug}'`, error);
        const { blogs = [] } = await loadJsonDataset();
        return blogs.find((b) => b.slug === slug && isPublished(b)) ?? null;
    }
});

/** Fetches one case study by slug (with content). Cached per request, so metadata and page share one query. */
export const getCaseStudyBySlug = cache(async (slug: string): Promise<CaseStudyDetail | null> => {
    try {
        return await prisma.caseStudy.findUnique({
            where: { slug },
            select: caseStudyDetailSelect,
        });
    } catch (error) {
        handleDbError(`case study '${slug}'`, error);
        const { caseStudies = [] } = await loadJsonDataset();
        return caseStudies.find((c) => c.slug === slug) ?? null;
    }
});
