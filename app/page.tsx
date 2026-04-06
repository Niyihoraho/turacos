import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import TourPackages from '@/components/TourPackages';
import WhyUs from '@/components/WhyUs';
import WhyRwanda from '@/components/WhyRwanda';
import Testimonials from '@/components/Testimonials';
import OurImpact from '@/components/OurImpact';
import TravelGuide from '@/components/TravelGuide';
import PlanYourTrip from '@/components/PlanYourTrip';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import { unstable_noStore as noStore } from 'next/cache';
import { getTours, getTestimonials } from '@/lib/actions';
import { tours as staticTours } from '@/data/tours';

export default async function Home() {
  noStore();

  const dbTours = await getTours();
  const dbTestimonials = await getTestimonials();

  // Fallback to static data if DB is empty (initial setup)
  const displayTours = dbTours && dbTours.length > 0 ? dbTours : staticTours;
  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Welcome />
      <TourPackages tours={displayTours} />
      <WhyUs />
      <WhyRwanda />
      <TravelGuide />
      <OurImpact />
      <Testimonials testimonials={displayTestimonials} />
      <PlanYourTrip />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
