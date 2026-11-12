import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { ROOF_CITY_SLUGS, citiesInState, cityLabel, cityPath, getCity, roofCityPath, type CityData } from "@/lib/cities";
import { PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";
import { SERVICE_GROUPS, servicesInGroup } from "@/lib/services";

const TITLE = "Service Areas | Portland OR & Vancouver WA";
const DESCRIPTION =
  "All Around Maintenance serves the Portland metro, Clark County, Longview and Kelso. Find home maintenance and roof services in your city.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/service-areas" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/service-areas" },
};

function CityGrid({ cities }: { cities: CityData[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((c) => (
        <Link key={c.slug} href={cityPath(c.slug)} className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-brand/40 hover:shadow-md">
          <span className="block font-bold text-gray-900">{c.kind === "county" ? c.name : cityLabel(c)}</span>
          <span className="mt-1 block text-sm text-gray-600">{c.kind === "county" ? "County-wide service" : c.county}</span>
        </Link>
      ))}
    </div>
  );
}

export default function ServiceAreasPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Service Areas", href: "/service-areas" }]} />

      <section className="bg-white pb-10 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Service Areas</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            We&apos;re licensed on both sides of the Columbia River and work throughout the Portland metro, Clark County
            and north to Longview and Kelso.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Oregon</h2>
          <p className="mt-2 text-gray-600">
            Portland-area line: <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">{PHONE}</a>
          </p>
          <CityGrid cities={citiesInState("OR")} />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Washington</h2>
          <p className="mt-2 text-gray-600">
            Vancouver-area line: <a href={PHONE_WA_HREF} className="font-semibold text-brand hover:underline">{PHONE_WA}</a>
          </p>
          <CityGrid cities={citiesInState("WA")} />

          <h3 className="mt-12 text-xl font-bold text-gray-900">Roof maintenance by city</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {ROOF_CITY_SLUGS.map((slug) => {
              const c = getCity(slug);
              return c ? (
                <li key={slug}>
                  <Link href={roofCityPath(slug)} className="rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand/20">
                    Roof maintenance in {cityLabel(c)}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Services Available in Every Area</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.id}>
                <h3 className="font-bold text-gray-900">{g.label}</h3>
                <ul className="mt-3 space-y-2">
                  {servicesInGroup(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`} className="text-sm text-gray-700 hover:text-brand hover:underline">{s.shortTitle}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Not Sure If We Cover Your Area?" text="Call and ask. If you're in or near the Portland or Vancouver metro, the answer is probably yes." />
    </main>
  );
}
