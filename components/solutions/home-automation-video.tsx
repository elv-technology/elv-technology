'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '@/hooks/use-loading';

export default function HomeAutomationVideo() {
    const { stopLoading } = useLoading();
    const [videoReady, setVideoReady] = useState(false);

    // Dismiss loading screen immediately — never block on large video files
    useEffect(() => {
        stopLoading();
    }, [stopLoading]);

    return (
        <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden bg-slate-900 flex items-center">
            {/* Background Video — fades in when ready */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setVideoReady(true)}
                    className={`h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-60' : 'opacity-0'}`}
                >
                    <source src="/images/solutions/home-automation/Ligting and Home Automation.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 z-10" />
                <div className="absolute inset-0 backdrop-blur-[2px] z-0" />
            </div>

            <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
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
                        The Future of Living
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
                    {/* Left Column: Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95] uppercase font-space-grotesk">
                            <span className="block">Elevate</span>
                            <span className="block text-[#D61F26]">Your</span>
                            <span className="block text-white">Environment</span>
                        </h1>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col gap-8"
                    >
                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-normal font-inter">
                            Experience seamless harmony between lighting, climate, and security. Our intelligent automation systems are designed to adapt to your lifestyle.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
