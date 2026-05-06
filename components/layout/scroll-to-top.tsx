'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to 400px
    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="fixed bottom-24 right-6 z-50 lg:bottom-24"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <button
                        onClick={scrollToTop}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors hover:bg-white hover:text-red-600 group"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
                    </button>

                    {/* Pulsing ring effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-red-600/20 -z-10 animate-ping group-hover:block hidden" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
