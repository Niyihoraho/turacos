import { NextResponse } from "next/server";
import {
  deleteTestimonialInDb,
  getTestimonialById,
  updateTestimonialInDb,
} from "@/lib/content";
import { validateTestimonialUpdatePayload } from "@/lib/api-validation";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const testimonial = await getTestimonialById(params.id);

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(`GET /api/testimonials/${params.id} failed:`, error);
    return NextResponse.json({ error: "Failed to fetch testimonial." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json();
    const parsed = validateTestimonialUpdatePayload(body);

    if (parsed.success === false) {
      return NextResponse.json({ error: parsed.message }, { status: 400 });
    }

    const testimonial = await updateTestimonialInDb(params.id, parsed.data);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(`PUT /api/testimonials/${params.id} failed:`, error);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    await deleteTestimonialInDb(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/testimonials/${params.id} failed:`, error);
    return NextResponse.json({ error: "Failed to delete testimonial." }, { status: 500 });
  }
}
