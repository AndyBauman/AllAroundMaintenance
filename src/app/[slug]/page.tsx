import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, CITY_SUFFIX, ROOF_CITY_PREFIX, ROOF_CITY_SLUGS, cityPath, getCity, roofCityPath } from "@/lib/cities";
import { SERVICES, getServiceBySlug } from "@/lib/services";
import { phoneFor } from "@/lib/constants";
import CityPage from "@/components/pages/CityPage";
import GuidePage from "@/components/pages/GuidePage";
import ServiceCityPage from "@/components/pages/ServiceCityPage";
import ServicePage from "@/components/pages/ServicePage";
import { getGuide, publishedGuides } from "@/data/guides";
import { gatedServiceCityPages, getServiceCityPair } from "@/data/service-city";
import { cityHomeDescription, cityHomeTitle, cityRoofDescription, cityRoofTitle } from "@/lib/city-seo";
import { socialMeta } from "@/lib/social";

/**
 * Root-level slugs:
 *   /gutter-repair-portland             service
 *   /beaverton-home-maintenance         city
 *   /roof-maintenance-vancouver         roof city
 *   /why-is-moss-so-bad-for-your-roof    guide
 *   /gutter-cleaning-vancouver-wa       service-in-city (gated)
 */
type PageType =
  | { kind: "service"; slug: string }
  | { kind: "city"; slug: string }
  | { kind: "roof-city"; slug: string }
  | { kind: "guide"; slug: string }
  | { kind: "service-city"; slug: string };

function resolveSlug(slug: string): PageType | null {
  const service = SERVICES.find((s) => s.slug === slug);
  if (service) return { kind: "service", slug: service.slug };

  const guide = getGuide(slug);
  if (guide) return { kind: "guide", slug: guide.slug };

  const serviceCity = getServiceCityPair(slug);
  if (serviceCity) return { kind: "service-city", slug: serviceCity.slug };

  if (slug.endsWith(CITY_SUFFIX)) {
    const city = getCity(slug.slice(0, -CITY_SUFFIX.length));
    if (city) return { kind: "city", slug: city.slug };
  }

  if (slug.startsWith(ROOF_CITY_PREFIX)) {
    const base = slug.slice(ROOF_CITY_PREFIX.length);
    if ((ROOF_CITY_SLUGS as readonly string[]).includes(base) && getCity(base)) return { kind: "roof-city", slug: base };
  }

  return null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SERVICES.map((s) => ({ slug: s.slug })),
    ...publishedGuides().map((g) => ({ slug: g.slug })),
    ...gatedServiceCityPages().map((p) => ({ slug: p.slug })),
    ...CITIES.map((c) => ({ slug: cityPath(c.slug).slice(1) })),
    ...ROOF_CITY_SLUGS.map((s) => ({ slug: roofCityPath(s).slice(1) })),
  ];
}

function meta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMeta(title, description, path),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) return {};

  if (resolved.kind === "service") {
    const svc = SERVICES.find((s) => s.slug === resolved.slug)!;
    return { ...meta(svc.metaTitle, svc.metaDescription, `/${svc.slug}`), title: { absolute: svc.metaTitle } };
  }

  if (resolved.kind === "guide") {
    const guide = getGuide(resolved.slug)!;
    return { ...meta(guide.title, guide.description, `/${guide.slug}`), title: { absolute: guide.title } };
  }

  if (resolved.kind === "service-city") {
    const pair = getServiceCityPair(resolved.slug)!;
    const city = getCity(pair.citySlug)!;
    const svc = getServiceBySlug(pair.serviceSlug)!;
    const phone = phoneFor(city.stateAbbr).display;
    const title = `${svc.shortTitle} in ${city.name}, ${city.stateAbbr}`;
    const description = `${svc.shortTitle} in ${city.name}, ${city.stateAbbr}. Licensed OR & WA. Free estimates: ${phone}.`;
    return { ...meta(title, description, `/${pair.slug}`), title: { absolute: title } };
  }

  const city = getCity(resolved.slug)!;
  const phone = phoneFor(city.stateAbbr).display;

  if (resolved.kind === "roof-city") {
    const title = cityRoofTitle(city);
    return { ...meta(title, cityRoofDescription(city, phone), roofCityPath(city.slug)), title: { absolute: title } };
  }

  const title = cityHomeTitle(city);
  return { ...meta(title, cityHomeDescription(city, phone), cityPath(city.slug)), title: { absolute: title } };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === "service") return <ServicePage serviceSlug={resolved.slug} />;
  if (resolved.kind === "guide") return <GuidePage guide={getGuide(resolved.slug)!} />;
  if (resolved.kind === "service-city") return <ServiceCityPage pair={getServiceCityPair(resolved.slug)!} />;
  return <CityPage citySlug={resolved.slug} focus={resolved.kind === "roof-city" ? "roof" : "home"} />;
}
