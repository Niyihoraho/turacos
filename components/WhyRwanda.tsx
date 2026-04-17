"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Compass, Music, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const WhyRwanda = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cards = [
    {
      title: "Lake Kivu Sunsets",
      image: "/images/hero-lake-kivu.png",
      description: "Experience the tranquility of our Great Lake, from traditional boat singing to gold-lit volcanic horizons.",
      icon: <Heart size={18} />,
    },
    {
      title: "Primate Forest Tracking",
      image: "/images/hero-chimpanzee.png",
      description: "Deep in the Nyungwe rainforest, discover our playful cousins swinging through the ancient canopy.",
      icon: <Music size={18} />,
    },
    {
      title: "Mountain Gorilla Encounters",
      image: "/images/hero-gorilla.png",
      description: "Come face-to-face with the majestic silverbacks in the misty bamboo forests of Volcanoes National Park.",
      icon: <Compass size={18} />,
    },
    {
      title: "Alpine Volcanic Hiking",
      image: "/images/hiking-tour.png",
      description: "Summit the legendary Virunga peaks for breathtaking views across three different countries.",
      icon: <Compass size={18} />,
    },
    {
      title: "Land of a Thousand Hills",
      image: "/images/landscapes-rwanda.png",
      description: "Witness the endless rolling green vistas that give Rwanda its most cherished and iconic name.",
      icon: <Heart size={18} />,
    }
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 352; // Card width (320px) + Gap (32px)
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // If at the end and trying to go right, wrap to start
      if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
      setTimeout(checkScroll, 500);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    // Auto-play interval
    const interval = setInterval(() => {
      scroll('right');
    }, 6000);

    return () => {
      window.removeEventListener('resize', checkScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="rwanda" className="relative overflow-hidden bg-[#fdfaf5] py-24">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kivu-blue via-gold to-kivu-blue opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-xl border border-gold/10 bg-gold/5 p-2"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">The Heart of Africa</span>
            </motion.div>
            <motion.h2 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 font-serif text-4xl font-bold text-kivu-blue md:text-5xl"
            >
              Why Visit Rwanda?
            </motion.h2>
            <motion.p 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl text-base leading-7 text-charcoal/65 md:text-lg"
            >
              Explore our curated selection of breathtaking experiences across the country.
            </motion.p>
          </div>
        </div>

        {/* Slider Wrapper with Absolute Buttons */}
        <div className="relative group/slider">
          {/* Navigation Controls - Side Positioned */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -ml-4 md:-ml-8 z-30 -translate-y-1/2 p-4 rounded-full border border-charcoal/10 bg-white/80 backdrop-blur-md shadow-xl transition-all opacity-0 group-hover/slider:opacity-100 hover:bg-gold hover:text-white hover:border-gold cursor-pointer hidden md:flex ${
              !canScrollLeft && 'pointer-events-none opacity-0'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -mr-4 md:-mr-8 z-30 -translate-y-1/2 p-4 rounded-full border border-charcoal/10 bg-white/80 backdrop-blur-md shadow-xl transition-all opacity-0 group-hover/slider:opacity-100 hover:bg-gold hover:text-white hover:border-gold cursor-pointer hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="min-w-[280px] snap-center md:min-w-[320px]"
              >
                <div className="group relative h-[400px] overflow-hidden rounded-[2rem] border border-sand bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:h-[450px]">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-kivu-blue/85 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-lg border border-white/10 bg-white/20 p-2 text-gold backdrop-blur-md transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-serif font-bold leading-tight text-white transition-colors duration-300 group-hover:text-gold md:text-xl">
                        {card.title}
                      </h3>
                    </div>
                    <p className="max-w-xs text-sm leading-6 text-white/85 transition-all duration-500 line-clamp-3">
                      {card.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px w-6 bg-gold" />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold">Experience</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRwanda;
