'use client';

import { motion } from 'framer-motion';
import { useLoading } from '@/hooks/use-loading';
import { useEffect } from 'react';

export default function Hero() {
    const { stopLoading } = useLoading();

    useEffect(() => {
        stopLoading();
    }, [stopLoading]);

    return (
        <section className="relative h-[400px] flex items-center justify-center bg-gray-900 text-white">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
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
              GET IN TOUCH
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
              <span className="block mb-0.5">CONTACT</span>
              <span className="block text-[#D61F26]">US</span>
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
              We'd love to hear from you. Reach out to us for any inquiries or to discuss your next project.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
