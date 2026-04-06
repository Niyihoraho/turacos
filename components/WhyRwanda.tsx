"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Compass, Music, ShieldCheck } from 'lucide-react';

const WhyRwanda = () => {
  const cards = [
    {
      title: "Extraordinary Wildlife",
      image: "/images/wildlife-rwanda.png",
      description: "Home to the rare mountain gorillas, majestic lions, and over 700 vibrant bird species in pristine habitats.",
      icon: <Compass className="w-5 h-5" />,
      span: "md:col-span-1"
    },
    {
      title: "Stunning Landscapes",
      image: "/images/landscapes-rwanda.png",
      description: "From the mist-covered Virunga volcanoes to the serene shores of Lake Kivu and the rolling 'Thousand Hills'.",
      icon: <Heart className="w-5 h-5" />,
      span: "md:col-span-1"
    },
    {
      title: "Rich Cultural Heritage",
      image: "/images/rwanda-culture.png",
      description: "Experience the rhythm of the Ingoma drummers, explore vibrant craft markets, and connect with Rwanda's deep traditions.",
      icon: <Music className="w-5 h-5" />,
      span: "md:col-span-1"
    },
    {
      title: "Safe & Warm Hospitality",
      image: "/images/rwanda-hospitality.png",
      description: "Ranked as one of Africa's safest and cleanest countries, our people welcome you with open arms and hearts.",
      icon: <ShieldCheck className="w-5 h-5" />,
      span: "md:col-span-1"
    }
  ];

  return (
    <section id="rwanda" className="py-24 bg-[#fdfaf5] relative overflow-hidden">
      {/* Subtle brand color accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-gold to-forest opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-2xl bg-gold/5 border border-gold/10 mb-6"
          >
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">The Heart of Africa</span>
          </motion.div>
          <motion.h2 
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-forest mb-8"
          >
            Why Visit Rwanda?
          </motion.h2>
          <motion.p 
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto font-light"
          >
            The Land of a Thousand Hills is a destination that captures the soul through its breathtaking nature, vibrant people, and profound resilience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`group relative h-[400px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white border border-charcoal/5`}
            >
              {/* Image with zoom effect */}
              <Image 
                src={card.image} 
                alt={card.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Sophisticated dual gradients for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-gold border border-white/10 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                </div>
                <p className="text-white/90 text-base md:text-lg font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {card.description}
                </p>
                <div className="mt-8 flex items-center gap-2 opacity-50 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <div className="h-px w-10 bg-gold" />
                  <span className="text-[10px] text-gold font-bold uppercase tracking-widest">Discover Rwanda</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRwanda;
