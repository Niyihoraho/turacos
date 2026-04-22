"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanTripModal from './PlanTripModal';

interface NavbarProps {
  hideLinks?: boolean;
}

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Tours', href: '/#tours' },
  { name: 'Rwanda', href: '/#rwanda' },
  { name: 'Impact', href: '/#impact' },
  { name: 'Guide', href: '/#guide' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = ({ hideLinks = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('Home');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const pathname = usePathname();

  const highlightedLink = hoveredLink ?? activeLink;

  const sectionLinks = useMemo(
    () => NAV_LINKS.filter((link) => link.href.startsWith('/#')),
    []
  );

  useEffect(() => {
    if (pathname !== '/') {
      setActiveLink('Home');
      return;
    }

    const syncActiveLink = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash && window.scrollY < 160) {
        setActiveLink('Home');
        return;
      }

      let current = 'Home';

      for (const link of sectionLinks) {
        const id = link.href.replace('/#', '');
        const section = document.getElementById(id);

        if (!section) {
          continue;
        }

        const top = section.offsetTop - 140;
        if (window.scrollY >= top) {
          current = link.name;
        }
      }

      if (hash) {
        const matchedLink = sectionLinks.find((link) => link.href === `/#${hash}`);
        if (matchedLink) {
          current = matchedLink.name;
        }
      }

      setActiveLink(current);
    };

    syncActiveLink();
    window.addEventListener('scroll', syncActiveLink, { passive: true });
    window.addEventListener('hashchange', syncActiveLink);

    return () => {
      window.removeEventListener('scroll', syncActiveLink);
      window.removeEventListener('hashchange', syncActiveLink);
    };
  }, [pathname, sectionLinks]);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-kivu-blue shadow-[0_14px_40px_rgba(10,35,46,0.18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[84px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3 group">
            <Image 
                src="/images/logoo.png" 
                alt="Turacos Tours Logo" 
                width={48}
                height={48}
                className="object-contain transition-transform group-hover:scale-105"
              />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-tight text-white uppercase">Turacos Tours</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Rwanda travel studio</span>
            </div>
          </Link>

          {!hideLinks && (
            <>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative flex items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1.5 backdrop-blur-sm">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveLink(link.name)}
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative z-10 rounded-full px-4 py-2.5 text-sm font-semibold tracking-[0.16em] text-white/86 uppercase transition-colors hover:text-white"
                    >
                      <span className="relative z-10">{link.name}</span>
                      {highlightedLink === link.name && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/14"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-end">
                <button 
                  onClick={() => setIsPlanModalOpen(true)}
                  className="rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/15 transition-all hover:bg-gold/90 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book Now
                </button>
              </div>

              <div className="lg:hidden flex items-center justify-end">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/16 focus:outline-none"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && !hideLinks && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-white/10 bg-kivu-blue lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="overflow-hidden rounded-b-[1.75rem] border-x border-b border-white/8 bg-[#155a75] px-5 py-5 shadow-[0_18px_40px_rgba(10,35,46,0.16)]">
                <div className="mb-4 rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Navigation</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">Browse the site clearly from one place.</p>
                </div>
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.name);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-all ${activeLink === link.name ? 'bg-white/12 text-gold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]' : 'text-white hover:bg-white/10 hover:text-gold'}`}
                    >
                      {link.name}
                      <span className="text-white/30">/</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="pt-4"
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsPlanModalOpen(true);
                    }}
                    className="w-full block rounded-2xl bg-gold px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/15 transition-all hover:bg-gold/90"
                  >
                    Book Now
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PlanTripModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
