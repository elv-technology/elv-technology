import { solutionsData } from "@/lib/solutions-data";
import { Metadata } from "next";
import ServiceSchema from "@/components/seo/ServiceSchema";
import SolutionVideoHero from "@/components/solutions/solution-video-hero";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export const metadata: Metadata = {
  title: "Network & SMATV Solutions in Abu Dhabi | ETS Smart",
  description: "ETS Smart provides structured cabling, wireless network, SMATV, IPTV & IP phone solutions in Abu Dhabi. Trusted network & communications company in UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/solutions/network-communications",
  },
  openGraph: {
    title: "Network & SMATV Solutions in Abu Dhabi | ETS Smart",
    description: "ETS Smart provides structured cabling, wireless network, SMATV, IPTV & IP phone solutions in Abu Dhabi. Trusted network & communications company in UAE.",
    url: "https://www.etssmart.com/solutions/network-communications",
  },
};

export default function NetworkCommunicationsPage() {
    const data = solutionsData.networkAndCommunications;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ServiceSchema
                name="Network Infrastructure & Communications Solutions"
                description="Enterprise structured cabling, fiber optic networks, SMATV/IPTV, IP telephony, and wireless network solutions in Abu Dhabi & UAE."
                serviceType="Network Infrastructure Integration"
                url="https://www.etssmart.com/solutions/network-communications"
            />

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

