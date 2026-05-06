import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
export const dynamic = "force-dynamic";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
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
    try {
        const body = await request.json();

        // Ensure slug is unique if generating one or use provided
        let slug = body.slug || body.project.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const newCaseStudy = await prisma.caseStudy.create({
            data: {
                ...body,
                slug,
            }
        });

        revalidatePath('/');
        revalidatePath('/case-studies');

        return NextResponse.json(newCaseStudy);
    } catch (error) {
        console.error('Failed to create case study:', error);
        return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
    }
}
