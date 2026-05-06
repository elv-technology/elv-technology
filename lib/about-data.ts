import { Award, ShieldCheck, FileCheck } from 'lucide-react';

export const sectors = [
  { name: 'Government', image: '/images/aboutUS/sectors/government.jpg' },
  { name: 'Healthcare', image: '/images/aboutUS/sectors/healthcare.jpg' },
  { name: 'Corporate', image: '/images/aboutUS/sectors/corporate.jpg' },
  { name: 'Educational Institution', image: '/images/aboutUS/sectors/educational.jpg' },
  { name: 'Hospitality', image: '/images/aboutUS/sectors/hospitality.jpg' },
  { name: 'Villa', image: '/images/aboutUS/sectors/villa.jpg' },
  { name: 'Residential', image: '/images/aboutUS/sectors/residential.jpg' },
  { name: 'Retail', image: '/images/aboutUS/sectors/retail.jpg' },
  { name: 'House of Worship', image: '/images/aboutUS/sectors/worship.jpg' },
];

export const certGroups = [
  {
    title: 'ISO Certificates',
    icon: Award,
    description: 'Our ISO certifications—demonstrate adherence to globally recognized frameworks for quality assurance, environmental stewardship, and occupational health & safety management.',
    items: [
      { text: 'ISO 9001 - Quality Management', image: '/images/aboutUS/certifications/iso-9001.png' },
      { text: 'ISO 14001 - Environmental Management', image: '/images/aboutUS/certifications/iso-14001.png' },
      { text: 'ISO 45001 - Occupational Health & Safety', image: '/images/aboutUS/certifications/iso-45001.png' },
    ],
  },
  {
    title: 'Insurance & ICV Certificate',
    icon: ShieldCheck,
    description: "Our In-Country Value (ICV) certification reflects our ongoing commitment to strengthening the UAE's local economy, industrial growth, and long-term sustainability.",
    items: [
      { text: 'Comprehensive Insurance Coverage', image: '/images/aboutUS/certifications/insurance.png' },
      { text: 'In-Country Value (ICV) Certification', image: '/images/aboutUS/certifications/icv.png' },
    ],
  },
  {
    title: 'Authority Certificates',
    icon: FileCheck,
    description: 'We are licensed by the Monitoring & Control Centre (MCC) to conduct authorized monitoring operations, and accredited by the Telecommunications and Digital Government Regulatory Authority (TRA/TDRA) for compliance with telecommunication and regulatory requirements.',
    items: [
      { text: 'MCC - Monitoring & Control Centre License', image: '/images/aboutUS/certifications/mcc.png' },
      { text: 'TRA/TDRA - Telecommunications Regulatory Compliance', image: '/images/aboutUS/certifications/tra.png' },
    ],
  },
];