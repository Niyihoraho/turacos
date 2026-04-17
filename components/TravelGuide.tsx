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
    <div className="border-b border-sand/90 last:border-b-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="pr-6 text-lg font-semibold text-kivu-blue transition-colors group-hover:text-gold">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-white text-gold shadow-sm"
        >
          <ChevronDown size={18} />
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
            <p className="pb-6 pr-12 text-base leading-7 text-charcoal/70">
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
    <section id="guide" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Travel Guide</p>
          <h2 className="font-serif text-4xl font-bold text-kivu-blue md:text-5xl">Rwanda Travel Guide</h2>
          <p className="mt-4 text-base leading-7 text-charcoal/65">
            Clear answers to the questions most travelers ask before they arrive.
          </p>
        </div>

        <div className="rounded-[2rem] border border-sand bg-[#fcfaf6] p-6 shadow-sm md:p-8">
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
