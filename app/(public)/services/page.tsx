import { pageMetadata } from '@/lib/seo';

import Amc from '@/components/services/amc';
import Hero from '@/components/services/hero';
import Programming from '@/components/services/programming';
import TechnicalSupport from '@/components/services/technical-support';
import ServicesSolutionsGrid from '@/components/services/services-solutions-grid';

export const metadata = pageMetadata({
  title: "ELV & AV System Services Abu Dhabi | ETS Smart",
  description: "ETS Smart offers ELV, AV & IT services in Abu Dhabi — technical support, AMC, programming & commissioning for CCTV, access control & AV systems across UAE.",
  path: "/services",
});


export default function ServicesPage() {
  return (
    <div>
      <Hero />
      <TechnicalSupport />
      <Programming />
      <Amc />
      <ServicesSolutionsGrid />
    </div>
  );
}
