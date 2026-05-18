import { Metadata } from "next";
import SolutionsHero from '@/components/solutions/hero';
import SolutionsPageLineup from '@/components/solutions/solutions-page-lineup';
import { CTASection } from '@/components/partners-clients/cta-section';

export const metadata: Metadata = {
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
