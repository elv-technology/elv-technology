'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CareersAdminPage() {
    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCareers();
    }, []);

    async function fetchCareers() {
        try {
            const res = await fetch('/api/admin/careers', { cache: 'no-store' });
            const data = await res.json();

            if (res.ok && Array.isArray(data)) {
                setCareers(data);
            } else {
                setCareers([]);
                // Only show error if it's not just "no data"
                if (!res.ok) toast.error('Failed to load careers');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load careers');
            setCareers([]);
        } finally {
            setLoading(false);
        }
    }

    async function deleteJob(id: string) {
        if (!confirm('Delete this job opening?')) return;
        try {
            const res = await fetch(`/api/admin/careers/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setCareers(careers.filter(c => c.id !== id));
                toast.success('Job deleted');
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast.error('Failed to delete job');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Careers</h2>
                    <p className="text-slate-500">Manage job openings.</p>
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/admin/careers/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Opening
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">Title</TableHead>
                                    <TableHead className="min-w-[150px]">Location</TableHead>
                                    <TableHead className="min-w-[100px]">Type</TableHead>
                                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                                ) : careers.length === 0 ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">No careers found. Add one above.</TableCell></TableRow>
                                ) : (
                                    careers.map((job) => (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-medium">{job.title}</TableCell>
                                            <TableCell>{job.location}</TableCell>
                                            <TableCell>{job.type}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/careers/edit/${job.id}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => deleteJob(job.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
