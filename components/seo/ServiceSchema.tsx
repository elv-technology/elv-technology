import Script from "next/script";

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  providerName?: string;
  url: string;
}

export default function ServiceSchema({
  name,
  description,
  serviceType,
  providerName = "ELV Technology Solutions",
  url,
}: ServiceSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType,
    "url": url,
    "provider": {
      "@type": "LocalBusiness",
      "name": providerName,
      "url": "https://www.etssmart.com",
      "telephone": "+97124418186",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Abu Dhabi",
        "addressCountry": "AE"
      }
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Abu Dhabi, UAE"
    }
  };

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
