import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogForm } from '@/components/admin/blogs/blog-form';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
    const blog = await prisma.blog.findUnique({
        where: { slug: params.slug },
    });

    if (!blog) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <BlogForm initialData={blog} isEditing />
        </div>
    );
}
