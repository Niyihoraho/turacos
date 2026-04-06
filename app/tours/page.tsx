import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { tours as staticTours } from '@/data/tours';
import { listTours } from '@/lib/content';

export default async function ToursPage() {
  noStore();

  const tours = await listTours().catch(() => []);
  const displayTours = tours.length > 0 ? tours : staticTours;

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-forest pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.28),_transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/#tours" className="inline-flex items-center gap-2 text-sm font-semibold text-gold mb-8">
            <ArrowLeft size={18} /> Back to home tours section
          </Link>
          <span className="block uppercase tracking-[0.4em] text-xs text-gold mb-4 font-bold">
            All Tour Packages
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold max-w-3xl leading-tight mb-6">
            Explore every adventure Turacos Tours offers across Rwanda.
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            Browse our full collection of primate encounters, mountain escapes, and safari experiences, then open any card for the complete itinerary and booking details.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {displayTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
