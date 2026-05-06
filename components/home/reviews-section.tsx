'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  content: string;
  rating: number;
  date: string;
  isNew?: boolean;
}

export default function ReviewsSection({ testimonials }: { testimonials?: Testimonial[] }) {
  const reviews = testimonials || [];
  const [currentReview, setCurrentReview] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToReview = useCallback(
    (index: number) => {
      if (isTransitioning || reviews.length === 0) return;
      setIsTransitioning(true);
      setCurrentReview(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, reviews.length]
  );

  const nextReview = useCallback(() => {
    if (reviews.length === 0) return;
    goToReview((currentReview + 1) % reviews.length);
  }, [currentReview, goToReview, reviews.length]);

  const prevReview = useCallback(() => {
    if (reviews.length === 0) return;
    goToReview((currentReview - 1 + reviews.length) % reviews.length);
  }, [currentReview, goToReview, reviews.length]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, [nextReview, reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className='relative py-10 lg:py-16 bg-[#0a0a0a] overflow-hidden text-white'
    >
      {/* Background ambient glowing spheres */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

      {/* Right Half Pattern Background */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center justify-end pointer-events-none overflow-hidden z-0">
        <div className="w-[120%] max-w-[800px] aspect-square bg-[url('/images/logo-pattern.svg')] bg-right bg-no-repeat bg-contain opacity-[0.08] translate-x-1/4"></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10'>
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Sub-headline */}
          <div className='flex items-center justify-center gap-3 mb-6'>
            <span className='text-sm font-semibold text-accent tracking-widest uppercase'>
              Trusted by Customers
            </span>
            <span className='text-sm font-bold text-white'>5.0</span>
            <div className='flex items-center gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`header-star-${i}`}
                  className='h-4 w-4 fill-yellow-400 text-yellow-400'
                />
              ))}
            </div>
          </div>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2'>
            What Our Customers Say
          </h2>
        </div>

        {/* Review carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
            }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Glassmorphism Card */}
          <div className='relative overflow-hidden rounded-2xl bg-[#1e1e1e] border border-white/5 p-6 sm:p-8 min-h-[220px] flex items-center shadow-xl group transition-colors duration-500'>
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

            {/* Quote icon */}
            <Quote className='absolute top-8 right-8 h-20 w-20 text-white/5 group-hover:text-accent/10 transition-colors duration-500' />

            <div className="grid w-full relative z-10">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`col-start-1 row-start-1 w-full transition-all duration-700 flex flex-col justify-center ${index === currentReview
                    ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                    : index < currentReview
                      ? 'opacity-0 -translate-x-full z-0 pointer-events-none'
                      : 'opacity-0 translate-x-full z-0 pointer-events-none'
                    }`}
                >
                  {/* Top section with stars and date */}
                  <div className='flex items-center gap-4 mb-6 relative z-10'>
                    <div className='flex items-center gap-1'>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={`star-${index}-${i}`}
                          className='h-5 w-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <span className='text-sm font-medium text-neutral-400'>{review.date}</span>
                    {review.isNew && (
                      <span className='px-3 py-1 text-[10px] font-bold tracking-wider text-accent bg-accent/20 rounded-full uppercase border border-accent/30'>
                        New
                      </span>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className='text-base sm:text-lg lg:text-xl leading-relaxed text-white font-medium relative z-10'>
                    "{review.content}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className='mt-8 flex items-center justify-center gap-6'>
            <button
              type='button'
              onClick={prevReview}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-lg'
              aria-label='Previous review'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>

            <div className='flex items-center gap-3'>
              {reviews.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type='button'
                  onClick={() => goToReview(index)}
                  className={`rounded-full transition-all duration-500 ${index === currentReview
                    ? 'h-2 w-10 bg-gradient-to-r from-accent to-red-500'
                    : 'h-2 w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={nextReview}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 hover:bg-accent hover:border-accent hover:text-white hover:scale-110 shadow-lg'
              aria-label='Next review'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
