import CaseStudySlugPage from "@/components/case-studies/case-study-slug-page";
import { getCollection, getCaseStudyBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { sanitizeHtml } from "@/lib/sanitize";
import { caseStudyMetaTitle, metaDescription, pageMetadata } from "@/lib/seo";

// Cached for an hour like blog posts (the admin refreshes it immediately on every change),
// instead of querying the database on every visit.
export const revalidate = 3600;

// Pre-builds every case study at deploy time and makes the route cacheable (see blog/[slug]/page.tsx).
export async function generateStaticParams() {
  const studies = (await getCollection('case-studies', { take: 500 })) as { slug: string }[];
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = await getCaseStudyBySlug(params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found | ETS Smart",
    };
  }

  return pageMetadata({
    title: caseStudyMetaTitle(study.project, study.seoTitle),
    description: metaDescription(study.seoDescription, study.overview || `${study.project} - Case study details and results by ETS Smart in Abu Dhabi, UAE.`),
    path: `/case-studies/${params.slug}`,
    image: study.image,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  // The lightweight list (no content) is for the previous / next project navigation.
  const [study, allStudies] = await Promise.all([
    getCaseStudyBySlug(params.slug),
    getCollection('case-studies', { take: 500 }),
  ]);

  if (!study) {
    notFound();
  }

  // Strip anything unsafe from the rich-text solution on the server, before it reaches the page.
  const solution = study.solution && typeof study.solution === 'object' && !Array.isArray(study.solution)
    ? { ...study.solution, html: (study.solution as any).html ? sanitizeHtml((study.solution as any).html) : undefined }
    : study.solution;

  return <CaseStudySlugPage study={{ ...study, solution } as any} allStudies={allStudies as any} />;
}
