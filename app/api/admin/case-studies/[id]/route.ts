export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteFilesFromUploadThing } from '@/lib/uploadthing-server';
import { adminRoute, deleted, jsonError, parseBody } from '@/lib/api';
import { caseStudySchema } from '@/lib/content-input';
import { revalidateCaseStudy } from '@/lib/revalidate';
import { slugify } from '@/lib/utils';

type Params = { id: string };

export const GET = adminRoute<Params>('fetch case study', async (_request, { params }) => {
    const caseStudy = await prisma.caseStudy.findUnique({
        where: { id: params.id }
    });

    if (!caseStudy) return jsonError('Case study not found', 404);

    return NextResponse.json(caseStudy);
});

export const PATCH = adminRoute<Params>('update case study', async (request, { params }) => {
    const { slug: rawSlug, ...data } = await parseBody(request, caseStudySchema.partial());

    const slug = rawSlug === undefined ? undefined : slugify(rawSlug);
    if (slug === '') return jsonError('Slug is required', 400);

    const existing = await prisma.caseStudy.findUniqueOrThrow({
        where: { id: params.id },
        select: { slug: true, image: true, gallery: true },
    });

    const updated = await prisma.caseStudy.update({
        where: { id: params.id },
        data: { ...data, slug },
    });

    const kept = new Set([updated.image, ...updated.gallery]);
    const removed = [existing.image, ...existing.gallery].filter((url) => url && !kept.has(url));
    if (removed.length > 0) {
        await deleteFilesFromUploadThing(removed);
    }

    revalidateCaseStudy(updated.slug, existing.slug);

    return NextResponse.json(updated);
});

export const DELETE = adminRoute<Params>('delete case study', async (_request, { params }) => {
    const caseStudy = await prisma.caseStudy.delete({
        where: { id: params.id },
        select: { slug: true, image: true, gallery: true },
    });

    const files = [caseStudy.image, ...caseStudy.gallery].filter(Boolean);
    if (files.length > 0) {
        await deleteFilesFromUploadThing(files);
    }

    revalidateCaseStudy(caseStudy.slug);

    return deleted();
});
