import Link from "next/link";
import { Building2, Store } from "lucide-react";
import { FACTS } from "@/lib/business-facts";

/** HOA and commercial: the two audiences homeowner-focused copy doesn't cover. */
export default function AudienceBands() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-surface p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
              <Building2 className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-gray-900">HOAs &amp; Property Managers</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              More than {FACTS.hoaYears} years serving HOAs. Custom maintenance plans, on-demand emergency repairs, and
              weekend or off-hours scheduling for condos, townhomes, apartments and subdivisions.
            </p>
            <Link href="/hoa-maintenance" className="mt-6 inline-block font-semibold text-brand hover:underline">
              HOA maintenance plans →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-surface p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
              <Store className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-gray-900">Businesses</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Commercial maintenance and repair for roofs, gutters, exteriors and interiors. Simple fixes and
              preventive maintenance cost far less than an emergency repair later.
            </p>
            <Link href="/services" className="mt-6 inline-block font-semibold text-brand hover:underline">
              See all services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
