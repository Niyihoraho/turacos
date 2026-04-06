"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Users, Recycle } from 'lucide-react';

const StatCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 p-8 rounded-2xl border border-gold/20 text-center"
    >
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-gold mb-4">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const OurImpact = () => {
  return (
    <section id="impact" className="py-20 bg-charcoal text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Commitment to Rwanda</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed italic">
            "At Turacos Tours, we believe travel should leave the world better than we found it. Every tour you book directly supports Rwanda's wildlife, its people, and its future."
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
