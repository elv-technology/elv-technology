export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { blogSchema } from '@/lib/content-input';
import * as blogs from '@/lib/services/blogs';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch blog', async (_req, { params }) => {
    const blog = await blogs.getById(params.id);
    if (!blog) return jsonError('Blog not found', 404);
    return NextResponse.json(blog);
});

export const PATCH = adminRoute<Params>('update blog', async (req, { params }) => {
    const data = await parseBody(req, blogSchema.partial());
    return NextResponse.json(await blogs.update(params.id, data));
});

export const DELETE = adminRoute<Params>('delete blog', async (_req, { params }) => {
    await blogs.remove(params.id);
    return deleted();
});
