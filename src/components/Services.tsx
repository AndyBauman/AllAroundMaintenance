import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import type { ServiceIconName } from "@/lib/services";

const HOME_SERVICES: { icon: ServiceIconName; title: string; description: string; href: string }[] = [
  {
    icon: "roof",
    title: "Roofs",
    description: "Free inspections with a photo report, leak and storm repair, moss removal by hand, and replacement when a repair won't last.",
    href: "/roof-inspection-cleaning-repair",
  },
  {
    icon: "gutter",
    title: "Gutters",
    description: "Cleaning, downspout flushing, repair and replacement, so water runs away from the house instead of into it.",
    href: "/gutter-cleaning-gutter-inspection",
  },
  {
    icon: "deck",
    title: "Decks",
    description: "Cleaning, board and railing repair, sanding and staining. Our power wash and stain package does it all in one visit.",
    href: "/deck-cleaning-deck-repair-deck-restoration",
  },
  {
    icon: "spray",
    title: "Pressure Washing",
    description: "Siding, patios, driveways and walkways cleaned with commercial equipment, with soft washing for delicate surfaces.",
    href: "/pressure-washing-portland",
  },
  {
    icon: "hammer",
    title: "Handyman & Repairs",
    description: "Siding, fences, dry rot, drywall, doors, cabinets and small plumbing. Hand us the list and we'll fix it all at once.",
    href: "/handyman-portland",
  },
  {
    icon: "hoa",
    title: "HOA Maintenance",
    description: "Custom maintenance plans and on-demand repairs for condos, townhomes, apartments and subdivisions.",
    href: "/hoa-maintenance",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">What We Do</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Roofs, gutters and decks are our specialty. The same crew handles the rest of the property too.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-brand/20 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-500">{service.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-12 text-center">
          <Link href="/services" className="text-base font-semibold text-brand hover:underline">
            View all 25 home maintenance services →
          </Link>
        </p>
      </div>
    </section>
  );
}
