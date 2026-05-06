'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Partner {
    id: string;
    name: string;
    logo: string;
    category: string;
    priority: number;
}

interface PartnersTabsProps {
    initialData?: Partner[];
}

function buildCategories(partners: Partner[]) {
    const CATEGORY_ORDER = ["Security", "AV", "Network & communication", "Home Automation"];
    const categoryTitles = Array.from(new Set(partners.map((p: any) => p.category)))
        .sort((a: any, b: any) => {
            const indexA = CATEGORY_ORDER.indexOf(a as string);
            const indexB = CATEGORY_ORDER.indexOf(b as string);
            if (indexA === -1 && indexB === -1) return (a as string).localeCompare(b as string);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    return categoryTitles.map(title => ({
        title,
        logos: partners.filter((p: any) => p.category === title)
    }));
}

export function PartnersTabs({ initialData }: PartnersTabsProps) {
    const initialCategories = initialData ? buildCategories(initialData) : [];
    const [partnerCategories, setPartnerCategories] = useState<any[]>(initialCategories);
    const [activeTab, setActiveTab] = useState(initialCategories.length > 0 ? String(initialCategories[0].title) : "");
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (initialData) return; // already initialized synchronously

        async function fetchPartners() {
            try {
                const res = await fetch('/api/admin/partners');
                const partners = await res.json();
                const categories = buildCategories(partners);
                setPartnerCategories(categories);
                if (categories.length > 0) setActiveTab(String(categories[0].title));
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPartners();
    }, [initialData]);



    if (loading) {
        return (
            <section className="py-12 bg-slate-50 dark:bg-slate-950">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-8 gap-4">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-24 w-44" />)}
                    </div>
                </div>
            </section>
        );
    }

    if (partnerCategories.length === 0) return null;

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-950">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold font-montserrat uppercase text-slate-900 dark:text-white sm:text-4xl">
                        Our Trusted Partners
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Collaborating with industry leaders to deliver world-class solutions.
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex justify-center mb-8 overflow-x-auto pb-4">
                        <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                            {partnerCategories.map((category) => (
                                <TabsTrigger
                                    key={category.title}
                                    value={category.title}
                                    className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-accent data-[state=active]:text-accent-foreground border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                >
                                    {category.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="min-h-[400px] mt-8">
                        <AnimatePresence mode="wait">
                            {partnerCategories.filter(cat => cat.title === activeTab).map((category) => (
                                <TabsContent key={category.title} value={category.title} className="mt-0 focus-visible:outline-none" forceMount>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-wrap justify-center gap-4"
                                    >
                                        {category.logos.map((logo: any, index: number) => (
                                            <Card
                                                key={logo.id}
                                                className="flex items-center justify-center p-2 w-32 sm:w-40 md:w-44 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow duration-300 group rounded-[3px]"
                                            >
                                                <div className="relative h-20 w-full transition-all duration-300 transform group-hover:scale-110">
                                                    <Image
                                                        src={logo.logo}
                                                        alt={logo.name}
                                                        fill
                                                        quality={100}
                                                        unoptimized
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                            </Card>
                                        ))}
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </AnimatePresence>
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
