import type { CityData } from "@/lib/cities";

/** Titles lead with search terms; drop brand (handled by layout only when needed). Max ~60 chars. */
export function cityHomeTitle(city: CityData): string {
  const full = `Gutter Cleaning, Roof & Home Repair in ${city.name}, ${city.stateAbbr}`;
  if (full.length <= 60) return full;
  const mid = `Gutter, Roof & Home Repair in ${city.name}, ${city.stateAbbr}`;
  if (mid.length <= 60) return mid;
  return `Home Repair in ${city.name}, ${city.stateAbbr}`;
}

export function cityRoofTitle(city: CityData): string {
  const full = `Roof Repair & Moss Removal in ${city.name}, ${city.stateAbbr}`;
  if (full.length <= 60) return full;
  return `Roof Repair in ${city.name}, ${city.stateAbbr}`;
}

export function cityHomeDescription(city: CityData, phone: string): string {
  return `Gutter cleaning, roof repair, moss removal and home maintenance in ${city.name}, ${city.stateAbbr}. Licensed OR & WA. Free estimates: ${phone}.`;
}

export function cityRoofDescription(city: CityData, phone: string): string {
  return `Roof inspection, leak repair and moss removal in ${city.name}, ${city.stateAbbr}. Free photo inspection. Licensed OR & WA. Call ${phone}.`;
}
