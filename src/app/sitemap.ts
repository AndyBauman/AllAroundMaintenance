import type { MetadataRoute } from "next";
import { pageDate } from "@/data/content-dates";
import { absoluteUrl, SITE_URL } from "@/lib/constants";
import { CITIES, ROOF_CITY_SLUGS, cityPath, roofCityPath } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { hasPublicFile } from "@/lib/assets";

function img(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeImages = ["/hero.jpg", "/why-us.jpg", "/og.jpg"].filter((p) => hasPublicFile(p.slice(1))).map(img);
  const aboutImages = hasPublicFile("about-team.jpg") ? [img("/about-team.jpg")] : [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: pageDate("/"),
      changeFrequency: "weekly",
      priority: 1.0,
      images: homeImages,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: pageDate("/services"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/free-estimate"),
      lastModified: pageDate("/free-estimate"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/service-areas"),
      lastModified: pageDate("/service-areas"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about-us"),
      lastModified: pageDate("/about-us"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: aboutImages,
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: pageDate("/faq"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: pageDate("/reviews"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: pageDate("/projects"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: absoluteUrl(`/${s.slug}`),
    lastModified: pageDate(`/${s.slug}`),
    changeFrequency: "monthly" as const,
    priority: s.group === "home" ? 0.8 : 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: absoluteUrl(cityPath(c.slug)),
    lastModified: pageDate(cityPath(c.slug)),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const roofCityPages: MetadataRoute.Sitemap = ROOF_CITY_SLUGS.map((slug) => ({
    url: absoluteUrl(roofCityPath(slug)),
    lastModified: pageDate(roofCityPath(slug)),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...roofCityPages];
}
