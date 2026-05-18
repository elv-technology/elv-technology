import { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import Certifications from "@/components/about/certifications";
import MissionVisionValues from "@/components/about/mission-vision-values";
import ProcessOfWork from "@/components/about/process-of-work";
import Sectors from "@/components/about/sectors";
import TrustedPartner from "@/components/about/trusted-partner";
import CTASection from "@/components/home/cta-section";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/about",
  },
};


export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <TrustedPartner />
      <MissionVisionValues />
      <Certifications />
      <ProcessOfWork />
      <Sectors />
      <CTASection />
    </main>
  );
}
