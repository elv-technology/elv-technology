import ContactDetails from '@/components/contact/contact-details';
import ContactForm from '@/components/contact/contact-form';
import Hero from '@/components/contact/hero';

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
