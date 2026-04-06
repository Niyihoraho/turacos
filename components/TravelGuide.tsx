"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-bold text-forest group-hover:text-gold transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-charcoal/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TravelGuide = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "When is the best time to visit Rwanda?",
      answer: "Rwanda can be visited year-round. Dry seasons (June–September and December–February) are ideal for gorilla trekking and safaris."
    },
    {
      question: "Do I need a visa to visit Rwanda?",
      answer: "Most nationalities get a visa on arrival or apply online via the Rwanda Directorate General of Immigration."
    },
    {
      question: "What should I pack for a gorilla trek?",
      answer: "Wear long-sleeved shirts, long trousers, sturdy hiking boots, and carry rain gear, insect repellent, and a camera."
    },
    {
      question: "Is Rwanda safe for tourists?",
      answer: "Yes! Rwanda is consistently ranked as one of Africa's safest countries with very low crime and excellent infrastructure."
    },
    {
      question: "What currency is used in Rwanda?",
      answer: "The Rwandan Franc (RWF). US Dollars are widely accepted. ATMs available in all major cities."
    }
  ];

  return (
    <section id="guide" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Rwanda Travel Guide</h2>
          <p className="section-subtitle">
            Everything you need to know before your trip
          </p>
        </div>

        <div className="bg-cream/30 rounded-3xl p-6 md:p-10 shadow-sm border border-charcoal/5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelGuide;
