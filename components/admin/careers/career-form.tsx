'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';
import { SuccessDialog } from '@/components/admin/success-dialog';

interface CareerFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function CareerForm({ initialData, isEditing }: CareerFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        department: initialData?.department || '',
        location: initialData?.location || 'Abu Dhabi, UAE',
        type: initialData?.type || 'Full-time',
        description: initialData?.description || '',
        requirements: initialData?.requirements ? initialData.requirements.join('\n') : '',
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.location || !formData.type || !formData.description || !formData.department || !formData.requirements) {
            toast.error('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const url = isEditing
                ? `/api/admin/careers/${initialData.id}`
                : '/api/admin/careers';

            const method = isEditing ? 'PATCH' : 'POST';

            const payload = {
                ...formData,
                requirements: formData.requirements.split('\n').map((req: string) => req.trim()).filter(Boolean)
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowSuccessDialog(true);
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            toast.error('Error saving career opening');
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessAction = () => {
        setShowSuccessDialog(false);
        router.push('/admin/careers');
        router.refresh();
    };

    return (
        <>
            <SuccessDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                title={isEditing ? "Job Updated" : "Job Created"}
                description={isEditing
                    ? "The job opening has been successfully updated."
                    : "The new job opening has been successfully created and added to the list."}
                actionLabel="Back to Careers"
                onAction={handleSuccessAction}
            />
            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{isEditing ? 'Edit Opening' : 'Add New Opening'}</h2>
                    <div className="space-x-2">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
                            <Save className="mr-2 h-4 w-4" /> {loading ? 'Saving...' : 'Save Job'}
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Senior Network Engineer"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    placeholder="e.g. Engineering"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Employment Type</Label>
                                <Input
                                    id="type"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    placeholder="e.g. Full-time"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g. Abu Dhabi"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                rows={6}
                                placeholder="Briefly describe the role and responsibilities..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements (One per line)</Label>
                            <Textarea
                                id="requirements"
                                value={formData.requirements}
                                onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                rows={6}
                                placeholder="Bachelor's degree in..."
                                required
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
