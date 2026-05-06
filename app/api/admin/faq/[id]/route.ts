export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const faq = await prisma.fAQ.findUnique({
            where: { id: params.id }
        });

        if (!faq) {
            return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
        }

        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { question, answer } = body;

        const faq = await prisma.fAQ.update({
            where: { id: params.id },
            data: {
                question,
                answer
            }
        });

        revalidatePath('/');

        return NextResponse.json(faq);
    } catch (error) {
        console.error('Failed to update FAQ:', error);
        return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.fAQ.delete({
            where: { id: params.id }
        });

        revalidatePath('/');

        return NextResponse.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('Failed to delete FAQ:', error);
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
