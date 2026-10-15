import ContactDetails from '@/components/contact/contact-details';
import ContactForm from '@/components/contact/contact-form';
import Hero from '@/components/contact/hero';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Contact Us | ELV Solutions Abu Dhabi | ETS Smart",
  description: "Get in touch with ELV Technology Solutions (ETS Smart) in Abu Dhabi. Contact us for CCTV installation, access control, AV systems & ELV solutions in UAE.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div>
      <Hero />
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

