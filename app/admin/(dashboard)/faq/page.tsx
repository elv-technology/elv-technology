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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FaqAdminPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => { fetchContent(); }, []);

    async function fetchContent() {
        try {
            const res = await fetch('/api/admin/faq');
            const data = await res.json();
            setFaqs(Array.isArray(data) ? data : []);
        } catch (error) { toast.error('Failed to load FAQs'); }
        finally { setLoading(false); }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const itemData = {
            question: formData.get('question'),
            answer: formData.get('answer'),
        };

        try {
            const url = editing
                ? `/api/admin/faq/${editing.id}`
                : '/api/admin/faq';

            const method = editing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editing) {
                    setFaqs(faqs.map(f => f.id === editing.id ? saved : f));
                    toast.success('FAQ updated');
                } else {
                    setFaqs([saved, ...faqs]);
                    toast.success('FAQ added');
                }
                setIsDialogOpen(false);
                setEditing(null);
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) { toast.error('Error saving'); }
    };

    async function deleteItem(id: string) {
        if (!confirm('Delete this FAQ?')) return;
        try {
            const res = await fetch(`/api/admin/faq/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setFaqs(faqs.filter(f => f.id !== id));
                toast.success('FAQ deleted');
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) { toast.error('Error'); }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">FAQs</h2>
                    <p className="text-slate-500">Manage frequently asked questions.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditing(null);
                }}>
                    <DialogTrigger asChild><Button className="bg-red-600 hover:bg-red-700"><Plus className="mr-2 h-4 w-4" /> Add FAQ</Button></DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader><DialogTitle>{editing ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle></DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Question</Label>
                                <Input name="question" defaultValue={editing?.question} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Answer</Label>
                                <Textarea name="answer" defaultValue={editing?.answer} rows={5} required />
                            </div>
                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Save FAQ</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[250px] w-[40%]">Question</TableHead>
                                    <TableHead className="min-w-[250px]">Answer Preview</TableHead>
                                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
                                ) : faqs.length === 0 ? (
                                    <TableRow><TableCell colSpan={3} className="text-center">No FAQs found.</TableCell></TableRow>
                                ) : (
                                    faqs.map((f) => (
                                        <TableRow key={f.id}>
                                            <TableCell className="font-medium">{f.question}</TableCell>
                                            <TableCell className="max-w-xs truncate text-slate-500">{f.answer}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" onClick={() => { setEditing(f); setIsDialogOpen(true); }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => deleteItem(f.id)}>
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
