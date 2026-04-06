"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Gauge, MapPin, Trash2, Pencil } from 'lucide-react';
import type { Tour } from '@/data/tours';
import { useAuth } from './AuthProvider';

interface TourCardProps {
  tour: Tour;
  onEdit?: (tour: Tour) => void;
  onDelete?: (tour: Tour) => void;
}

const TourCard = ({ tour, onEdit, onDelete }: TourCardProps) => {
  const { isAdmin } = useAuth();
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-charcoal/5 transition-all duration-500 hover:-translate-y-3 relative cursor-pointer">
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-forest text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm z-10">
          <MapPin size={14} className="text-gold" /> {tour.location}
        </div>

        {/* Edit Button - Visible only to Admins */}
        {isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.(tour);
            }}
            className="absolute top-6 right-20 p-3 bg-white/90 backdrop-blur-md text-forest rounded-2xl shadow-xl shadow-forest/10 hover:bg-gold hover:text-white active:scale-95 z-20 transition-all duration-300 transform"
            title="Edit Tour Package"
          >
            <Pencil size={20} />
          </button>
        )}

        {/* Delete Button - Visible only to Admins */}
        {isAdmin && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete?.(tour);
            }}
            className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl shadow-xl shadow-red-500/10 hover:bg-red-600 hover:text-white active:scale-95 z-20 transition-all duration-300 transform"
            title="Delete Tour Package"
          >
            <Trash2 size={20} />
          </button>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-forest mb-4 group-hover:text-gold transition-colors duration-300">
          {tour.title}
        </h3>
        <p className="text-charcoal/70 text-base leading-relaxed mb-8 line-clamp-3 font-light">
          {tour.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-forest bg-gold/10 px-4 py-2 rounded-full border border-gold/20 shadow-sm">
            <Clock size={14} className="text-gold" /> {tour.duration}
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-extrabold text-forest bg-gold/10 px-4 py-2 rounded-full border border-gold/20 shadow-sm">
            <Gauge size={14} className="text-gold" /> {tour.difficulty}
          </div>
        </div>

        <Link
          href={`/tours/${tour.slug}`}
          className="group/btn flex items-center justify-between w-full py-4 px-6 bg-forest text-white font-bold rounded-2xl hover:bg-gold transition-all duration-300 shadow-md"
        >
          <span>View Detailed Package</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
