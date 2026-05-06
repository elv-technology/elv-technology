'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
                    <Button onClick={() => reset()}>Try again</Button>
                </div>
            </body>
        </html>
    );
}
