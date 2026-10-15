export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, jsonError, parseBody } from '@/lib/api';
import { caseStudySchema } from '@/lib/content-input';
import { revalidateCaseStudy } from '@/lib/revalidate';
import { slugify } from '@/lib/utils';

export const GET = adminRoute('fetch case studies', async () => {
    const caseStudies = await prisma.caseStudy.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(caseStudies);
});

export const POST = adminRoute('create case study', async (request) => {
    const data = await parseBody(request, caseStudySchema);

    const slug = slugify(data.slug || data.project);
    if (!slug) return jsonError('Slug is required', 400);

    const newCaseStudy = await prisma.caseStudy.create({
        data: { ...data, slug }
    });

    revalidateCaseStudy(newCaseStudy.slug);

    return NextResponse.json(newCaseStudy);
});
