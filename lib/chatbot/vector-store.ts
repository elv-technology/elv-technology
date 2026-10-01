import { prisma } from '@/lib/prisma';
import { google } from '@ai-sdk/google';
import { embed } from 'ai';

// Must match the vector(768) column in the KnowledgeBase table.
export const EMBEDDING_DIMENSIONS = 768;
const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';

type EmbeddingTask = 'RETRIEVAL_QUERY' | 'RETRIEVAL_DOCUMENT';

/**
 * Generates a vector embedding for a given text using Gemini.
 * Queries and stored documents must be embedded with the same model (re-run the seed script after changing it).
 */
export async function generateEmbedding(text: string, taskType: EmbeddingTask = 'RETRIEVAL_QUERY'): Promise<number[]> {
  const { embedding } = await embed({
    model: google.embeddingModel(EMBEDDING_MODEL),
    value: text,
    providerOptions: {
      google: { outputDimensionality: EMBEDDING_DIMENSIONS, taskType },
    },
  });
  return embedding;
}

/**
 * Performs a vector similarity search (Euclidean distance) in the PostgreSQL database.
 */
export async function findRelevantContext(query: string, limit: number = 4) {
  const embedding = await generateEmbedding(query);

  // We use Prisma's $queryRaw to perform the vector search.
  // The <-> operator is for Euclidean distance (L2 distance).
  // For cosine similarity, you would use <=> instead.
  const vectorString = `[${embedding.join(',')}]`;

  const results = await prisma.$queryRawUnsafe<any[]>(
    `SELECT content, category
     FROM "KnowledgeBase"
     WHERE embedding IS NOT NULL
     ORDER BY embedding <-> $1::vector
     LIMIT $2`,
    vectorString,
    limit
  );

  return results.map(r => r.content).join('\n\n');
}
