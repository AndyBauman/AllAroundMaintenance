import Image from "next/image";
import { CircleCheck, Compass, Phone } from "lucide-react";
import { hasPublicFile } from "@/lib/assets";
import { PHONE, PHONE_HREF } from "@/lib/constants";
import { CREDENTIALS_LONG, FACTS, changeOrderText, languagesText } from "@/lib/business-facts";

/** Every tile is a published fact. No job counts or review totals until the owner confirms them. */
const STATS = [
  { stat: String(FACTS.founded), label: "Family-Owned Since" },
  { stat: "OR + WA", label: "Licensed" },
  { stat: "1 Day", label: "Estimate Turnaround" },
  { stat: String(FACTS.languages.length), label: "Languages Spoken" },
];

const FEATURES = [
  CREDENTIALS_LONG,
  "Free, itemized, no-obligation estimates",
  `Same-day response, most work scheduled within ${FACTS.schedulingWindow}`,
  changeOrderText(),
  "Materials matched to your home, or labor only if you prefer",
  `We speak ${languagesText()}`,
];

export default function WhyChooseUs() {
  const hasPhoto = hasPublicFile("why-us.jpg");

  return (
    <section id="why-us" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand shadow-2xl">
              {hasPhoto ? (
                <Image
                  src="/why-us.jpg"
                  alt="The All Around Maintenance crew"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={60}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-8 pb-10 text-center text-white">
                  <Compass className="h-14 w-14 text-accent" strokeWidth={1.25} aria-hidden />
                  <p className="mt-4 font-display text-3xl font-bold">Family-owned since {FACTS.founded}</p>
                  <p className="mt-2 max-w-xs text-white/80">
                    Founded by {FACTS.founder}. {FACTS.fieldCrew} field crew and {FACTS.officeStaff} office staff.
                  </p>
                </div>
              )}
            </div>
            <div className="absolute -bottom-8 left-4 right-4 grid grid-cols-4 gap-2 sm:left-8 sm:right-8 sm:gap-4">
              {STATS.map((r) => (
                <div key={r.label} className="rounded-xl bg-white p-3 text-center shadow-lg sm:p-4">
                  <div className="font-display text-lg font-bold text-brand sm:text-xl">{r.stat}</div>
                  <div className="mt-1 text-xs font-medium text-gray-800">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 lg:pt-0">
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              Why All Around Maintenance
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              One Crew for the Whole Property
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Most homes need a roofer, a gutter company, a deck contractor and a handyman. We&apos;re all four, which
              means one phone call, one estimate and one team that already knows your house.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-3 rounded-xl bg-brand px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-brand-light hover:shadow-xl"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
