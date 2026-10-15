import { preload } from "react-dom";
import HomeLayout from "@/components/home/home-layout";
import FaqSchema from "@/components/seo/FaqSchema";
import { getCollection } from "@/lib/db";
import { faqsOrFallback } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ELV Companies Abu Dhabi | MCC Approved | ETS Smart",
  description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation. Trusted by 100+ enterprise clients in UAE.",
  path: "/",
});

export default async function HomePage() {
  // The hero video's poster is the home page's LCP image.
  preload("/images/home/hero_poster.jpg", { as: "image", fetchPriority: "high" });

  const [caseStudies, testimonials, dbFaqs, clients, partners] = await Promise.all([
    getCollection('case-studies', { take: 3 }),
    getCollection('testimonials', { take: 100 }),
    getCollection('faqs', { take: 100 }),
    getCollection('clients', { take: 500 }),
    getCollection('partners', { take: 500 }),
  ]);
  const faqs = faqsOrFallback(dbFaqs);

  return (
    <>
      <FaqSchema faqs={faqs} />
      <HomeLayout
        caseStudies={caseStudies}
        testimonials={testimonials}
        faqs={faqs}
        clients={clients}
        partners={partners}
      />
    </>
  );
}
