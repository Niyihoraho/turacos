"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModal';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/#tours' },
    { name: 'Rwanda', href: '/#rwanda' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Guide', href: '/#guide' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4 transition-all duration-500 ease-in-out ${scrolled
              ? 'rounded-full border border-white/20 bg-forest/90 px-6 py-2 md:px-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-lg'
              : 'bg-transparent px-0'
            }`}
        >
          {/* Logo */}
          <div 
            onClick={() => isAdmin ? logout() : setIsLoginModalOpen(true)}
            className="flex shrink-0 items-center space-x-3 py-3 cursor-pointer group"
            title={isAdmin ? "Logout Admin" : "Login Admin"}
          >
            <span className="text-xl md:text-2xl font-bold text-gold whitespace-nowrap font-serif tracking-tight flex items-center gap-2 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🦜</span> Turacos Tours
            </span>
          </div>

          {/* Desktop Nav Links (Centered) */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="flex items-center gap-1 relative">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative rounded-full px-4 py-2 text-white transition-colors font-medium text-xs uppercase tracking-[0.15em] z-10"
                >
                  <span className="relative z-10">{link.name}</span>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Button (Right) */}
          <div className="hidden lg:flex justify-end items-center">
            <Link href="/#plan" className="btn-gold !py-2.5 !px-6 text-xs uppercase tracking-widest font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex justify-end items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mx-4 mt-4 overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest/95 shadow-2xl lg:hidden backdrop-blur-xl"
          >
            <div className="px-6 pt-8 pb-10 space-y-4 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-white hover:text-gold py-3 text-xl font-medium border-b border-white/5 last:border-0 transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Link
                  href="/#plan"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold block text-center py-4 rounded-2xl text-lg uppercase tracking-widest shadow-2xl"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
