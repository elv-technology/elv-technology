import { solutionsData } from "@/lib/solutions-data";
import { Metadata } from "next";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export const metadata: Metadata = {
  title: "Audio Visual Solutions in Abu Dhabi | BGM & PA – ETS Smart",
  description: "ETS Smart is a top audio visual company in Abu Dhabi offering BGM systems, PA systems, digital signage, LED screens & AV integration for homes & businesses.",
  alternates: {
    canonical: "https://www.etssmart.com/solutions/audio-visual",
  },
  openGraph: {
    title: "Audio Visual Solutions in Abu Dhabi | BGM & PA – ETS Smart",
    description: "ETS Smart is a top audio visual company in Abu Dhabi offering BGM systems, PA systems, digital signage, LED screens & AV integration for homes & businesses.",
    url: "https://www.etssmart.com/solutions/audio-visual",
  },
};

export default function AudioVisualPage() {
    const data = solutionsData.audioVisual;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ServiceSchema
                name="Audio Visual (AV) Solutions & Integration"
                description="Professional BGM systems, Public Address (PA), digital signage, LED display screens, and AV integration in Abu Dhabi & UAE."
                serviceType="Audio Visual Integration"
                url="https://www.etssmart.com/solutions/audio-visual"
            />

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

