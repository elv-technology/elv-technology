import { solutionsData } from "@/lib/solutions-data";
import SolutionVerticalHero from "@/components/solutions/solution-vertical-hero";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export default function NetworkCommunicationsPage() {
    const data = solutionsData.networkAndCommunications;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            

            <SolutionVideoHero
                videoSrc="/images/solutions/network-communications/hero.mp4"
                tag="Connected & Reliable"
                title={
                    <>
                        <span className="block">Robust</span>
                        <span className="block text-[#D61F26]">Network</span>
                        <span className="block text-white">Solutions</span>
                    </>
                }
                description="Enterprise-grade wired and wireless connectivity built for stability, speed, and security."
            />

            {/* Intro text specific to this section */}
            {data.intro && (
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 prose prose-lg prose-slate dark:prose-invert text-center">
                        {data.intro.slice(0, 2).map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </section>
            )}

            <div className="flex flex-col">
                {data.items.map((item, index) => (
                    <SolutionDetailSection key={item.id} categoryKey="networkAndCommunications" itemId={item.id} index={index} />
                ))}
            </div>

            <CTASection />
        </main>
    );
}
