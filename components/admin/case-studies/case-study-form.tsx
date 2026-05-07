'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, X, Plus, Trash2, List, Info } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { SuccessDialog } from '@/components/admin/success-dialog';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};

interface CaseStudyFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function CaseStudyForm({ initialData, isEditing }: CaseStudyFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        slug: '',
        client: '',
        project: '',
        location: '',
        overview: '',
        challenges: [],
        solution: {
            title: 'Engineered and Implemented Solution',
            html: ''
        },
        outcomes: [],
        image: '',
        gallery: [],
        isFeatured: false,
        priority: initialData?.priority || 0
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.client || !formData.project || !formData.overview || !formData.image) {
            toast.error('Please fill in all required fields and upload a featured image');
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.image;
            let finalGallery = [...formData.gallery];
            
            const { uploadFiles } = await import('@/lib/uploadthing');

            // 1. Upload featured image if it's a new File
            if (formData.image instanceof File) {
                toast.loading('Uploading featured image...', { id: 'upload-toast' });
                const res = await uploadFiles("imageUploader", { files: [formData.image] });
                if (res && res[0]) {
                    finalImageUrl = res[0].url;
                } else {
                    throw new Error('Failed to upload featured image');
                }
            }

            // 2. Upload gallery images if they are new Files
            const newGalleryFiles = finalGallery.filter(f => f instanceof File) as File[];
            if (newGalleryFiles.length > 0) {
                toast.loading('Uploading gallery images...', { id: 'upload-toast' });
                const res = await uploadFiles("galleryUploader", { files: newGalleryFiles });
                if (res) {
                    let uploadIndex = 0;
                    finalGallery = finalGallery.map(item => {
                        if (item instanceof File) {
                            return res[uploadIndex++].url;
                        }
                        return item;
                    });
                } else {
                    throw new Error('Failed to upload gallery images');
                }
            }

            toast.loading('Saving case study...', { id: 'upload-toast' });

            const url = isEditing
                ? `/api/admin/case-studies/${initialData.id}`
                : '/api/admin/case-studies';

            const method = isEditing ? 'PATCH' : 'POST';

            const payload = {
                ...formData,
                image: finalImageUrl,
                gallery: finalGallery,
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
            toast.error('Error saving case study');
        } finally {
            setLoading(false);
            toast.dismiss('upload-toast');
        }
    };

    const handleSuccessAction = () => {
        setShowSuccessDialog(false);
        router.push('/admin/case-studies');
        router.refresh();
    };

    const addItem = (field: 'challenges' | 'outcomes' | 'gallery') => {
        setFormData({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const removeItem = (field: 'gallery', index: number) => {
        const items = [...formData[field]];
        items.splice(index, 1);
        setFormData({ ...formData, [field]: items });
    };

    return (
        <>
            <SuccessDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                title={isEditing ? "Case Study Updated" : "Case Study Created"}
                description={isEditing
                    ? "The case study has been successfully updated."
                    : "The new case study has been successfully created and added to the portfolio."}
                actionLabel="Back to Case Studies"
                onAction={handleSuccessAction}
            />
            <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
                <div className="flex items-center justify-between sticky top-0 bg-slate-50/90 py-4 z-10">
                    <h2 className="text-2xl font-bold">{isEditing ? 'Edit Case Study' : 'New Case Study'}</h2>
                    <div className="space-x-2">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
                            <Save className="mr-2 h-4 w-4" /> {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Project Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="client">Client Name</Label>
                                <Input id="client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="project">Project Title</Label>
                                <Input
                                    id="project"
                                    value={formData.project}
                                    onChange={e => {
                                        const project = e.target.value;
                                        setFormData((prev: any) => ({
                                            ...prev,
                                            project,
                                            slug: !isEditing ? project.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                                        }));
                                    }}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="pt-2">
                                <Label htmlFor="isFeatured" className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        className="w-4 h-4 text-red-600 focus:ring-red-500 rounded border-slate-300"
                                    />
                                    Feature on Home / Priority
                                </Label>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-6">Priority case studies always appear first on the frontend case studies listing.</p>
                            </div>
                            {formData.isFeatured && (
                                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label htmlFor="priority">Display Priority (Rank)</Label>
                                    <Input
                                        type="number"
                                        id="priority"
                                        value={formData.priority}
                                        onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                                        min={1}
                                        max={100}
                                        className="w-32"
                                    />
                                    <p className="text-[10px] text-slate-400 italic">Sets the sorting order. 1 is highest priority. Lower numbers appear first.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="text-lg">Images</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Featured Image</Label>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                    onRemove={() => setFormData({ ...formData, image: '' })}
                                    endpoint="imageUploader"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center mb-2">
                                    <Label>Gallery Images</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('gallery')}>+ Add Image</Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {formData.gallery.map((path: string, i: number) => (
                                        <div key={i} className="relative">
                                            <ImageUpload
                                                value={path}
                                                onChange={(url) => {
                                                    const gallery = [...formData.gallery];
                                                    gallery[i] = url;
                                                    setFormData({ ...formData, gallery });
                                                }}
                                                onRemove={() => removeItem('gallery', i)}
                                                endpoint="galleryUploader"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
                    <CardContent>
                        <Textarea value={formData.overview} onChange={e => setFormData({ ...formData, overview: e.target.value })} rows={4} required />
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">Challenges</CardTitle>
                            <p className="text-sm text-slate-500 flex items-center gap-1"><Info className="h-4 w-4" /> Type each challenge on a new line. It will automatically bullet them.</p>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                rows={8}
                                placeholder="Challenge 1&#10;Challenge 2&#10;Challenge 3"
                                value={formData.challenges.join('\n')}
                                onChange={e => setFormData({ ...formData, challenges: e.target.value.split('\n').filter(Boolean) })}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">Outcomes</CardTitle>
                            <p className="text-sm text-slate-500 flex items-center gap-1"><Info className="h-4 w-4" /> Type each outcome on a new line. It will automatically list them.</p>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                rows={8}
                                placeholder="Outcome 1&#10;Outcome 2&#10;Outcome 3"
                                value={formData.outcomes.join('\n')}
                                onChange={e => setFormData({ ...formData, outcomes: e.target.value.split('\n').filter(Boolean) })}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Solution</CardTitle>
                        <p className="text-sm text-slate-500">Provide the detailed solution implemented. Use the rich text editor to format as needed.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Solution Title</Label>
                            <Input
                                value={formData.solution.title}
                                onChange={e => setFormData({ ...formData, solution: { ...formData.solution, title: e.target.value } })}
                                placeholder="E.g., Engineered and Implemented Solution"
                            />
                        </div>
                        <div className="space-y-2">
                            {/* Form Input Container */}
                            <div className="bg-white [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:text-slate-700">
                                <QuillEditor
                                    theme="snow"
                                    value={formData.solution.html || ''}
                                    onChange={(content) => setFormData({ ...formData, solution: { ...formData.solution, html: content } })}
                                    modules={modules}
                                    className="rounded-md"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
