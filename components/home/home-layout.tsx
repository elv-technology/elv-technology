'use client';

import VideoSection from "@/components/home/video-section";
import IntroSection from "@/components/home/intro-section";
import CaseStudiesSection from "@/components/home/case-studies-section";
import ServicesBannerSection from "@/components/home/services-banner-section";
import ServicesSection from "@/components/home/services-section";
import CertificationsSection from "@/components/home/certifications-section";
import ClientsSection from "@/components/home/clients-section";
import ReviewsSection from "@/components/home/reviews-section";
import PartnersSection from "@/components/home/partners-section";
import IndustriesSection from "@/components/home/industries-section";
import CTASection from "@/components/home/cta-section";
import FAQSection from "@/components/home/faq-section";
import { useLoading } from "@/hooks/use-loading";

export default function HomeLayout({ initialData }: { initialData: any }) {
  const { stopLoading } = useLoading();
  const { caseStudies, blogs, testimonials, faqs } = initialData || {};

  return (
    <main>
      {/* 2. Video - Sticky Background */}
      <div className="sticky top-0 z-0">
        <VideoSection onVideoLoad={stopLoading} />
      </div>

      {/* Content wrapper that slides over the sticky video */}
      <div className="relative z-10 bg-background flex flex-col">
        {/* 3. Our Clients */}
        <ClientsSection />
        {/* 4. About Us Banner */}
        <IntroSection />
        {/* 5. Featured Case Studies */}
        <CaseStudiesSection initialData={caseStudies} />
        {/* 6. Our Services like a banner */}
        <ServicesBannerSection />
        {/* 7. Our Core Solutions */}
        <ServicesSection />
        {/* 8. Our Certifications */}
        <CertificationsSection />
        {/* 9. Testimonials (Reviews) */}
        <ReviewsSection testimonials={testimonials} />
        {/* 10. Our Partners */}
        <PartnersSection />
        {/* 11. Industries We Work With */}
        <IndustriesSection />

        {/* 12. Contact Us & FAQ */}
        <FAQSection initialData={faqs} />
        <CTASection />
      </div>
    </main>
  );
}

