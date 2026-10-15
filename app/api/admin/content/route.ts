export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute } from '@/lib/api';

export const GET = adminRoute('fetch content counts', async () => {
    const [blogs, caseStudies, testimonials, careers] = await Promise.all([
        prisma.blog.count(),
        prisma.caseStudy.count(),
        prisma.testimonial.count(),
        prisma.career.count(),
    ]);

    return NextResponse.json({ blogs, caseStudies, testimonials, careers });
});
