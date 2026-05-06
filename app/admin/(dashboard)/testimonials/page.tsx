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
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from '@/components/admin/image-upload';

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        content: '',
        rating: 5,
        date: '',
        isNew: false
    });

    useEffect(() => { fetchContent(); }, []);

    useEffect(() => {
        if (editing) {
            setFormData({
                content: editing.content,
                rating: editing.rating,
                date: editing.date || '',
                isNew: editing.isNew || false
            });
        } else {
            setFormData({
                content: '',
                rating: 5,
                date: '',
                isNew: false
            });
        }
    }, [editing, isDialogOpen]);

    async function fetchContent() {
        try {
            const res = await fetch('/api/admin/content');
            const data = await res.json();
            setTestimonials(data.testimonials || []);
        } catch (error) { toast.error('Failed to load testimonials'); }
        finally { setLoading(false); }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const url = editing
                ? `/api/admin/testimonials/${editing.id}`
                : '/api/admin/testimonials';

            const method = editing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const responseData = await res.json();

            if (res.ok) {
                if (editing) {
                    setTestimonials(testimonials.map(t => t.id === editing.id ? responseData : t));
                    toast.success('Testimonial updated successfully!');
                } else {
                    setTestimonials([responseData, ...testimonials]);
                    toast.success('Testimonial added successfully!');
                }
                setIsDialogOpen(false);
                setEditing(null);
            } else {
                throw new Error(responseData.error || 'Failed to save testimonial');
            }
        } catch (error: any) {
            toast.error(error.message || 'An unexpected error occurred while saving.');
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    async function deleteItem(id: string) {
        if (!confirm('Delete this testimonial?')) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setTestimonials(testimonials.filter(t => t.id !== id));
                toast.success('Testimonial deleted');
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) { toast.error('Error'); }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
                    <p className="text-slate-500">Manage client reviews and feedback.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditing(null);
                }}>
                    <DialogTrigger asChild><Button className="bg-red-600 hover:bg-red-700"><Plus className="mr-2 h-4 w-4" /> Add Review</Button></DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>{editing ? 'Edit Review' : 'Add Review'}</DialogTitle></DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4 py-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Review Date</Label>
                                        <Input
                                            type="date"
                                            max={new Date().toISOString().split('T')[0]}
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Rating: {formData.rating}</Label>
                                        <Slider
                                            min={1}
                                            max={5}
                                            step={0.5}
                                            value={[formData.rating]}
                                            onValueChange={([val]) => setFormData({ ...formData, rating: val })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Review Content</Label>
                                    <span className="text-xs text-slate-500">
                                        {formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0} / 50 words
                                    </span>
                                </div>
                                <Textarea
                                    value={formData.content}
                                    onChange={e => {
                                        const text = e.target.value;
                                        const words = text.trim() ? text.trim().split(/\s+/) : [];
                                        if (words.length <= 50 || text.length < formData.content.length) {
                                            setFormData({ ...formData, content: text });
                                        }
                                    }}
                                    rows={4}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Testimonial'}
                            </Button>
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
                                    <TableHead className="min-w-[120px]">Date</TableHead>
                                    <TableHead className="min-w-[100px]">Rating</TableHead>
                                    <TableHead className="min-w-[300px]">Content</TableHead>
                                    <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
                                ) : testimonials.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="text-center">No testimonials found.</TableCell></TableRow>
                                ) : (
                                    testimonials.map((t) => (
                                        <TableRow key={t.id}>
                                            <TableCell className="font-medium whitespace-nowrap">{t.date}</TableCell>
                                            <TableCell><div className="flex items-center gap-1">{t.rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /></div></TableCell>
                                            <TableCell className="max-w-md truncate">{t.content}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" onClick={() => { setEditing(t); setIsDialogOpen(true); }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => deleteItem(t.id)}>
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
