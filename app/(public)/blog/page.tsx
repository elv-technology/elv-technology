import { Metadata } from "next";
import BlogHero from '@/components/blog/blog-hero';
import BlogList from '@/components/blog/blog-list';
import { getCollection } from '@/lib/db';
import { Blog } from '@prisma/client';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/blog",
  },
};


export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
    const posts = await getCollection('blogs', { take: 10 }) as Blog[];

    return (
        <main>
            <BlogHero />
            <BlogList initialPosts={posts} />
        </main>
    );
}
