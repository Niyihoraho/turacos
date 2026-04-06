"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialData {
  stars: number;
  quote: string;
  name: string;
  country: string;
  flag: string;
}

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const reviews = testimonials;

  return (
    <section id="testimonials" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">
            Real stories from people who explored Rwanda with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-charcoal/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={18} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-charcoal/80 italic leading-relaxed mb-8">
                  "{review.quote}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-charcoal/5">
                <div className="font-bold text-forest">{review.name}</div>
                <div className="flex items-center gap-2 text-sm text-charcoal/60">
                  <span>{review.country}</span>
                  <span>{review.flag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
