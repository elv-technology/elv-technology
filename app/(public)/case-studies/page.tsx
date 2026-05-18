import { Metadata } from "next";
import Hero from '@/components/case-studies/hero';
import CaseStudiesList from '@/components/case-studies/case-studies-list';
import { getCollection } from '@/lib/db';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/case-studies",
  },
};


export const revalidate = 3600; // Revalidate every hour

export default async function CaseStudies() {
  const caseStudies = await getCollection('case-studies', { take: 10 });

  return (
    <main>
      <Hero />
      <CaseStudiesList initialData={caseStudies as any[]} />
    </main>
  );
}
