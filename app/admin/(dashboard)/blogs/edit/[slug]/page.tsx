'use client';

import { useEffect, useState, use } from 'react';
import { BlogForm } from '@/components/admin/blogs/blog-form';
import { toast } from 'sonner';


export default function EditBlogPage({ params }: { params: { slug: string } }) {
    const resolvedParams = params;
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch('/api/admin/blogs');
                const blogs = await res.json();

                if (res.ok && Array.isArray(blogs)) {
                    const found = blogs.find((b: any) => b.slug === resolvedParams.slug);
                    if (found) {
                        setBlog(found);
                    } else {
                        toast.error('Blog not found');
                    }
                } else {
                    toast.error('Failed to load blog');
                }
            } catch (error) {
                toast.error('Failed to load blog');
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [resolvedParams.slug]);

    if (loading) return <div>Loading...</div>;
    if (!blog) return <div>Blog not found</div>;

    return (
        <div className="space-y-6">
            <BlogForm initialData={blog} isEditing />
        </div>
    );
}
