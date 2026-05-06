import { prisma } from "@/lib/prisma";

export const getDb = async () => {
    return prisma;
};

export interface FetchOptions {
    skip?: number;
    take?: number;
    includeContent?: boolean;
}

export const getCollection = async (collection: string, options: FetchOptions = {}) => {
    const { skip = 0, take = 10, includeContent = false } = options;

    switch (collection) {
        case "blogs":
            return prisma.blog.findMany({
                where: { published: true },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    excerpt: true,
                    image: true,
                    category: true,
                    author: true,
                    date: true,
                    content: includeContent,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take
            });
        case "case-studies":
            return prisma.caseStudy.findMany({
                select: {
                    id: true,
                    slug: true,
                    project: true,
                    client: true,
                    image: true,
                    location: true,
                    isFeatured: true,
                    priority: true,
                    overview: includeContent,
                    challenges: includeContent,
                    solution: includeContent,
                    gallery: includeContent,
                    outcomes: includeContent,
                },
                orderBy: [
                    { isFeatured: 'desc' },
                    { priority: 'asc' },
                    { createdAt: 'desc' }
                ],
                skip,
                take
            });
        case "careers":
            return prisma.career.findMany({ skip, take });
        case "testimonials":
            return prisma.testimonial.findMany({ skip, take });
        case "faqs":
            return prisma.fAQ.findMany({ skip, take });
        case "partners":
            return prisma.partner.findMany({ 
                orderBy: { priority: 'asc' },
                skip, 
                take 
            });
        case "clients":
            return prisma.client.findMany({ 
                orderBy: { priority: 'asc' },
                skip, 
                take 
            });
        default:
            return [];
    }
};
