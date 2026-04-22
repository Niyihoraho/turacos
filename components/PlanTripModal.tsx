"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Mail, Phone, MessageSquare, User, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { sendPlanTripRequest } from '@/lib/actions';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  preferredDates: string;
  details: string;
};

const PlanTripModal = ({ isOpen, onClose }: PlanTripModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      travelers: 2,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await sendPlanTripRequest({
        ...data,
        travelers: Number(data.travelers),
      });
      
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-charcoal outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all font-medium placeholder:text-stone-300 text-sm";
  const labelClasses = "block text-[10px] font-bold uppercase tracking-[0.25em] text-kivu-blue/50 mb-1.5 px-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-kivu-blue/40 backdrop-blur-sm z-[999]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1000] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 1.02, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: 10 }}
              className="bg-white w-full max-w-lg max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl pointer-events-auto flex flex-col border border-stone-100"
            >
              {/* Header */}
              <div className="p-8 border-b border-stone-50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-[1px] bg-gold/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Inquiry Form</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-kivu-blue">Plan Your Trip</h2>
                  <p className="text-stone-400 text-xs mt-1">Start your journey with Turacos Tours</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <form id="plan-trip-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {error && (
                          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-medium border border-red-50">
                            {error}
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-5">
                          {/* Name */}
                          <div>
                            <label className={labelClasses}>Full Name</label>
                            <input
                              {...register("name", { required: "Name is required" })}
                              placeholder="Your name"
                              className={inputClasses}
                            />
                            {errors.name && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase px-1 tracking-tighter">{errors.name.message}</span>}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email */}
                            <div>
                              <label className={labelClasses}>Email Address</label>
                              <input
                                {...register("email", { 
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email"
                                  }
                                })}
                                placeholder="name@email.com"
                                className={inputClasses}
                              />
                              {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase px-1 tracking-tighter">{errors.email.message}</span>}
                            </div>

                            {/* Phone */}
                            <div>
                              <label className={labelClasses}>Phone Number</label>
                              <input
                                {...register("phone", { required: "Phone is required" })}
                                placeholder="+250..."
                                className={inputClasses}
                              />
                              {errors.phone && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase px-1 tracking-tighter">{errors.phone.message}</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Travelers */}
                            <div>
                              <label className={labelClasses}>Travelers</label>
                              <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                                <input
                                  type="number"
                                  min="1"
                                  {...register("travelers", { required: "Required", min: 1 })}
                                  className={`${inputClasses} pl-11`}
                                />
                              </div>
                            </div>

                            {/* Dates */}
                            <div>
                              <label className={labelClasses}>Preferred Dates</label>
                              <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                                <input
                                  {...register("preferredDates")}
                                  placeholder="e.g. Early July"
                                  className={`${inputClasses} pl-11`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div>
                            <label className={labelClasses}>Trip Details & Requests</label>
                            <textarea
                              {...register("details", { required: "Please share what you're looking for" })}
                              rows={4}
                              placeholder="Tell us about your dream trip..."
                              className={`${inputClasses} resize-none`}
                            />
                            {errors.details && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase px-1 tracking-tighter">{errors.details.message}</span>}
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 px-4 text-center"
                    >
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-gold" />
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-kivu-blue mb-3">Request Sent Successfully</h3>
                      <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                        We've received your trip details. Our planning team will reach out to you within 24 hours.
                      </p>
                      <button
                        onClick={onClose}
                        className="w-full bg-kivu-blue text-white font-bold py-4 rounded-xl hover:bg-kivu-blue/90 transition-colors"
                      >
                        Got it, thanks
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!isSuccess && (
                <div className="p-8 bg-stone-50/50 border-t border-stone-100 flex flex-col gap-4">
                  <button
                    type="submit"
                    form="plan-trip-form"
                    disabled={isSubmitting}
                    className="w-full btn-gold py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-70 group transition-all"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span className="font-bold uppercase tracking-widest text-sm">Submit Request</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] text-center">
                    Private & Secure Planning Support
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlanTripModal;
