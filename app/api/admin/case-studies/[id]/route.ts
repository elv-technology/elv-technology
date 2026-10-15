export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { caseStudySchema } from '@/lib/content-input';
import * as caseStudies from '@/lib/services/case-studies';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch case study', async (_request, { params }) => {
    const caseStudy = await caseStudies.getById(params.id);
    if (!caseStudy) return jsonError('Case study not found', 404);
    return NextResponse.json(caseStudy);
});

export const PATCH = adminRoute<Params>('update case study', async (request, { params }) => {
    const data = await parseBody(request, caseStudySchema.partial());
    return NextResponse.json(await caseStudies.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete case study', async (_request, { params }) => {
    await caseStudies.remove(params.id);
    return deleted();
});
