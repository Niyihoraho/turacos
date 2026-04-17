"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanYourTrip = () => {
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);

  return (
    <section id="plan" className="relative overflow-hidden bg-kivu-blue py-24 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 rounded-[1.75rem] border border-white/10 bg-white/6 p-6 lg:grid-cols-[1.45fr_0.9fr] lg:p-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-gold">Turacos Tours</p>
            <h2 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              Crafted journeys across Rwanda with local insight, calm logistics, and thoughtful service.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              We design boutique travel experiences that feel personal, organized, and grounded in place - from Lake Kivu escapes to wildlife adventures and cultural journeys.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {['Tailored routes', 'Local hosts', 'Smooth logistics'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/92"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Base</p>
              <p className="mt-3 text-sm leading-7 text-white/88">Rubavu, Lake Kivu, Rwanda</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">Western Rwanda departures</p>
            </div>

            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Contact</p>
              <p className="mt-3 text-sm leading-7 text-white/88">+250 793 622 438</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">Fast planning support</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 sm:p-6">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-gold">Booking Policy</h3>
            <div className="space-y-5 text-sm font-light leading-7 text-white/80">
              <p>
                <span className="mb-1 block font-semibold text-white">Standard Cancellation</span>
                Confirmations cancelled 24 hours prior to departure are eligible for a full refund.
              </p>
              <p>
                <span className="mb-1 block font-semibold text-white">Late Cancellation</span>
                Cancellations within the 24-hour window are subject to a 50% service fee.
              </p>
              <p>
                <span className="mb-1 block font-semibold text-white">No-Show Terms</span>
                Missed departures or on-site cancellations are non-refundable.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 sm:p-6">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-gold">Operating Standards</h3>
            <div className="space-y-5 text-sm font-light leading-7 text-white/80">
              <p>
                Itineraries are subject to professional adjustment based on adverse weather or safety protocols.
              </p>
              <p>
                Tour confirmation is finalized upon verification of the required security deposit.
              </p>
              <button
                onClick={() => setIsPolicyExpanded(!isPolicyExpanded)}
                className="w-fit border-b border-gold/40 pb-1 font-bold text-gold transition-colors hover:text-white"
              >
                {isPolicyExpanded ? 'Less Details' : 'Full Terms & Conditions'}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isPolicyExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/72 sm:p-6">
                <p>
                  By proceeding with a reservation through Turacos Tours, clients acknowledge and accept all liability waivers for outdoor activities. While we maintain rigorous safety standards, participation in wildlife tracking and water activities involves inherent environmental risks.
                </p>
                <p className="mt-4">
                  Special permit logistics-specifically for Mountain Gorilla encounters-are managed in accordance with Rwanda Development Board regulations. These permits are non-transferable and non-refundable once issued by the governing authorities.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PlanYourTrip;
