import reviewsData from "@/data/reviews.json";
import { business } from "@/data/business";

export type Review = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  source: "Google";
  sourceUrl: string;
  city?: string;
  service?: string;
};

export const REVIEWS = reviewsData as Review[];

export function reviewsForService(serviceSlugOrTitle: string): Review[] {
  const key = serviceSlugOrTitle.toLowerCase();
  return REVIEWS.filter((r) => (r.service || "").toLowerCase().includes(key) || key.includes((r.service || "").toLowerCase()));
}

export function reviewsForCity(cityName: string): Review[] {
  const key = cityName.toLowerCase();
  return REVIEWS.filter((r) => (r.city || "").toLowerCase() === key);
}

/** Visible rating line only when owner-supplied values exist. Never emit AggregateRating JSON-LD. */
export function ratingSummary(): { value: number; count: number; asOf: string; url: string; source: string } | null {
  const { value, count, asOf, url, source } = business.rating;
  if (value == null || count == null || !asOf.trim() || !url.trim()) return null;
  return { value, count, asOf, url, source };
}

export const LEAVE_REVIEW_PATH = "/review/";
