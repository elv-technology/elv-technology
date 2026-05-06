"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MonitorPlay, Shield, Network, Home } from "lucide-react";
import { solutionsData } from "@/lib/solutions-data";

// Dynamically mapped categories from solutionsData
const serviceCategories = [
  {
    title: solutionsData.audioVisual.title.replace(/^\d+\.\s*/, ''),
    description: solutionsData.audioVisual.description,
    href: `/solutions/${solutionsData.audioVisual.id}`,
    icon: MonitorPlay,
  },
  {
    title: solutionsData.securityAndSurveillance.title.replace(/^\d+\.\s*/, ''),
    description: solutionsData.securityAndSurveillance.description,
    href: `/solutions/${solutionsData.securityAndSurveillance.id}`,
    icon: Shield,
  },
  {
    title: solutionsData.networkAndCommunications.title.replace(/^\d+\.\s*/, ''),
    description: solutionsData.networkAndCommunications.description,
    href: `/solutions/${solutionsData.networkAndCommunications.id}`,
    icon: Network,
  },
  {
    title: solutionsData.homeAutomation.title.replace(/^\d+\.\s*/, ''),
    description: solutionsData.homeAutomation.description,
    href: `/solutions/${solutionsData.homeAutomation.id}`,
    icon: Home,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden group/section border-y border-white/5">
      {/* Dynamic Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none transition-transform duration-1000 group-hover/section:translate-y-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] translate-y-1/3 pointer-events-none transition-transform duration-1000 group-hover/section:-translate-y-10" />

      {/* Right Half Logo Watermark */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-end pointer-events-none overflow-hidden z-0">
        <div className="w-[120%] max-w-[800px] aspect-square bg-[url('/images/logo-pattern.svg')] bg-right bg-no-repeat bg-contain opacity-[0.06] translate-x-1/4 translate-y-24"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-24 relative" data-animate>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Enterprise Solutions
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Intelligent Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500">Built to Scale</span>
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Discover our comprehensive suite of advanced technology systems designed to secure, connect, and empower your organization.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {serviceCategories.map((category, i) => (
            <div
              key={category.title}
              data-animate
              className="opacity-0 group/container perspective-1000"
              style={{ animationDelay: `${(i + 1) * 0.15}s` }}
            >
              <Link href={category.href} className="block h-full outline-none">
                <div className="relative h-full bg-[#18181b]/80 backdrop-blur-xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 relative overflow-hidden group/card rounded-3xl border border-white/5 hover:border-accent/30 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)] hover:bg-[#1e1e24] group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0a0a]">

                  {/* Subtle Gradient Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon Container */}
                  <div className="mb-10 relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover/card:bg-accent/10 group-hover/card:border-accent/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <category.icon className="h-8 w-8 text-neutral-300 group-hover/card:text-accent group-hover/card:scale-110 transition-all duration-500 relative z-10" strokeWidth={1.5} />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-accent transition-colors duration-300 leading-tight">
                      {category.title}
                    </h3>

                    <p className="text-sm text-neutral-400 leading-relaxed mb-8 line-clamp-3 group-hover/card:text-neutral-300 transition-colors duration-300 flex-grow">
                      {category.description}
                    </p>

                    {/* Action Arrow */}
                    <div className="mt-auto flex items-center justify-between text-sm font-semibold text-neutral-500 group-hover/card:text-white transition-colors duration-300">
                      <span>Explore Solution</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/card:bg-accent group-hover/card:translate-x-1 transition-all duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current transition-transform duration-300 group-hover/card:-rotate-45">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
