import { notFound } from 'next/navigation';
import * as blogs from '@/lib/services/blogs';
import { BlogForm } from '@/components/admin/blogs/blog-form';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
    const blog = await blogs.getBySlug(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <BlogForm initialData={blog} isEditing />
        </div>
    );
}
