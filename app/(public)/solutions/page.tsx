import { Metadata } from "next";
import SolutionsHero from '@/components/solutions/hero';
import SolutionsPageLineup from '@/components/solutions/solutions-page-lineup';
import { CTASection } from '@/components/partners-clients/cta-section';

export const metadata: Metadata = {
  title: "ELV & AV Solutions in Abu Dhabi | ETS Smart UAE",
  description: "Explore ETS Smart's full range of ELV solutions in Abu Dhabi — security & CCTV, audio visual, home automation & network communications across the UAE.",
  alternates: {
    canonical: "https://www.etssmart.com/solutions",
  },
};


export default function SolutionsPage() {
    return (
        <main className="min-h-screen">
            <SolutionsHero />
            <SolutionsPageLineup />
            <CTASection />
        </main>
    );
}
