"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import PlanTripModal from './PlanTripModal';

const SLIDES = [
  {
    src: "/images/hero-lake-kivu.png",
    alt: "Sunrise over Lake Kivu",
    title: "Lake Kivu Escapes",
    subtitle: "Experience tranquility on the shores of Rwanda's Great Lake",
  },
  {
    src: "/images/hero-gorilla.png",
    alt: "Mountain gorilla in Volcanoes National Park",
    title: "Gorilla Trekking",
    subtitle: "A life-changing encounter in the mist of the Virungas",
  },
  {
    src: "/images/hero-chimpanzee.png",
    alt: "Chimpanzee encounter in Nyungwe Forest",
    title: "Nyungwe Forest",
    subtitle: "Discover the ancient rainforest and its primate secrets",
  },
  {
    src: "/images/hero-safari.png",
    alt: "Classic safari landscape in Akagera",
    title: "Akagera Safari",
    subtitle: "Witness the Big Five across the savannah sunrise",
  },
  {
    src: "/images/hero-kayaking.png",
    alt: "Kayaking adventure on Lake Kivu",
    title: "Active Adventures",
    subtitle: "Premium kayaking and hiking for the bold traveler",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext]);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: [1.02, 1.1] }}
              transition={{ duration: 10, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[currentIndex].src}
                alt={SLIDES[currentIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Brand-Colored Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-kivu-blue/40 via-transparent to-charcoal/90" />
        <div className="absolute inset-0 bg-kivu-blue/10 mix-blend-multiply" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-10 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <motion.div
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-block rounded-full border border-gold/30 bg-black/30 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold backdrop-blur-md">
              Turacos Tours &bull; Rwanda
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h1 className="mb-6 text-5xl font-bold leading-[1.1] text-white md:text-7xl lg:text-8xl font-serif">
                {SLIDES[currentIndex].title}
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light tracking-wide text-white/90 md:text-xl">
                {SLIDES[currentIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <a
              href="#tours"
              className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-gold px-10 text-sm font-bold uppercase tracking-widest text-charcoal transition-all hover:pr-12 hover:shadow-[0_0_30px_rgba(191,154,83,0.5)]"
            >
              <span className="relative z-10">Explore Experiences</span>
              <ChevronRight className="absolute right-4 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" size={18} />
            </a>
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="h-14 flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-10 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white hover:text-charcoal"
            >
              Plan Your Trip
            </button>
          </motion.div>
        </div>
      </div>

      {/* Modern Navigation Arrows - Visible on Hover */}
      <div className="absolute inset-x-0 top-1/2 z-30 hidden -translate-y-1/2 justify-between px-8 md:flex">
        <button
          onClick={slidePrev}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/10 text-white/40 backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-charcoal"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <button
          onClick={slideNext}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/10 text-white/40 backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-charcoal"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Clean Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="group relative h-2 w-12"
          >
            <div className={`h-full w-full rounded-full bg-white/20 transition-all ${index === currentIndex ? 'bg-gold' : 'group-hover:bg-white/40'}`} />
            {index === currentIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-gold shadow-[0_0_15px_rgba(191,154,83,0.8)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Down Hint */}
      <PlanTripModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
