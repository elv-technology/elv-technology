import "server-only";
import { prisma } from "@/lib/prisma";

/** Item counts for the admin dashboard. */
export async function counts() {
    const [blogs, caseStudies, testimonials, careers] = await Promise.all([
        prisma.blog.count(),
        prisma.caseStudy.count(),
        prisma.testimonial.count(),
        prisma.career.count(),
    ]);

    return { blogs, caseStudies, testimonials, careers };
}
