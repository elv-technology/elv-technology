import { prisma } from '@/lib/prisma';
import { google } from '@ai-sdk/google';
import { embed } from 'ai';

/**
 * Generates a vector embedding for a given text using Gemini text-embedding-004.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: text,
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
     ORDER BY embedding <-> $1::vector 
     LIMIT $2`,
    vectorString,
    limit
  );

  return results.map(r => r.content).join('\n\n');
}
