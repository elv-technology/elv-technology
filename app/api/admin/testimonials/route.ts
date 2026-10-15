export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, parseBody } from '@/lib/api';
import { testimonialSchema } from '@/lib/content-input';
import { revalidateHome } from '@/lib/revalidate';

export const GET = adminRoute('fetch testimonials', async () => {
    const items = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(items);
});

export const POST = adminRoute('create testimonial', async (req) => {
    const data = await parseBody(req, testimonialSchema);
    const item = await prisma.testimonial.create({ data });

    revalidateHome();

    return NextResponse.json(item);
});
