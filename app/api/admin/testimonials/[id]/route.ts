export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { testimonialSchema } from '@/lib/content-input';
import { revalidateHome } from '@/lib/revalidate';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch testimonial', async (_req, { params }) => {
    const item = await prisma.testimonial.findUnique({
        where: { id: params.id }
    });

    if (!item) return jsonError('Testimonial not found', 404);

    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update testimonial', async (req, { params }) => {
    const data = await parseBody(req, testimonialSchema.partial());

    const item = await prisma.testimonial.update({
        where: { id: params.id },
        data,
    });

    revalidateHome();

    return NextResponse.json(item);
});

export const DELETE = adminRoute<Params>('delete testimonial', async (_req, { params }) => {
    await prisma.testimonial.delete({
        where: { id: params.id }
    });

    revalidateHome();

    return deleted();
});
