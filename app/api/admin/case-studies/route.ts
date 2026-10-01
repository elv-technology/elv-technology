import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { pickCaseStudyData } from '@/lib/content-input';

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const caseStudies = await prisma.caseStudy.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(caseStudies);
    } catch (error) {
        console.error('Failed to fetch case studies:', error);
        return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const denied = await requireAdmin(request);
    if (denied) return denied;

    try {
        const data: any = pickCaseStudyData(await request.json());

        // Ensure slug is unique if generating one or use provided
        const slug = data.slug || String(data.project || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const newCaseStudy = await prisma.caseStudy.create({
            data: {
                ...data,
                slug,
            }
        });

        revalidatePath('/');
        revalidatePath('/case-studies');
        revalidatePath('/case-studies/[slug]', 'page'); // all detail pages (prev/next links, new slugs)
        revalidatePath('/sitemap.xml');

        return NextResponse.json(newCaseStudy);
    } catch (error) {
        console.error('Failed to create case study:', error);
        return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
    }
}
