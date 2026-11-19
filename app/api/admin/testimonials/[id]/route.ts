export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { testimonialSchema } from '@/lib/content-input';
import * as testimonials from '@/lib/services/testimonials';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch testimonial', async (_req, { params }) => {
    const item = await testimonials.getById(params.id);
    if (!item) return jsonError('Testimonial not found', 404);
    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update testimonial', async (req, { params }) => {
    const data = await parseBody(req, testimonialSchema.partial());
    return NextResponse.json(await testimonials.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete testimonial', async (_req, { params }) => {
    await testimonials.remove(params.id);
    return deleted();
});
