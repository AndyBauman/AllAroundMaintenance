import type { Metadata } from "next";
import Link from "next/link";
import AudienceBands from "@/components/AudienceBands";
import Contact from "@/components/Contact";
import FAQJsonLd from "@/components/FAQJsonLd";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import OfferStack from "@/components/OfferStack";
import Process from "@/components/Process";
import ServiceAreas from "@/components/ServiceAreas";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import { pageDate } from "@/data/content-dates";
import { cityPath } from "@/lib/cities";
import { absoluteUrl } from "@/lib/constants";
import { HOME_FAQS } from "@/lib/faqs";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HOME_PAGE_FAQS = HOME_FAQS.slice(0, 10);

export default function Home() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }]),
          webPageSchema({
            name: "Roof, Gutter, Siding & Deck Repair Portland & Vancouver",
            description:
              "Family-owned since 1999. Roof, gutter, siding and deck repair plus home maintenance in Portland, OR & Vancouver, WA.",
            url: absoluteUrl("/"),
            dateModified: pageDate("/"),
          }),
          serviceSchema({
            name: "Home Maintenance and Repair",
            description:
              "Roof repair and moss removal, gutter cleaning and repair, deck restoration and full home maintenance in Portland, OR and Vancouver, WA.",
            url: absoluteUrl("/"),
          }),
        ]}
      />

      {/* Seasonal strip. Edit or remove as the season changes. */}
      <div className="bg-accent">
        <p className="mx-auto max-w-7xl px-4 py-2.5 text-center text-sm font-medium text-gray-950 sm:px-6 lg:px-8">
          Rainy season is here. Get a free roof inspection with a photo report before the next storm.{" "}
          <Link href="/roof-inspection-cleaning-repair" className="font-bold underline underline-offset-2">
            Claim yours
          </Link>
        </p>
      </div>

      <Hero />
      <Services />

      <section className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            Popular service areas:{" "}
            <Link href={cityPath("portland")} className="font-semibold text-brand hover:underline">Portland</Link>
            ,{" "}
            <Link href={cityPath("vancouver")} className="font-semibold text-brand hover:underline">Vancouver WA</Link>
            ,{" "}
            <Link href={cityPath("beaverton")} className="font-semibold text-brand hover:underline">Beaverton</Link>
            ,{" "}
            <Link href={cityPath("camas")} className="font-semibold text-brand hover:underline">Camas</Link>
            {" · "}
            <Link href="/services" className="font-semibold text-brand hover:underline">All services</Link>
            {" · "}
            <Link href="/service-areas" className="font-semibold text-brand hover:underline">All cities</Link>
          </p>
        </div>
      </section>

      <WhyChooseUs />
      <Process />
      <OfferStack />
      <AudienceBands />
      <ServiceAreas />
      <FAQJsonLd faqs={HOME_PAGE_FAQS} />
      <FAQSection faqs={HOME_PAGE_FAQS} heading="Home Maintenance FAQ: Portland & Vancouver" />
      <Contact />
    </main>
  );
}
