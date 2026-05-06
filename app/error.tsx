'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
                We apologize for the inconvenience. Please try again.
            </p>
            <Button
                className="mt-4"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
}
