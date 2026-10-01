import BlogSlugPage from "@/components/blog/blog-slug-page";
import { getBlogBySlug, getCollection } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticleSchema from "@/components/seo/ArticleSchema";
import { formatContent } from "@/lib/format-content";
import { sanitizeHtml } from "@/lib/sanitize";
import { blogMetaTitle, fitDescription, metaDescription } from "@/lib/seo";

export const revalidate = 3600;

// Pre-builds every published post at deploy time and makes the route cacheable: without this, Next.js 14
// renders [slug] pages on every request (hitting the database each time) despite `revalidate`.
// Posts added later are built on their first visit, then cached the same way.
export async function generateStaticParams() {
    const posts = (await getCollection('blogs', { take: 500 })) as { slug: string }[];
    return posts.map((post) => ({ slug: post.slug }));
}

// Database errors are deliberately not caught here: a thrown error lets Next.js keep serving the last
// good cached version of the page, whereas returning "not found" would cache a 404 for a real post.

const getDescription = (post: any) =>
    post.excerpt || post.description || `${post.title} - Expert ELV & AV insights from ETS Smart Abu Dhabi UAE.`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        return {
            title: "Blog Post Not Found | ETS Smart",
        };
    }

    const description = metaDescription(post.seoDescription, getDescription(post));
    const url = `https://www.etssmart.com/blog/${params.slug}`;

    return {
        title: { absolute: blogMetaTitle(post.title, post.seoTitle) },
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
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const url = `https://www.etssmart.com/blog/${params.slug}`;

    // Render the content to HTML and strip anything unsafe on the server, before it reaches the page.
    const safePost = { ...post, content: sanitizeHtml(formatContent(post.content)) };

    return (
        <>
            <ArticleSchema
                title={post.title}
                description={fitDescription(getDescription(post), 300)}
                url={url}
                image={post.image || undefined}
                datePublished={post.createdAt ? new Date(post.createdAt).toISOString() : post.date ? new Date(post.date).toISOString() : undefined}
                authorName={post.author || "ETS Smart Team"}
            />
            <BlogSlugPage post={safePost} />
        </>
    );
}
