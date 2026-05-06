export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, rating, date, isNew } = body;

        const testimonial = await prisma.testimonial.create({
            data: {
                content,
                rating: Number(rating),
                date,
                isNew: Boolean(isNew)
            }
        });

        revalidatePath('/');

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('Failed to create testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}
