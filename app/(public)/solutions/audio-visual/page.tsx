import { solutionsData } from "@/lib/solutions-data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Public Address System/BGM System | ETS",
    description: "Leading provider of Public Address (PA) and BGM solutions in Abu Dhabi. We design and install high-quality audio distribution systems for hospitality and corporate needs.",
};
import SolutionVerticalHero from "@/components/solutions/solution-vertical-hero";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export default function AudioVisualPage() {
    const data = solutionsData.audioVisual;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            

            <SolutionVideoHero
                videoSrc="/images/solutions/audio-visual/hero.mp4"
                tag="Immersive Experience"
                title={
                    <>
                        <span className="block">Immersive</span>
                        <span className="block text-[#D61F26]">Audio Visual</span>
                        <span className="block text-white">Solutions</span>
                    </>
                }
                description="Next-generation audio-visual systems tailored for seamless collaboration and exceptional quality."
            />

            <div className="flex flex-col">
                {data.items.map((item, index) => (
                    <SolutionDetailSection key={item.id} categoryKey="audioVisual" itemId={item.id} index={index} />
                ))}
            </div>

            <CTASection />
        </main>
    );
}
