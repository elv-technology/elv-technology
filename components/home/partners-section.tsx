'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import LogoImage from '@/components/logo-image';
import { useIntersection } from '@/hooks/use-intersection';
import type { Partner } from '@prisma/client';

const CATEGORY_ORDER = ["Security", "AV", "Network & communication", "Home Automation"];

function sortPartners(partners: Partner[]) {
    return [...partners].sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a.category ?? '');
        const indexB = CATEGORY_ORDER.indexOf(b.category ?? '');

        if (indexA !== indexB) {
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        }

        return (a.priority || 0) - (b.priority || 0);
    });
}

export default function PartnersSection({ partners }: { partners: Partner[] }) {
    const { ref: sectionRef, isVisible } = useIntersection<HTMLElement>();
    const partnersList = sortPartners(partners);

    return (
        <section 
            ref={sectionRef} 
            className='py-12 sm:py-16 bg-white overflow-hidden relative border-t border-neutral-100'
        >
            <div className='w-full'>
                <div
                    className={`text-center mb-16 transition-all duration-1000 ease-out px-4 ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}>
                    <h2 className='text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6'>
                        Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Partners</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        We collaborate with industry-leading technology providers to deliver unparalleled solutions and drive innovation.
                    </p>
                </div>

                <div className="relative w-full">
                    <Carousel
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2500,
                                stopOnInteraction: false,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-3 md:-ml-4">
                            {partnersList.map((item) => (
                                <CarouselItem key={item.id} className="pl-3 md:pl-4 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-[20%]">
                                    <div className="w-full h-28 sm:h-36 flex items-center justify-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-300">
                                        <div className="relative w-full h-full">
                                            <LogoImage
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                className="object-contain opacity-100 transition-transform duration-500 hover:scale-105"
                                                sizes="(max-width: 768px) 150px, 200px"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Gradient fades for the edges to blend the carousel smoothly */}
                    <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
