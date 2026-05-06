import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { findRelevantContext } from '@/lib/chatbot/vector-store';

const INTENTS = {
    OUT_OF_SCOPE: [
        {
            keywords: ['weapon', 'gun', 'kill', 'bomb', 'harm', 'illegal', 'crime', 'murder', 'drugs', 'suicide', 'abuse', 'violence', 'how to make a'],
            answer: "I cannot fulfill this request. I am a corporate virtual assistant for ELV Technology Solutions. Please keep your inquiries relevant to our business services (AV, Security, and Networking)."
        },
        {
            keywords: ['website', 'web dev', 'app ', 'software', 'seo', 'cloud hosting', 'erp', 'accounting', 'marketing', 'social media'],
            answer: "No, web and app development is outside our scope. We focus on physical technology integration like ELV and AV systems."
        },
        {
            keywords: ['repair laptop', 'repair phone', 'repair ac', 'fix laptop', 'fix computer', 'fix phone', 'desktop', 'smartphone', 'printer', 'hvac', 'water heater', 'air conditioning', 'fridge'],
            answer: "No, we do not repair personal devices (laptops, phones) or MEP systems (like HVAC/AC). We specialize in enterprise technology integration."
        },
        {
            keywords: ['hack', 'hidden camera', 'recover deleted', 'spy', 'unauthorized'],
            answer: "No, absolutely not. We do not engage in hacking, data recovery, or installing hidden cameras."
        }
    ],
    GREETINGS: [
        {
            keywords: ['hi', 'hello', 'hey', 'how are you', 'how are u', 'good morning', 'good afternoon', 'greetings', 'morning', 'evening'],
            answer: "Hello! 👋 I'm the ETS Virtual Assistant. I can help you with Security, AV, Networking, and Smart Home solutions in the UAE. What can I assist you with today?"
        }
    ],
    GEOGRAPHY: [
        {
            keywords: ['india', 'pakistan', 'uk', 'usa', 'outside', 'abroad', 'other country'],
            answer: "We currently provide our services exclusively within the **United Arab Emirates (UAE)**, covering all 7 Emirates including Abu Dhabi, Dubai, Sharjah, and more. We do not have operations in India or other countries at this time.",
            suggestions: ["Our Solutions", "Service Locations"]
        },
        {
            keywords: ['service locations', 'location', 'where are you', 'address', 'office', 'uae', 'emirates', 'dubai', 'abu dhabi', 'sharjah', 'ajman', 'rak', 'fujairah', 'um al quwain'],
            answer: "Our headquarters is located in **Abu Dhabi, UAE**. We provide professional technology integration services across all 7 Emirates.\n\n📍 ELV Technology Solutions, Abu Dhabi, UAE.\n\nWould you like to schedule a free site assessment?",
            suggestions: ["Schedule Assessment", "View Solutions"]
        }
    ],
    WHAT_WE_DO: [
        {
            keywords: ['solutions', 'services', 'offer', 'help', 'view solutions', 'our solutions', 'our services', 'what are your services', 'what are your solutions', 'what do you do', 'list of services', 'tell me about ets'],
            answer: "ETS specializes in integrated technology solutions across the UAE. Our core service pillars are:\n1. **Security & Surveillance** (AI CCTV, Access Control)\n2. **Audio Visual Solutions** (Smart Meetings, LED Walls)\n3. **Network & Communications** (Structured Cabling, IT)\n4. **Smart Home & Automation** (Lighting & Control)\n\nWhich of these would you like to explore in detail?",
            suggestions: ["Security & Surveillance", "Audio Visual Solutions", "Network & Communications", "Smart Home & Automation", "Get a Quote"]
        }
    ],
    SOLUTIONS_DETAIL: [
        {
            keywords: ['security', 'surveillance', 'cctv', 'camera', 'access control', 'gate barrier', 'anpr', 'facial recognition', 'people counting', 'sira', 'mcc', 'biometric', 'rfid', 'turnstile', 'nurse call', 'toilet alarm', 'government', 'safety'],
            answer: "Our **Security & Surveillance** solutions combine cutting-edge AI with robust hardware. We provide high-definition AI CCTV with facial recognition, ANPR (Automatic Number Plate Recognition), advanced access control systems (Biometric/RFID), and automated gate barriers. All systems are SIRA/MCC compliant and designed for 24/7 reliability in the UAE.",
            suggestions: ["Audio Visual Solutions", "Network & Communications", "Smart Home & Automation", "Get a Quote"]
        },
        {
            keywords: ['audio visual', 'av ', 'meeting room', 'led screen', 'video wall', 'bgm', 'public address', 'pa system', 'music system', 'conference room', 'boardroom', 'digital signage', 'led wall', 'multi-room audio', 'hospitality', 'hotel', 'retail'],
            answer: "We deliver immersive **Audio Visual Solutions** for corporate and commercial spaces. This includes smart meeting rooms (Teams/Zoom integrated), high-impact indoor/outdoor LED video walls, background music (BGM) systems, and professional Public Address (PA) systems. We focus on seamless integration and user-friendly control interfaces.",
            suggestions: ["Security & Surveillance", "Network & Communications", "Smart Home & Automation", "Get a Quote"]
        },
        {
            keywords: ['network', 'communication', 'cabling', 'it equipment', 'wi-fi', 'wifi', 'server', 'rack', 'cabinet', 'switch', 'fiber', 'fibre', 'cat 6', 'cisco', 'aruba', 'ruckus', 'structured cabling', 'ip phone', 'pbx', 'voip', 'iptv', 'smatv', 'tra', 'tdra', 'iso'],
            answer: "Our **Network & Communications** services build the backbone of your business. We specialize in TIA/EIA standard structured cabling (Fiber/Copper), enterprise-grade Wi-Fi 6 solutions, server room setups (racks, cooling, management), and full IT hardware provisioning (switches, firewalls, and storage).",
            suggestions: ["Security & Surveillance", "Audio Visual Solutions", "Smart Home & Automation", "Get a Quote"]
        },
        {
            keywords: ['smart home', 'automation', 'lighting control', 'curtain', 'blind', 'smart building', 'knx', 'zigbee', 'home automation', 'dimming', 'shades', 'motorized curtain', 'villa', 'residential'],
            answer: "Experience the future with **Smart Home & Automation**. We offer centralized control for lighting, motorized curtains/blinds, climate control, and AV systems. Using protocols like KNX and Zigbee, we create intelligent environments that are energy-efficient and can be controlled via voice, smartphone, or elegant touch panels.",
            suggestions: ["Security & Surveillance", "Audio Visual Solutions", "Network & Communications", "Get a Quote"]
        }
    ],
    GET_QUOTE: [
        {
            keywords: ['quote', 'quotation', 'price', 'pricing', 'how much', 'get a quote', 'estimate', 'schedule', 'assessment', 'site visit', 'survey', 'appointment', 'callback', 'call back', 'contact', 'reach you', 'phone', 'email', 'number'],
            answer: "Our team will contact you shortly. Please give us your details below to schedule a call back.",
            suggestions: ["Security & Surveillance", "Audio Visual Solutions", "Network & Communications", "Smart Home & Automation"]
        }
    ]
};

const SYSTEM_PROMPT = `
You are the ETS Assistant representing ELV Technology Solutions (Abu Dhabi, UAE).
You provide expert advice on Security (CCTV), AV, Networking, and Smart Automation.

GEOGRAPHY:
- We operate **ONLY within the United Arab Emirates (UAE)**.
- If a user asks about services in India, Pakistan, or any other country outside the UAE, politely state that we only provide services within the UAE.

GUIDELINES:
1. USE ONLY the provided context to answer the user's question.
2. If the answer is NOT in the context, politely say you don't have that specific information and suggest they speak to our team.
3. Keep responses professional, helpful, and concise (2-4 sentences).
4. Always mention "free site assessment" for project inquiries.
5. Do NOT mention competitors or services outside our ELV scope.
`;

function shouldCaptureLead(input: string): boolean {
    const triggers = ['quote', 'price', 'install', 'need', 'project', 'looking for', 'schedule', 'visit', 'survey', 'buy', 'cost', 'site assessment', 'call back', 'callback', 'call'];
    return triggers.some(t => input.toLowerCase().includes(t));
}

import { rateLimit, getIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
    try {
        const ip = getIp(req);
        
        // Rate limit: 10 requests per minute per IP
        if (!rateLimit(ip, { limit: 10, windowMs: 60 * 1000 })) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        // 0. CHECK ENVIRONMENT
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error("CRITICAL: GOOGLE_GENERATIVE_AI_API_KEY is missing in environment variables.");
            // We will proceed to try intents first, then fail gracefully at LLM step.
        }

        const { message, history = [] } = await req.json();
        const lowerMessage = message.toLowerCase();

        // 1. FAST PATH: Out of Scope
        const outOfScopeMatch = INTENTS.OUT_OF_SCOPE.find(item => 
            item.keywords.some(k => lowerMessage.includes(k))
        );
        if (outOfScopeMatch) {
            return NextResponse.json({ 
                text: outOfScopeMatch.answer, 
                captureLead: false, 
                suggestions: ["Our Solutions", "Service Locations", "Get a Quote"] 
            });
        }

        // 2. FAST PATH: Solution Details (Moved priority UP to catch specific services first)
        const solutionDetailMatch = INTENTS.SOLUTIONS_DETAIL.find(item => 
            item.keywords.some(k => lowerMessage.includes(k))
        );
        if (solutionDetailMatch) {
            return NextResponse.json({ text: solutionDetailMatch.answer, captureLead: false, suggestions: solutionDetailMatch.suggestions });
        }

        // 3. FAST PATH: What We Do (General list)
        const whatWeDoMatch = INTENTS.WHAT_WE_DO.find(item => 
            item.keywords.some(k => lowerMessage.includes(k))
        );
        if (whatWeDoMatch) {
            return NextResponse.json({ text: whatWeDoMatch.answer, captureLead: false, suggestions: whatWeDoMatch.suggestions });
        }

        // 4. FAST PATH: Greetings
        const greetingMatch = INTENTS.GREETINGS.find(item => 
            item.keywords.some(k => lowerMessage.includes(k)) && lowerMessage.length < 20
        );
        if (greetingMatch) {
            return NextResponse.json({ text: greetingMatch.answer, captureLead: false, suggestions: ["Our Solutions", "Service Locations"] });
        }

        // 5. FAST PATH: Geography
        const geoMatch = INTENTS.GEOGRAPHY.find(item => 
            item.keywords.some(k => lowerMessage.includes(k))
        );
        if (geoMatch) {
            return NextResponse.json({ text: geoMatch.answer, captureLead: false, suggestions: geoMatch.suggestions });
        }

        // 6. FAST PATH: Get Quote
        const getQuoteMatch = INTENTS.GET_QUOTE.find(item => 
            item.keywords.some(k => lowerMessage.includes(k))
        );
        if (getQuoteMatch) {
            return NextResponse.json({ text: getQuoteMatch.answer, captureLead: true, suggestions: getQuoteMatch.suggestions });
        }

        // 7. RAG PATH: Semantic Retrieval
        let context = "";
        try {
            context = await findRelevantContext(message);
        } catch (dbError) {
            console.error("Vector Store Error:", dbError);
            // Non-blocking: continue without context if DB isn't ready locally
        }

        // 4. LLM GENERATION: Grounded by Context
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            system: `${SYSTEM_PROMPT}\n\nCONTEXT FROM KNOWLEDGE BASE:\n${context}`,
            messages: [...history, { role: 'user', content: message }],
            temperature: 0.2, // Lower temperature for higher factuality
        });

        const captureLead = shouldCaptureLead(message) || shouldCaptureLead(text);

        // Logging
        console.log(`[RAG-Chatbot] msg: "${message}" | context: ${context ? 'found' : 'none'} | capture: ${captureLead}`);

        return NextResponse.json({ 
            text, 
            captureLead 
        });

    } catch (error: any) {
        console.error('Chatbot API Error Details:', {
            message: error.message,
            stack: error.stack,
            envSet: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
        });
        
        // Fallback for LLM Failure or unrecognized input
        const fallbackResponse = "I focus on Security, AV, and Networking solutions in the UAE. I'm afraid I don't have information on that specific topic. \n\nWould you like to explore our core services or contact our team at **+971 2 441 8186** for a consultation?";

        return NextResponse.json({ 
            text: fallbackResponse, 
            captureLead: false,
            suggestions: ["Our Solutions", "Service Locations", "Get a Quote"]
        });
    }
}
