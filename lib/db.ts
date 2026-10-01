import { cache } from "react";
import { prisma } from "@/lib/prisma";
import dbJson from "@/data/db.json";

export const getDb = async () => {
    return prisma;
};

export interface FetchOptions {
    skip?: number;
    take?: number;
    includeContent?: boolean;
}

const blogSelect = (includeContent: boolean) => ({
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
    content: includeContent,
});

const caseStudySelect = (includeContent: boolean) => ({
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
    overview: includeContent,
    challenges: includeContent,
    solution: includeContent,
    gallery: includeContent,
    outcomes: includeContent,
});

const caseStudyOrder = [
    { isFeatured: 'desc' as const },
    { priority: 'asc' as const },
    { createdAt: 'desc' as const },
];

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

function jsonFallback(collection: string, skip: number, take: number): any[] {
    switch (collection) {
        case "blogs":
            return (dbJson.blogs || []).filter((b: any) => b.published !== false).slice(skip, skip + take);
        case "case-studies":
            return (dbJson.caseStudies || []).slice(skip, skip + take);
        case "careers":
            return (dbJson.careers || []).slice(skip, skip + take);
        case "testimonials":
            return (dbJson.testimonials || []).slice(skip, skip + take);
        case "faqs":
            return (dbJson.faqs || []).slice(skip, skip + take);
        default:
            return [];
    }
}

export const getCollection = async (collection: string, options: FetchOptions = {}) => {
    const { skip = 0, take = 10, includeContent = false } = options;

    try {
        switch (collection) {
            case "blogs":
                return await prisma.blog.findMany({
                    where: { published: true },
                    select: blogSelect(includeContent),
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take
                });
            case "case-studies":
                return await prisma.caseStudy.findMany({
                    select: caseStudySelect(includeContent),
                    orderBy: caseStudyOrder,
                    skip,
                    take
                });
            case "careers":
                return await prisma.career.findMany({ orderBy: { createdAt: 'desc' }, skip, take });
            case "testimonials":
                return await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, skip, take });
            case "faqs":
                return await prisma.fAQ.findMany({ orderBy: { createdAt: 'desc' }, skip, take });
            case "partners":
                return await prisma.partner.findMany({ orderBy: { priority: 'asc' }, skip, take });
            case "clients":
                return await prisma.client.findMany({ orderBy: { priority: 'asc' }, skip, take });
            default:
                return [];
        }
    } catch (error) {
        handleDbError(`collection '${collection}'`, error);
        return jsonFallback(collection, skip, take);
    }
};

/** Fetches one published blog post by slug (with content). Cached per request, so metadata and page share one query. */
export const getBlogBySlug = cache(async (slug: string): Promise<any | null> => {
    try {
        return await prisma.blog.findFirst({
            where: { slug, published: true },
            select: blogSelect(true),
        });
    } catch (error) {
        handleDbError(`blog '${slug}'`, error);
        return (dbJson.blogs || []).find((b: any) => b.slug === slug && b.published !== false) ?? null;
    }
});

/** Fetches one case study by slug (with content). Cached per request, so metadata and page share one query. */
export const getCaseStudyBySlug = cache(async (slug: string): Promise<any | null> => {
    try {
        return await prisma.caseStudy.findUnique({
            where: { slug },
            select: caseStudySelect(true),
        });
    } catch (error) {
        handleDbError(`case study '${slug}'`, error);
        return (dbJson.caseStudies || []).find((c: any) => c.slug === slug) ?? null;
    }
});
