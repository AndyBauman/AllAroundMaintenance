import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, CITY_SUFFIX, ROOF_CITY_PREFIX, ROOF_CITY_SLUGS, cityLabel, cityPath, getCity, roofCityPath } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { phoneFor } from "@/lib/constants";
import CityPage from "@/components/pages/CityPage";
import ServicePage from "@/components/pages/ServicePage";

/**
 * Root-level slugs, kept identical to the previous site so existing rankings and links carry over:
 *   /gutter-repair-portland          service page
 *   /beaverton-home-maintenance      city page
 *   /roof-maintenance-vancouver      roof-focused city page
 */
type PageType = { kind: "service"; slug: string } | { kind: "city"; slug: string } | { kind: "roof-city"; slug: string };

function resolveSlug(slug: string): PageType | null {
  const service = SERVICES.find((s) => s.slug === slug);
  if (service) return { kind: "service", slug: service.slug };

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
    ...CITIES.map((c) => ({ slug: cityPath(c.slug).slice(1) })),
    ...ROOF_CITY_SLUGS.map((s) => ({ slug: roofCityPath(s).slice(1) })),
  ];
}

function meta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) return {};

  if (resolved.kind === "service") {
    const svc = SERVICES.find((s) => s.slug === resolved.slug)!;
    // metaTitle already carries the location, so skip the "| brand" template to stay within title length.
    return { ...meta(svc.metaTitle, svc.metaDescription, `/${svc.slug}`), title: { absolute: svc.metaTitle } };
  }

  const city = getCity(resolved.slug)!;
  const label = cityLabel(city);
  const phone = phoneFor(city.stateAbbr).display;

  if (resolved.kind === "roof-city") {
    return meta(
      `Roof Maintenance in ${label}`,
      `Roof inspection, repair, moss removal and cleaning in ${label}. Free inspection with a photo report. Licensed in OR & WA. Call ${phone}.`,
      roofCityPath(city.slug),
    );
  }

  return meta(
    `Home Maintenance in ${label}`,
    `Roof repair, gutter cleaning, deck restoration and handyman work in ${label}. Family-owned, licensed in OR & WA. Free estimates: ${phone}.`,
    cityPath(city.slug),
  );
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) notFound();

  if (resolved.kind === "service") return <ServicePage serviceSlug={resolved.slug} />;
  return <CityPage citySlug={resolved.slug} focus={resolved.kind === "roof-city" ? "roof" : "home"} />;
}
