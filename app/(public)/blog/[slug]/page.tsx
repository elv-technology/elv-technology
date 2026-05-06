import BlogSlugPage from "@/components/blog/blog-slug-page";
import { getCollection } from "@/lib/db";
import { notFound } from "next/navigation";

import { Blog } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const posts = await getCollection('blogs', { includeContent: true, take: 500 }) as Blog[];
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // We no longer need to parse JSON sections since React Quill outputs HTML strings
    return <BlogSlugPage post={post} />;
}
