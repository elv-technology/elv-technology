import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { revalidateBlog } from "@/lib/revalidate";
import type { blogSchema } from "@/lib/content-input";

export type BlogInput = z.output<typeof blogSchema>;

export function list() {
    return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
}

export function getById(id: string) {
    return prisma.blog.findUnique({ where: { id } });
}

export function getBySlug(slug: string) {
    return prisma.blog.findUnique({ where: { slug } });
}

export async function create(data: BlogInput) {
    const blog = await prisma.blog.create({ data: { ...data, published: true } });
    revalidateBlog(blog.slug);
    return blog;
}

export async function update(id: string, data: Partial<BlogInput>) {
    const existing = await prisma.blog.findUniqueOrThrow({
        where: { id },
        select: { slug: true, image: true },
    });

    const blog = await prisma.blog.update({ where: { id }, data });

    if (existing.image && existing.image !== blog.image) {
        await deleteFilesFromUploadThing(existing.image);
    }

    revalidateBlog(blog.slug, existing.slug);
    return blog;
}

export async function remove(id: string) {
    const blog = await prisma.blog.delete({
        where: { id },
        select: { slug: true, image: true },
    });

    await deleteFilesFromUploadThing(blog.image);

    revalidateBlog(blog.slug);
}
