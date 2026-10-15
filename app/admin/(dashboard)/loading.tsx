import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
    return (
        <div className="space-y-6" aria-busy="true" aria-live="polite">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48 bg-slate-200 dark:bg-slate-800" />
                    <Skeleton className="h-4 w-72 bg-slate-200 dark:bg-slate-800" />
                </div>
                <Skeleton className="h-10 w-36 bg-slate-200 dark:bg-slate-800" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-full max-w-sm bg-slate-200 dark:bg-slate-800" />
                </CardHeader>
                <CardContent className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full bg-slate-100 dark:bg-slate-800/60" />
                    ))}
                </CardContent>
            </Card>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
