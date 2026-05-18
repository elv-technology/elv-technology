"use client";

import { usePathname } from 'next/navigation';

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  
  if (!pathname) return null;

  const paths = pathname === '/' ? [''] : pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = paths.map((path, index) => {
    const url = `https://www.etssmart.com/${paths.slice(0, index + 1).join('/')}`;
    let name = path.replace(/-/g, ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    // Special cases based on SEO file
    if (path === '') name = 'Home';
    else if (path === 'services') name = 'Service';
    else if (path === 'solutions') name = 'Solutions';
    else if (path === 'security-surveillance') name = 'Smart Security Solutions';
    else if (path === 'audio-visual') name = 'Audio Visual';
    else if (path === 'network-communications') name = 'Network Solutions';
    else if (path === 'home-automation') name = 'Home Automation';
    else if (path === 'partners-clients') name = 'Partners & Clients';
    else if (path === 'case-studies') name = 'Case Studies';

    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": url === 'https://www.etssmart.com/' ? 'https://www.etssmart.com/' : url
    };
  });

  // Always include Home as first item if we are not on home
  if (pathname !== '/') {
    breadcrumbItems.unshift({
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.etssmart.com/"
    });
    // Adjust positions
    breadcrumbItems.forEach((item, index) => {
      item.position = index + 1;
    });
  }

  const schema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
