import { pageMetadata } from '@/lib/seo';
import BlogHero from '@/components/blog/blog-hero';
import BlogList from '@/components/blog/blog-list';
import { getCollection } from '@/lib/db';

export const metadata = pageMetadata({
  title: "ELV & AV Technology Blog Abu Dhabi | ETS Smart",
  description: "Read expert insights on ELV systems, CCTV, access control, AV solutions & structured cabling in Abu Dhabi. Stay informed with ETS Smart's knowledge hub.",
  path: "/blog",
});


export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
    // All published posts (without full content) so every article is linked from /blog and searchable.
    const posts = await getCollection('blogs', { take: 500 });

    return (
        <div>
            <BlogHero />
            <BlogList initialPosts={posts} />
        </div>
    );
}
