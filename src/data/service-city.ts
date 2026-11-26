/**
 * Stage 6c — service-in-city pages (first wave).
 * Gate: city has localNotes AND at least one matching project or review.
 * No evidence → page is not generated.
 */
import { getCityLocal } from "@/data/city-local";
import { getCity } from "@/lib/cities";
import { publishedProjects } from "@/lib/projects";
import { REVIEWS } from "@/lib/reviews";

export type ServiceCityPair = {
  /** Public URL slug, e.g. gutter-cleaning-vancouver-wa */
  slug: string;
  serviceSlug: string;
  citySlug: string;
};

/** First wave only: gutters + moss × six cities (≤12). */
export const SERVICE_CITY_CANDIDATES: ServiceCityPair[] = [
  { slug: "gutter-cleaning-vancouver-wa", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "vancouver" },
  { slug: "gutter-cleaning-camas-wa", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "camas" },
  { slug: "gutter-cleaning-battle-ground-wa", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "battle-ground" },
  { slug: "gutter-cleaning-ridgefield-wa", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "ridgefield" },
  { slug: "gutter-cleaning-portland-or", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "portland" },
  { slug: "gutter-cleaning-beaverton-or", serviceSlug: "gutter-cleaning-gutter-inspection", citySlug: "beaverton" },
  { slug: "moss-removal-vancouver-wa", serviceSlug: "moss-removal-portland", citySlug: "vancouver" },
  { slug: "moss-removal-camas-wa", serviceSlug: "moss-removal-portland", citySlug: "camas" },
  { slug: "moss-removal-battle-ground-wa", serviceSlug: "moss-removal-portland", citySlug: "battle-ground" },
  { slug: "moss-removal-ridgefield-wa", serviceSlug: "moss-removal-portland", citySlug: "ridgefield" },
  { slug: "moss-removal-portland-or", serviceSlug: "moss-removal-portland", citySlug: "portland" },
  { slug: "moss-removal-beaverton-or", serviceSlug: "moss-removal-portland", citySlug: "beaverton" },
];

function cityName(citySlug: string): string {
  return getCity(citySlug)?.name ?? "";
}

function hasEvidence(serviceSlug: string, citySlug: string): boolean {
  const name = cityName(citySlug).toLowerCase();
  if (!name) return false;
  const projectHit = publishedProjects().some(
    (p) => p.service === serviceSlug && p.city.toLowerCase() === name,
  );
  if (projectHit) return true;
  const reviewHit = REVIEWS.some((r) => {
    const cityOk = (r.city ?? "").toLowerCase() === name;
    const serviceOk = !r.service || r.service.toLowerCase().includes(serviceLabelHint(serviceSlug));
    return cityOk && serviceOk;
  });
  return reviewHit;
}

function serviceLabelHint(serviceSlug: string): string {
  if (serviceSlug.includes("gutter")) return "gutter";
  if (serviceSlug.includes("moss")) return "moss";
  return serviceSlug;
}

export function gatedServiceCityPages(): ServiceCityPair[] {
  return SERVICE_CITY_CANDIDATES.filter((pair) => {
    const local = getCityLocal(pair.citySlug);
    if (!local || local.localNotes.length === 0) return false;
    return hasEvidence(pair.serviceSlug, pair.citySlug);
  });
}

export function getServiceCityPair(slug: string): ServiceCityPair | undefined {
  return gatedServiceCityPages().find((p) => p.slug === slug);
}
