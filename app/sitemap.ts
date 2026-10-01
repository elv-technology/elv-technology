import { MetadataRoute } from "next";
import { getCollection } from "@/lib/db";

// Regenerate at most once an hour so new posts appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.etssmart.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/solutions/security-surveillance",
    "/solutions/audio-visual",
    "/solutions/network-communications",
    "/solutions/home-automation",
    "/partners-clients",
    "/case-studies",
    "/blog",
    "/contact",
    "/careers",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Database errors are not caught: a failed refresh keeps the last good sitemap instead of
  // publishing one without any blog posts or case studies.
  const [blogs, caseStudies] = (await Promise.all([
    getCollection("blogs", { take: 500 }),
    getCollection("case-studies", { take: 500 }),
  ])) as [any[], any[]];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study: any) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: study.updatedAt ? new Date(study.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}

