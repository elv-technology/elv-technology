export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, parseBody } from '@/lib/api';
import { careerSchema } from '@/lib/content-input';
import { revalidateCareers } from '@/lib/revalidate';

export const GET = adminRoute('fetch careers', async () => {
    const items = await prisma.career.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(items);
});

export const POST = adminRoute('create career', async (req) => {
    const data = await parseBody(req, careerSchema);
    const item = await prisma.career.create({ data });

    revalidateCareers();

    return NextResponse.json(item);
});
