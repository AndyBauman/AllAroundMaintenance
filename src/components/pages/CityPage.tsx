import Link from "next/link";
import { Phone } from "lucide-react";
import { ESTIMATE_PATH, absoluteUrl, phoneFor } from "@/lib/constants";
import { FACTS, PROCESS_STEPS, estimateText, paymentText } from "@/lib/business-facts";
import { CITIES, cityLabel, cityPath, getCity, nearbyCities, roofCityPath, ROOF_CITY_SLUGS } from "@/lib/cities";
import { cityFaqs } from "@/lib/faqs";
import { serviceSchema } from "@/lib/schema";
import { SERVICES } from "@/lib/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FAQJsonLd from "@/components/FAQJsonLd";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import ServiceIcon from "@/components/ServiceIcon";

const TRUST = [
  { stat: "Since 1999", label: "Family-Owned" },
  { stat: "OR + WA", label: "Licensed, Bonded & Insured" },
  { stat: "Free", label: "Itemized Estimates" },
  { stat: "Same Day", label: "Response" },
];

/**
 * One template for both city page types:
 *  - focus "home": /{city}-home-maintenance
 *  - focus "roof": /roof-maintenance-{city}
 */
export default function CityPage({ citySlug, focus = "home" }: { citySlug: string; focus?: "home" | "roof" }) {
  const city = getCity(citySlug)!;
  const phone = phoneFor(city.stateAbbr);
  const label = cityLabel(city);
  const isRoof = focus === "roof";
  const path = isRoof ? roofCityPath(city.slug) : cityPath(city.slug);
  const noun = isRoof ? "Roof Maintenance" : "Home Maintenance";
  const faqs = cityFaqs(city, focus);
  const services = isRoof
    ? SERVICES.filter((s) => s.group === "roofs" || s.group === "gutters")
    : SERVICES.filter((s) => s.popular || s.group !== "home").slice(0, 12);
  const nearby = nearbyCities(city.slug, 6);
  const hasRoofPage = (ROOF_CITY_SLUGS as readonly string[]).includes(city.slug);
  const areasHeading =
    city.kind === "county" ? `Communities We Serve in ${city.name}` : `Neighborhoods We Serve in ${city.name}`;

  return (
    <main>
      <JsonLd
        data={serviceSchema({
          name: `${noun} in ${label}`,
          description: `${noun} for homes, HOAs and businesses in ${label} by All Around Maintenance Inc.`,
          url: absoluteUrl(path),
          areaServed: [label],
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Service Areas", href: "/service-areas" },
          { label: isRoof ? `${city.name} Roof Maintenance` : city.name, href: path },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" aria-hidden />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
              {city.kind === "county" ? city.state : `${city.county} · ${city.state}`}
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-white sm:text-5xl">
              {noun} in {label}
            </h1>
            <p className="mt-4 text-lg text-accent">
              {isRoof ? "Free roof inspections, repairs and moss removal." : "Roofs, gutters, decks and everything in between."}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {isRoof
                ? `Months of rain, wind and fir needles are hard on roofs in ${city.name}. All Around Maintenance inspects, repairs, cleans and treats them, and tells you honestly when a repair is all you need.`
                : `All Around Maintenance is a family-owned contractor serving ${city.name} since ${FACTS.founded}. One licensed crew handles roof repair, gutter cleaning, deck restoration and the rest of your home's to-do list.`}{" "}
              {estimateText()}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-xl transition-all hover:bg-accent-light"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Call {phone.display}
              </a>
              <Link
                href={ESTIMATE_PATH}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/20"
              >
                Get Free Estimate →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TRUST.map((item) => (
              <div key={item.label} className="rounded-xl bg-surface p-4 text-center">
                <div className="font-display text-xl font-bold text-brand">{item.stat}</div>
                <div className="text-sm font-semibold text-gray-700">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {isRoof ? `Roof & Gutter Services in ${city.name}` : `What We Do in ${city.name}`}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-brand/40 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900">{s.shortTitle}</span>
                  <span className="mt-1 block text-sm text-gray-600">{s.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-600">
            <Link href="/services" className="font-semibold text-brand hover:underline">See all services</Link>
            {!isRoof && hasRoofPage ? (
              <>
                {" · "}
                <Link href={roofCityPath(city.slug)} className="font-semibold text-brand hover:underline">
                  Roof maintenance in {city.name}
                </Link>
              </>
            ) : null}
            {isRoof ? (
              <>
                {" · "}
                <Link href={cityPath(city.slug)} className="font-semibold text-brand hover:underline">
                  All home maintenance in {city.name}
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </section>

      {city.areas && city.areas.length > 0 ? (
        <section className="bg-surface py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">{areasHeading}</h2>
            <p className="mt-4 text-gray-700">
              We work throughout {label}, including these {city.kind === "county" ? "communities" : "neighborhoods"}:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {city.areas.map((n) => (
                <span key={n} className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            How {noun} Works in {city.name}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="rounded-xl border border-gray-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">{step.step}</div>
                <h3 className="mt-4 font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {noun} Pricing in {city.name}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700">
            Every job is different, so we don&apos;t quote from a price list. {estimateText()} Cost depends on the size and
            height of the home, how easy the work area is to reach, and the materials needed. {paymentText()}
          </p>
        </div>
      </section>

      <CtaBand
        heading={`Need ${isRoof ? "Roof" : "Home"} Help in ${city.name}?`}
        text={`We respond ${FACTS.responseTime}, and most repairs and maintenance are scheduled within ${FACTS.schedulingWindow}.`}
        phone={phone}
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">Also Serving Nearby</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((c) => (
              <Link
                key={c.slug}
                href={cityPath(c.slug)}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-brand/40 hover:shadow-md"
              >
                <span className="block font-bold text-gray-900">{cityLabel(c)}</span>
                <span className="mt-1 block text-sm text-gray-600">{c.kind === "county" ? "County-wide service" : c.county}</span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-600">
            <Link href="/service-areas" className="font-semibold text-brand hover:underline">
              All {CITIES.length} service areas →
            </Link>
          </p>
        </div>
      </section>

      <section id="quote" className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-gray-900">Get a Free Estimate in {city.name}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">
            Tell us what needs attention and we&apos;ll take it from there.
          </p>
          <div className="mt-10">
            <QuoteForm city={city.kind === "county" ? "" : city.name} service={isRoof ? "Roof Repair or Inspection" : undefined} />
          </div>
        </div>
      </section>

      <FAQJsonLd faqs={faqs} />
      <FAQSection faqs={faqs} heading={`${noun} FAQ: ${label}`} />
    </main>
  );
}
