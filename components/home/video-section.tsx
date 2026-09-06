'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { heroSectionData } from "@/lib/data";

export default function VideoSection({ onVideoLoad }: { onVideoLoad?: () => void }) {
  return (
    <section
      className="relative w-full min-h-[80vh] md:h-[100dvh] overflow-hidden group flex items-center"
      style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1425 40%, #1a0a0a 100%)' }}
    >
      {/* Video — always visible, no opacity hide; the overlay handles aesthetics */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/home/hero_poster.jpg"
        preload="metadata"
        playsInline
        autoPlay
        muted
        loop
        onLoadedMetadata={onVideoLoad}
      >
        <source src="/images/home/slides/videos/hero_new.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay — shows gradient background through video while it loads */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-32 lg:pt-40">
        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space-grotesk tracking-tight leading-[0.95] text-white">
              <span className="block mb-0.5">
                {heroSectionData.heading.line1}
              </span>
              <span className="block text-[#D61F26] mb-0.5">
                {heroSectionData.heading.line2}
              </span>
              <span className="block text-white mb-0.5">
                {heroSectionData.heading.line3}
              </span>
            </h1>
          </motion.div>

          {/* Right Column: Content + Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-normal font-inter">
              {heroSectionData.subheading}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={heroSectionData.buttons.primary.link}
                className="inline-flex items-center justify-center gap-2 bg-[#D61F26] hover:bg-[#D61F26]/90 text-white px-8 py-3.5 text-base font-bold font-space-grotesk uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#D61F26]/20"
              >
                {heroSectionData.buttons.primary.text} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={heroSectionData.buttons.secondary.link}
                className="group inline-flex items-center gap-2 text-white font-bold font-space-grotesk uppercase tracking-wider text-base hover:text-[#D61F26] transition-colors"
                aria-label="Learn more about ELV Technology Solutions"
              >
                {heroSectionData.buttons.secondary.text} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
