export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteFilesFromUploadThing } from '@/lib/uploadthing-server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { blogSchema } from '@/lib/content-input';
import { revalidateBlog } from '@/lib/revalidate';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch blog', async (_req, { params }) => {
    const blog = await prisma.blog.findUnique({
        where: { id: params.id }
    });

    if (!blog) return jsonError('Blog not found', 404);

    return NextResponse.json(blog);
});

export const PATCH = adminRoute<Params>('update blog', async (req, { params }) => {
    const data = await parseBody(req, blogSchema.partial());

    const existing = await prisma.blog.findUniqueOrThrow({
        where: { id: params.id },
        select: { slug: true, image: true },
    });

    const blog = await prisma.blog.update({
        where: { id: params.id },
        data,
    });

    if (existing.image && existing.image !== blog.image) {
        await deleteFilesFromUploadThing(existing.image);
    }

    revalidateBlog(blog.slug, existing.slug);

    return NextResponse.json(blog);
});

export const DELETE = adminRoute<Params>('delete blog', async (_req, { params }) => {
    const blog = await prisma.blog.delete({
        where: { id: params.id },
        select: { slug: true, image: true },
    });

    await deleteFilesFromUploadThing(blog.image);

    revalidateBlog(blog.slug);

    return deleted();
});
