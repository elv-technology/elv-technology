import CaseStudySlugPage from "@/components/case-studies/case-study-slug-page";
import { getCollection } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CaseStudy } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudies = await getCollection('case-studies') as CaseStudy[];
  const study = caseStudies.find((c: any) => c.slug === params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found | ETS Smart",
    };
  }

  return {
    title: `${study.project} | Case Study – ETS Smart`,
    description: study.overview || `${study.project} - Case study details and results by ETS Smart in Abu Dhabi, UAE.`,
    alternates: {
      canonical: `https://www.etssmart.com/case-studies/${params.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudies = await getCollection('case-studies', { includeContent: true }) as CaseStudy[];
  const index = caseStudies.findIndex((c: any) => c.slug === params.slug);
  const study = caseStudies[index];

  if (!study) {
    notFound();
  }

  return <CaseStudySlugPage study={study as any} allStudies={caseStudies as any} />;
}
