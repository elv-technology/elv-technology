'use client';

import * as React from 'react';
import Image from 'next/image';
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

export function ClientsCarousel() {
    const [clientsList, setClientsList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    React.useEffect(() => {
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
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex gap-4 overflow-hidden">
                        {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="aspect-square w-40 flex-shrink-0" />)}
                    </div>
                </div>
            </section>
        );
    }

    if (clientsList.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold font-montserrat uppercase text-slate-900 dark:text-white sm:text-4xl">
                        Our Esteemed Clients
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Powering ambitions for the industry's best across the globe.
                    </p>
                </div>

                <div className="relative px-12">
                    <Carousel
                        plugins={[plugin.current as any]}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="-ml-4">
                            {clientsList.map((client) => (
                                <CarouselItem key={client.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                    <div className="p-1">
                                        <Card className="border-none shadow-none bg-transparent">
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <div className="relative h-20 w-full filter hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100">
                                                    <Image
                                                        src={client.logo}
                                                        alt={client.name}
                                                        fill
                                                        quality={100}
                                                        unoptimized
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
