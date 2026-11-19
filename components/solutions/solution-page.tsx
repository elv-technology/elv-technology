import type { Metadata } from "next";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";
import { solutionPages, solutionsData, type SolutionSlug } from "@/content/solutions";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export function solutionPageMetadata(slug: SolutionSlug): Metadata {
    const page = solutionPages[slug];
    return pageMetadata({ ...page.metadata, path: `/solutions/${slug}`, image: page.hero.poster });
}

export default function SolutionPage({ slug }: { slug: SolutionSlug }) {
    const { categoryKey, schema, hero } = solutionPages[slug];
    const data = solutionsData[categoryKey];
    const intro = "intro" in data ? data.intro : undefined;
    const [line1, line2, line3] = hero.titleLines;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ServiceSchema {...schema} url={`${SITE_URL}/solutions/${slug}`} />

            <SolutionVideoHero
                videoSrc={hero.videoSrc}
                poster={hero.poster}
                tag={hero.tag}
                title={
                    <>
                        <span className="block">{line1}</span>
                        <span className="block text-[#D61F26]">{line2}</span>
                        <span className="block text-white">{line3}</span>
                    </>
                }
                description={hero.description}
            />

            {intro && (
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-lg prose-slate dark:prose-invert text-center">
                        {intro.slice(0, 2).map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </section>
            )}

            <div className="flex flex-col">
                {data.items.map((item, index) => (
                    <SolutionDetailSection key={item.id} categoryKey={categoryKey} itemId={item.id} index={index} />
                ))}
            </div>

            <CTASection />
        </div>
    );
}
