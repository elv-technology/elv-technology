import HomeLayout from "@/components/home/home-layout";
import { getDb } from "@/lib/db";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { priority: 'asc' },
      { createdAt: 'desc' }
    ],
    take: 3
  });

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const faqs = await prisma.fAQ.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const initialData = {
    caseStudies,
    blogs,
    testimonials,
    faqs
  };

  return <HomeLayout initialData={initialData} />;
}
