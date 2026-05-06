"use client";

import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  "Treat everyone with respect and dignity",
  "Commit to continuous improvement through training and knowledge sharing.",
  "Demonstrate teamwork, honesty, and integrity in all engagements.",
  "Maintain a friendly approach and honour every commitment made.",
  "Ensure Quality Assurance across all tasks and project stages.",
];

export default function MissionVisionValues() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-slate-50">
      {/* Background abstract elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-6 text-red-600 ring-1 ring-inset ring-red-600/10 mb-6 bg-red-50/50 backdrop-blur-md">
              Our Core Principles
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Driving Excellence Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Technology</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-full rounded-[2rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:border-red-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-500/25 transition-all duration-500 group-hover:scale-110 group-hover:shadow-red-500/40">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-red-700 transition-colors">
                    Our Mission
                  </h3>
                </div>
                <p className="leading-relaxed text-slate-700 text-lg">
                  To deliver end-to-end technology solutions that exceed client
                  expectations through innovative design, reliable implementation,
                  and future-ready support infrastructure.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative h-full rounded-[2rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:border-blue-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-500/40">
                    <Eye className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                    Our Vision
                  </h3>
                </div>
                <p className="leading-relaxed text-slate-700 text-lg">
                  To continue as a leading provider of Audio Visual Solutions, ELV
                  Systems, Security & Surveillance, and Home Automation
                  technologies in Abu Dhabi and all over the UAE by consistently
                  delivering excellence and maximizing value for our clients.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative h-full rounded-[2rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:border-emerald-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-500 group-hover:scale-110 group-hover:shadow-emerald-500/40">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  Our Values
                </h3>
              </div>
              <ul className="space-y-6">
                {values.map((value, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="flex items-start gap-4 text-lg leading-relaxed text-slate-700 font-medium"
                  >
                    <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                    {value}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
