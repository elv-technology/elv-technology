'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { servicesData } from '@/lib/services-data';
import { Cpu, Terminal, Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function Programming() {
  const { programming } = servicesData;

  const features = [
    { title: 'System Commissioning', icon: Settings, desc: 'Ensuring correct functionality & optimal performance.' },
    { title: 'Custom Programming', icon: Terminal, desc: 'Tailored solutions for complex ELV & AV requirements.' },
    { title: 'Major Brands Expertise', icon: Cpu, desc: 'Certified integration for leading global technology systems.' },
  ];

  return (
    <section className="bg-slate-900 py-24 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-800/50 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-red-900/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-stretch">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[5px] shadow-2xl border border-slate-800 group shadow-slate-900/50"
          >
            <Image
              src={programming.image}
              alt={programming.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/20 to-transparent" />

            {/* Glass overlay detail */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 text-white font-semibold mb-2">
                  Advanced Integration
                </div>
                <p className="text-slate-100 text-sm leading-relaxed font-medium">Delivering bespoke control systems that seamlessly unify your technological infrastructure.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs font-medium text-slate-300 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              TECHNICAL EXCELLENCE
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              <span className="text-white">
                {programming.title}
              </span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-slate-400">
              {programming.description.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.02 }}
                  className="group/feature flex items-start gap-4 p-5 rounded-2xl bg-slate-800/50 border border-slate-800 hover:border-red-500/30 hover:bg-slate-800 transition-all shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-slate-400 border border-slate-700 shadow-sm group-hover/feature:text-red-400 group-hover/feature:border-red-900/50 group-hover/feature:bg-slate-800 transition-colors">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-base mb-1 group-hover/feature:text-red-400 transition-colors break-words">{feature.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium break-words">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
