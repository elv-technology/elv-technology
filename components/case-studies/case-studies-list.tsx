'use client';

import { useState, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CaseStudiesList({ initialData }: { initialData: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudies = useMemo(() => {
    const data = initialData || [];
    return data.filter(study => {
      const matchesSearch =
        study.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.overview.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Search Control */}
        <div className="flex flex-col mb-12 items-end justify-end w-full max-w-md ml-auto">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            <Input
              placeholder="Search by project, client, or technology..."
              className="pl-12 h-14 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all shadow-sm w-full text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <motion.div
          layout
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/case-studies/${study.slug}`} className="group flex flex-col h-full">
                  <Card className="flex flex-col h-full overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-3xl">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.project}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="p-6 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-red-600 dark:text-red-400 line-clamp-2">
                          {study.project}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                        {study.client}
                      </h3>
                    </CardHeader>

                    <CardContent className="p-6 pt-2 flex-grow text-slate-600 dark:text-slate-300">
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <MapPin className="h-4 w-4 mr-1 text-red-500" />
                        {study.location}
                      </div>
                      <p className="text-base leading-relaxed line-clamp-3">
                        {study.overview}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 mt-auto border-t border-slate-50 dark:border-slate-800/50">
                      <div className="flex items-center text-sm font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform pt-4">
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
              <Search className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search query or category filters.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSearchQuery('');
              }}
            >
              Clear search
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
