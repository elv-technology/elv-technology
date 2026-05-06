'use client';


import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CaseStudiesAdminPage() {
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    async function fetchCaseStudies() {
        try {
            const res = await fetch('/api/admin/case-studies');
            if (res.ok) {
                const data = await res.json();
                setCaseStudies(data);
            } else {
                setCaseStudies([]);
                toast.error('Failed to load case studies');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load case studies');
            setCaseStudies([]);
        } finally {
            setLoading(false);
        }
    }

    async function deleteCaseStudy(id: string) {
        if (!confirm('Are you sure you want to delete this case study?')) return;

        try {
            const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setCaseStudies(caseStudies.filter(c => c.id !== id && c.slug !== id));
                toast.success('Case study deleted successfully');
            } else {
                toast.error('Failed to delete case study');
            }
        } catch (error) {
            toast.error('Failed to delete case study');
        }
    }

    const filtered = caseStudies.filter(c =>
        c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Case Studies</h2>
                    <p className="text-slate-500">Manage your project portfolio and success stories.</p>
                </div>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/admin/case-studies/new">
                        <Plus className="mr-2 h-4 w-4" /> Add New Case Study
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by client or project name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto text-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[180px]">Client</TableHead>
                                    <TableHead className="min-w-[180px]">Project</TableHead>
                                    <TableHead className="min-w-[120px]">Location</TableHead>
                                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">Loading...</TableCell>
                                    </TableRow>
                                ) : filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">No case studies found.</TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((cs) => (
                                        <TableRow key={cs.slug}>
                                            <TableCell className="font-medium">
                                                {cs.client}
                                                {cs.isFeatured && (
                                                    <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                                                        Priority
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>{cs.project}</TableCell>
                                            <TableCell>{cs.location}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/case-studies/edit/${cs.slug}`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-600 border-red-100 hover:bg-red-50"
                                                    onClick={() => deleteCaseStudy(cs.id)}
                                                >
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
