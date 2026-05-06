'use client';

import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "./logo";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 400); // Reduced delay for faster exit
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex items-center"
        >
          {/* Grid structure mimicking the hero section */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-32 lg:pt-40">
            <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
              
              {/* Left Column: Heading Skeleton */}
              <div className="flex flex-col gap-4">
                <motion.div 
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-14 sm:h-20 w-3/4 bg-slate-800/50 rounded-xl"
                />
                <motion.div 
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="h-14 sm:h-20 w-1/2 bg-red-900/20 rounded-xl"
                />
                <motion.div 
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="h-14 sm:h-20 w-2/3 bg-slate-800/50 rounded-xl"
                />
              </div>

              {/* Right Column: Content Skeleton */}
              <div className="flex flex-col gap-10">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-4 w-full bg-slate-800/40 rounded-full"
                  />
                  <motion.div 
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="h-4 w-full bg-slate-800/40 rounded-full"
                  />
                  <motion.div 
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="h-4 w-4/5 bg-slate-800/40 rounded-full"
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <motion.div 
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-14 w-48 bg-red-900/30 rounded-lg"
                  />
                  <motion.div 
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="h-14 w-32 bg-slate-800/50 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subtle logo pulse at bottom */}
          <div className="absolute bottom-10 right-10">
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-auto opacity-20"
            >
              <LogoIcon className="text-white w-full h-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
