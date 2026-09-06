import Script from "next/script";

export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ELV Technology Solutions (ETS Smart)",
    "image": "https://www.etssmart.com/images/logo.svg",
    "@id": "https://www.etssmart.com/#localbusiness",
    "url": "https://www.etssmart.com",
    "telephone": "+97124418186",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "P.O. Box 36815, Grand Outlet Building, M01, Al Danah E18_02, Al Falah St.",
      "addressLocality": "Abu Dhabi",
      "addressRegion": "Abu Dhabi",
      "postalCode": "36815",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.4539,
      "longitude": 54.3773
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Abu Dhabi"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Dubai"
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates"
      }
    ],
    "sameAs": [
      "https://facebook.com/elvtechnology2020",
      "https://instagram.com/elv_technology_solutions",
      "https://linkedin.com/company/elv-technology-solutions-abu-dhabi",
      "https://x.com/elv_technology"
    ]
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
