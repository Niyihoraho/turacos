"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-full text-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-forest text-lg">Phone</h4>
                  <p className="text-charcoal/70">+250 788 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-full text-gold">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-forest text-lg">WhatsApp</h4>
                  <a href="https://wa.me/250788000000" className="text-charcoal/70 hover:text-gold transition-colors">+250 788 000 000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-full text-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-forest text-lg">Email</h4>
                  <a href="mailto:info@turacostours.rw" className="text-charcoal/70 hover:text-gold transition-colors">info@turacostours.rw</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-full text-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-forest text-lg">Address</h4>
                  <p className="text-charcoal/70">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-12">
              <h4 className="font-bold text-forest text-lg mb-6">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-forest hover:bg-gold hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a 
                href="https://wa.me/250788000000"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <MessageCircle size={24} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-cream"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127593.4343030932!2d30.00811126135678!3d-1.9300300661690196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca429ed86fd2b%3A0x2e0c7396c71544c0!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2s!4v1711720000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
