export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, parseBody } from '@/lib/api';
import { caseStudySchema } from '@/lib/content-input';
import * as caseStudies from '@/lib/services/case-studies';

export const GET = adminRoute('fetch case studies', async () => {
    return NextResponse.json(await caseStudies.list());
});

export const POST = adminRoute('create case study', async (request) => {
    const data = await parseBody(request, caseStudySchema);
    return NextResponse.json(await caseStudies.create(data));
});
