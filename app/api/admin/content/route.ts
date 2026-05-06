export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [blogs, caseStudies, testimonials, careers] = await Promise.all([
            prisma.blog.findMany(),
            prisma.caseStudy.findMany(),
            prisma.testimonial.findMany(),
            prisma.career.findMany(),
        ]);

        return NextResponse.json({
            blogs,
            caseStudies,
            testimonials,
            careers
        });
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}
