import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { deleteFilesFromUploadThing } from "@/lib/uploadthing-server";
import { revalidateLogos } from "@/lib/revalidate";
import type { clientSchema } from "@/lib/content-input";

export type ClientInput = z.output<typeof clientSchema>;

export function list() {
    return prisma.client.findMany({ orderBy: { priority: "asc" } });
}

export function getById(id: string) {
    return prisma.client.findUnique({ where: { id } });
}

export async function create(data: ClientInput) {
    const client = await prisma.client.create({ data });
    revalidateLogos();
    return client;
}

export async function update(id: string, data: Partial<ClientInput>) {
    const existing = await prisma.client.findUniqueOrThrow({
        where: { id },
        select: { logo: true },
    });

    const client = await prisma.client.update({ where: { id }, data });

    if (existing.logo && existing.logo !== client.logo) {
        await deleteFilesFromUploadThing(existing.logo);
    }

    revalidateLogos();
    return client;
}

export async function remove(id: string) {
    const client = await prisma.client.delete({
        where: { id },
        select: { logo: true },
    });

    await deleteFilesFromUploadThing(client.logo);

    revalidateLogos();
}
