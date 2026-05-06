'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Job {
    id: string;
    title: string;
    type: string;
    department: string;
    location: string;
    description: string;
    requirements: string[];
}

export default function JobOpeningsList({ initialJobs }: { initialJobs: Job[] }) {
    const jobOpenings = initialJobs || [];

    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Current Openings</h2>
            <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {jobOpenings.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <AccordionItem value={job.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-shadow px-6">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex flex-col items-start gap-2 text-left">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</span>
                                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                                                {job.type}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase className="h-4 w-4" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pt-2">
                                    <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <p>{job.description}</p>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Requirements:</h4>
                                            <ul className="grid sm:grid-cols-2 gap-3">
                                                {job.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="pt-4">
                                            <p className="text-sm font-medium text-slate-500 italic">
                                                To apply for this position, please use the form below.
                                            </p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
