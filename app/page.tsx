import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import TourPackages from '@/components/TourPackages';
import Testimonials from '@/components/Testimonials';
import WhyRwanda from '@/components/WhyRwanda';
import TravelGuide from '@/components/TravelGuide';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { unstable_noStore as noStore } from 'next/cache';
import { getTours } from '@/lib/actions';

export default async function Home() {
  noStore();

  const dbTours = await getTours();

  const displayTours = dbTours || [];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Welcome />
      <TourPackages tours={displayTours} />
      <WhyRwanda />
      <TravelGuide />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

