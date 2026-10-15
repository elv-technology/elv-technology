import "server-only";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidateHome } from "@/lib/revalidate";
import type { testimonialSchema } from "@/lib/content-input";

export type TestimonialInput = z.output<typeof testimonialSchema>;

export function list() {
    return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export function getById(id: string) {
    return prisma.testimonial.findUnique({ where: { id } });
}

export async function create(data: TestimonialInput) {
    const testimonial = await prisma.testimonial.create({ data });
    revalidateHome();
    return testimonial;
}

export async function update(id: string, data: Partial<TestimonialInput>) {
    const testimonial = await prisma.testimonial.update({ where: { id }, data });
    revalidateHome();
    return testimonial;
}

export async function remove(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    revalidateHome();
}
