import Script from "next/script";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "ETS Smart Team",
}: ArticleSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url,
    "image": image || "https://www.etssmart.com/images/logo.svg",
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || datePublished || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://www.etssmart.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ELV Technology Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.etssmart.com/images/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Script
      id={`article-schema-${title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
