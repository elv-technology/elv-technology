import { solutionsData } from "@/lib/solutions-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/solutions/security-surveillance",
  },
    title: "Security & Surveillance System Installation in Abu Dhabi | ETS",
    description: "Professional security system installation services in Abu Dhabi. AI-powered CCTV for home, offices, and industrial facilities with 24/7 monitoring.",
};
import SolutionVerticalHero from "@/components/solutions/solution-vertical-hero";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export default function SecuritySurveillancePage() {
    const data = solutionsData.securityAndSurveillance;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            

            <SolutionVideoHero
                videoSrc="/images/solutions/security-surveillance/hero.mp4"
                tag="Intelligent Defense"
                title={
                    <>
                        <span className="block">Smart</span>
                        <span className="block text-[#D61F26]">Security</span>
                        <span className="block text-white">Solutions</span>
                    </>
                }
                description="Protecting your assets with smart, proactive monitoring and real-time behavioral analytics."
            />

            <div className="flex flex-col">
                {data.items.map((item, index) => (
                    <SolutionDetailSection key={item.id} categoryKey="securityAndSurveillance" itemId={item.id} index={index} />
                ))}
            </div>

            <CTASection />
        </main>
    );
}
