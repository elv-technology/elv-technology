'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { heroSectionData } from "@/lib/data";

export default function HeroSection() {
    return (
        <section className="relative pt-10 pb-6 lg:pt-12 lg:pb-8 overflow-hidden flex items-center min-h-[50vh]">
            {/* Background Image & Overlay Removed */}

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8 lg:gap-12">

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-space-grotesk tracking-tight leading-[1.05] text-slate-900">
                            <span className="block mb-2">
                                {heroSectionData.heading.line1}
                            </span>
                            <span className="block text-red-600 mb-1">
                                {heroSectionData.heading.line2}
                            </span>
                            <span className="block text-red-600">
                                {heroSectionData.heading.line3}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Content + Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center gap-10"
                    >
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal font-inter max-w-2xl">
                            {heroSectionData.subheading}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link
                                href={heroSectionData.buttons.primary.link}
                                className="inline-flex items-center justify-center gap-2 bg-[#D61F26] hover:bg-[#D61F26]/90 text-white px-10 py-4 text-base font-bold font-space-grotesk uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#D61F26]/20"
                            >
                                {heroSectionData.buttons.primary.text} <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href={heroSectionData.buttons.secondary.link}
                                className="group inline-flex items-center gap-2 text-slate-800 font-bold font-space-grotesk uppercase tracking-wider text-base hover:text-[#D61F26] transition-colors"
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
