export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { faqSchema } from '@/lib/content-input';
import * as faq from '@/lib/services/faq';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch FAQ', async (_req, { params }) => {
    const item = await faq.getById(params.id);
    if (!item) return jsonError('FAQ not found', 404);
    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update FAQ', async (req, { params }) => {
    const data = await parseBody(req, faqSchema.partial());
    return NextResponse.json(await faq.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete FAQ', async (_req, { params }) => {
    await faq.remove(params.id);
    return deleted();
});
