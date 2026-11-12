import Link from "next/link";
import { CircleCheck, MapPin } from "lucide-react";
import { citiesInState, cityPath, type CityData } from "@/lib/cities";
import { PHONE, PHONE_WA } from "@/lib/constants";

function AreaCard({ title, phone, cities }: { title: string; phone: string; cities: CityData[] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
          <MapPin className="h-6 w-6 text-brand" aria-hidden />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">&amp; surrounding areas · {phone}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={cityPath(c.slug)}
            className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 transition-colors hover:bg-brand/10"
          >
            <CircleCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden />
            <span className="text-sm font-medium text-gray-700">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">Where We Work</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">Service Areas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Licensed on both sides of the Columbia: the Portland metro, Clark County and up to Longview and Kelso.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <AreaCard title="Portland, Oregon" phone={PHONE} cities={citiesInState("OR")} />
          <AreaCard title="Vancouver, Washington" phone={PHONE_WA} cities={citiesInState("WA")} />
        </div>
      </div>
    </section>
  );
}
