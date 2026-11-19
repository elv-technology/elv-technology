export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, parseBody } from '@/lib/api';
import { faqSchema } from '@/lib/content-input';
import * as faq from '@/lib/services/faq';

export const GET = adminRoute('fetch FAQs', async () => {
    return NextResponse.json(await faq.list());
});

export const POST = adminRoute('create FAQ', async (req) => {
    const data = await parseBody(req, faqSchema);
    return NextResponse.json(await faq.create(data));
});
