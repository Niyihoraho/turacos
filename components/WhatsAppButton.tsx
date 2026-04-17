"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[60] group">
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-gray-100">
        Chat with us on WhatsApp 🇷🇼
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-8 border-transparent border-l-white" />
      </div>

      {/* Pulse Effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
      
      {/* Button */}
      <a 
        href="https://wa.me/250793622438"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
