export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { adminRoute, parseBody } from '@/lib/api';
import { blogSchema } from '@/lib/content-input';
import { revalidateBlog } from '@/lib/revalidate';

export const GET = adminRoute('fetch blogs', async () => {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(blogs);
});

export const POST = adminRoute('create blog', async (req) => {
    const data = await parseBody(req, blogSchema);

    const blog = await prisma.blog.create({
        data: { ...data, published: true }
    });

    revalidateBlog(blog.slug);

    return NextResponse.json(blog);
});
