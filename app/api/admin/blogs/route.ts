export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, parseBody } from '@/lib/api';
import { blogSchema } from '@/lib/content-input';
import * as blogs from '@/lib/services/blogs';

export const GET = adminRoute('fetch blogs', async () => {
    return NextResponse.json(await blogs.list());
});

export const POST = adminRoute('create blog', async (req) => {
    const data = await parseBody(req, blogSchema);
    return NextResponse.json(await blogs.create(data));
});
