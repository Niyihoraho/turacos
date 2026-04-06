"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Leaf, Star } from 'lucide-react';

const WhyUs = () => {
  const features = [
    {
      icon: <Compass className="text-gold" size={40} />,
      title: "Expert Local Guides",
      description: "Our guides are born and raised in Rwanda, giving you authentic insight into culture, wildlife, and hidden gems."
    },
    {
      icon: <Target className="text-gold" size={40} />,
      title: "Customized Experiences",
      description: "Every journey is tailored to your interests, pace, and budget with a personalized itinerary."
    },
    {
      icon: <Leaf className="text-gold" size={40} />,
      title: "Responsible Tourism",
      description: "Eco-friendly practices that protect Rwanda's wildlife and benefit local communities."
    },
    {
      icon: <Star className="text-gold" size={40} />,
      title: "Excellent Service",
      description: "From first inquiry to final departure, 5-star support every step of the way."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-forest text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Travel With Turacos Tours?</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gold">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
