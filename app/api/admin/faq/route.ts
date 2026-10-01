export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

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

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}
