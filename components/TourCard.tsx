"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Gauge, MapPin, Trash2, Pencil } from 'lucide-react';
import type { Tour } from '@/data/tours';
import { useAuth } from './AuthProvider';

interface TourCardProps {
  tour: Tour;
  activities?: string[];
  onEdit?: (tour: Tour) => void;
  onDelete?: (tour: Tour) => void;
}

const TourCard = ({ tour, activities, onEdit, onDelete }: TourCardProps) => {
  const { isAdmin } = useAuth();
  
  return (
    <Link href={`/tours/${tour.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(11,61,81,0.15)] border border-charcoal/5 transition-all duration-700 hover:-translate-y-3 relative cursor-pointer flex flex-col h-full max-w-sm mx-auto w-full">
      {/* Optimized Image Height for 3-Column Layout */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Floating Location Tag - More Compact */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-kivu-blue text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10 border border-gold/10">
          <MapPin size={10} className="text-gold" /> {tour.location.split(',')[0]}
        </div>

        {/* Admin Controls - Smaller */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-1.5 z-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.(tour);
              }}
              className="p-2 bg-white/95 backdrop-blur-md text-kivu-blue rounded-lg shadow-md hover:bg-gold hover:text-white transition-all active:scale-90"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(tour);
              }}
              className="p-2 bg-white/95 backdrop-blur-md text-red-500 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all active:scale-90"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Tighter Internal Padding (p-5) */}
      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-3 line-clamp-2 text-2xl font-serif font-bold leading-snug text-kivu-blue transition-colors duration-300 group-hover:text-gold">
          {tour.title}
        </h3>
        
        <p className="mb-5 line-clamp-3 text-sm leading-7 text-charcoal/78 sm:text-[15px]">
          {tour.description}
        </p>

        {/* Minimalist Activity Chips */}
        {activities && activities.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {activities.slice(0, 3).map((activity, idx) => (
              <span 
                key={idx}
                className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold text-kivu-blue/75"
              >
                {activity}
              </span>
            ))}
            {activities.length > 3 && <span className="py-1 text-[10px] font-semibold text-stone-400">+{activities.length - 3}</span>}
          </div>
        )}

        <div className="mt-auto mb-6 flex items-center justify-between border-t border-stone-100 pt-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-kivu-blue/55">
              <Clock size={12} className="text-gold/60" /> {tour.duration.split(' ')[0]}D
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-kivu-blue/55">
              <Gauge size={12} className="text-gold/60" /> {tour.difficulty}
            </div>
          </div>
        </div>

        <div className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-kivu-blue px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-sm transition-all duration-300 hover:bg-gold cursor-pointer">
          <span>Explore Package</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
