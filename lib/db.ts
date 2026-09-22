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

export const getCollection = async (collection: string, options: FetchOptions = {}) => {
    const { skip = 0, take = 10, includeContent = false } = options;

    try {
        switch (collection) {
            case "blogs": {
                const dbBlogs = await prisma.blog.findMany({
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
                if (dbBlogs && dbBlogs.length > 0) return dbBlogs;
                break;
            }
            case "case-studies": {
                const dbCaseStudies = await prisma.caseStudy.findMany({
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
                if (dbCaseStudies && dbCaseStudies.length > 0) return dbCaseStudies;
                break;
            }
            case "careers": {
                const dbCareers = await prisma.career.findMany({ skip, take });
                if (dbCareers && dbCareers.length > 0) return dbCareers;
                break;
            }
            case "testimonials": {
                const dbTestimonials = await prisma.testimonial.findMany({ skip, take });
                if (dbTestimonials && dbTestimonials.length > 0) return dbTestimonials;
                break;
            }
            case "faqs": {
                const dbFaqs = await prisma.fAQ.findMany({ skip, take });
                if (dbFaqs && dbFaqs.length > 0) return dbFaqs;
                break;
            }
            case "partners": {
                const dbPartners = await prisma.partner.findMany({ 
                    orderBy: { priority: 'asc' },
                    skip, 
                    take 
                });
                if (dbPartners && dbPartners.length > 0) return dbPartners;
                break;
            }
            case "clients": {
                const dbClients = await prisma.client.findMany({ 
                    orderBy: { priority: 'asc' },
                    skip, 
                    take 
                });
                if (dbClients && dbClients.length > 0) return dbClients;
                break;
            }
        }
    } catch (error) {
        console.warn(`Prisma error for collection '${collection}', falling back to local JSON dataset:`, error);
    }

    // Local JSON fallback
    switch (collection) {
        case "blogs":
            return (dbJson.blogs || []).slice(skip, skip + take);
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
};

