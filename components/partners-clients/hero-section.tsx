'use client';

import { motion, useMotionValue, animate, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Trophy, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useLoading } from '@/hooks/use-loading';

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const count = useMotionValue(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(count, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => setDisplayValue(Math.round(latest))
            });
        }
    }, [isInView, value, count]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
};

export function HeroSection() {
    const { stopLoading } = useLoading();

    useEffect(() => {
        stopLoading();
    }, [stopLoading]);

    return (

        <div className="relative isolate overflow-hidden bg-slate-900 pb-10 pt-10 sm:pb-12">
            {/* Background gradients - Matching Blog/Case Studies */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-200 to-red-900 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red-200 to-red-900 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto py-12 sm:py-16 lg:py-20 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center w-full mb-8 lg:mb-12"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold font-montserrat uppercase tracking-widest text-white backdrop-blur-md shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                            </span>
                            PARTNERS & CLIENTS
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
                        {/* Left Column: Heading */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space-grotesk tracking-tight leading-[0.95] text-white">
                                <span className="block mb-0.5">COLLABORATING</span>
                                <span className="block text-[#D61F26]">FOR EXCELLENCE</span>
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
                                We bridge the gap between innovation and execution by partnering with top-tier technology providers and serving a diverse clientele. Together, we build the future.
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link href="/case-studies">
                                    <Button size="lg" className="bg-[#D61F26] text-white hover:bg-[#D61F26]/90 h-14 px-8 text-base font-bold font-space-grotesk uppercase tracking-wider rounded-none transition-all duration-300 shadow-xl shadow-[#D61F26]/20">
                                        View Our Works <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mx-auto mt-8 max-w-4xl"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10 justify-center text-center">
                        <div className="flex flex-col items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl transition-transform duration-300 hover:scale-105">
                            <Users className="h-8 w-8 text-blue-400 mb-2" />
                            <span className="text-3xl font-bold italic">
                                <AnimatedCounter value={100} suffix="+" />
                            </span>
                            <span className="text-slate-400 font-normal text-sm">Global Partners</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl transition-transform duration-300 hover:scale-105">
                            <Trophy className="h-8 w-8 text-yellow-400 mb-2" />
                            <span className="text-3xl font-bold italic">
                                <AnimatedCounter value={2000} suffix="+" />
                            </span>
                            <span className="text-slate-400 font-normal text-sm">Happy Clients</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-xl transition-transform duration-300 hover:scale-105">
                            <ShieldCheck className="h-8 w-8 text-green-400 mb-2" />
                            <span className="text-3xl font-bold italic">
                                <AnimatedCounter value={100} suffix="%" />
                            </span>
                            <span className="text-slate-400 font-normal text-sm">Secure Solutions</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
