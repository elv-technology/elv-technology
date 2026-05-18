import { Metadata } from "next";

import Amc from '@/components/services/amc';
import Hero from '@/components/services/hero';
import Programming from '@/components/services/programming';
import TechnicalSupport from '@/components/services/technical-support';
import ServicesSolutionsGrid from '@/components/services/services-solutions-grid';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.etssmart.com/services",
  },
};


export default function ServicesPage() {
  return (
    <main>
      <Hero />
      <TechnicalSupport />
      <Programming />
      <Amc />
      <ServicesSolutionsGrid />
    </main>
  );
}
