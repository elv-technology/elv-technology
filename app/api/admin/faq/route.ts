export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, parseBody } from '@/lib/api';
import { faqSchema } from '@/lib/content-input';
import { revalidateHome } from '@/lib/revalidate';

export const GET = adminRoute('fetch FAQs', async () => {
    const items = await prisma.fAQ.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(items);
});

export const POST = adminRoute('create FAQ', async (req) => {
    const data = await parseBody(req, faqSchema);
    const item = await prisma.fAQ.create({ data });

    revalidateHome();

    return NextResponse.json(item);
});
