
import { CheckCircle, Wrench, ShieldCheck } from 'lucide-react';

export const servicesData = {
  hero: {
    title: 'Our Services',
    description: 'We provide comprehensive ELV, AV, and IT services, from initial design and programming to ongoing maintenance and support, ensuring your systems operate at peak performance.',
    image: '/images/services/hero.jpeg', // This is a placeholder, please replace with an actual image path
  },
  technicalSupport: {
    title: 'Technical Support in UAE',
    image: '/images/services/Technical Service in UAE.png',
    description: [
      'ELV Technology Solutions delivers reliable technical support, ELV, AV, and IT services across Abu Dhabi, Dubai, and the wider UAE. We help businesses maintain secure, stable, and efficient operations through proactive management and fast-response support.',
      'Our team ensures smooth performance across networks, servers, workstations, cloud environments, and security systems—reducing downtime and increasing productivity.',
    ],
    capabilities: {
      title: 'Our Technical Support & Service Capabilities',
      sections: [
        {
          title: 'Security and Surveillance (ELV)',
          items: [
            'Security and Surveillance Systems',
            'Access Control & Time Attendance',
            'Gate Barrier',
            'Nurse Call System',
            'Queue Management System',
            'Disabled Toilet Alarm System'
          ]
        },
        {
          title: 'Audio Visual (AV) Systems',
          items: [
            'Music Systems and BGM Solutions',
            'Indoor Video Wall',
            'Conference Room',
            'Meeting and Boardroom',
            'Digital Signage',
            'LED Screen',
            'Control Systems'
          ]
        },
        {
          title: 'Network & Communications',
          items: [
            'Structured Cabling Solutions',
            'Wireless Network Solutions',
            'Audio Video Intercom',
            'Two Way Radio Solutions',
            'IP Phones',
            'IPTV / SMATV',
            'IT Equipment'
          ]
        },
        {
          title: 'Home Automation',
          items: [
            'Home Automation Solutions',
            'Lighting Control Systems'
          ]
        }
      ]
    },
    whyChooseUs: {
      title: 'Why Choose ELV Technology Solutions',
      items: [
        'Fast response with SLA-driven service',
        'Secure remote and onsite technical assistance',
        'Scalable solutions suitable for growing businesses',
        'Experienced team covering ELV, AV, and IT environments',
      ],
      icon: CheckCircle,
    },
  },
  programming: {
    title: 'Programming and Commissioning in UAE',
    image: '/images/services/programming.jpg',
    description: [
      'Our experienced programmers have deep expertise across major ELV and AV systems, brands, and platforms. We design and program solutions tailored precisely to organizational requirements, technical specifications, and operational workflows.',
      'We also provide system commissioning services for projects of any size from straightforward installations to complex, large-scale ELV and AV deployments ensuring correct functionality, optimal performance, and long-term reliability at every level.',
    ],
  },
  amc: {
    title: 'AMC (Annual Maintenance Contract)',
    image: '/images/services/amc.jpeg',
    description: [
      'ELV Technology Solutions provides professional Annual Maintenance Contracts (AMC) for IT, ELV, AV, and security systems across Abu Dhabi, Dubai, and the UAE. We understand the importance of keeping your systems running smoothly—any failure in IT or ELV infrastructure affects business operations, safety, and productivity.',
      'Our AMC service ensures your systems receive regular maintenance, fast support, and proactive monitoring, giving you uninterrupted performance and peace of mind throughout the year.',
    ],
    systemsCovered: {
      title: 'Systems We Cover Under Our AMC',
      description: 'We provide preventive and corrective maintenance for:',
      items: [
        'Audio Visual (AV) Systems',
        'Access Control Systems',
        'CCTV Systems',
        'Centralized SMATV / IPTV Systems',
        'Telephone & IP Phone Systems',
        'Public Address (PA) Systems',
        'IT Equipment (PCs, Servers, Printers, Laptops, Network Routers, and Switches)',
      ]
    },
    includes: {
      title: 'What Our AMC Includes',
      description: 'Our Annual Maintenance Contract can be comprehensive, or non-comprehensive gives you access to a dedicated team of skilled engineers who ensure your ELV, AV, IT and Tele communication systems operate reliably with minimal disruption. We provide two types of service visits:',
      visits: [
        {
          title: '1. Incident-Based Support',
          description: 'For unexpected issues, breakdowns, and urgent troubleshooting. Our engineers respond quickly to restore system functionality.'
        },
        {
          title: '2. Preventive Maintenance Visits',
          description: 'Scheduled visits to inspect, test, clean, and optimize equipment. This reduces failures, improves performance, and extends system life.'
        }
      ],
      footer: 'Clients can choose the maintenance model that fits their organization—monthly, quarterly, semi-annual, or annual AMC plans.'
    },
    whyChooseUs: {
      title: 'Why Choose ELV Technology Solutions for AMC?',
      items: [
        'Fast response and reliable on-site support',
        'Trained engineers for all major IT, ELV, Security, and AV systems',
        'Proactive maintenance to prevent downtime',
        'Detailed reporting after each service visit',
        'Flexible AMC packages based on client needs'
      ],
      footer: 'Whether you require an ELV AMC in Abu Dhabi, IT maintenance contract in Dubai, or AV & security system AMC across the UAE.',
      icon: CheckCircle
    }
  },
};
