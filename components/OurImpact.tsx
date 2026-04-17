"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Recycle } from 'lucide-react';

const StatCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-8 text-center backdrop-blur-sm"
    >
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="mb-4 text-2xl font-bold text-gold">{title}</h3>
      <p className="text-sm leading-7 text-white/74">
        {description}
      </p>
    </motion.div>
  );
};

const OurImpact = () => {
  return (
    <section id="impact" className="relative overflow-hidden bg-gradient-to-br from-kivu-teal to-kivu-blue py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
      <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
            Beyond Tourism
          </span>
          <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Our Positive Impact
          </h2>
          <p className="mt-5 text-base leading-7 text-white/72 md:text-lg">
            Every trip supports conservation, local livelihoods, and a more responsible way to experience Rwanda.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatCard 
            icon={<Leaf className="text-gold" size={48} />}
            title="Conservation"
            description="5% of every booking donated to wildlife conservation programs"
            delay={0.1}
          />
          <StatCard 
            icon={<Users className="text-gold" size={48} />}
            title="Local Communities"
            description="200+ local families supported through employment and community tourism"
            delay={0.2}
          />
          <StatCard 
            icon={<Recycle className="text-gold" size={48} />}
            title="Sustainable Tourism"
            description="Carbon-conscious itineraries and eco-lodge partnerships"
            delay={0.3}
          />
        </div>

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-lg italic leading-relaxed text-white/82 md:text-xl">
            "At Turacos Tours, we believe travel should leave the world better than we found it. Every tour you book directly supports Rwanda's wildlife, its people, and its future."
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
