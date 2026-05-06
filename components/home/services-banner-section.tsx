'use client';

import Link from 'next/link';
import { motion } from "framer-motion";
import { Settings, Lightbulb, Code2, Wrench, ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { Button } from "@/components/ui/button";

export default function ServicesBannerSection() {
    const services = [
        {
            icon: Settings,
            title: "System Integration",
        },
        {
            icon: Lightbulb,
            title: servicesData.technicalSupport.title,
        },
        {
            icon: Code2,
            title: servicesData.programming.title,
        },
        {
            icon: Wrench,
            title: servicesData.amc.title,
        }
    ];

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-r from-accent via-accent/90 to-accent relative overflow-hidden text-white group/banner">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/images/logo-pattern.svg')] bg-[length:32px_32px] bg-repeat opacity-[0.05] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

                    {/* Left Text */}
                    <div className="flex-shrink-0 text-center lg:text-left max-w-md">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 leading-tight text-white mb-4"
                        >
                            Integrations that <span className="text-white/80">Elevate</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white/80 mb-6 text-sm sm:text-base"
                        >
                            From seamless system integrations to comprehensive ELV, AV, Home Automation, and IT Solutions tailored to your business needs.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center lg:justify-start"
                        >
                            <Button asChild variant="secondary" className="rounded-full px-6 h-10 text-sm font-semibold bg-white text-accent hover:bg-white/90 shadow-sm transition-all group/btn">
                                <Link href="/services" className="flex items-center">
                                    Explore Services <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Horizontal Grid */}
                    <div className="flex-grow w-full max-w-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="flex flex-col items-center lg:items-start lg:text-left justify-center text-center group/card transition-transform hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 text-white group-hover/card:bg-white group-hover/card:text-accent transition-all duration-300 shadow-sm">
                                        <service.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                                    </div>
                                    <h4 className="font-semibold text-white text-sm sm:text-base leading-snug text-balance">
                                        {service.title}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
