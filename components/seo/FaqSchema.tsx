export default function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much cost for CCTV installation in abu dhabi",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of installing CCTV in Abu Dhabi is around 3k to 10k for a small project ."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide structured cabling solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We design and install high-performance structured cabling systems that serve as the backbone of your entire IT and communication infrastructure. Our solutions support data networks, voice communication, internet connectivity, security systems, and audio-visual technologies, ensuring reliable performance and organized network management. Every installation is engineered for speed, stability, and scalability, allowing your infrastructure to grow with your business."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ELV Technology Solutions provides advanced technology solutions across a wide range of industries, including: • Government facilities • Corporate offices • Retail stores and shopping malls • Hotels and hospitality venues • Hospitals and healthcare facilities • Educational institutions • Industrial and warehouse facilities • Residential communities and villas Our solutions are designed to enhance security, efficiency, and connectivity in every environment."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide meeting room and boardroom AV solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We design and deploy intelligent meeting room and boardroom audio-visual systems that enable seamless communication and collaboration. Our solutions include professional displays, microphones, video conferencing platforms, wireless presentation systems, sound systems, and integrated control systems. We transform ordinary meeting rooms into high-performance collaboration spaces built for modern business communication."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
