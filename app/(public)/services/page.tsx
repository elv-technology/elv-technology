import { Metadata } from "next";

import Amc from '@/components/services/amc';
import Hero from '@/components/services/hero';
import Programming from '@/components/services/programming';
import TechnicalSupport from '@/components/services/technical-support';
import ServicesSolutionsGrid from '@/components/services/services-solutions-grid';

export const metadata: Metadata = {
  title: "ELV & AV Services in Abu Dhabi | AMC & Support – ETS Smart",
  description: "ETS Smart offers ELV, AV & IT services in Abu Dhabi — technical support, AMC, programming & commissioning for CCTV, access control & AV systems across UAE.",
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
