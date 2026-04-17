"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthProvider';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Artificial delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(identity, password);
    if (success) {
      onClose();
      setIdentity('');
      setPassword('');
      // Optional: Refresh or notify user of success
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a1f29]/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="relative overflow-hidden bg-kivu-blue px-8 pb-8 pt-9">
               <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
               <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
               <div className="absolute -bottom-16 left-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

               <button
                 onClick={onClose}
                 className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/65 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X size={18} />
                </button>

                <div className="relative z-10 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                    <ShieldCheck className="h-8 w-8 text-gold" />
                  </div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Secure Control Panel</p>
                  <h2 className="mb-2 text-3xl font-serif font-bold text-white">Admin Access</h2>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/72">Sign in from the footer to manage tours and protected content.</p>
                </div>
            </div>

            <div className="bg-white p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="ml-1 block text-[11px] font-bold uppercase tracking-[0.24em] text-kivu-blue/80">Email or phone</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-charcoal/30 transition-colors group-focus-within:text-gold">
                      <Mail size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-medium text-charcoal outline-none transition-all focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 block text-[11px] font-bold uppercase tracking-[0.24em] text-kivu-blue/80">Password</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-charcoal/30 transition-colors group-focus-within:text-gold">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 font-medium text-charcoal outline-none transition-all placeholder:text-slate-400 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600"
                    >
                      <AlertCircle size={18} className="shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-kivu-blue py-4 font-bold text-white shadow-lg shadow-kivu-blue/20 transition-all hover:bg-[#155a75] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Enter Dashboard'
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  <Lock size={12} /> Encrypted session
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
