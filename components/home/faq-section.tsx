'use client';

import { useState, useEffect, useRef } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { faqSectionData } from "@/lib/data";

const { heading, subheading, button: faqButton, faqs } = faqSectionData;

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
  isVisible,
}: {
  faq: any;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isVisible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`border-b border-border last:border-b-0 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
            }`}
        >
          {faq.question}
        </span>
        <span
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
            ? "bg-accent border-accent text-[#ffffff] rotate-0"
            : "border-border text-muted-foreground group-hover:border-accent group-hover:text-accent rotate-0"
            }`}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight || 500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-4 text-sm sm:text-base text-muted-foreground leading-relaxed pr-12">
          {faq.answer}
        </p>
      </div>
    </div >
  );
}

export default function FAQSection({ initialData }: { initialData?: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayFaqs = initialData && initialData.length > 0 ? initialData : faqs;
  const initialVisibleCount = 4;
  const visibleFaqs = showAll ? displayFaqs : displayFaqs.slice(0, initialVisibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleShowLess = () => {
    setShowAll(false);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200); // Delay to allow list to collapse before scrolling
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left heading */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              <span className="h-px w-6 bg-accent" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1] text-balance">
              {heading}
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              {subheading}
            </p>
            <div className="mt-8">
              <a
                href={faqButton.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#ffffff] transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
              >
                {faqButton.text}
              </a>
            </div>
          </div>

          {/* Right FAQ list */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              {visibleFaqs.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  index={i}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {displayFaqs.length > initialVisibleCount && (
              <div className="mt-8 text-center">
                {showAll ? (
                  <button
                    onClick={handleShowLess}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#ffffff] transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
                  >
                    Show Less
                    <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAll(true)}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#ffffff] transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
                  >
                    Show More
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
