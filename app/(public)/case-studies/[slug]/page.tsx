import CaseStudySlugPage from "@/components/case-studies/case-study-slug-page";
import { getCollection, getCaseStudyBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = await getCaseStudyBySlug(params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found | ETS Smart",
    };
  }

  return {
    title: { absolute: `${study.project} | Case Study – ETS Smart` },
    description: study.overview || `${study.project} - Case study details and results by ETS Smart in Abu Dhabi, UAE.`,
    alternates: {
      canonical: `https://www.etssmart.com/case-studies/${params.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = await getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  // Lightweight list (no content) for the previous / next project navigation.
  const allStudies = await getCollection('case-studies', { take: 500 });

  // Strip anything unsafe from the rich-text solution on the server, before it reaches the page.
  const solution = study.solution && typeof study.solution === 'object' && !Array.isArray(study.solution)
    ? { ...study.solution, html: (study.solution as any).html ? sanitizeHtml((study.solution as any).html) : undefined }
    : study.solution;

  return <CaseStudySlugPage study={{ ...study, solution } as any} allStudies={allStudies as any} />;
}
