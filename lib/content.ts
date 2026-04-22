import prisma from "@/lib/prisma";

export type TourPayload = {
  slug: string;
  title: string;
  location: string;
  image: string;
  gallery: string[];
  description: string;
  duration: string;
  difficulty: string;
  price: string;
  highlights: string[];
  includes: string[];
  contactMessage: string;
};

export type TestimonialPayload = {
  stars: number;
  quote: string;
  name: string;
  country: string;
  flag: string;
};

export async function listTours() {
  return prisma.tour.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTourBySlugFromDb(slug: string) {
  return prisma.tour.findUnique({
    where: { slug },
  });
}

export async function createTourInDb(data: TourPayload) {
  return prisma.tour.create({ data });
}

export async function updateTourInDb(slug: string, data: Partial<TourPayload>) {
  return prisma.tour.update({
    where: { slug },
    data,
  });
}

export async function deleteTourInDb(slug: string) {
  return prisma.tour.delete({
    where: { slug },
  });
}

export async function listTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({
    where: { id },
  });
}

export async function createTestimonialInDb(data: TestimonialPayload) {
  return prisma.testimonial.create({ data });
}

export async function updateTestimonialInDb(
  id: string,
  data: Partial<TestimonialPayload>
) {
  return prisma.testimonial.update({
    where: { id },
    data,
  });
}

export async function deleteTestimonialInDb(id: string) {
  return prisma.testimonial.delete({
    where: { id },
  });
}
export async function createTripRequestInDb(data: {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  preferredDates?: string;
  details: string;
}) {
  return prisma.tripRequest.create({ data });
}
