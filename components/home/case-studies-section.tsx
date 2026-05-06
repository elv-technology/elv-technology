'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
export default function CaseStudiesSection({ initialData }: { initialData?: any[] }) {
    // Only show the first 3 for a cleaner home page look
    const featuredStudies = initialData && initialData.length > 0 ? initialData.slice(0, 3) : [];

    return (
        <section className="py-24 relative overflow-hidden bg-white/40 backdrop-blur-3xl border-b border-neutral-200/60">
            {/* Background Accents - Subdued */}

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium text-accent border-accent/20 bg-accent/5">
                            Our Success Stories
                        </Badge>
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl">
                            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Results</span>, Global Expertise
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Explore how we've helped leading organizations across the UAE transform their infrastructure with cutting-edge technology.
                        </p>
                    </div>

                    <Button asChild variant="outline" className="hidden md:flex rounded-full px-6 h-12 text-sm font-semibold border-neutral-300 hover:bg-neutral-100 hover:text-foreground transition-all group">
                        <Link href="/case-studies" className="flex items-center">
                            View All Case Studies <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                {/* Case Studies Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredStudies.map((study, index) => (
                        <div key={study.slug}>
                            <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                                <div className="relative h-full flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/60 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-2">
                                    {/* Image Header */}
                                    <div className="relative h-56 w-full overflow-hidden bg-neutral-100">
                                        <Image
                                            src={study.image}
                                            alt={study.project}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl sm:text-xl font-extrabold leading-tight text-foreground mb-2 group-hover:text-accent transition-colors">
                                            {study.client}
                                        </h3>
                                        <div className="text-sm font-medium text-slate-500 mb-4 line-clamp-2 leading-snug">
                                            {study.project}
                                        </div>

                                        <div className="flex items-center justify-start mb-4">
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-neutral-100 px-2 py-1 rounded-[4px] flex-wrap">
                                                <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
                                                <span>{study.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-8 flex-grow">
                                            {study.overview}
                                        </p>

                                        <div className="pt-5 border-t border-neutral-100 mt-auto flex items-center justify-between">
                                            <span className="text-sm font-bold text-accent px-4 py-2 rounded-full border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                Read full study <ArrowRight className="inline-block ml-2 h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </motion.div>

                {/* Mobile View All Button */}
                <div className="mt-12 flex justify-center md:hidden">
                    <Button asChild className="w-full rounded-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/20">
                        <Link href="/case-studies">
                            View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
