import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

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

  // Dynamic Blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Dynamic Case Studies routes
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      select: { slug: true, updatedAt: true },
    });
    caseStudyRoutes = caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: study.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching case studies for sitemap:", error);
  }

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
