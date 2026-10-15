import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function list() {
    return prisma.application.findMany({ orderBy: { createdAt: "desc" } });
}

export function create(data: Prisma.ApplicationCreateInput) {
    return prisma.application.create({ data });
}

export async function remove(id: string) {
    await prisma.application.delete({ where: { id } });
}
