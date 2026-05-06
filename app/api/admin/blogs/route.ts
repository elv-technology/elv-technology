export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, slug, excerpt, content, image, category, author, date } = body;

        const blog = await prisma.blog.create({
            data: {
                title,
                slug,
                excerpt,
                content, // Expecting stringified JSON based on BlogForm
                image,
                category,
                author,
                date: date ? new Date(date) : undefined,
                published: true
            }
        });

        revalidatePath('/');
        revalidatePath('/blog');

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Failed to create blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
