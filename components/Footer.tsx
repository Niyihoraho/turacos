"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import LoginModal from './LoginModal';

const Footer = () => {
  const { isAdmin, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/#tours' },
    { name: 'Experiences', href: '/#rwanda' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Inquiry', href: '/#contact' }
  ];

  return (
    <footer className="border-t border-gold/20 bg-[linear-gradient(135deg,#155a75_0%,#1a6b8a_52%,#2a9d8f_100%)] pt-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 px-6 py-8 shadow-[0_24px_70px_rgba(21,90,117,0.2)] backdrop-blur-sm sm:px-8">
          <div className="grid gap-10 pb-16 md:grid-cols-[1.15fr_0.85fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image 
                    src="/images/logoo.png" 
                    alt="Turacos Tours Logo" 
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-gold">Turacos Tours</p>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">Designed for calm, meaningful Rwanda travel.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/78">
                Clean planning, local expertise, and memorable experiences designed for travelers who want Rwanda to feel effortless and meaningful.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  Boutique experiences
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  Local guidance
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Navigation</h4>
              <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-light text-white/78 transition-colors hover:text-gold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Inquiries</h4>
              <div className="space-y-3 text-sm font-light text-white/80">
                <p>Kibuye &bull; Lake Kivu &bull; Rwanda</p>
                <p>+250 793 622 438</p>
                <p>8 AM &ndash; 6 PM Local</p>
                <div className="flex flex-wrap gap-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <a
                    href="https://wa.me/250793622438"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-white/88 transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    <FaWhatsapp size={14} /> WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/turacos_tours_rwanda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-white/88 transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    <FaInstagram size={14} /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/12 py-10 md:flex-row">
            <div className="text-[9px] text-white/55 uppercase tracking-[0.4em]">
              &copy; 2026 Turacos Tours &bull; East Africa
            </div>

            <button
              onClick={() => isAdmin ? logout() : setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 transition-all hover:border-gold/50 hover:text-gold"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-gold">
                <LockKeyhole size={13} />
              </span>
              <span>{isAdmin ? 'Admin Logout' : 'Admin Access'}</span>
            </button>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
