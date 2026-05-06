'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Autoplay from 'embla-carousel-autoplay';

interface Client {
    id: string;
    name: string;
    logo: string;
    category?: string;
}

interface ClientsSliderProps {
    initialData?: Client[];
}

export function ClientsSlider({ initialData }: ClientsSliderProps) {
    const [clientsList, setClientsList] = React.useState<Client[]>(initialData || []);
    const [loading, setLoading] = React.useState(!initialData);
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false })
    );

    React.useEffect(() => {
        if (initialData) return;

        async function fetchClients() {
            try {
                const res = await fetch('/api/admin/clients');
                const data = await res.json();
                setClientsList(data);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, [initialData]);

    // Group clients into sets of 3 for the rows
    const rows = 3;
    const groupedClients = [];
    for (let i = 0; i < clientsList.length; i += rows) {
        groupedClients.push(clientsList.slice(i, i + rows));
    }

    if (loading) {
        return (
            <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="w-full px-4">
                    <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex flex-col gap-2 min-w-[150px]">
                                {[1, 2, 3].map(j => <Skeleton key={j} className="aspect-[4/3] w-full" />)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (clientsList.length === 0) return null;

    return (
        <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="w-full">
                <div className="text-center mb-10 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold font-montserrat uppercase text-slate-900 dark:text-white sm:text-4xl">
                        Our Esteemed Clients
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        A legacy of trust across {clientsList.length}+ major organizations.
                    </p>
                </div>

                <div className="relative px-4 sm:px-6 lg:px-8 w-full">
                    <Carousel
                        plugins={[plugin.current as any]}
                        className="w-full"
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                    >
                        <CarouselContent className="-ml-1 md:-ml-2">
                            {groupedClients.map((group, groupIndex) => (
                                <CarouselItem key={groupIndex} className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[12.5%]">
                                    <div className="flex flex-col gap-2 py-2">
                                        {group.map((client, clientIndex) => (
                                            <motion.div
                                                key={client.id}
                                                whileHover={{ scale: 1.05 }}
                                                className="transition-transform duration-300"
                                            >
                                                <Card className="border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 rounded-[3px] overflow-hidden">
                                                    <CardContent className="flex aspect-[4/3] items-center justify-center p-1">
                                                        <div className="relative h-20 w-full">
                                                            <Image
                                                                src={client.logo}
                                                                alt={client.name}
                                                                fill
                                                                quality={100}
                                                                unoptimized
                                                                className="object-contain"
                                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                            />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                        {/* Spacer for incomplete groups if any (though loop handles it) */}
                                        {group.length < rows && Array.from({ length: rows - group.length }).map((_, i) => (
                                            <div key={`empty-${i}`} className="aspect-[4/3] invisible" />
                                        ))}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden xl:block">
                            <CarouselPrevious className="-left-4 h-10 w-10 border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200" />
                            <CarouselNext className="-right-4 h-10 w-10 border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
