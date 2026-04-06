import { NextResponse } from "next/server";
import { createTestimonialInDb, listTestimonials } from "@/lib/content";
import { validateTestimonialPayload } from "@/lib/api-validation";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const testimonials = await listTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials failed:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = validateTestimonialPayload(body);

    if (parsed.success === false) {
      return NextResponse.json({ error: parsed.message }, { status: 400 });
    }

    const testimonial = await createTestimonialInDb(parsed.data);
    revalidatePath("/");
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials failed:", error);
    return NextResponse.json({ error: "Failed to create testimonial." }, { status: 500 });
  }
}
