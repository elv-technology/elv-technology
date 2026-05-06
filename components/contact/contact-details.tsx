'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@etssmart.com',
    href: 'mailto:info@etssmart.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+971 2 441 8186',
    href: 'tel:+97124418186',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'P.O. Box 36815 Grand Outlet Building, M01, Al Danah E18_02 Al Falah St., Abu Dhabi, UAE',
    href: 'https://maps.app.goo.gl/16dAZSietMquBWUw6',
  },
];

export default function ContactDetails() {
  return (
    <div className="rounded-2xl bg-gray-100 p-8 shadow-lg">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Get in Touch
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Our team is ready to assist you. Contact us through any of the methods below.
      </p>

      <div className="mt-12 space-y-8">
        {contactMethods.map((method, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                <method.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
              <a
                href={method.href}
                className="text-base text-gray-600 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                {method.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
