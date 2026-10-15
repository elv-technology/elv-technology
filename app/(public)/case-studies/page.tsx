import { pageMetadata } from '@/lib/seo';
import Hero from '@/components/case-studies/hero';
import CaseStudiesList from '@/components/case-studies/case-studies-list';
import { getCollection } from '@/lib/db';

export const metadata = pageMetadata({
  title: "ELV Projects & Case Studies Abu Dhabi | ETS Smart",
  description: "Explore ETS Smart's real ELV & AV project case studies in Abu Dhabi Ritz Carlton, Hyatt, Sheraton & Abu Dhabi Ports. Proven results across UAE sectors.",
  path: "/case-studies",
});


export const revalidate = 3600; // Revalidate every hour

export default async function CaseStudies() {
  const caseStudies = await getCollection('case-studies', { take: 10 });

  return (
    <div>
      <Hero />
      <CaseStudiesList initialData={caseStudies} />
    </div>
  );
}
