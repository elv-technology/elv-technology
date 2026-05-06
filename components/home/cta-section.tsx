"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl bg-accent overflow-hidden transition-all duration-1000 ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
            }`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-24">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Content */}
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-background/50 mb-5">
                  <span className="h-px w-6 bg-background/30" />
                  Get Started
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background tracking-tight leading-[1.1] text-balance">
                  Ready to Transform Your Space?
                </h2>
                <p className="mt-5 text-base lg:text-lg text-background/60 leading-relaxed">
                  Let our experts design and implement the perfect ELV and AV
                  solution for your business. Contact us today for a free
                  consultation.
                </p>

                {/* Quick contact */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+97124418186"
                    className="flex items-center gap-2.5 text-sm text-background/60 transition-colors hover:text-background"
                  >
                    <Phone className="h-4 w-4" />
                    +971 2 441 8186
                  </a>
                  <a
                    href="mailto:info@etssmart.com"
                    className="flex items-center gap-2.5 text-sm text-background/60 transition-colors hover:text-background"
                  >
                    <Mail className="h-4 w-4" />
                    info@etssmart.com
                  </a>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-background px-8 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:shadow-xl hover:shadow-background/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="https://wa.me/97124418186"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-background/20 px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:bg-background/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
