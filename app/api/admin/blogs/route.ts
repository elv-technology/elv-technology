export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { sanitizeHtml } from '@/lib/sanitize';
import { optionalText } from '@/lib/content-input';

export async function GET(req: Request) {
    const denied = await requireAdmin(req);
    if (denied) return denied;

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
    const denied = await requireAdmin(req);
    if (denied) return denied;

    try {
        const body = await req.json();
        const { title, slug, excerpt, content, image, category, author, date, seoTitle, seoDescription } = body;

        const blog = await prisma.blog.create({
            data: {
                title,
                slug,
                excerpt,
                content: sanitizeHtml(content), // HTML from the rich-text editor, stripped of unsafe markup
                image,
                category,
                author,
                date: date ? new Date(date) : undefined,
                seoTitle: optionalText(seoTitle),
                seoDescription: optionalText(seoDescription),
                published: true
            }
        });

        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/blog/[slug]', 'page'); // all detail pages (prev/next links, new slugs)
        revalidatePath('/sitemap.xml');

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Failed to create blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
