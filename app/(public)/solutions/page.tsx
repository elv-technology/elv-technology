import { pageMetadata } from '@/lib/seo';
import SolutionsHero from '@/components/solutions/hero';
import SolutionsPageLineup from '@/components/solutions/solutions-page-lineup';
import { CTASection } from '@/components/partners-clients/cta-section';

export const metadata = pageMetadata({
  title: "ELV & Security Solutions Abu Dhabi | ETS Smart",
  description: "Explore ETS Smart's full range of ELV solutions in Abu Dhabi — security & CCTV, audio visual, home automation & network communications across the UAE.",
  path: "/solutions",
});


export default function SolutionsPage() {
    return (
        <div className="min-h-screen">
            <SolutionsHero />
            <SolutionsPageLineup />
            <CTASection />
        </div>
    );
}
