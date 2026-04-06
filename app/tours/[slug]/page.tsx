import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock, Gauge, MapPin, MessageCircle, Phone, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getTourBySlug as getStaticTourBySlug, tours } from '@/data/tours';
import { getTourBySlugFromDb } from '@/lib/content';

interface TourDetailsPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  noStore();

  const tour = (await getTourBySlugFromDb(params.slug).catch(() => null)) ?? getStaticTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/250788000000?text=${encodeURIComponent(tour.contactMessage)}`;

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative pt-40 pb-24 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-forest/70 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/#tours" className="inline-flex items-center gap-2 text-sm font-semibold text-gold mb-8 hover:text-white transition-colors">
            <ArrowLeft size={18} /> Explore more tours
          </Link>
          
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold mb-6 border border-gold/20">
                <MapPin size={14} /> {tour.location}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                  <div className="bg-gold p-2 rounded-lg text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase font-bold tracking-wider">Duration</p>
                    <p className="font-bold">{tour.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                  <div className="bg-gold p-2 rounded-lg text-white">
                    <Gauge size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase font-bold tracking-wider">Difficulty</p>
                    <p className="font-bold">{tour.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gold rounded-2xl px-6 py-4 shadow-lg shadow-gold/20">
                  <div>
                    <p className="text-xs text-white/80 uppercase font-bold tracking-wider">Starting from</p>
                    <p className="text-xl font-bold">{tour.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky/Floating Contact Box */}
            <div className="bg-white text-charcoal rounded-[2.5rem] p-10 shadow-2xl border border-charcoal/5 hidden lg:block">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.35em] text-gold font-bold mb-3">Booking Office</p>
                <h2 className="text-3xl font-serif text-forest mb-4">Start Your Adventure</h2>
                <p className="text-charcoal/70 leading-relaxed">
                  We&apos;ll help you customize this itinerary to perfections. Direct response within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mb-8">
                <a href="tel:+250788000000" className="flex items-center gap-4 rounded-2xl bg-cream px-6 py-5 font-bold text-forest hover:bg-gold/10 transition-colors">
                  <div className="bg-gold/20 p-2 rounded-lg text-gold">
                    <Phone size={18} />
                  </div>
                  +250 788 000 000
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 font-bold text-white shadow-xl hover:scale-[1.02] transition-all"
                >
                  <MessageCircle size={22} /> Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal/40 justify-center uppercase font-bold tracking-widest">
                <Info size={12} /> Personalized Itineraries Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 -mt-10 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-16">
            <div>
              <div className="mb-16">
                <h3 className="text-sm uppercase tracking-[0.35em] text-gold font-bold mb-6">The Experience</h3>
                <h2 className="text-4xl md:text-5xl font-serif text-forest mb-10 leading-tight">Overview of the journey</h2>
                <p className="text-xl text-charcoal/80 leading-relaxed bg-white rounded-[2rem] p-10 shadow-sm border border-charcoal/5">
                  {tour.description}
                </p>
              </div>

              {/* Specific Highlights and inclusions as requested for full info */}
              <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-serif text-forest font-bold mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-gold" /> Highlights
                    </h4>
                    <div className="space-y-5">
                      {tour.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-charcoal/5 shadow-sm group hover:border-gold/30 transition-colors">
                          <div className="bg-gold/10 p-1.5 rounded-full text-gold mt-0.5 group-hover:bg-gold group-hover:text-white transition-all">
                            <Check size={14} />
                          </div>
                          <span className="text-charcoal/80 leading-relaxed font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-serif text-forest font-bold mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-gold" /> What's Included
                    </h4>
                    <div className="space-y-5">
                      {tour.includes.map((item) => (
                        <div key={item} className="flex items-start gap-4 p-4 rounded-2xl bg-forest/5 border border-forest/5 group hover:bg-forest hover:text-white transition-all">
                          <div className="bg-forest/10 p-1.5 rounded-full text-forest mt-0.5 group-hover:bg-white/20 group-hover:text-white transition-all">
                            <Check size={14} />
                          </div>
                          <span className="leading-relaxed font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Section Moved inside Narrative for better flow */}
              <div>
                <h4 className="text-xl font-serif text-forest font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gold" /> Capture the moment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tour.gallery.map((image, index) => (
                    <div key={image} className="relative h-[400px] overflow-hidden rounded-[2.5rem] shadow-xl group">
                      <Image
                        src={image}
                        alt={`${tour.title} view ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Contact Box (Only on smaller screens) */}
            <div className="lg:hidden space-y-10">
               <div className="bg-white text-charcoal rounded-[2.5rem] p-10 shadow-2xl border border-charcoal/5">
                <div className="mb-8 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-gold font-bold mb-3">Booking Office</p>
                  <h2 className="text-3xl font-serif text-forest mb-4">Start Your Adventure</h2>
                </div>
                <div className="space-y-4">
                  <a href="tel:+250788000000" className="flex items-center justify-center gap-4 rounded-2xl bg-cream px-6 py-5 font-bold text-forest">
                    <Phone size={18} className="text-gold" />
                    +250 788 000 000
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 font-bold text-white shadow-xl"
                  >
                    <MessageCircle size={22} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
