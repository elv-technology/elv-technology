import Link from 'next/link';
import { ArrowLeft, Home, BookOpen, Layers, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-white px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600/10 text-[#D61F26] border border-[#D61F26]/30 mb-2">
          <span className="text-3xl font-black font-space-grotesk">404</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold font-space-grotesk text-white">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto font-inter">
            The page or article you are looking for does not exist, may have moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D61F26] hover:bg-[#D61F26]/90 text-white font-bold font-space-grotesk transition-all shadow-lg shadow-[#D61F26]/20"
          >
            <Home className="w-5 h-5" /> Return Home
          </Link>
          <Link
            href="/blog"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold font-space-grotesk border border-slate-700 transition-all"
          >
            <BookOpen className="w-5 h-5" /> Explore Blog
          </Link>
          <Link
            href="/solutions"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold font-space-grotesk border border-slate-700 transition-all"
          >
            <Layers className="w-5 h-5" /> Our Solutions
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold font-space-grotesk border border-slate-700 transition-all"
          >
            <PhoneCall className="w-5 h-5" /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

