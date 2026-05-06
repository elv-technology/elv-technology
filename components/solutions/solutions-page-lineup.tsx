'use client';

import { solutionsData } from "@/lib/solutions-data";
import { ArrowRight, Shield, Music, Wifi, Home } from "lucide-react"; // Import relevant icons
import { LogoIcon } from "@/components/ui/logo";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap = {
    'security-surveillance': Shield,
    'audio-visual': Music,
    'network-communications': Wifi,
    'home-automation': Home,
};

export default function SolutionsPageLineup() {
    const verticals = [
        solutionsData.securityAndSurveillance,
        solutionsData.audioVisual,
        solutionsData.networkAndCommunications,
        solutionsData.homeAutomation
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "circOut" }
        }
    };

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    className="grid md:grid-cols-2 gap-10 lg:gap-16"
                >
                    {verticals.map((vertical) => {
                        const Icon = iconMap[vertical.id as keyof typeof iconMap] || Shield;
                        return (
                            <motion.div key={vertical.id} variants={itemVariants}>
                                <Link
                                    href={`/solutions/${vertical.id}`}
                                    className="group block relative h-full bg-white rounded-[5px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
                                >
                                    {/* Image Container with sophisticated overlay */}
                                    <div className="relative h-80 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                        <Image
                                            src={vertical.image || `https://placehold.co/800x600/1e293b/ffffff?text=${encodeURIComponent(vertical.title)}`}
                                            alt={vertical.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />

                                        {/* Floating Icon Badge */}
                                        <div className="absolute top-6 left-6 z-20 h-14 w-14 rounded-[5px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6">
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        {/* ETS Logo Top Right */}
                                        <div className="absolute top-6 right-6 z-20 flex flex-col items-center justify-center transition-transform duration-500 group-hover:-rotate-2">
                                            <LogoIcon className="w-[80px] h-auto text-white drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    {/* Content Area with refined typography */}
                                    <div className="p-10 flex flex-col h-full">
                                        <div className="mb-6">
                                            <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                                                {vertical.title}
                                            </h2>
                                            <div className="h-1 w-12 bg-red-600 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-red-500" />
                                        </div>

                                        <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                                            {vertical.description}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center text-red-600 font-bold text-sm tracking-wider uppercase group-hover:text-red-700 transition-colors">
                                                Explore Solutions
                                                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                                            </div>

                                            {/* Sub-item count indicator or subtle accent */}
                                            {/* <div className="text-[10px] font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                                ETS SOLUTIONS
                                            </div> */}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
