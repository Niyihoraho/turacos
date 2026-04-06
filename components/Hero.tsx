"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600"
        alt="Rwanda Landscape"
        fill
        priority
        className="object-cover"
        referrerPolicy="no-referrer"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-gold uppercase tracking-[0.3em] font-bold text-sm mb-4">
            Welcome to Rwanda
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Rwanda's Natural Wonders with Turacos Tours
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
            Unforgettable wildlife safaris, primate tracking, and cultural experiences in the heart of Africa
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#tours"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              🌿 Explore Our Tours
            </motion.a>
            <motion.a
              href="#plan"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Plan Your Trip
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bouncing Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white cursor-pointer"
      >
        <a href="#welcome">
          <ChevronDown size={40} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
