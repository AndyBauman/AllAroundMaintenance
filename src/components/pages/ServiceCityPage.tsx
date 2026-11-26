import Link from "next/link";
import { Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import ReviewGrid from "@/components/ReviewGrid";
import { getCityLocal } from "@/data/city-local";
import { approvedPricing, pricingHeadline } from "@/data/pricing";
import type { ServiceCityPair } from "@/data/service-city";
import { cityLabel, cityPath, getCity } from "@/lib/cities";
import { absoluteUrl, ESTIMATE_PATH, phoneFor } from "@/lib/constants";
import { projectsForCity, projectsForService } from "@/lib/projects";
import { reviewsForCity, reviewsForService } from "@/lib/reviews";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export default function ServiceCityPage({ pair }: { pair: ServiceCityPair }) {
  const city = getCity(pair.citySlug)!;
  const local = getCityLocal(pair.citySlug)!;
  const svc = getServiceBySlug(pair.serviceSlug)!;
  const phone = phoneFor(city.stateAbbr);
  const label = cityLabel(city);
  const path = `/${pair.slug}`;
  const projects = projectsForService(svc.slug).filter((p) => p.city.toLowerCase() === city.name.toLowerCase());
  const cityProjects = projects.length ? projects : projectsForCity(city.name).filter((p) => p.service === svc.slug);
  const reviews = reviewsForCity(city.name).filter((r) => {
    if (!r.service) return true;
    return r.service.toLowerCase().includes(svc.shortTitle.toLowerCase().split(" ")[0]!);
  });
  const fallbackReviews = reviews.length ? reviews : reviewsForService(svc.shortTitle).filter((r) => (r.city || "").toLowerCase() === city.name.toLowerCase());
  const price = pricingHeadline(svc.slug, svc.pricing);
  const approved = approvedPricing(svc.slug);

  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: `${svc.shortTitle} in ${label}`,
          description: `${svc.shortTitle} for homes in ${label}. ${svc.metaDescription}`,
          url: absoluteUrl(path),
          areaServed: [label],
          offers:
            approved && approved.from != null
              ? {
                  price: approved.from,
                  priceCurrency: "USD",
                  unitText: approved.unit,
                  minPrice: approved.minimum ?? undefined,
                }
              : undefined,
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: svc.shortTitle, href: `/${svc.slug}` },
          { label: city.name, href: path },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
              {svc.shortTitle} in {label}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">{local.lead}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-xl hover:bg-accent-light"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {phone.display}
              </a>
              <Link
                href={ESTIMATE_PATH}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white hover:bg-white/20"
              >
                Free estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900">Local notes</h2>
          <ul className="mt-6 space-y-4">
            {local.localNotes.map((note) => (
              <li key={note.text.slice(0, 48)} className="rounded-xl bg-surface p-5">
                <p className="text-gray-800">{note.text}</p>
                <p className="mt-2 text-xs text-gray-500">Source: {note.source}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-700">
            Pricing: {price.headline}. {price.note}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            <Link href={`/${svc.slug}/`} className="font-semibold text-brand hover:underline">
              All {svc.shortTitle.toLowerCase()} details
            </Link>
            {" · "}
            <Link href={cityPath(city.slug)} className="font-semibold text-brand hover:underline">
              Home maintenance in {city.name}
            </Link>
          </p>
        </div>
      </section>

      <ReviewGrid reviews={fallbackReviews} heading={`${svc.shortTitle} reviews in ${city.name}`} limit={3} />

      {cityProjects.length > 0 ? (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900">Projects in {city.name}</h2>
            <ul className="mt-4 space-y-2">
              {cityProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}/`} className="font-semibold text-brand hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <LastUpdated date={local.updated} />
    </main>
  );
}
