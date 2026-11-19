export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { careerSchema } from '@/lib/content-input';
import * as careers from '@/lib/services/careers';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch career', async (_req, { params }) => {
    const item = await careers.getById(params.id);
    if (!item) return jsonError('Career not found', 404);
    return NextResponse.json(item);
});

export const PATCH = adminRoute<Params>('update career', async (req, { params }) => {
    const data = await parseBody(req, careerSchema.partial());
    return NextResponse.json(await careers.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete career', async (_req, { params }) => {
    await careers.remove(params.id);
    return deleted();
});
