import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { LEGAL_NAME, LICENSES } from "@/lib/constants";
import { FACTS, languagesText } from "@/lib/business-facts";

const TITLE = "About Us | Family-Owned Since 1999";
const DESCRIPTION =
  "All Around Maintenance Inc. was founded in 1999 by Alex Svistun. A family-owned, licensed crew serving Portland OR and Vancouver WA homeowners, HOAs and businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about-us" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about-us" },
};

const VALUES = [
  { title: "Finish on time", text: "We schedule realistically and keep to it." },
  { title: "Sweat the details", text: "The small things are what make a repair last." },
  { title: "Communicate clearly", text: "You know what we found, what it costs and what happens next." },
  { title: "Solve problems", text: "When a job throws a surprise, we bring you options, not excuses." },
  { title: "Listen first", text: "The job is what you need done, not what's easiest for us." },
  { title: "Hold the standard", text: "If it isn't right, we make it right." },
];

const FACT_ROWS: [string, string][] = [
  ["Founded", `${FACTS.founded}, by ${FACTS.founder}`],
  ["Ownership", "Family-owned and operated"],
  ["Team", `${FACTS.fieldCrew} field crew members and ${FACTS.officeStaff} office staff`],
  ["Languages", languagesText()],
  ["Oregon license", `CCB #${LICENSES.oregonCcb}`],
  ["Washington license", `#${LICENSES.washington}`],
  ["Service area", "Portland, OR and Vancouver, WA metro areas"],
  ["Customers", "Homeowners, HOAs and businesses"],
];

export default function AboutPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "About Us", href: "/about-us" }]} />

      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">Family-owned since {FACTS.founded}</span>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-white sm:text-5xl">About All Around Maintenance</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {FACTS.founder} founded {LEGAL_NAME} in {FACTS.founded}. More than 25 years later we&apos;re still
              family-owned, and still the crew people in Portland and Vancouver call for the roof, the gutters, the deck
              and whatever comes next.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900">Who we are</h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                We&apos;re a team of {FACTS.fieldCrew} field crew members and {FACTS.officeStaff} office staff based in the
                Portland and Vancouver area. Most of us are bilingual, and between us we can help you in {languagesText()}.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Our work covers homes, HOA communities and commercial properties, along with property preservation for
                bank-owned homes. We&apos;re licensed, bonded and insured in both Oregon and Washington, so the same crew can
                take care of you on either side of the river.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                Our work has been featured on the front page of the Business section of <em>The Columbian</em>.
              </p>
              <p className="mt-6">
                <Link href="/services" className="font-semibold text-brand hover:underline">See everything we do →</Link>
              </p>
            </div>

            <div className="rounded-2xl bg-surface p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900">At a glance</h2>
              <dl className="mt-6 divide-y divide-gray-200">
                {FACT_ROWS.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-sm font-semibold text-gray-500">{k}</dt>
                    <dd className="text-sm font-medium text-gray-900 sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-gray-900">How we work</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <CircleCheck className="h-6 w-6 text-brand" aria-hidden />
                <h3 className="mt-3 text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Let's Take a Look" text="Tell us what's going on with the house. Estimates are free, itemized and come with no obligation." />
    </main>
  );
}
