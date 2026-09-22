import HomeLayout from "@/components/home/home-layout";
import FaqSchema from "@/components/seo/FaqSchema";
import { getCollection } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "ELV Companies Abu Dhabi | MCC Approved | ETS Smart"
  },
  description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation. Trusted by 100+ enterprise clients in UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/",
  },
};

export default async function HomePage() {
  const caseStudies = await getCollection('case-studies', { take: 3 });
  const blogs = await getCollection('blogs', { take: 3 });
  const testimonials = await getCollection('testimonials');
  const faqs = await getCollection('faqs');

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
