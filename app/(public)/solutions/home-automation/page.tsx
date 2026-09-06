import { Metadata } from "next";
import { solutionsData } from "@/lib/solutions-data";
import ServiceSchema from "@/components/seo/ServiceSchema";
import HomeAutomationVideo from "@/components/solutions/home-automation-video";
import SolutionDetailSection from "@/components/solutions/solution-detail-section";
import { CTASection } from "@/components/partners-clients/cta-section";

export const metadata: Metadata = {
  title: "Home Automation in Abu Dhabi | Smart Lighting – ETS Smart",
  description: "ETS Smart provides smart home automation & lighting control systems in Abu Dhabi for villas & apartments. Energy-efficient, user-friendly solutions across UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/solutions/home-automation",
  },
  openGraph: {
    title: "Home Automation in Abu Dhabi | Smart Lighting – ETS Smart",
    description: "ETS Smart provides smart home automation & lighting control systems in Abu Dhabi for villas & apartments. Energy-efficient, user-friendly solutions across UAE.",
    url: "https://www.etssmart.com/solutions/home-automation",
  },
};

export default function HomeAutomationPage() {
    const data = solutionsData.homeAutomation;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <ServiceSchema
                name="Smart Home Automation & Lighting Control"
                description="Smart home automation systems, lighting controls, villa automation, motorized curtains, and climate control in Abu Dhabi & UAE."
                serviceType="Home Automation Integration"
                url="https://www.etssmart.com/solutions/home-automation"
            />

            <HomeAutomationVideo />

            <div className="flex flex-col">
                {data.items.map((item, index) => (
                    <SolutionDetailSection key={item.id} categoryKey="homeAutomation" itemId={item.id} index={index} />
                ))}
            </div>

            <CTASection />
        </main>
    );
}
