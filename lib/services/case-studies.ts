import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { revalidateCaseStudy } from "@/lib/revalidate";
import type { caseStudySchema } from "@/lib/content-input";
import { slugify } from "@/lib/utils";
import { HttpError } from "@/lib/services/errors";

export type CaseStudyInput = z.output<typeof caseStudySchema>;

export function list() {
    return prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
}

export function getById(id: string) {
    return prisma.caseStudy.findUnique({ where: { id } });
}

export function getBySlug(slug: string) {
    return prisma.caseStudy.findUnique({ where: { slug } });
}

/** Without an explicit slug, one is derived from the project name. */
export async function create(data: CaseStudyInput) {
    const slug = slugify(data.slug || data.project);
    if (!slug) throw new HttpError(400, "Slug is required");

    const caseStudy = await prisma.caseStudy.create({ data: { ...data, slug } });

    revalidateCaseStudy(caseStudy.slug);
    return caseStudy;
}

/** Deletes the cover and gallery images that are no longer used after the update. */
export async function update(id: string, { slug: rawSlug, ...data }: Partial<CaseStudyInput>) {
    const slug = rawSlug === undefined ? undefined : slugify(rawSlug);
    if (slug === "") throw new HttpError(400, "Slug is required");

    const existing = await prisma.caseStudy.findUniqueOrThrow({
        where: { id },
        select: { slug: true, image: true, gallery: true },
    });

    const updated = await prisma.caseStudy.update({ where: { id }, data: { ...data, slug } });

    const kept = new Set([updated.image, ...updated.gallery]);
    const removed = [existing.image, ...existing.gallery].filter((url) => url && !kept.has(url));
    if (removed.length > 0) {
        await deleteFilesFromUploadThing(removed);
    }

    revalidateCaseStudy(updated.slug, existing.slug);
    return updated;
}

export async function remove(id: string) {
    const caseStudy = await prisma.caseStudy.delete({
        where: { id },
        select: { slug: true, image: true, gallery: true },
    });

    const files = [caseStudy.image, ...caseStudy.gallery].filter(Boolean);
    if (files.length > 0) {
        await deleteFilesFromUploadThing(files);
    }

    revalidateCaseStudy(caseStudy.slug);
}
