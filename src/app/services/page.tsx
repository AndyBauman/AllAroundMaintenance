import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FAQJsonLd from "@/components/FAQJsonLd";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import ServiceIcon from "@/components/ServiceIcon";
import { pageDate } from "@/data/content-dates";
import { absoluteUrl } from "@/lib/constants";
import { SERVICES_PAGE_FAQS } from "@/lib/faqs";
import { webPageSchema } from "@/lib/schema";
import { SERVICE_GROUPS, servicesInGroup } from "@/lib/services";
import { socialMeta } from "@/lib/social";

const TITLE = "Home Maintenance Services in Portland & Vancouver";
const DESCRIPTION =
  "All 25 services: roofs, gutters, decks, pressure washing, siding, fences, dry rot, drywall, landscaping, HOA maintenance and handyman work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  ...socialMeta(TITLE, DESCRIPTION, "/services"),
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl("/services"),
          dateModified: pageDate("/services"),
        })}
      />
      <FAQJsonLd faqs={SERVICES_PAGE_FAQS} />
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

      <section className="bg-white pb-6 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Home Maintenance Services</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Roofs, gutters and decks are what we&apos;re known for. The same licensed crew also handles the exterior, the
            interior and the grounds, for homeowners, HOAs and businesses across the Portland, OR and Vancouver, WA metro areas.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Service groups">
            {SERVICE_GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand/20">
                {g.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {SERVICE_GROUPS.map((group, gi) => (
        <section key={group.id} id={group.id} className={gi % 2 === 0 ? "bg-white py-12" : "bg-surface py-12"}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-gray-900">{group.label}</h2>
            <p className="mt-2 text-gray-600">{group.description}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesInGroup(group.id).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:border-brand/20 hover:shadow-lg"
                >
                  {s.popular ? (
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-950">
                      Most Popular
                    </span>
                  ) : null}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">{s.shortTitle}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{s.blurb}</p>
                  <p className="mt-4 text-sm font-semibold text-brand">{s.pricing.headline}</p>
                  <span className="mt-2 inline-block text-sm font-semibold text-brand group-hover:underline">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <FAQSection faqs={SERVICES_PAGE_FAQS} heading="Services FAQ" />
      <CtaBand />
    </main>
  );
}
