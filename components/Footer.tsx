"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import LoginModal from './LoginModal';

const Footer = () => {
  const { isAdmin, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  return (
    <footer className="bg-forest text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="text-3xl font-bold text-gold mb-6 block">
              🦜 Turacos Tours
            </Link>
            <p className="text-white/70 leading-relaxed mb-6">
              Your gateway to Rwanda's natural wonders. We create unforgettable, responsible, and authentic African adventures.
            </p>
            <div className="text-sm font-semibold text-gold">
              Proud member of Rwanda Development Board Tourism
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Tours', 'Why Us', 'Rwanda', 'Testimonials', 'Impact', 'Travel Guide', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gold">Contact Info</h4>
            <ul className="space-y-4 text-white/70">
              <li>Kigali, Rwanda</li>
              <li>+250 788 000 000</li>
              <li>info@turacostours.rw</li>
              <li>Mon - Sat: 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>
            © 2025{' '}
            <span 
              onClick={() => isAdmin ? logout() : setIsLoginModalOpen(true)}
              className="cursor-pointer hover:text-gold transition-colors"
              title={isAdmin ? "Logout Admin" : "Login Admin"}
            >
              Turacos Tours
            </span>
            . All Rights Reserved. | Designed with ❤️ in Rwanda
          </p>
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
