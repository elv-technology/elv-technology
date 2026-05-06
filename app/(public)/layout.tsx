
'use client';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot/chatbot";
import ScrollToTop from "@/components/layout/scroll-to-top";
import LoadingScreen from "@/components/ui/loading-screen";
import { LoadingProvider, useLoading } from "@/hooks/use-loading";

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

