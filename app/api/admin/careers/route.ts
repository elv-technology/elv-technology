export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, parseBody } from '@/lib/api';
import { careerSchema } from '@/lib/content-input';
import * as careers from '@/lib/services/careers';

export const GET = adminRoute('fetch careers', async () => {
    return NextResponse.json(await careers.list());
});

export const POST = adminRoute('create career', async (req) => {
    const data = await parseBody(req, careerSchema);
    return NextResponse.json(await careers.create(data));
});
