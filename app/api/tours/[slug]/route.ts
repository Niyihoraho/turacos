import { NextResponse } from "next/server";
import {
  deleteTourInDb,
  getTourBySlugFromDb,
  updateTourInDb,
} from "@/lib/content";
import { validateTourUpdatePayload } from "@/lib/api-validation";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const tour = await getTourBySlugFromDb(params.slug);

    if (!tour) {
      return NextResponse.json({ error: "Tour not found." }, { status: 404 });
    }

    return NextResponse.json(tour);
  } catch (error) {
    console.error(`GET /api/tours/${params.slug} failed:`, error);
    return NextResponse.json({ error: "Failed to fetch tour." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json();
    const parsed = validateTourUpdatePayload(body);

    if (parsed.success === false) {
      return NextResponse.json({ error: parsed.message }, { status: 400 });
    }

    const tour = await updateTourInDb(params.slug, parsed.data);
    return NextResponse.json(tour);
  } catch (error) {
    console.error(`PUT /api/tours/${params.slug} failed:`, error);
    return NextResponse.json({ error: "Failed to update tour." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    await deleteTourInDb(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/tours/${params.slug} failed:`, error);
    return NextResponse.json({ error: "Failed to delete tour." }, { status: 500 });
  }
}
