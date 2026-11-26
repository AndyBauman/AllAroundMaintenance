import type { Metadata } from "next";
import { Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQJsonLd from "@/components/FAQJsonLd";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import LeadCapture from "@/components/LeadCapture";
import { pageDate } from "@/data/content-dates";
import { absoluteUrl, LEAD_FORM_ENABLED, LICENSE_LINE, PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";
import { PROCESS_STEPS, paymentText } from "@/lib/business-facts";
import { ESTIMATE_FAQS } from "@/lib/faqs";
import { webPageSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/social";

const TITLE = "Get a Free Estimate";
const DESCRIPTION =
  "Request a free, itemized, no-obligation estimate from All Around Maintenance. Same-day response. Portland: (503) 209-2023. Vancouver: (360) 772-0224.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/free-estimate" },
  ...socialMeta(TITLE, DESCRIPTION, "/free-estimate"),
};

export default function FreeEstimatePage() {
  return (
    <main className="bg-surface">
      <JsonLd
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl("/free-estimate"),
          dateModified: pageDate("/free-estimate"),
        })}
      />
      <FAQJsonLd faqs={ESTIMATE_FAQS} />
      <Breadcrumbs items={[{ label: "Free Estimate", href: "/free-estimate" }]} />

      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Get a Free Estimate</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Free, itemized and no obligation. {LEAD_FORM_ENABLED ? "Tell us" : "Call and tell us"} what&apos;s going on and
            we&apos;ll respond the same day.
          </p>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
            {/* First on phones, right column on desktop */}
            <div className="order-first lg:sticky lg:top-28 lg:order-last">
              <LeadCapture />
            </div>

            <div>
              {LEAD_FORM_ENABLED ? (
                <div className="mb-12 flex flex-col gap-3 sm:flex-row">
                  <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white transition hover:bg-brand-light">
                    <Phone className="h-5 w-5" aria-hidden />
                    Portland: {PHONE}
                  </a>
                  <a href={PHONE_WA_HREF} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand px-6 py-3.5 font-bold text-brand transition hover:bg-brand/10">
                    <Phone className="h-5 w-5" aria-hidden />
                    Vancouver: {PHONE_WA}
                  </a>
                </div>
              ) : null}

              <h2 className="font-display text-2xl font-bold text-gray-900">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">{step.step}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-1 text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-700">
                <p>{paymentText()}</p>
                <p className="mt-4 text-gray-500">{LICENSE_LINE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={ESTIMATE_FAQS} heading="Estimate FAQ" />
    </main>
  );
}
