export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer } = body;

        const faq = await prisma.fAQ.create({
            data: {
                question,
                answer
            }
        });

        revalidatePath('/');

        return NextResponse.json(faq);
    } catch (error) {
        console.error('Failed to create FAQ:', error);
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}
