'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLoading } from '@/hooks/use-loading';

export default function AboutHero() {
  const { stopLoading } = useLoading();

  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      {/* Background Image with Premium Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aboutUS/hero.jpeg"
          alt="ELV Technologies Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-100"
          priority
          onLoad={stopLoading}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/60" />
      </div>


      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

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
            ABOUT US
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
              <span className="block mb-0.5">THE BEST AUDIO VISUAL</span>
              <span className="block text-[#D61F26] mb-0.5">INTEGRATOR</span>
              <span className="block text-white">IN UAE</span>
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
              ETS is one of the top technology integrators and solution providers
              in the UAE, specializing in security and surveillance systems, Audio
              Visual (AV) Solutions, Extra Low Voltage (ELV) Systems, IT and Home
              Automation Solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
    </section>
  );
}
