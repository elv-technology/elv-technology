import { solutionsData } from "@/lib/solutions-data";
import { Metadata } from "next";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export const metadata: Metadata = {
  title: "CCTV Installation Company in Abu Dhabi | ETS Smart",
  description: "ETS Smart is an ADMCC-approved CCTV company in Abu Dhabi offering CCTV installation, access control & security system solutions for homes & businesses in UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/solutions/security-surveillance",
  },
  openGraph: {
    title: "CCTV Installation Company in Abu Dhabi | ETS Smart",
    description: "ETS Smart is an ADMCC-approved CCTV company in Abu Dhabi offering CCTV installation, access control & security system solutions for homes & businesses in UAE.",
    url: "https://www.etssmart.com/solutions/security-surveillance",
  },
};

export default function SecuritySurveillancePage() {
    const data = solutionsData.securityAndSurveillance;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ServiceSchema
                name="Security & CCTV Camera System Installation"
                description="MCC-approved security system installation, AI CCTV camera surveillance, access control, and gate barriers in Abu Dhabi & UAE."
                serviceType="Security System Integration"
                url="https://www.etssmart.com/solutions/security-surveillance"
            />

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

