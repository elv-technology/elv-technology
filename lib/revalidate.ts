import { revalidatePath } from "next/cache";

function revalidateDetail(base: string, slugs: (string | null | undefined)[]) {
    for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`${base}/${slug}`);
}

/** Home page sections (FAQs, testimonials, latest posts...). */
export function revalidateHome() {
    revalidatePath("/");
}

export function revalidateBlog(...slugs: (string | null | undefined)[]) {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page"); // all detail pages (prev/next links, new slugs)
    revalidatePath("/sitemap.xml");
    revalidateDetail("/blog", slugs);
}

export function revalidateCaseStudy(...slugs: (string | null | undefined)[]) {
    revalidatePath("/");
    revalidatePath("/case-studies");
    revalidatePath("/case-studies/[slug]", "page"); // all detail pages (prev/next links, new slugs)
    revalidatePath("/sitemap.xml");
    revalidateDetail("/case-studies", slugs);
}

export function revalidateCareers() {
    revalidatePath("/careers");
}

/** Partner and client logos are shown on the home page and the partners & clients page. */
export function revalidateLogos() {
    revalidatePath("/");
    revalidatePath("/partners-clients");
}
