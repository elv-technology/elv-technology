'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { SuccessDialog } from '@/components/admin/success-dialog';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        title: '',
        slug: '',
        excerpt: '',
        author: 'ELV Technology Solutions',
        category: '',
        image: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });

    if (initialData && !formData.date) {
        formData.date = initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    }

    // Handle initial data parsing if it's the old JSON sections format (migration fallback)
    if (isEditing && formData.content && typeof formData.content === 'string') {
        try {
            const parsed = JSON.parse(formData.content);
            if (parsed.sections) {
                // If it's the old format, we just show a warning or clear it out.
                // For a proper migration, a DB script should convert it, 
                // but we will protect the editor from crashing here.
                formData.content = '<p><em>Content needs migration from old format...</em></p>';
            }
        } catch (e) {
            // It's likely already standard HTML, leave it be.
        }
    }

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.excerpt || !formData.category || !formData.image) {
            toast.error('Please fill in all required fields and upload an image');
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = formData.image;
            
            // Upload file if it's a new File object
            if (formData.image instanceof File) {
                toast.loading('Uploading image...', { id: 'upload-toast' });
                
                const { uploadFiles } = await import('@/lib/uploadthing');
                const res = await uploadFiles("imageUploader", {
                    files: [formData.image],
                });
                
                if (res && res[0]) {
                    finalImageUrl = res[0].url;
                    toast.dismiss('upload-toast');
                } else {
                    toast.dismiss('upload-toast');
                    throw new Error('Failed to upload image');
                }
            }

            const url = isEditing
                ? `/api/admin/blogs/${initialData.id}`
                : '/api/admin/blogs';

            const method = isEditing ? 'PATCH' : 'POST';

            const payload = {
                ...formData,
                image: finalImageUrl,
                content: formData.content,
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
            toast.error('Error saving blog');
        } finally {
            setLoading(false);
            toast.dismiss('upload-toast');
        }
    };

    const handleSuccessAction = () => {
        setShowSuccessDialog(false);
        router.push('/admin/blogs');
        router.refresh();
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <>
            <SuccessDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                title={isEditing ? "Blog Updated" : "Blog Created"}
                description={isEditing
                    ? "Your blog post has been successfully updated."
                    : "Your new blog post has been successfully created and added to the list."}
                actionLabel="Back to Blogs"
                onAction={handleSuccessAction}
            />
            <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
                    <div className="space-x-2">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
                            <Save className="mr-2 h-4 w-4" /> {loading ? 'Saving...' : 'Save Blog'}
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">General Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={e => {
                                        const title = e.target.value;
                                        setFormData((prev: any) => ({
                                            ...prev, 
                                            title,
                                            slug: !isEditing ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                                        }));
                                    }}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL friendly)</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Hero Image</Label>
                                <ImageUpload
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                    onRemove={() => setFormData({ ...formData, image: '' })}
                                    endpoint="imageUploader"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Short Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Publish Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Blog Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-white rounded-md">
                            <QuillEditor
                                theme="snow"
                                value={formData.content}
                                onChange={(value) => setFormData({ ...formData, content: value })}
                                modules={modules}
                                className="h-[400px] mb-12"
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
