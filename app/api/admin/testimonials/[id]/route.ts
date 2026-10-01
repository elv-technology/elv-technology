export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const testimonial = await prisma.testimonial.findUnique({
            where: { id: params.id }
        });

        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const body = await req.json();
        const { content, rating, date, isNew } = body;

        const testimonial = await prisma.testimonial.update({
            where: { id: params.id },
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
        console.error('Failed to update testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        await prisma.testimonial.delete({
            where: { id: params.id }
        });

        revalidatePath('/');

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Failed to delete testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
