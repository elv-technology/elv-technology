import { prisma } from '@/lib/prisma';
import { google } from '@ai-sdk/google';
import { embed, embedMany } from 'ai';

// Must match the vector(768) column in the KnowledgeBase table.
export const EMBEDDING_DIMENSIONS = 768;
const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';

type EmbeddingTask = 'RETRIEVAL_QUERY' | 'RETRIEVAL_DOCUMENT';

const embeddingOptions = (taskType: EmbeddingTask) => ({
  model: google.embeddingModel(EMBEDDING_MODEL),
  providerOptions: {
    google: { outputDimensionality: EMBEDDING_DIMENSIONS, taskType },
  },
});

/**
 * Generates a vector embedding for a given text using Gemini.
 * Queries and stored documents must be embedded with the same model (re-run the seed script after changing it).
 */
export async function generateEmbedding(text: string, taskType: EmbeddingTask = 'RETRIEVAL_QUERY'): Promise<number[]> {
  const { embedding } = await embed({ ...embeddingOptions(taskType), value: text });
  return embedding;
}

/** Batch version of generateEmbedding; the SDK splits the values into as many API calls as the model needs. */
export async function generateEmbeddings(texts: string[], taskType: EmbeddingTask = 'RETRIEVAL_DOCUMENT'): Promise<number[][]> {
  const { embeddings } = await embedMany({ ...embeddingOptions(taskType), values: texts, maxParallelCalls: 2 });
  return embeddings;
}

/**
 * Performs a vector similarity search (cosine distance) in the PostgreSQL database.
 * There is no vector index on KnowledgeBase, so this is an exact scan; cosine suits Gemini embeddings,
 * which are not normalised when a reduced outputDimensionality is requested.
 */
export async function findRelevantContext(query: string, limit: number = 4) {
  const embedding = await generateEmbedding(query);
  const vector = `[${embedding.join(',')}]`;

  const results = await prisma.$queryRaw<{ content: string }[]>`
    SELECT content
    FROM "KnowledgeBase"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit}`;

  return results.map(r => r.content).join('\n\n');
}
