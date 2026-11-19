import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { revalidateLogos } from "@/lib/revalidate";
import type { partnerSchema } from "@/lib/content-input";

export type PartnerInput = z.output<typeof partnerSchema>;

export function list() {
    return prisma.partner.findMany({ orderBy: { priority: "asc" } });
}

export function getById(id: string) {
    return prisma.partner.findUnique({ where: { id } });
}

export async function create(data: PartnerInput) {
    const partner = await prisma.partner.create({ data });
    revalidateLogos();
    return partner;
}

export async function update(id: string, data: Partial<PartnerInput>) {
    const existing = await prisma.partner.findUniqueOrThrow({
        where: { id },
        select: { logo: true },
    });

    const partner = await prisma.partner.update({ where: { id }, data });

    if (existing.logo && existing.logo !== partner.logo) {
        await deleteFilesFromUploadThing(existing.logo);
    }

    revalidateLogos();
    return partner;
}

export async function remove(id: string) {
    const partner = await prisma.partner.delete({
        where: { id },
        select: { logo: true },
    });

    await deleteFilesFromUploadThing(partner.logo);

    revalidateLogos();
}
