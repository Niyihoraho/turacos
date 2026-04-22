import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getTourBySlugFromDb, listTours } from '@/lib/content';

interface TourDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tours = await listTours().catch(() => []);
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  noStore();

  const tour = await getTourBySlugFromDb(params.slug).catch(() => null);

  if (!tour) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/250793622438?text=${encodeURIComponent(tour.contactMessage)}`;
  const summaryItems = [
    { label: 'Location', value: tour.location, icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar hideLinks={true} />

      <section className="pb-24 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#tours" className="mb-6 inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-kivu-blue/75 transition-colors hover:border-gold/40 hover:text-gold">
            <ArrowLeft size={14} /> Back to tours
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sm:p-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Tour Detail</p>
              <h1 className="font-serif text-4xl font-bold leading-tight text-kivu-blue md:text-5xl">
                {tour.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-charcoal/68 whitespace-pre-wrap">
                {tour.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {summaryItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-[1.5rem] border border-sand bg-[#fcfaf6] px-4 py-4">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-kivu-blue/55">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-kivu-blue break-words">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:brightness-95"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-[2rem] border border-sand bg-white shadow-[0_18px_50px_rgba(0,0,0,0.05)] lg:sticky lg:top-28">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kivu-blue/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="mb-14 rounded-[2rem] border border-sand bg-white p-6 shadow-sm sm:p-8">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Overview</p>
                <h2 className="mb-6 font-serif text-3xl font-bold text-kivu-blue md:text-4xl">Overview of the journey</h2>
                <p className="text-base leading-8 text-charcoal/75 md:text-lg whitespace-pre-wrap">
                  {tour.description}
                </p>
              </div>



              <div>
                <h4 className="mb-8 flex items-center gap-3 font-serif text-2xl font-bold text-kivu-blue">
                  <span className="h-[2px] w-8 bg-gold" /> Capture the moment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tour.gallery.map((image, index) => (
                    <div key={image} className="group relative h-[340px] overflow-hidden rounded-[2rem] border border-sand shadow-sm">
                      <Image
                        src={image}
                        alt={`${tour.title} view ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-kivu-blue/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-sm sm:p-8">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Booking Office</p>
                <h3 className="font-serif text-3xl font-bold text-kivu-blue">Plan this tour with us</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/65">
                  We can personalize timing, accommodation, and route details to match your travel plans.
                </p>

                <div className="mt-6 space-y-3">
                  <a href="tel:+250793622438" className="flex items-center gap-4 rounded-[1.5rem] border border-sand bg-[#fcfaf6] px-5 py-4 text-sm font-semibold text-kivu-blue transition-colors hover:border-gold/40">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <Phone size={16} className="text-gold" />
                    </span>
                    +250 793 622 438
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-[1.5rem] bg-[#25D366] px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:brightness-95"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
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
