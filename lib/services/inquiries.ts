import "server-only";
import type { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { inquiryUpdateSchema } from "@/lib/content-input";

export type InquiryUpdate = z.output<typeof inquiryUpdateSchema>;

export function list() {
    return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export function create(data: Prisma.InquiryCreateInput) {
    return prisma.inquiry.create({ data });
}

export function update(id: string, data: InquiryUpdate) {
    return prisma.inquiry.update({ where: { id }, data });
}

export async function remove(id: string) {
    await prisma.inquiry.delete({ where: { id } });
}
