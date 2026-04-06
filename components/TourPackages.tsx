"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { Tour } from '@/data/tours';
import AddTourModal from '@/components/AddTourModal';
import EditTourModal from '@/components/EditTourModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthProvider';

interface TourPackagesProps {
  tours: Tour[];
}

const TourPackages = ({ tours }: TourPackagesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [deletingTour, setDeletingTour] = useState<Tour | null>(null);
  const { isAdmin } = useAuth();

  return (
    <section id="tours" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative texture or background (e.g., subtle green glow) */}
      <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-forest/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="text-left">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              Memorable Experiences
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-forest mb-6">
              Explore Our Curated Tours
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl font-light leading-relaxed">
              Hand-crafted journeys designed to take you into the most breathtaking destinations and wildest landscapes across the Heart of Africa.
            </p>
          </div>
          
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-forest text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-forest/20 transition-all duration-300 transform active:scale-95 border-b-4 border-forest-dark"
            >
              <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span>New Package</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {tours.map((tour, index) => (
            <TourCard 
              key={tour.slug} 
              tour={tour} 
              onEdit={setEditingTour}
              onDelete={setDeletingTour}
            />
          ))}
          {tours.length === 0 && (
            <div className="col-span-full py-20 text-center bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400">No tour packages found. Add your first one!</p>
            </div>
          )}
        </div>

        <div className="mt-20 text-center">
          <Link href="/tours" className="btn-gold group inline-flex items-center gap-3 mx-auto">
            <span>Discover All Tour Packages</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <AddTourModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Centralized Edit Modal */}
      <EditTourModal
        isOpen={!!editingTour}
        onClose={() => setEditingTour(null)}
        tour={editingTour}
      />

      {/* Centralized Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingTour}
        onClose={() => setDeletingTour(null)}
        tourTitle={deletingTour?.title || null}
        tourSlug={deletingTour?.slug || null}
      />
    </section>
  );
};

export default TourPackages;

