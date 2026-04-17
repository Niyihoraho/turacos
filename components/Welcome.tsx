"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin } from 'lucide-react';

const Welcome = () => {
  const stats = [
    { label: "Happy Travelers", value: "500+", icon: <Users className="w-5 h-5" /> },
    { label: "Years Experience", value: "10+", icon: <Calendar className="w-5 h-5" /> },
    { label: "Local Guides", value: "100%", icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <section id="welcome" className="relative py-24 bg-cream overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-kivu-blue">
          <path d="M10,90 Q50,0 90,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M20,80 Q50,10 80,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2 mb-6">
              <span className="text-gold font-semibold tracking-widest uppercase text-sm">Explore Our Story</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-kivu-blue leading-tight">
                Welcome to <br />
                <span className="text-charcoal italic">Turacos Tours</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-10 font-light">
              Turacos Tours is a locally owned Rwandan tour company passionate about sharing the incredible beauty of our country. We specialize in wildlife safaris, gorilla tracking, and cultural immersions. Our expert local guides bring Rwanda's stories, landscapes, and wildlife to life — creating memories that last a lifetime.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gold/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-gold mb-3 transition-transform group-hover:scale-110 duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-kivu-blue">{stat.value}</div>
                  <div className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Collage Section */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              <Image 
                src="/images/turaco-welcome.png"
                alt="Great Blue Turaco in Rwanda"
                width={700}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Accent Decoration */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gold/10 rounded-full blur-3xl z-0" />
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-kivu-blue/5 rounded-full blur-3xl z-0" />
            
            {/* Elegant Info Overlay */}
            <div className="absolute -bottom-6 -right-6 lg:right-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-gold/10">
              <p className="text-sm font-serif italic text-kivu-blue leading-relaxed">
                "We don't just guide you through Rwanda; we open the heart of the Heart of Africa for you."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-8 bg-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-charcoal">The Turacos Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
