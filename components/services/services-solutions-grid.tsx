'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { solutionsData } from '@/lib/solutions-data';
import { ArrowRight, Shield, Key, PlusSquare, Music, MonitorPlay, Users, Monitor, Wifi, Network, Tv, Home, Lightbulb } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default function ServicesSolutionsGrid() {
    // Extract all solution items from the nested structure and attach their parent category ID
    const allSolutions = [
        ...solutionsData.securityAndSurveillance.items.map(item => ({ ...item, categoryId: solutionsData.securityAndSurveillance.id })),
        ...solutionsData.audioVisual.items.map(item => ({ ...item, categoryId: solutionsData.audioVisual.id })),
        ...solutionsData.networkAndCommunications.items.map(item => ({ ...item, categoryId: solutionsData.networkAndCommunications.id })),
        ...solutionsData.homeAutomation.items.map(item => ({ ...item, categoryId: solutionsData.homeAutomation.id })),
    ];

    // ... rest unchanged up to the Link

    // Snippet for line replacement
    // Specific list requested by user to highlight
    const priorityList = [
        'Access Control & Time Attendance',
        'Gate Barrier',
        'Nurse Call System',
        'Music Systems and BGM Solutions',
        'Indoor Video Wall',
        'Meeting and Boardroom',
        'Digital Signage',
        'Structured Cabling Solutions',
        'Wireless Network Solutions',
        'IPTV / SMATV',
        'Home Automation',
        'Lighting Control Systems'
    ];

    // Filter and sort based on priority list, but keeping objects
    const displayedSolutions = allSolutions.filter(item =>
        priorityList.some(p => item.title.includes(p) || p.includes(item.title))
    );

    const distinctIcons = [
        Shield, Key, PlusSquare, Music, MonitorPlay, Users, 
        Monitor, Wifi, Network, Tv, Home, Lightbulb
    ];

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Dark Theme Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-900/20 blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-800/50 blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-300 mb-6 backdrop-blur-md">
                        SPECIALIZED SOLUTIONS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                            Our Core Competencies
                        </span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                        Expertly designed and implemented systems tailored to your specific industry needs.
                    </p>
                </motion.div>

                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1, // scroll 1
                        breakpoints: {
                            '(min-width: 1280px)': { slidesToScroll: 4 }
                        }
                    }}
                    className="w-full relative px-4 xl:px-8"
                >
                    <CarouselContent className="-ml-6 items-stretch">
                    {displayedSolutions.map((solution, idx) => {
                        const Icon = distinctIcons[idx % distinctIcons.length];
                        return (
                        <CarouselItem key={solution.title} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-auto flex">
                        <motion.div
                            key={solution.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] bg-slate-800/80 backdrop-blur-xl shadow-lg border border-slate-700/50 hover:border-red-500/30 transition-all hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.1)] hover:-translate-y-2"
                        >
                            <div className="relative h-56 w-full overflow-hidden border-b border-slate-700/50 flex-shrink-0">
                                <Image
                                    src={solution.image}
                                    alt={solution.title}
                                    fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                <div className="absolute bottom-4 left-4 z-10 flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors shadow-xl">
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6 pt-5">
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 tracking-tight group-hover:text-red-400 transition-colors">
                                    {solution.title}
                                </h3>

                                {/* We extract a short snippet from the description content if available */}
                                <p className="text-sm text-slate-400 mb-6 line-clamp-3 flex-1 leading-relaxed font-medium">
                                    {solution.content?.description?.[0] || "Advanced solution for modern requirements."}
                                </p>

                                <div className="mt-auto pt-5 border-t border-slate-700/50">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Key Features</h4>
                                    <ul className="space-y-2 mb-6">
                                        {/* @ts-ignore - Content structure varies between solution types */}
                                        {((solution.content as any)?.subsections?.[0]?.points || (solution.content as any)?.keyFeatures?.points || []).slice(0, 3).map((pt: any, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0 ring-1 ring-red-900/50" />
                                                <span className="line-clamp-1">{typeof pt === 'string' ? pt : 'Feature'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/solutions/${solution.categoryId}#${solution.id}`}
                                        className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-900/50 border border-slate-700 text-sm font-semibold text-slate-300 group-hover:bg-red-900/20 group-hover:border-red-500/30 transition-colors"
                                    >
                                        Learn more
                                        <div className="p-1 rounded-full bg-slate-800 text-slate-400 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all">
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                        </CarouselItem>
                    );})}
                    </CarouselContent>
                    
                    {/* Navigation Buttons - Positioned at sides with safe offsets */}
                    <div className="hidden md:block">
                        <CarouselPrevious className="absolute left-0 lg:-left-7 top-1/2 -translate-y-1/2 bg-slate-800/90 text-white border-slate-700 hover:bg-accent hover:text-white transition-all w-14 h-14 z-20 backdrop-blur-sm" />
                        <CarouselNext className="absolute right-0 lg:-right-7 top-1/2 -translate-y-1/2 bg-slate-800/90 text-white border-slate-700 hover:bg-accent hover:text-white transition-all w-14 h-14 z-20 backdrop-blur-sm" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
