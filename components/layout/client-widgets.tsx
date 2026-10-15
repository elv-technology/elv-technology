'use client';

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/chatbot/chatbot"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/scroll-to-top"), { ssr: false });

export default function ClientWidgets() {
    return (
        <>
            <ScrollToTop />
            <Chatbot />
        </>
    );
}
