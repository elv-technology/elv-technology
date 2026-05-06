import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
                Could not find requested resource
            </p>
            <Link href="/" className="mt-4">
                <Button variant="outline">Return Home</Button>
            </Link>
        </div>
    );
}
