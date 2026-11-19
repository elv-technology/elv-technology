export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, parseBody } from '@/lib/api';
import { testimonialSchema } from '@/lib/content-input';
import * as testimonials from '@/lib/services/testimonials';

export const GET = adminRoute('fetch testimonials', async () => {
    return NextResponse.json(await testimonials.list());
});

export const POST = adminRoute('create testimonial', async (req) => {
    const data = await parseBody(req, testimonialSchema);
    return NextResponse.json(await testimonials.create(data));
});
