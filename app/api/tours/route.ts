import { NextResponse } from "next/server";
import { createTourInDb, listTours } from "@/lib/content";
import { validateTourPayload } from "@/lib/api-validation";

export async function GET() {
  try {
    const tours = await listTours();
    return NextResponse.json(tours);
  } catch (error) {
    console.error("GET /api/tours failed:", error);
    return NextResponse.json({ error: "Failed to fetch tours." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = validateTourPayload(body);

    if (parsed.success === false) {
      return NextResponse.json({ error: parsed.message }, { status: 400 });
    }

    const tour = await createTourInDb(parsed.data);
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error("POST /api/tours failed:", error);
    return NextResponse.json({ error: "Failed to create tour." }, { status: 500 });
  }
}
