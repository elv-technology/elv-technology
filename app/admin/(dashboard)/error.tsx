"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminError({
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
        <Card className="max-w-xl mx-auto mt-10 border-slate-200 dark:border-slate-800 shadow-xl rounded-[2rem] bg-white dark:bg-slate-900">
            <CardContent className="flex flex-col items-center text-center p-10">
                <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-full mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Something went wrong</h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                    This page failed to load. Please try again, and if the problem persists check the server logs.
                </p>
                {error.digest && <p className="text-[11px] text-slate-400 mt-3">Error ID: {error.digest}</p>}
                <Button onClick={reset} className="mt-6 bg-red-600 hover:bg-red-700">
                    <RotateCcw className="mr-2 h-4 w-4" /> Try again
                </Button>
            </CardContent>
        </Card>
    );
}
