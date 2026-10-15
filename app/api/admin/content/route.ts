export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute } from '@/lib/api';
import * as content from '@/lib/services/content';

export const GET = adminRoute('fetch content counts', async () => {
    return NextResponse.json(await content.counts());
});
