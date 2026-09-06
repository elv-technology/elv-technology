
'use client';

import dynamic from "next/dynamic";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoadingScreen from "@/components/ui/loading-screen";
import { LoadingProvider, useLoading } from "@/hooks/use-loading";

const Chatbot = dynamic(() => import("@/components/chatbot/chatbot"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/layout/scroll-to-top"), { ssr: false });

function PublicLayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoading } = useLoading();

    return (
        <>
            <LoadingScreen isLoading={isLoading} />
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <Chatbot />
        </>
    );
}

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LoadingProvider>
            <PublicLayoutContent>{children}</PublicLayoutContent>
        </LoadingProvider>
    );
}

