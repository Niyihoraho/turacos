"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FaFacebook },
    { name: 'Instagram', href: 'https://www.instagram.com/turacos_tours_rwanda/', icon: FaInstagram },
    { name: 'Twitter', href: '#', icon: FaTwitter },
    { name: 'YouTube', href: '#', icon: FaYoutube },
  ];

  const contactItems = [
    {
      title: 'Phone',
      value: '+250 793 622 438',
      href: 'tel:+250793622438',
      icon: Phone,
    },
    {
      title: 'WhatsApp',
      value: '+250 793 622 438',
      href: 'https://wa.me/250793622438',
      icon: FaWhatsapp,
    },
    {
      title: 'Location',
      value: 'Rubavu, Lake Kivu, Rwanda',
      href: 'https://www.google.com/maps/search/?api=1&query=-1.6772,29.3466',
      icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Contact</p>
          <h2 className="font-serif text-4xl font-bold text-kivu-blue md:text-5xl">Get In Touch</h2>
          <p className="mt-4 text-base leading-7 text-charcoal/65">
            Reach us directly for trip planning, questions, or custom Rwanda experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[2rem] border border-sand bg-[#fcfaf6] p-6 sm:p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold text-kivu-blue">Speak with our team</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/65">
                  We usually reply quickly and help you choose the right route, stay, and timing for your trip.
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-[1.5rem] border border-sand bg-white px-5 py-4 transition-colors hover:border-gold/40"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand text-gold">
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-kivu-blue/60">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-base font-medium text-charcoal truncate">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-label={item.name}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-kivu-blue transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/250793622438"
                  className="inline-flex items-center gap-3 rounded-full bg-kivu-blue px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#155a75]"
                >
                  <FaWhatsapp size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-[2rem] border border-sand bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Map</p>
                  <h3 className="mt-2 text-2xl font-serif font-bold text-kivu-blue">Visit our base in Rubavu</h3>
                </div>
                <a
                  href="https://www.google.com/maps/place/TURACOS+TOURS+LAKE+KIVU+BOAT+%26+KAYAKING/@-2.0616875,29.3521875,17z/data=!3m1!4b1!4m6!3m5!1s0x19dd2921b12b9f59:0x9855c014bbce9004!8m2!3d-2.0616875!4d29.3521875!16s%2Fg%2F11y5fty5n2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden rounded-full border border-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-kivu-blue transition-colors hover:border-gold hover:text-gold sm:inline-flex"
                >
                  Open Map
                </a>
              </div>

              <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] border border-sand">
                <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41!2d29.3466!3d-1.6772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLTEuNjc3MiwgMjkuMzQ2Ng!5e0!3m2!1sen!2srw!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                title="Turacos Tours location map"
               />
              </div>

              <div className="mt-4 flex flex-col gap-3 text-sm text-charcoal/65 sm:flex-row sm:items-center sm:justify-between">
                <p>Rubavu, Lake Kivu - easy to reach and close to western Rwanda experiences.</p>
                <a
                  href="https://www.google.com/maps/place/TURACOS+TOURS+LAKE+KIVU+BOAT+%26+KAYAKING/@-2.0616875,29.3521875,17z/data=!3m1!4b1!4m6!3m5!1s0x19dd2921b12b9f59:0x9855c014bbce9004!8m2!3d-2.0616875!4d29.3521875!16s%2Fg%2F11y5fty5n2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-kivu-blue transition-colors hover:text-gold"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
