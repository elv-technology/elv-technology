import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { id: params.id }
        });

        if (!caseStudy) {
            return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
        }

        return NextResponse.json(caseStudy);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        // 1. Fetch existing case study to check for file changes
        const existingCaseStudy = await prisma.caseStudy.findUnique({
            where: { id: params.id },
        });

        if (existingCaseStudy) {
            // Delete old main image if changed
            if (body.image && existingCaseStudy.image !== body.image) {
                await deleteFilesFromUploadThing(existingCaseStudy.image);
            }
            // Delete old gallery images that are no longer in the updated gallery
            if (body.gallery && Array.isArray(body.gallery)) {
                const removedGalleryImages = existingCaseStudy.gallery.filter(
                    url => !body.gallery.includes(url)
                );
                if (removedGalleryImages.length > 0) {
                    await deleteFilesFromUploadThing(removedGalleryImages);
                }
            }
        }

        const updatedCaseStudy = await prisma.caseStudy.update({
            where: { id: params.id },
            data: body
        });

        revalidatePath('/');
        revalidatePath('/case-studies');
        revalidatePath(`/case-studies/${updatedCaseStudy.slug}`);

        // If slug changed, revalidate the old path as well
        if (existingCaseStudy && existingCaseStudy.slug !== updatedCaseStudy.slug) {
            revalidatePath(`/case-studies/${existingCaseStudy.slug}`);
        }

        return NextResponse.json(updatedCaseStudy);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { id: params.id },
            select: { slug: true, image: true, gallery: true }
        });

        await prisma.caseStudy.delete({
            where: { id: params.id }
        });

        // Delete all files from UploadThing
        if (caseStudy) {
            const filesToDelete = [caseStudy.image, ...caseStudy.gallery].filter(Boolean) as string[];
            if (filesToDelete.length > 0) {
                await deleteFilesFromUploadThing(filesToDelete);
            }
        }

        revalidatePath('/');
        revalidatePath('/case-studies');
        if (caseStudy?.slug) {
            revalidatePath(`/case-studies/${caseStudy.slug}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
    }
}
