export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { faqSchema } from '@/lib/content-input';
import { revalidateHome } from '@/lib/revalidate';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch FAQ', async (_req, { params }) => {
    const item = await prisma.fAQ.findUnique({
        where: { id: params.id }
    });

    if (!item) return jsonError('FAQ not found', 404);

    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update FAQ', async (req, { params }) => {
    const data = await parseBody(req, faqSchema.partial());

    const item = await prisma.fAQ.update({
        where: { id: params.id },
        data,
    });

    revalidateHome();

    return NextResponse.json(item);
});

export const DELETE = adminRoute<Params>('delete FAQ', async (_req, { params }) => {
    await prisma.fAQ.delete({
        where: { id: params.id }
    });

    revalidateHome();

    return deleted();
});
