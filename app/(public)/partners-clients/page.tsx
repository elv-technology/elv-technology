import { pageMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/partners-clients/hero-section';
import { PartnersTabs } from '@/components/partners-clients/partners-tabs';
import { ClientsSlider } from '@/components/partners-clients/clients-slider';
import { CTASection } from '@/components/partners-clients/cta-section';
import { getCollection } from '@/lib/db';

export const metadata = pageMetadata({
  title: "Partners & Clients | ELV Company Abu Dhabi | ETS Smart",
  description: "ETS Smart partners with 20+ global technology brands & serves 36+ enterprise clients across UAE. A trusted ELV & AV integrator in Abu Dhabi since 2020.",
  path: "/partners-clients",
});


export const revalidate = 3600; // Revalidate every hour

export default async function PartnersAndClientsPage() {
  const [partners, clients] = await Promise.all([
    getCollection('partners', { take: 500 }),
    getCollection('clients', { take: 500 }),
  ]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white">
      <div className="isolate">
        <HeroSection />
        <PartnersTabs initialData={partners} />
        <ClientsSlider initialData={clients} />
        <CTASection />
      </div>
    </div>
  );
}
