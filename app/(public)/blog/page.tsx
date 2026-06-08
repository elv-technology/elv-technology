import { Metadata } from "next";
import BlogHero from '@/components/blog/blog-hero';
import BlogList from '@/components/blog/blog-list';
import { getCollection } from '@/lib/db';
import { Blog } from '@prisma/client';

export const metadata: Metadata = {
  title: "ELV & AV Technology Blog Abu Dhabi | ETS Smart UAE",
  description: "Read expert insights on ELV systems, CCTV, access control, AV solutions & structured cabling in Abu Dhabi. Stay informed with ETS Smart's knowledge hub.",
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
