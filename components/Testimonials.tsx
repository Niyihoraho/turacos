"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { googleReviews } from '@/data/google-reviews';

// Custom Google G Icon that matches the official brand look
const GoogleGIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // 5 seconds for reading
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getVisibleReviews = () => {
    let visible = [];
    for (let i = 0; i < itemsPerPage; i++) {
      visible.push(googleReviews[(currentIndex + i) % googleReviews.length]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-24 bg-[#f8f7f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-kivu-teal font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              Guest Feedback
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-kivu-blue mb-4">
              Total Shared Experience
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={28} className="fill-[#f5b82e] text-[#f5b82e]" />
                ))}
              </div>
              <p className="text-lg text-charcoal/80 font-medium">
                <span className="font-bold text-kivu-teal">23</span> Authentic Reviews
              </p>
            </div>
            <div className="mt-2 flex items-center gap-1.5 opacity-80">
              <GoogleGIcon />
            </div>
          </div>
          
          <div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=TURACOS+TOURS+LAKE+KIVU+BOAT+%26+KAYAKING" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#e5e5e5] rounded-full font-bold text-charcoal hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 text-sm uppercase tracking-wide"
            >
              <GoogleGIcon />
              Review us on Google
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="overflow-visible px-4 -mx-4 pb-10 pt-4">
            <motion.div 
              className="flex gap-6"
              initial={false}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {getVisibleReviews().map((review, idx) => (
                  <motion.div
                    key={`${review.name}-${currentIndex}-${idx}`}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex-1 min-w-0"
                  >
                    {/* The TrustIndex-style White Card */}
                    <div className="bg-white p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f0f0f0] h-full flex flex-col hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
                      
                      <div className="flex items-center gap-4 mb-5">
                        {/* Avatar */}
                        <div className={`w-[46px] h-[46px] flex-shrink-0 rounded-full ${review.color} flex items-center justify-center text-white font-medium text-xl shadow-sm`}>
                          {review.initial}
                        </div>
                        
                        {/* Name and Stars */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-[#0a232e] text-[15px] leading-tight truncate">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={13} 
                                  className="fill-[#f5b82e] text-[#f5b82e]" 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-[#91999c] font-medium tracking-wide">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        
                        {/* Static verification checkmark optionally here if wanted */}
                      </div>

                      {/* Review Text */}
                      <p className="text-[#646e73] text-[15px] leading-[1.6] mb-6 italic font-sans flex-grow">
                        "{review.text.length > 165 ? (
                          <>
                            {review.text.substring(0, 165)}... 
                            <span onClick={() => setSelectedReview(review)} className="text-[#137762] font-semibold not-italic cursor-pointer hover:underline ml-1">Read more</span>
                          </>
                        ) : review.text}"
                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-4 flex justify-between items-end border-t border-[#f5f5f5]">
                        <span className="text-[10px] font-bold text-[#b0b8bb] tracking-widest uppercase">
                          Verified Explorer
                        </span>
                        <div className="opacity-80">
                          <GoogleGIcon />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-charcoal hover:bg-[#f8f7f5] hover:scale-105 transition-all z-20 md:-left-6 opacity-0 group-hover:opacity-100 border border-[#eee]"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-charcoal hover:bg-[#f8f7f5] hover:scale-105 transition-all z-20 md:-right-6 opacity-0 group-hover:opacity-100 border border-[#eee]"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {googleReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-[#137762] w-6" : "bg-[#cce0db] w-2 hover:bg-[#a6ccc2]"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setSelectedReview(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-xl rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-10 flex flex-col"
            >
              <button 
                onClick={() => setSelectedReview(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-6 pr-8">
                <div className={`w-[50px] h-[50px] flex-shrink-0 rounded-full ${selectedReview.color} flex items-center justify-center text-white font-medium text-xl shadow-sm`}>
                  {selectedReview.initial}
                </div>
                <div>
                  <h4 className="font-bold text-[#0a232e] text-[16px] leading-tight">
                    {selectedReview.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#f5b82e] text-[#f5b82e]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#91999c] font-medium tracking-wide">
                      {selectedReview.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                <p className="text-[#4a5459] text-[16px] leading-[1.7] italic font-sans">
                  "{selectedReview.text}"
                </p>
              </div>

              <div className="mt-8 pt-4 flex justify-between items-end border-t border-[#f5f5f5]">
                <span className="text-[10px] font-bold text-[#b0b8bb] tracking-widest uppercase">
                  Verified Google Review
                </span>
                <GoogleGIcon />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Testimonials;
