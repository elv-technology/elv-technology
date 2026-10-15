// Built-in answers for common questions, matched by keyword before falling back to the LLM.

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

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** One case-insensitive regex per keyword list, matching whole words/phrases only ("hi" must not match "this"). */
function keywordPattern(keywords: string[]) {
    const alternatives = keywords.map(k => escapeRegExp(k.trim()).replace(/\s+/g, '\\s+'));
    return new RegExp(`\\b(?:${alternatives.join('|')})\\b`, 'i');
}

type Intent = { keywords: string[]; answer: string; suggestions?: string[] };
const compile = (intents: Intent[]) => intents.map(intent => ({ ...intent, pattern: keywordPattern(intent.keywords) }));

const OUT_OF_SCOPE = compile(INTENTS.OUT_OF_SCOPE);
const SOLUTIONS_DETAIL = compile(INTENTS.SOLUTIONS_DETAIL);
const WHAT_WE_DO = compile(INTENTS.WHAT_WE_DO);
const GREETINGS = compile(INTENTS.GREETINGS);
const GEOGRAPHY = compile(INTENTS.GEOGRAPHY);
const GET_QUOTE = compile(INTENTS.GET_QUOTE);
const LEAD_TRIGGERS = keywordPattern(['quote', 'price', 'install', 'need', 'project', 'looking for', 'schedule', 'visit', 'survey', 'buy', 'cost', 'site assessment', 'call back', 'callback', 'call']);

export const DEFAULT_SUGGESTIONS = ["Our Solutions", "Service Locations", "Get a Quote"];

export const SYSTEM_PROMPT = `
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

export const FALLBACK_REPLY = "I focus on Security, AV, and Networking solutions in the UAE. I'm afraid I don't have information on that specific topic. \n\nWould you like to explore our core services or contact our team at **+971 2 441 8186** for a consultation?";

export function shouldCaptureLead(input: string): boolean {
    return LEAD_TRIGGERS.test(input);
}

export interface ChatReply {
    text: string;
    captureLead: boolean;
    suggestions?: string[];
}

/** Returns the canned reply for the first matching intent group (in priority order), or null to use the LLM. */
export function matchIntent(message: string): ChatReply | null {
    // 1. Out of scope
    const outOfScopeMatch = OUT_OF_SCOPE.find(item => item.pattern.test(message));
    if (outOfScopeMatch) {
        return { text: outOfScopeMatch.answer, captureLead: false, suggestions: DEFAULT_SUGGESTIONS };
    }

    // 2. Solution details (checked before the general list to catch specific services first)
    const solutionDetailMatch = SOLUTIONS_DETAIL.find(item => item.pattern.test(message));
    if (solutionDetailMatch) {
        return { text: solutionDetailMatch.answer, captureLead: false, suggestions: solutionDetailMatch.suggestions };
    }

    // 3. What we do (general list)
    const whatWeDoMatch = WHAT_WE_DO.find(item => item.pattern.test(message));
    if (whatWeDoMatch) {
        return { text: whatWeDoMatch.answer, captureLead: false, suggestions: whatWeDoMatch.suggestions };
    }

    // 4. Greetings
    const greetingMatch = GREETINGS.find(item => item.pattern.test(message) && message.length < 20);
    if (greetingMatch) {
        return { text: greetingMatch.answer, captureLead: false, suggestions: ["Our Solutions", "Service Locations"] };
    }

    // 5. Geography
    const geoMatch = GEOGRAPHY.find(item => item.pattern.test(message));
    if (geoMatch) {
        return { text: geoMatch.answer, captureLead: false, suggestions: geoMatch.suggestions };
    }

    // 6. Get a quote
    const getQuoteMatch = GET_QUOTE.find(item => item.pattern.test(message));
    if (getQuoteMatch) {
        return { text: getQuoteMatch.answer, captureLead: true, suggestions: getQuoteMatch.suggestions };
    }

    return null;
}
