import Script from "next/script";

export default function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ELV Technology Solutions",
    "alternateName": "ETS Smart",
    "url": "https://www.etssmart.com",
    "logo": "https://www.etssmart.com/images/logo.svg",
    "description": "Leading MCC-approved ELV, security, CCTV, audio visual, networking, and home automation systems integrator in Abu Dhabi, UAE.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+97124418186",
      "contactType": "customer service",
      "areaServed": "AE",
      "availableLanguage": ["English", "Arabic"]
    },
    "sameAs": [
      "https://facebook.com/elvtechnology2020",
      "https://instagram.com/elv_technology_solutions",
      "https://linkedin.com/company/elv-technology-solutions-abu-dhabi",
      "https://x.com/elv_technology"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
