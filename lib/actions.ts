"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import {
  createTestimonialInDb,
  createTourInDb,
  deleteTestimonialInDb,
  deleteTourInDb,
  getTourBySlugFromDb,
  listTestimonials,
  listTours,
  updateTestimonialInDb,
  updateTourInDb,
  createTripRequestInDb,
} from "@/lib/content";
import { slugify } from "./slug";
import { Resend } from 'resend';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

// --- TOURS ---

export async function uploadImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "turacos-tours",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve({ success: false, error: "Cloudinary upload failed" });
          } else {
            resolve({ success: true, url: result?.secure_url });
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error in uploadImage action:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

export async function getTours() {
  try {
    return await listTours();
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export async function getTourBySlug(slug: string) {
  try {
    return await getTourBySlugFromDb(slug);
  } catch (error) {
    console.error(`Error fetching tour by slug ${slug}:`, error);
    return null;
  }
}

export async function createTour(data: any) {
  try {
    // Sanitize slug
    const sanitizedData = {
      ...data,
      slug: slugify(data.slug),
    };
    const tour = await createTourInDb(sanitizedData);
    revalidatePath("/");
    revalidatePath("/tours");
    return { success: true, tour };
  } catch (error) {
    console.error("Error creating tour:", error);
    return { success: false, error: "Failed to create tour" };
  }
}

export async function updateTour(slug: string, data: any) {
  try {
    // Sanitize slug
    const sanitizedData = {
      ...data,
      slug: data.slug ? slugify(data.slug) : undefined,
    };
    const tour = await updateTourInDb(slug, sanitizedData);
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath(`/tours/${slug}`);
    return { success: true, tour };
  } catch (error) {
    console.error(`Error updating tour with slug ${slug}:`, error);
    return { success: false, error: "Failed to update tour" };
  }
}

export async function deleteTour(slug: string) {
  try {
    await deleteTourInDb(slug);
    revalidatePath("/");
    revalidatePath("/tours");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting tour with slug ${slug}:`, error);
    return { success: false, error: "Failed to delete tour" };
  }
}

export async function deleteToursBulk(slugs: string[]) {
  try {
    // Process deletions in parallel
    await Promise.all(slugs.map(slug => deleteTourInDb(slug)));
    revalidatePath("/");
    revalidatePath("/tours");
    return { success: true };
  } catch (error) {
    console.error(`Error bulk deleting tours:`, error);
    return { success: false, error: "Failed to delete selected tours" };
  }
}

// --- TESTIMONIALS (FEEDBACK) ---

export async function getTestimonials() {
  try {
    return await listTestimonials();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function createTestimonial(data: any) {
  try {
    const testimonial = await createTestimonialInDb(data);
    revalidatePath("/");
    return { success: true, testimonial };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    const testimonial = await updateTestimonialInDb(id, data);
    revalidatePath("/");
    return { success: true, testimonial };
  } catch (error) {
    console.error(`Error updating testimonial with id ${id}:`, error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await deleteTestimonialInDb(id);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting testimonial with id ${id}:`, error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}

export async function sendPlanTripRequest(data: {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  preferredDates?: string;
  details: string;
}) {
  try {
    // 1. Save to database
    await createTripRequestInDb(data);

    // 2. Send email via Resend
    // Note: 'onboarding@resend.dev' works for the account's registered email.
    // For production, use a verified domain.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'kaziyabwanaakenga@gmail.com',
        subject: `New Trip Planning Request from ${data.name}`,
        replyTo: data.email,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #0b3d51; border-bottom: 2px solid #c29d59; padding-bottom: 10px;">New Planning Inquiry</h2>
            <div style="margin-top: 20px;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Number of Travelers:</strong> ${data.travelers}</p>
              <p><strong>Preferred Dates:</strong> ${data.preferredDates || 'Not specified'}</p>
              <p><strong>Trip Details:</strong></p>
              <div style="background: #fcfaf6; padding: 15px; border-radius: 8px; font-style: italic; color: #444;">
                ${data.details.replace(/\n/g, '<br>') || 'No details provided.'}
              </div>
            </div>
            <div style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; pt-10px;">
              Sent from the Turacos Tours website automated booking system.
            </div>
          </div>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error in sendPlanTripRequest action:", error);
    return { success: false, error: "Failed to process your request. Please try again later." };
  }
}
