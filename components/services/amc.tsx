'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { servicesData } from '@/lib/services-data';
import { CheckCircle, ShieldCheck, Wrench, Clock, Activity, Zap, ArrowRight, Users, FileText, Layers } from 'lucide-react';

export default function Amc() {
  const { amc } = servicesData;

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle mesh gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-200/50 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-red-50/50 blur-[100px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#fff_70%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            PEACE OF MIND
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-slate-900">
              {amc.title}
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-slate-600">
            {amc.description.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-12 items-stretch">
          {/* Systems Covered - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="xl:col-span-7 flex flex-col gap-6 h-full"
          >
            {/* Systems Glass Card */}
            <div className="relative rounded-[2rem] border border-slate-100 bg-white p-6 backdrop-blur-xl overflow-hidden group h-full shadow-xl shadow-slate-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-start sm:items-center gap-3 relative z-10">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="flex-1 break-words">{amc.systemsCovered.title}</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 relative z-10">
                {amc.systemsCovered.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:bg-white transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-600 flex-1 break-words">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[250px] sm:h-[350px] xl:h-auto xl:min-h-[450px] xl:flex-1 rounded-[5px] overflow-hidden border border-slate-100 group bg-slate-100">
              <Image
                src={amc.image}
                alt="AMC Services"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white text-sm font-semibold backdrop-blur-md bg-white/20 w-fit px-5 py-2.5 rounded-full border border-white/30 shadow-xl">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Professional Maintenance
                </div>
              </div>
            </div>
          </motion.div>

          {/* Includes & Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-5 flex flex-col gap-6 h-full"
          >
            {/* What includes */}
            <div className="relative rounded-[2rem] border border-slate-100 bg-white p-6 backdrop-blur-xl overflow-hidden group shadow-xl shadow-slate-200/50">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                {amc.includes.title}
              </h3>
              <p className="text-sm text-slate-600 mb-2 relative z-10">{amc.includes.description}</p>

              <div className="space-y-4 relative z-10">
                {amc.includes.visits.map((visit, idx) => (
                  <div key={visit.title} className="group/item flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-300 transition-all">
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-200 group-hover/item:text-blue-600 group-hover/item:scale-110 group-hover/item:border-blue-200 transition-all shadow-sm">
                      {idx === 0 ? <Wrench className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 mb-1 group-hover/item:text-blue-600 transition-colors break-words">{visit.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium break-words">{visit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="relative rounded-[2rem] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 overflow-hidden flex-1 shadow-xl shadow-slate-200/50">
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-100 rounded-full blur-[80px]" />

              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-start sm:items-center gap-3 relative z-10">
                <ShieldCheck className="text-red-600 w-6 h-6 shrink-0 mt-0.5 sm:mt-0" />
                <span className="flex-1 break-words">Why Choose Us?</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {amc.whyChooseUs.items.map((item, idx) => {
                  const Icons = [Clock, Users, ShieldCheck, FileText, Layers];
                  const Icon = Icons[idx % Icons.length];
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-center gap-3 text-slate-600 bg-white p-3 rounded-xl border border-slate-100 hover:border-red-100 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 shrink-0 ring-1 ring-red-100 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold flex-1 break-words">{item}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
