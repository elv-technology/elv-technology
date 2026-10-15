export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { careerSchema } from '@/lib/content-input';
import { revalidateCareers } from '@/lib/revalidate';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch career', async (_req, { params }) => {
    const item = await prisma.career.findUnique({
        where: { id: params.id }
    });

    if (!item) return jsonError('Career not found', 404);

    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update career', async (req, { params }) => {
    const data = await parseBody(req, careerSchema.partial());

    const item = await prisma.career.update({
        where: { id: params.id },
        data,
    });

    revalidateCareers();

    return NextResponse.json(item);
});

export const DELETE = adminRoute<Params>('delete career', async (_req, { params }) => {
    await prisma.career.delete({
        where: { id: params.id }
    });

    revalidateCareers();

    return deleted();
});
