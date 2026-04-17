import Link from 'next/link';
import { ArrowLeft, Compass, Bird, Mountain } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import WhatsAppButton from '@/components/WhatsAppButton';

import { listTours } from '@/lib/content';

export default async function ToursPage() {
  noStore();

  const tours = await listTours().catch(() => []);
  const displayTours = tours;

  // Categorization Logic
  const primateTours = displayTours.filter(t =>
    t.title.toLowerCase().includes('gorilla') ||
    t.title.toLowerCase().includes('chimpanzee') ||
    t.slug.includes('primate')
  );

  const safariTours = displayTours.filter(t =>
    t.title.toLowerCase().includes('safari') ||
    t.title.toLowerCase().includes('big five')
  );

  const activeTours = displayTours.filter(t =>
    !primateTours.includes(t) && !safariTours.includes(t)
  );

  const sections = [
    {
      title: "Primate Encounters",
      icon: <Bird className="text-gold" size={20} />,
      description: "Come face-to-face with humanity's closest relatives in their natural habitat.",
      label: 'Forest journeys',
      tours: primateTours
    },
    {
      title: "Wildlife & Safari",
      icon: <Compass className="text-gold" size={20} />,
      description: "Experience the majestic Big Five and the vibrant biodiversity of Rwanda's savannahs.",
      label: 'Open landscape',
      tours: safariTours
    },
    {
      title: "Mountain & Lake Adventures",
      icon: <Mountain className="text-gold" size={20} />,
      description: "From the peaks of the Virungas to the tranquil shores of Lake Kivu.",
      label: 'Slow exploration',
      tours: activeTours
    }
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Navbar hideLinks={true} />

      <section className="bg-[#f7f3ea] pb-6 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-kivu-blue transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </section>

      <section className="pb-24 pt-14 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {sections.map((section, idx) => (
              section.tours.length > 0 && (
                <section key={idx} className="last:mb-0">
                  <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                      <div className="mb-4 flex items-center gap-3">
                        {section.icon}
                        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                          {section.label}
                        </span>
                      </div>
                      <h2 className="mb-4 font-serif text-3xl font-bold text-kivu-blue md:text-4xl">
                        {section.title}
                      </h2>
                      <p className="text-base leading-7 text-charcoal/65 md:text-lg">
                        {section.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-kivu-blue/55">
                      <span className="h-px w-16 bg-kivu-blue/10" />
                      <span className="font-semibold uppercase tracking-[0.18em]">{section.tours.length} packages</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {section.tours.map((tour) => (
                      <TourCard key={tour.slug} tour={tour} />
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
