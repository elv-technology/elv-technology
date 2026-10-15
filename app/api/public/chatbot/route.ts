import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { findRelevantContext } from '@/lib/chatbot/vector-store';
import { z } from 'zod';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { DEFAULT_SUGGESTIONS, FALLBACK_REPLY, SYSTEM_PROMPT, matchIntent, shouldCaptureLead } from '@/lib/chatbot/intents';

const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-flash-latest';

// Only plain user/assistant turns are accepted from the browser — never system prompts.
const chatSchema = z.object({
    message: z.string().trim().min(1).max(1000),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().transform(s => s.slice(0, 2000)),
    })).transform(h => h.slice(-10)).optional().default([]),
});

export async function POST(req: Request) {
    try {
        const ip = getIp(req);
        
        // Rate limit: 10 requests per minute per IP
        if (!(await rateLimit(`chatbot:${ip}`, { limit: 10, windowMs: 60 * 1000 }))) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        // 0. CHECK ENVIRONMENT
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error("CRITICAL: GOOGLE_GENERATIVE_AI_API_KEY is missing in environment variables.");
            // We will proceed to try intents first, then fail gracefully at LLM step.
        }

        const parsed = chatSchema.safeParse(await req.json());
        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
        }
        const { message, history } = parsed.data;

        // 1. FAST PATH: built-in answers for common questions
        const intentReply = matchIntent(message);
        if (intentReply) {
            return NextResponse.json(intentReply);
        }

        // 2. RAG PATH: Semantic Retrieval
        let context = "";
        try {
            context = await findRelevantContext(message);
        } catch (dbError) {
            console.error("Vector Store Error:", dbError);
            // Non-blocking: continue without context if DB isn't ready locally
        }

        // 3. LLM GENERATION: Grounded by Context
        const { text } = await generateText({
            model: google(CHAT_MODEL),
            system: `${SYSTEM_PROMPT}\n\nCONTEXT FROM KNOWLEDGE BASE:\n${context}`,
            messages: [...history, { role: 'user', content: message }],
            temperature: 0.2, // Lower temperature for higher factuality
        });

        const captureLead = shouldCaptureLead(message) || shouldCaptureLead(text);

        return NextResponse.json({ 
            text, 
            captureLead 
        });

    } catch (error) {
        const err = error as { message?: unknown; stack?: unknown };
        console.error('Chatbot API Error Details:', {
            message: err.message,
            stack: err.stack,
            envSet: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
        });
        
        // Fallback for LLM Failure or unrecognized input
        return NextResponse.json({ 
            text: FALLBACK_REPLY, 
            captureLead: false,
            suggestions: DEFAULT_SUGGESTIONS
        });
    }
}
