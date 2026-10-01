/**
 * Rebuilds the chatbot knowledge base (KnowledgeBase table) from the website's own content.
 *
 * Usage:
 *   ENV_FILE=.env.local npm run seed:knowledge
 *
 * Needs DATABASE_URL and GOOGLE_GENERATIVE_AI_API_KEY. It replaces all existing rows,
 * so run it again whenever solutions, services or FAQs change, or after changing the embedding model.
 */
import { config } from "dotenv";
config({ path: process.env.ENV_FILE || ".env" });

import { readFileSync } from "fs";
import { join } from "path";
import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "@/lib/chatbot/vector-store";
import { solutionsData } from "@/lib/solutions-data";
import { servicesData } from "@/lib/services-data";
import { faqSectionData } from "@/lib/data";

interface Chunk {
    category: string;
    content: string;
}

const SKIP_KEYS = new Set(["id", "icon", "image", "image2", "video", "poster", "href", "link", "url", "metadata"]);
const MAX_CHUNK_LENGTH = 6000;

/** Collects all human-readable text from a nested content object. */
function collectText(value: unknown, out: string[] = []): string[] {
    if (typeof value === "string") {
        const text = value.trim();
        if (text && !text.startsWith("/") && !/^https?:\/\//.test(text)) out.push(text);
    } else if (Array.isArray(value)) {
        value.forEach((v) => collectText(v, out));
    } else if (value && typeof value === "object") {
        for (const [key, v] of Object.entries(value)) {
            if (!SKIP_KEYS.has(key)) collectText(v, out);
        }
    }
    return out;
}

function addChunk(chunks: Chunk[], category: string, parts: string[]) {
    const content = Array.from(new Set(parts)).join("\n").slice(0, MAX_CHUNK_LENGTH);
    if (content.length > 40) chunks.push({ category, content });
}

async function buildChunks(): Promise<Chunk[]> {
    const chunks: Chunk[] = [];

    // Solutions: one chunk per solution item
    for (const [sectionKey, section] of Object.entries(solutionsData as Record<string, any>)) {
        if (Array.isArray(section?.items)) {
            for (const item of section.items) {
                addChunk(chunks, `solutions:${sectionKey}`, [section.title, ...collectText(item)]);
            }
        } else {
            addChunk(chunks, `solutions:${sectionKey}`, collectText(section));
        }
    }

    // Services
    for (const [sectionKey, section] of Object.entries(servicesData as Record<string, any>)) {
        addChunk(chunks, `services:${sectionKey}`, collectText(section));
    }

    // FAQs: database first, then the static homepage FAQ content
    try {
        const faqs = await prisma.fAQ.findMany();
        for (const faq of faqs) addChunk(chunks, "faq", [`Q: ${faq.question}`, `A: ${faq.answer}`]);
    } catch (error) {
        console.warn("Could not load FAQs from the database:", error);
    }
    addChunk(chunks, "faq", collectText(faqSectionData));

    // Company overview from llms.txt, one chunk per "## " section
    try {
        const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
        for (const section of llms.split(/\n(?=## )/)) addChunk(chunks, "company", [section]);
    } catch {
        // optional
    }

    return chunks;
}

async function main() {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");

    const chunks = await buildChunks();
    console.log(`Prepared ${chunks.length} knowledge chunks. Generating embeddings...`);

    const rows: { content: string; category: string; vector: string }[] = [];
    for (const [i, chunk] of chunks.entries()) {
        const embedding = await generateEmbedding(chunk.content, "RETRIEVAL_DOCUMENT");
        rows.push({ ...chunk, vector: `[${embedding.join(",")}]` });
        process.stdout.write(`\r  ${i + 1}/${chunks.length}`);
    }
    console.log("\nWriting to the database...");

    // Replace everything in one transaction so the chatbot never sees a half-built knowledge base.
    await prisma.$transaction([
        prisma.$executeRawUnsafe(`DELETE FROM "KnowledgeBase"`),
        ...rows.map((row) =>
            prisma.$executeRawUnsafe(
                `INSERT INTO "KnowledgeBase" (id, content, category, embedding, "createdAt", "updatedAt")
                 VALUES (gen_random_uuid()::text, $1, $2, $3::vector, NOW(), NOW())`,
                row.content,
                row.category,
                row.vector
            )
        ),
    ]);

    console.log(`Done: ${rows.length} rows written to KnowledgeBase.`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
