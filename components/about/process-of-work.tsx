"use client";

import {
  Lightbulb,
  PenTool,
  Settings,
  CheckCircle,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const processes = [
  {
    icon: Lightbulb,
    title: "1. Needs Analysis",
    description: "We start by understanding your goals, space requirements, and overall technology vision. Our team performs an on-site assessment to evaluate the environment. Based on findings, we propose the most effective solution aligning with your timeline and budget.",
    color: "from-blue-500 to-indigo-500",
    bgAccent: "bg-blue-50 text-blue-500 border-blue-100",
  },
  {
    icon: PenTool,
    title: "2. Design",
    description: "Using gathered insights, our engineers craft a tailored concept design for your AV and ELV systems. We prepare detailed layouts, drawings, and BOQs using advanced software to ensure seamless performance.",
    color: "from-indigo-500 to-purple-500",
    bgAccent: "bg-indigo-50 text-indigo-500 border-indigo-100",
  },
  {
    icon: Settings,
    title: "3. Procurement & Integration",
    description: "We procure premium equipment from trusted global manufacturers. Our technical team handles the full installation process, maintaining strict adherence to safety standards, verifying all components to guarantee proper integration.",
    color: "from-purple-500 to-pink-500",
    bgAccent: "bg-purple-50 text-purple-500 border-purple-100",
  },
  {
    icon: CheckCircle,
    title: "4. System Configuration & Validation",
    description: "We configure the system to match operational requirements and ensure intuitive use. Each feature undergoes rigorous validation and performance testing to confirm flawless operation, making any necessary adjustments for optimal results.",
    color: "from-pink-500 to-red-500",
    bgAccent: "bg-pink-50 text-pink-500 border-pink-100",
  },
  {
    icon: ShieldCheck,
    title: "5. Handover & Training",
    description: "We conduct comprehensive handover sessions and provide hands-on training so your team can confidently operate every part of the system. Documentation and user guidelines are provided to ensure smooth day-to-day operation.",
    color: "from-red-500 to-orange-500",
    bgAccent: "bg-red-50 text-red-500 border-red-100",
  },
  {
    icon: Wrench,
    title: "6. After-Sales Support & Maintenance",
    description: "Our commitment continues even after project completion. We provide responsive technical support to assist with any operational needs. We also offer Annual Maintenance Contracts (AMC), preventive maintenance, system updates, and performance checks to ensure your systems remain secure, efficient, and operating at peak performance.",
    color: "from-orange-500 to-amber-500",
    bgAccent: "bg-orange-50 text-orange-500 border-orange-100",
  },
];

export default function ProcessOfWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-32 bg-slate-50 overflow-hidden" ref={containerRef}>
      {/* Background abstract elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-800 mb-6 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            OUR APPROACH
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
              How We Work
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 font-medium leading-relaxed">
            Our proven methodology guarantees the delivery of high-quality technology solutions, from initial consultation to long-term support.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Animated SVG Path for Timeline */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 hidden md:block">
            <div className="h-full w-full bg-slate-200 rounded-full" />
            <motion.div
              className="absolute top-0 w-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 origin-top"
              style={{ scaleY: pathLength }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {processes.map((process, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={process.title} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot for Mobile */}
                  <div className="absolute left-6 top-6 h-full w-0.5 bg-slate-200 md:hidden -z-10" />

                  {/* Left Side (Content or Empty Space) */}
                  <div className={`w-full md:w-1/2 flex justify-start ${isEven ? 'md:justify-end' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                      className={`group relative w-[calc(100%-3rem)] ml-12 md:ml-0 md:w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:border-slate-300 hover:shadow-2xl ${isEven ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <div className={`absolute top-0 h-1 w-0 group-hover:w-full transition-all duration-500 left-0 bg-gradient-to-r ${process.color}`} />

                      <div className={`mb-6 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border shadow-md transition-transform duration-300 group-hover:scale-110 ${process.bgAccent}`}>
                          <process.icon className="h-8 w-8" />
                        </div>
                      </div>

                      <h3 className="mb-4 text-2xl font-bold text-slate-900 tracking-tight">
                        {process.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {process.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Dot (Desktop Only) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center z-10"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${process.color} animate-pulse`} />
                    </motion.div>
                  </div>

                  {/* Right Side (Content or Empty Space) */}
                  <div className="hidden md:block w-1/2">
                    {/* Empty space to act as flex layout balancer */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
