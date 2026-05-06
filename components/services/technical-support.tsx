'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { servicesData } from '@/lib/services-data';
import { CheckCircle, Server, Shield, Monitor, Clock, ShieldCheck, BarChart3, Users, Wrench, FileText, Layers } from 'lucide-react';

export default function TechnicalSupport() {
  const { technicalSupport } = servicesData;

  // Icons mapping for capabilities (optional improvement for visual distinction)
  const capabilityIcons = [Shield, Monitor];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#fff_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Intro Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              EXPERT SUPPORT
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              <span className="text-slate-900">
                {technicalSupport.title}
              </span>
            </h2>
            <div className="space-y-4">
              {technicalSupport.description.map((text, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-slate-600">
                  {text}
                </p>
              ))}
            </div>

            {/* Key Features / Highlights Box */}
            <div className="mt-8 p-6 bg-white backdrop-blur-xl rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-50 border border-red-100 shrink-0">
                  <Server className="w-5 h-5 text-red-600" />
                </div>
                <span className="flex-1 break-words">Key Service Highlights</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['24/7 Monitoring', 'Rapid Response', 'Certified Engineers', 'Proactive Maintenance'].map((item) => (
                  <li key={item} className="flex items-start sm:items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] mt-1.5 sm:mt-0" />
                    <span className="font-medium flex-1 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[5px] shadow-2xl border border-slate-100 group shadow-slate-200/50"
          >
            <Image
              src={technicalSupport.image}
              alt={technicalSupport.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Glass Overlay on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-white shadow-xl">
              <p className="font-medium text-slate-100">Ensuring operational continuity for critical systems across the UAE.</p>
            </div>
          </motion.div>
        </div>

        {/* Capabilities Section - Cards */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {technicalSupport.capabilities.title}
            </h3>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technicalSupport.capabilities.sections.map((section, idx) => {
              // Cycle through 4 distinct icons for the 4 categories
              const Icons = [Shield, Monitor, Server, CheckCircle];
              const SectionIcon = Icons[idx % Icons.length];

              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-[2rem] bg-white p-6 border border-slate-100 backdrop-blur-xl transition-all hover:border-red-100 shadow-xl shadow-slate-200/50 flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <SectionIcon className="w-32 h-32 text-slate-900" />
                  </div>

                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:text-red-600 group-hover:bg-red-50 ring-1 ring-slate-100 group-hover:ring-red-100 transition-all shadow-sm">
                        <SectionIcon className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">{section.title}</h4>
                    </div>

                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 opacity-80" />
                          <span className="text-slate-600 leading-snug text-sm font-medium flex-1 break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us - Bento Grid Style */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose{' '}
              <span className="text-red-600">ELV Technology Solutions</span>
            </h3>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicalSupport.whyChooseUs.items.map((item, idx) => {
              const Icons = [Clock, ShieldCheck, BarChart3, Users];
              const Icon = Icons[idx % Icons.length];
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-white border border-slate-100 backdrop-blur-md group hover:border-red-100 transition-all shadow-sm hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="mb-6 h-16 w-16 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-200 group-hover:bg-red-50 group-hover:border-red-100 group-hover:text-red-600 transition-all transform group-hover:scale-110 shadow-sm">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
