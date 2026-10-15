'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import LogoImage from '@/components/logo-image';
import { useIntersection } from '@/hooks/use-intersection';
import type { Client } from '@prisma/client';

export default function ClientsSection({ clients }: { clients: Client[] }) {
  const { ref: sectionRef, isVisible } = useIntersection<HTMLElement>();

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
          <h2 className='text-sm sm:text-base font-semibold text-muted-foreground tracking-widest uppercase'>
            Trusted Client Across The UAE.
          </h2>
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
              {clients.map((item) => (
                <CarouselItem key={item.id} className="pl-3 md:pl-4 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-[20%]">
                  <div className="w-full h-28 sm:h-36 flex items-center justify-center p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-300">
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
