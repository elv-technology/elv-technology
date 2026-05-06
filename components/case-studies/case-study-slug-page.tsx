'use client';

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Building, Calendar, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import DOMPurify from "isomorphic-dompurify";
import { useLoading } from "@/hooks/use-loading";

interface CaseStudySolution {
  title: string;
  components?: Array<{
    name: string;
    details: string;
  }>;
  points?: string[];
  html?: string;
}

interface CaseStudy {
  slug: string;
  project: string;
  client: string;
  image: string;
  overview: string;
  challenges: string[];
  solution: CaseStudySolution;
  gallery?: string[];
  outcomes: string[];
  location: string;
  category?: string;
}

interface CaseStudySlugPageProps {
  study: CaseStudy;
  allStudies: CaseStudy[];
}

export default function CaseStudySlugPage({ study, allStudies }: CaseStudySlugPageProps) {
  const { stopLoading } = useLoading();

  if (!study) {
    notFound();
  }

  const currentIndex = allStudies.findIndex(s => s.slug === study.slug);
  const [focusedIndex, setFocusedIndex] = useState(currentIndex);

  const currentPrevStudy = focusedIndex > 0 ? allStudies[focusedIndex - 1] : null;
  const currentNextStudy = focusedIndex < allStudies.length - 1 ? allStudies[focusedIndex + 1] : null;

  // Combine main image and gallery for the hero slider
  const allImages = [study.image, ...(study.gallery || [])];

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );


  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden" ref={allImages.length > 1 ? emblaRef : undefined}>
        {allImages.length > 1 ? (
          <div className="flex h-full w-full">
            {allImages.map((img, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full w-full">
                <Image
                  src={img}
                  alt={`${study.project} - Slide ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                  onLoad={i === 0 ? stopLoading : undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={study.image}
            alt={study.project}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            onLoad={stopLoading}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30 pointer-events-none" />
        <div className="absolute inset-0 flex items-end pointer-events-none">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 pb-16 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/case-studies" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Case Studies
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl">
                {study.client}
              </h1>
              <h2 className="mt-4 text-xl sm:text-2xl font-medium text-slate-200 max-w-3xl">
                {study.project}
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24 select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg prose-slate dark:prose-invert max-w-none"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-12">
                {study.overview}
              </p>

              <Separator className="my-12" />

              {study.challenges && study.challenges.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">The Challenge</h2>
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <ul className="space-y-3 mt-0">
                      {study.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="flex items-start text-slate-700 dark:text-slate-300">
                          <div className="mt-1.5 mr-3 h-2 w-2 rounded-full bg-red-600 flex-shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">The Solution</h2>
                <div className="space-y-6">
                  {study.solution && <p className="font-medium text-slate-900 dark:text-white text-xl">{study.solution.title}</p>}

                  {/* Render Quill HTML dynamically styled to look strictly identical to legacy boxes */}
                  {study.solution.html ? (
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none 
                        [&>ul]:list-none [&>ul]:space-y-3 [&>ul]:bg-slate-50 [&>ul]:dark:bg-slate-900/50 [&>ul]:py-6 [&>ul]:px-8 md:[&>ul]:px-10 [&>ul]:rounded-2xl [&>ul]:border [&>ul]:border-slate-100 [&>ul]:dark:border-slate-800
                        [&>ul>li]:text-slate-600 [&>ul>li]:dark:text-slate-300 [&>ul>li]:m-0 [&>ul>li]:leading-normal [&>ul>li]:text-base
                        [&>ul>li]:relative [&>ul>li]:pl-10
                        [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:top-[4px] [&>ul>li::before]:w-[22px] [&>ul>li::before]:h-[22px] [&>ul>li::before]:content-['']
                        [&>ul>li::before]:bg-top [&>ul>li::before]:bg-no-repeat [&>ul>li::before]:bg-contain
                        [&>ul>li::before]:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%20%22%20fill=%22none%22%20stroke=%22%23ef4444%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22M22%2011.08V12a10%2010%200%201%201-5.93-9.14%22/%3E%3Cpath%20d=%22M9%2011l3%203L22%204%22/%3E%3C/svg%3E')]
                        prose-strong:text-slate-900 prose-strong:dark:text-white prose-strong:text-base prose-strong:font-bold prose-strong:block prose-strong:mb-0.5
                        prose-p:m-0
                      "
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(study.solution.html) }}
                    />
                  ) : (
                    <div className="text-slate-500 italic">Solution details are being updated...</div>
                  )}
                </div>
              </div>

              {study.gallery && study.gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {study.gallery.map((img: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300"
                      >
                        <Image
                          src={img}
                          alt={`${study.project} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 transition-colors duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {study.outcomes && study.outcomes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Outcomes</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {study.outcomes.map((outcome: string, index: number) => (
                      <div key={index} className="flex items-start bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/20">
                        <CheckCircle className="mt-0.5 mr-3 h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-slate-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Client</p>
                      <p className="text-base font-semibold text-slate-900 dark:text-white">{study.client}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-slate-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</p>
                      <p className="text-base font-semibold text-slate-900 dark:text-white">{study.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-700 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="text-xl font-bold mb-2">Ready to transform your business?</h3>
                <p className="text-red-100 mb-6">Let's discuss how we can help you achieve similar results.</p>
                <Link href="/contact" className="w-full">
                  <Button variant="secondary" className="w-full bg-white text-red-700 hover:bg-red-50 font-bold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentPrevStudy ? (
            <div className="group flex flex-col items-start p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
              {focusedIndex > 0 ? (
                <button
                  onClick={() => setFocusedIndex(focusedIndex - 1)}
                  className="flex items-center text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 mb-2 transition-colors cursor-pointer focus:outline-none"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Success
                </button>
              ) : (
                <div className="h-6 mb-2" /> // Spacer to keep layout steady when button is hidden
              )}
              <Link href={`/case-studies/${currentPrevStudy.slug}`} className="text-lg font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors w-full text-left">
                {currentPrevStudy.client}
              </Link>
            </div>
          ) : <div />}

          {currentNextStudy ? (
            <div className="group flex flex-col items-end text-right p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
              {focusedIndex < allStudies.length - 1 ? (
                <button
                  onClick={() => setFocusedIndex(focusedIndex + 1)}
                  className="flex items-center text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 mb-2 transition-colors cursor-pointer focus:outline-none"
                >
                  Next Success <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <div className="h-6 mb-2" /> // Spacer
              )}
              <Link href={`/case-studies/${currentNextStudy.slug}`} className="text-lg font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors w-full text-right">
                {currentNextStudy.client}
              </Link>
            </div>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
