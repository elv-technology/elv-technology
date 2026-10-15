import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidateCareers } from "@/lib/revalidate";
import type { careerSchema } from "@/lib/content-input";

export type CareerInput = z.output<typeof careerSchema>;

export function list() {
    return prisma.career.findMany({ orderBy: { createdAt: "desc" } });
}

export function getById(id: string) {
    return prisma.career.findUnique({ where: { id } });
}

export async function create(data: CareerInput) {
    const career = await prisma.career.create({ data });
    revalidateCareers();
    return career;
}

export async function update(id: string, data: Partial<CareerInput>) {
    const career = await prisma.career.update({ where: { id }, data });
    revalidateCareers();
    return career;
}

export async function remove(id: string) {
    await prisma.career.delete({ where: { id } });
    revalidateCareers();
}
