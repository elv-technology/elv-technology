import { Metadata } from "next";
import { HeroSection } from '@/components/partners-clients/hero-section';
import { PartnersTabs } from '@/components/partners-clients/partners-tabs';
import { ClientsSlider } from '@/components/partners-clients/clients-slider';
import { CTASection } from '@/components/partners-clients/cta-section';
import { getCollection } from '@/lib/db';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/partners-clients",
  },
};


export const revalidate = 3600; // Revalidate every hour

export default async function PartnersAndClientsPage() {
  const partners = await getCollection('partners', { take: 500 }) as any[];
  const clients = await getCollection('clients', { take: 500 }) as any[];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white">
      <main className="isolate">
        <HeroSection />
        <PartnersTabs initialData={partners} />
        <ClientsSlider initialData={clients} />
        <CTASection />
      </main>
    </div>
  );
}
