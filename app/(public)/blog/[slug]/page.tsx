import BlogSlugPage from "@/components/blog/blog-slug-page";
import { getCollection } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const posts = await getCollection('blogs', { take: 500 }) as any[];
        const post = posts.find((p: any) => p.slug === params.slug);

        if (!post) {
            return {
                title: "Blog Post Not Found | ETS Smart",
            };
        }

        const description = post.excerpt || post.description || `${post.title} - Expert ELV & AV insights from ETS Smart Abu Dhabi UAE.`;
        const url = `https://www.etssmart.com/blog/${params.slug}`;

        return {
            title: `${post.title} | ETS Smart`,
            description: description,
            alternates: {
                canonical: url,
            },
            openGraph: {
                title: post.title,
                description: description,
                url: url,
                type: "article",
                images: post.image ? [{ url: post.image }] : undefined,
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: description,
                images: post.image ? [post.image] : undefined,
            },
        };
    } catch (e) {
        return {
            title: "Blog Post | ETS Smart",
        };
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    let post: any = null;
    try {
        const posts = await getCollection('blogs', { includeContent: true, take: 500 }) as any[];
        post = posts.find((p: any) => p.slug === params.slug);
    } catch (e) {
        console.error("Error loading blog post:", e);
    }

    if (!post) {
        notFound();
    }

    const description = post.excerpt || post.description || `${post.title} - Expert ELV & AV insights from ETS Smart Abu Dhabi UAE.`;
    const url = `https://www.etssmart.com/blog/${params.slug}`;

    return (
        <>
            <ArticleSchema
                title={post.title}
                description={description}
                url={url}
                image={post.image || undefined}
                datePublished={post.createdAt ? new Date(post.createdAt).toISOString() : post.date ? new Date(post.date).toISOString() : undefined}
                authorName={post.author || "ETS Smart Team"}
            />
            <BlogSlugPage post={post} />
        </>
    );
}


