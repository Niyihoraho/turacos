import { PrismaClient } from '@prisma/client';
import { tours } from '../data/tours';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // --- SEED TOURS ---
  for (const tourData of tours) {
    const tour = await prisma.tour.upsert({
      where: { slug: tourData.slug },
      update: {},
      create: {
        slug: tourData.slug,
        title: tourData.title,
        location: tourData.location,
        image: tourData.image,
        gallery: tourData.gallery || [],
        description: tourData.description,
        duration: tourData.duration,
        difficulty: tourData.difficulty,
        price: tourData.price,
        highlights: tourData.highlights || [],
        includes: tourData.includes || [],
        contactMessage: tourData.contactMessage,
      },
    });
    console.log(`Upserted tour: ${tour.title}`);
  }

  // --- SEED TESTIMONIALS (FEEDBACK) ---
  const initialTestimonials = [
    {
      stars: 5,
      quote: "Trekking with mountain gorillas was the most incredible experience of my life. Our guide Emmanuel was knowledgeable and made us feel completely safe.",
      name: "Sarah M.",
      country: "United States",
      flag: "🇺🇸"
    },
    {
      stars: 5,
      quote: "The Akagera safari exceeded all expectations — we saw lions on our very first game drive! Turacos Tours made our trip absolutely seamless.",
      name: "James K.",
      country: "United Kingdom",
      flag: "🇬🇧"
    },
    {
      stars: 5,
      quote: "From Lake Kivu to Nyungwe Forest, every detail was perfectly planned. The local team genuinely loves their country and that passion is contagious.",
      name: "Sophie L.",
      country: "Germany",
      flag: "🇩🇪"
    }
  ];

  for (const testimonialData of initialTestimonials) {
    await prisma.testimonial.create({
      data: testimonialData,
    });
    console.log(`Created testimonial from: ${testimonialData.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
