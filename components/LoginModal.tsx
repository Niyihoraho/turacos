"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, Phone, Mail, Loader2, AlertCircle } from 'lucide-react';
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header with Background Pattern */}
            <div className="relative bg-forest p-10 overflow-hidden">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl opacity-50" />
               <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-30" />
               
               <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
               >
                 <X size={24} />
               </button>
               
               <div className="relative z-10 text-center">
                 <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-gold/30">
                   <Lock className="text-gold w-8 h-8" />
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h2>
                 <p className="text-white/60 text-sm tracking-wide uppercase">Authenticate to Manage Packages</p>
               </div>
            </div>

            {/* Form Content */}
            <div className="p-10 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Identity Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest uppercase tracking-widest block ml-1">Email or Phone</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/30 group-focus-within:text-gold transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      placeholder="admin@turacostours.rw"
                      className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all placeholder:text-stone-400 font-medium text-charcoal"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest uppercase tracking-widest block ml-1">Secure Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/30 group-focus-within:text-gold transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all placeholder:text-stone-400 font-medium text-charcoal"
                    />
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 mt-2"
                    >
                      <AlertCircle size={18} className="shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-forest text-white rounded-2xl font-bold shadow-xl shadow-forest/20 hover:bg-forest-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Secure Login'
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-stone-400 text-xs flex items-center justify-center gap-2">
                  <Lock size={12} /> Encrypted Session
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
