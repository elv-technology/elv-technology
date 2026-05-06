import SolutionsHero from '@/components/solutions/hero';
import SolutionsPageLineup from '@/components/solutions/solutions-page-lineup';
import { CTASection } from '@/components/partners-clients/cta-section';

export default function SolutionsPage() {
    return (
        <main className="min-h-screen">
            <SolutionsHero />
            <SolutionsPageLineup />
            <CTASection />
        </main>
    );
}
