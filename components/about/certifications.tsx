'use client';

import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { certGroups } from '@/lib/about-data';

export default function Certifications() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100/50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-800 mb-6 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            COMPLIANCE & EXCELLENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
              Our Certifications
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 font-medium">
            We are certified to the highest standards, reflecting our commitment to quality, safety, environmental responsibility, and regulatory compliance.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col h-full rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-red-200 hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-red-500 border border-slate-100 shadow-md group-hover:scale-110 group-hover:border-red-200 group-hover:bg-red-50 transition-all duration-300">
                    <group.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 tracking-tight">
                    {group.title}
                  </h3>
                </div>

                <p className="mb-8 text-sm text-slate-600 font-medium leading-relaxed">
                  {group.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {group.items.map((item) => (
                    <div key={item.text} className="group/item relative flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-red-200 hover:shadow-sm">
                      {item.image ? (
                        <div className="relative h-20 w-full mb-3 overflow-hidden rounded-xl bg-white p-3 flex items-center justify-center border border-slate-100 group-hover/item:border-red-100">
                          <Image
                            src={item.image}
                            alt={item.text}
                            width={120}
                            height={80}
                            className="object-contain max-h-full w-auto transition-transform duration-500 group-hover/item:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 group-hover/item:text-red-500 group-hover/item:border-red-200 transition-colors shadow-sm">
                          <BadgeCheck className="h-6 w-6" />
                        </div>
                      )}
                      <span className="text-[11px] font-bold text-center text-slate-600 uppercase tracking-wider group-hover/item:text-slate-900 transition-colors line-clamp-2 px-1">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
