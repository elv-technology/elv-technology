import HomeLayout from "@/components/home/home-layout";
import FaqSchema from "@/components/seo/FaqSchema";
import { getDb } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ELV Systems | ELV Company in Abu Dhabi - ETS SMART",
  description: "ELV Technology Solutions is a Security Surveillance solutions providing company in Abu Dhabi, UAE Offers CCTV camera installation, ELV system integration, and comprehensive technology services.",
  alternates: {
    canonical: "https://www.etssmart.com/",
  },
};

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

  return (
    <>
      <FaqSchema />
      <HomeLayout initialData={initialData} />
    </>
  );
}
