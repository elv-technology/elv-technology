import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidateHome } from "@/lib/revalidate";
import type { faqSchema } from "@/lib/content-input";

export type FaqInput = z.output<typeof faqSchema>;

export function list() {
    return prisma.fAQ.findMany({ orderBy: { createdAt: "desc" } });
}

export function getById(id: string) {
    return prisma.fAQ.findUnique({ where: { id } });
}

export async function create(data: FaqInput) {
    const faq = await prisma.fAQ.create({ data });
    revalidateHome();
    return faq;
}

export async function update(id: string, data: Partial<FaqInput>) {
    const faq = await prisma.fAQ.update({ where: { id }, data });
    revalidateHome();
    return faq;
}

export async function remove(id: string) {
    await prisma.fAQ.delete({ where: { id } });
    revalidateHome();
}
