import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/constants";
import { CITIES, ROOF_CITY_SLUGS, cityPath, roofCityPath } from "@/lib/cities";
import { SERVICES } from "@/lib/services";

const CONTENT_UPDATED = "2026-11-13";

export default function sitemap(): MetadataRoute.Sitemap {
  // Date the page content last changed. Update it when copy changes, not on every deploy,
  // so search engines can trust lastmod.
  const now = CONTENT_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/free-estimate"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/service-areas"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about-us"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: absoluteUrl(`/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: s.group === "home" ? 0.8 : 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: absoluteUrl(cityPath(c.slug)),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const roofCityPages: MetadataRoute.Sitemap = ROOF_CITY_SLUGS.map((slug) => ({
    url: absoluteUrl(roofCityPath(slug)),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...roofCityPages];
}
