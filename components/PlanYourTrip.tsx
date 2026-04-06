"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  country: string;
  flag: string;
  quote: string;
}

const PlanYourTrip = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          stars: rating,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setRating(5);
        router.refresh();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to submit feedback'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your feedback.');
    }
  };

  return (
    <section id="plan" className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600"
        alt="Gorilla in Rwanda"
        fill
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-forest/80 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Share Your Experience</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              We'd love to hear about your journey with us. Your feedback helps us grow and inspires other travelers to explore the beauty of Rwanda.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-gold p-1 rounded-full text-white">✓</span>
                <span>Rate your adventure</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-gold p-1 rounded-full text-white">✓</span>
                <span>Share your highlights</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-gold p-1 rounded-full text-white">✓</span>
                <span>Inspire future travelers</span>
              </li>
            </ul>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-forest mb-2">Feedback Received!</h3>
                <p className="text-charcoal/70">Thank you for sharing your experience. We truly appreciate it!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Your Name *</label>
                    <input 
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/10 focus:border-gold outline-none transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Country *</label>
                    <input 
                      {...register("country", { required: "Country is required" })}
                      className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/10 focus:border-gold outline-none transition-all"
                      placeholder="e.g. United Kingdom"
                    />
                    {errors.country && <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-1">Country Flag (Emoji) *</label>
                    <input 
                      {...register("flag", { required: "Flag emoji is required" })}
                      className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/10 focus:border-gold outline-none transition-all"
                      placeholder="e.g. 🇬🇧"
                    />
                    {errors.flag && <span className="text-red-500 text-xs mt-1">{errors.flag.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2">Rating *</label>
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none transition-transform hover:scale-110"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                        >
                          <Star 
                            size={32} 
                            className={`${
                              star <= (hover || rating) 
                                ? 'fill-gold text-gold' 
                                : 'text-charcoal/20'
                            } transition-colors cursor-pointer`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-1">Your Review *</label>
                  <textarea 
                    {...register("quote", { required: "Review is required" })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/10 focus:border-gold outline-none transition-all"
                    placeholder="Tell us about the highlights of your trip..."
                  />
                  {errors.quote && <span className="text-red-500 text-xs mt-1">{errors.quote.message}</span>}
                </div>

                <button type="submit" className="btn-gold w-full py-4 text-lg">
                  Submit My Review ✨
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourTrip;
