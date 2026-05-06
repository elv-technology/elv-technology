"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from 'framer-motion';

const features = [
  "Representing reputed global manufacturers.",
  "Serving a wide customer base across multiple market sectors.",
  "Highly skilled professional team for large-scale projects.",
  "Trusted by business owners, architects, consultants, and contractors.",
  "Best-in-class design, delivery, installation, and integration.",
  "Reliable and innovative maintenance services.",
];

export default function TrustedPartner() {
  return (
    <section className="relative bg-slate-50 py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start relative">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-800 mb-6 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              RELIABILITY & TRUST
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-5xl mb-6">
              Your Trusted Partner<br />
              <span className="text-red-600">
                in Technology
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                We represent reputed global manufacturers and serve a wide customer base across multiple market sectors throughout the UAE.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our highly skilled professional team is equipped to manage the complex requirements of large-scale projects with precision and efficiency. The high standards we maintain have earned us lasting trust from business owners, architects, consultants, and contractors alike.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our clients are consistently assured of the best-in-class design, delivery, installation, integration, and maintenance services, setting us apart as a reliable and innovative partner in the technology solutions industry.
              </motion.p>
            </div>
          </motion.div>

          {/* Image */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <div className="absolute -inset-4 rounded-[5px] bg-red-500/20 blur-2xl opacity-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video overflow-hidden rounded-[5px] border border-slate-200 bg-black shadow-2xl group"
            >
              <video
                src="/images/aboutUS/aboutus.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}