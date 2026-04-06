import { TestimonialPayload, TourPayload } from "@/lib/content";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

type StringArrayValidationResult =
  | { success: true; data: string[] }
  | { success: false; message: string };

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeStringArray(
  value: unknown,
  fieldName: string
): StringArrayValidationResult {
  if (!Array.isArray(value)) {
    return {
      success: false as const,
      message: `${fieldName} must be an array of strings.`,
    };
  }

  const normalized = value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  return { success: true as const, data: normalized };
}

export function validateTourPayload(payload: unknown): ValidationResult<TourPayload> {
  if (!payload || typeof payload !== "object") {
    return { success: false, message: "Request body must be a JSON object." };
  }

  const data = payload as Record<string, unknown>;
  const requiredFields = [
    "slug",
    "title",
    "location",
    "image",
    "description",
    "duration",
    "difficulty",
    "price",
    "contactMessage",
  ] as const;

  for (const field of requiredFields) {
    if (!isNonEmptyString(data[field])) {
      return { success: false, message: `${field} is required.` };
    }
  }

  const gallery = normalizeStringArray(data.gallery, "gallery");
  if (gallery.success === false) {
    return { success: false, message: gallery.message };
  }

  const highlights = normalizeStringArray(data.highlights, "highlights");
  if (highlights.success === false) {
    return { success: false, message: highlights.message };
  }

  const includes = normalizeStringArray(data.includes, "includes");
  if (includes.success === false) {
    return { success: false, message: includes.message };
  }

  return {
    success: true,
    data: {
      slug: (data.slug as string).trim(),
      title: (data.title as string).trim(),
      location: (data.location as string).trim(),
      image: (data.image as string).trim(),
      gallery: gallery.data,
      description: (data.description as string).trim(),
      duration: (data.duration as string).trim(),
      difficulty: (data.difficulty as string).trim(),
      price: (data.price as string).trim(),
      highlights: highlights.data,
      includes: includes.data,
      contactMessage: (data.contactMessage as string).trim(),
    },
  };
}

export function validateTourUpdatePayload(payload: unknown): ValidationResult<Partial<TourPayload>> {
  if (!payload || typeof payload !== "object") {
    return { success: false, message: "Request body must be a JSON object." };
  }

  const data = payload as Record<string, unknown>;
  const result: Partial<TourPayload> = {};

  const stringFields = [
    "slug",
    "title",
    "location",
    "image",
    "description",
    "duration",
    "difficulty",
    "price",
    "contactMessage",
  ] as const;

  for (const field of stringFields) {
    if (field in data) {
      if (!isNonEmptyString(data[field])) {
        return { success: false, message: `${field} must be a non-empty string.` };
      }
      result[field] = (data[field] as string).trim();
    }
  }

  const arrayFields = ["gallery", "highlights", "includes"] as const;
  for (const field of arrayFields) {
    if (field in data) {
      const parsed = normalizeStringArray(data[field], field);
      if (parsed.success === false) {
        return { success: false, message: parsed.message };
      }
      result[field] = parsed.data;
    }
  }

  if (Object.keys(result).length === 0) {
    return { success: false, message: "Provide at least one field to update." };
  }

  return { success: true, data: result };
}

export function validateTestimonialPayload(payload: unknown): ValidationResult<TestimonialPayload> {
  if (!payload || typeof payload !== "object") {
    return { success: false, message: "Request body must be a JSON object." };
  }

  const data = payload as Record<string, unknown>;
  const requiredFields = ["quote", "name", "country", "flag"] as const;

  for (const field of requiredFields) {
    if (!isNonEmptyString(data[field])) {
      return { success: false, message: `${field} is required.` };
    }
  }

  if (
    typeof data.stars !== "number" ||
    !Number.isInteger(data.stars) ||
    data.stars < 1 ||
    data.stars > 5
  ) {
    return { success: false, message: "stars must be an integer between 1 and 5." };
  }

  return {
    success: true,
    data: {
      stars: data.stars,
      quote: (data.quote as string).trim(),
      name: (data.name as string).trim(),
      country: (data.country as string).trim(),
      flag: (data.flag as string).trim(),
    },
  };
}

export function validateTestimonialUpdatePayload(
  payload: unknown
): ValidationResult<Partial<TestimonialPayload>> {
  if (!payload || typeof payload !== "object") {
    return { success: false, message: "Request body must be a JSON object." };
  }

  const data = payload as Record<string, unknown>;
  const result: Partial<TestimonialPayload> = {};

  const stringFields = ["quote", "name", "country", "flag"] as const;
  for (const field of stringFields) {
    if (field in data) {
      if (!isNonEmptyString(data[field])) {
        return { success: false, message: `${field} must be a non-empty string.` };
      }
      result[field] = (data[field] as string).trim();
    }
  }

  if ("stars" in data) {
    if (
      typeof data.stars !== "number" ||
      !Number.isInteger(data.stars) ||
      data.stars < 1 ||
      data.stars > 5
    ) {
      return { success: false, message: "stars must be an integer between 1 and 5." };
    }
    result.stars = data.stars;
  }

  if (Object.keys(result).length === 0) {
    return { success: false, message: "Provide at least one field to update." };
  }

  return { success: true, data: result };
}
