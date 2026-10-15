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
import { ImageUpload } from '@/components/admin/image-upload';
import { SuccessDialog } from '@/components/admin/success-dialog';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { SeoFields } from '@/components/admin/seo-fields';
import { blogMetaTitle } from '@/lib/seo';
import { slugify } from '@/lib/utils';
import { getErrorMessage } from '@/lib/admin/fetch-json';
import { resolveImage, saveEntity } from '@/lib/admin/save-entity';
import type { ClientRecord, ImageValue } from '@/lib/admin/types';
import type { Blog } from '@prisma/client';

interface BlogFormProps {
    initialData?: ClientRecord<Blog>;
    isEditing?: boolean;
}

interface BlogFormData {
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    category: string;
    image: ImageValue;
    content: string;
    date: string;
    seoTitle: string;
    seoDescription: string;
}

const LEGACY_CONTENT_NOTICE = '<p><em>Content needs migration from old format...</em></p>';

function toDateInput(value?: Date | string | null): string {
    const date = value ? new Date(value) : new Date();
    return (Number.isNaN(date.getTime()) ? new Date() : date).toISOString().split('T')[0];
}

/** Old posts stored content as JSON `{ sections }`; show a notice instead of crashing the editor. */
function normalizeContent(content: string): string {
    try {
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed === 'object' && 'sections' in parsed) return LEGACY_CONTENT_NOTICE;
    } catch {
        // Already HTML.
    }
    return content;
}

function toFormData(initialData?: ClientRecord<Blog>): BlogFormData {
    return {
        title: initialData?.title ?? '',
        slug: initialData?.slug ?? '',
        excerpt: initialData?.excerpt ?? '',
        author: initialData?.author ?? 'ELV Technology Solutions',
        category: initialData?.category ?? '',
        image: initialData?.image ?? '',
        content: initialData?.content ? normalizeContent(initialData.content) : '',
        date: toDateInput(initialData?.date),
        seoTitle: initialData?.seoTitle ?? '',
        seoDescription: initialData?.seoDescription ?? '',
    };
}

export function BlogForm({ initialData, isEditing }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<BlogFormData>(() => toFormData(initialData));
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.excerpt || !formData.category || !formData.image) {
            toast.error('Please fill in all required fields and upload an image');
            return;
        }

        setLoading(true);

        try {
            if (formData.image instanceof File) {
                toast.loading('Uploading image...', { id: 'upload-toast' });
            }
            const image = await resolveImage(formData.image);
            toast.dismiss('upload-toast');

            await saveEntity('blogs', isEditing ? initialData?.id : undefined, { ...formData, image });
            setShowSuccessDialog(true);
        } catch (error) {
            toast.error(getErrorMessage(error, 'Error saving blog'));
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
                                        setFormData(prev => ({
                                            ...prev,
                                            title,
                                            slug: !isEditing ? slugify(title) : prev.slug
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
                            <SeoFields
                                seoTitle={formData.seoTitle}
                                seoDescription={formData.seoDescription}
                                onChange={(field, value) => setFormData({ ...formData, [field]: value })}
                                defaultTitle={blogMetaTitle(formData.title || '')}
                                defaultDescription={formData.excerpt || ''}
                            />
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
