import BlogSlugPage from "@/components/blog/blog-slug-page";
import { getCollection } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Blog } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const posts = await getCollection('blogs', { take: 500 }) as Blog[];
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
        return {
            title: "Blog Post Not Found | ETS Smart",
        };
    }

    return {
        title: `${post.title} | ETS Smart`,
        description: post.excerpt || `${post.title} - Read expert insights from ETS Smart, a leading ELV & AV integrator in Abu Dhabi, UAE.`,
        alternates: {
            canonical: `https://www.etssmart.com/blog/${params.slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const posts = await getCollection('blogs', { includeContent: true, take: 500 }) as Blog[];
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // We no longer need to parse JSON sections since React Quill outputs HTML strings
    return <BlogSlugPage post={post} />;
}
