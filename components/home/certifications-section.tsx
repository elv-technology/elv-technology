'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { certGroups } from '@/lib/about-data';

export default function CertificationsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Flatten all certification items from the groups into a single array for the home page display
    const certifications = certGroups.flatMap(group => group.items);

    return (
        <section ref={ref} className="py-24 bg-white relative overflow-hidden text-center z-10 border-b border-neutral-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Certifications</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Committed to excellence, quality assurance, and compliance with globally recognized standards.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-end gap-x-6 gap-y-10 sm:gap-12 lg:gap-16">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.text}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="group relative flex flex-col items-center hover:z-50"
                        >
                            <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-4 sm:p-6 transition-all duration-300 group-hover:shadow-lg group-hover:border-accent/20 sm:group-hover:-translate-y-1">
                                <Image
                                    src={cert.image}
                                    alt={cert.text}
                                    fill
                                    sizes="(max-width: 640px) 112px, 160px"
                                    className="object-contain p-4 sm:p-6 transition-transform duration-500"
                                />
                            </div>

                            {/* Mobile explicit label / Desktop tooltip */}
                            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-12 sm:left-1/2 sm:-translate-x-1/2 w-[120px] sm:w-max sm:max-w-[200px] text-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                <span className="text-[11px] sm:text-xs font-medium text-slate-600 sm:text-slate-700 sm:bg-white sm:shadow-xl sm:border border-slate-100 sm:px-3 sm:py-1.5 rounded-lg block leading-tight sm:leading-normal">
                                    {cert.text}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
