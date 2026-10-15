import { pageMetadata } from "@/lib/seo";
import AboutHero from "@/components/about/about-hero";
import Certifications from "@/components/about/certifications";
import MissionVisionValues from "@/components/about/mission-vision-values";
import ProcessOfWork from "@/components/about/process-of-work";
import Sectors from "@/components/about/sectors";
import TrustedPartner from "@/components/about/trusted-partner";
import CTASection from "@/components/home/cta-section";

export const metadata = pageMetadata({
  title: "About Us | MCC Approved ELV Company Abu Dhabi | ETS Smart",
  description: "ETS Smart is an ISO & MCC-approved ELV and audio visual company in Abu Dhabi. Trusted integrator for ELV systems, AV solutions & security across the UAE.",
  path: "/about",
});


export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <TrustedPartner />
      <MissionVisionValues />
      <Certifications />
      <ProcessOfWork />
      <Sectors />
      <CTASection />
    </div>
  );
}
