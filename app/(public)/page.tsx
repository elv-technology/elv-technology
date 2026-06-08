import HomeLayout from "@/components/home/home-layout";
import FaqSchema from "@/components/seo/FaqSchema";
import { getDb } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ELV Companies in Abu Dhabi | MCC Approved – ETS Smart",
  description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation. Trusted by 100+ enterprise clients in UAE.",
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
