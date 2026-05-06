export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { id: params.id } // Note: Assuming find by ID first, can add fallback to slug if needed
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { title, slug, excerpt, content, image, category, author, date } = body;

        // 1. Fetch existing blog to check for image changes
        const existingBlog = await prisma.blog.findUnique({
            where: { id: params.id },
        });

        // 2. If image is changing, delete the old one from UploadThing
        if (existingBlog && image && existingBlog.image !== image) {
            await deleteFilesFromUploadThing(existingBlog.image);
        }

        const blog = await prisma.blog.update({
            where: { id: params.id },
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                author,
                date: date ? new Date(date) : undefined
            }
        });

        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath(`/blog/${blog.slug}`);

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Failed to update blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Find the blog first to get the slug for revalidation and image URL for deletion
        const blog = await prisma.blog.findUnique({
            where: { id: params.id },
            select: { slug: true, image: true }
        });

        await prisma.blog.delete({
            where: { id: params.id }
        });

        // Delete image from UploadThing
        if (blog?.image) {
            await deleteFilesFromUploadThing(blog.image);
        }

        revalidatePath('/');
        revalidatePath('/blog');
        if (blog?.slug) {
            revalidatePath(`/blog/${blog.slug}`);
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Failed to delete blog:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
