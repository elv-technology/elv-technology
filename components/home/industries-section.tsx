'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sectors } from '@/lib/about-data';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function IndustriesSection() {
    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-white pointer-events-none z-0" />

            {/* Background ambient glowing spheres (from Reviews section) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

            {/* Right Half Pattern Background (from Reviews section) */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 flex justify-end pointer-events-none overflow-hidden z-0">
                <div className="w-[120%] max-w-[800px] aspect-square bg-[url('/images/logo-pattern.png')] bg-right-top bg-no-repeat bg-contain opacity-[0.04] translate-x-1/4 -translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-6 bg-white border-neutral-200 text-neutral-600 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">
                            Sectors We Serve
                        </Badge>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight mb-6 leading-[1.1] text-foreground"
                        >
                            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Transform</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
                        >
                            Delivering tailored technology systems across diverse sectors. From robust corporate infrastructure to seamless hospitality experiences.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden md:flex mt-auto mb-2"
                    >
                        <Button asChild variant="outline" className="rounded-full px-6 h-12 text-sm font-semibold border-neutral-300 hover:bg-neutral-100 hover:text-foreground transition-all group">
                            <Link href="/services" className="flex items-center">
                                Explore Sectors <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[250px]"
                >
                    {sectors.map((sector, index) => {
                        // Dynamic sizing logic for a bento grid effect
                        let colSpan = "col-span-1";
                        let rowSpan = "row-span-1";

                        // Example pattern: Make a few specific indices larger
                        if (index === 0) {
                            colSpan = "sm:col-span-2 lg:col-span-2";
                            rowSpan = "sm:row-span-2";
                        } else if (index === 3) {
                            colSpan = "sm:col-span-2 lg:col-span-2";
                            rowSpan = "sm:row-span-1";
                        } else if (index === 4) {
                            colSpan = "sm:col-span-1 lg:col-span-1";
                            rowSpan = "sm:row-span-2";
                        } else if (index === 8) {
                            colSpan = "sm:col-span-2 lg:col-span-2";
                        }

                        return (
                            <Link
                                href="/services"
                                key={index}
                                className={`group relative w-full h-full rounded-[5px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-accent/10 border border-neutral-200/60 transition-all duration-500 ${colSpan} ${rowSpan}`}
                            >
                                <div className="absolute inset-0 bg-neutral-100">
                                    <Image
                                        src={sector.image}
                                        alt={sector.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 md:p-8 z-20 flex flex-col justify-end">
                                    <h3 className="font-bold text-white text-xl md:text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        {sector.name}
                                    </h3>

                                    <div className="flex items-center gap-2 text-white/90 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                                        <span className="font-medium text-sm tracking-wide uppercase">Discover More</span>
                                        <ArrowUpRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </motion.div>

                {/* Mobile View All Button */}
                <div className="mt-12 flex justify-center md:hidden">
                    <Button asChild className="w-full rounded-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/20">
                        <Link href="/services">
                            Explore Sectors <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
