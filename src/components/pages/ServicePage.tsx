import Link from "next/link";
import { ArrowRight, CircleCheck, Phone } from "lucide-react";
import { checkboxServicesForSlug } from "@/lib/lead";
import { DEFAULT_SERVICE_PROCESS, SERVICES, getServiceBySlug } from "@/lib/services";
import { absoluteUrl, LEAD_FORM_ENABLED, PHONE, PHONE_HREF } from "@/lib/constants";
import { serviceSchema } from "@/lib/schema";
import { serviceFaqs } from "@/lib/faqs";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import FAQJsonLd from "@/components/FAQJsonLd";
import LeadCapture from "@/components/LeadCapture";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServicePage({ serviceSlug }: { serviceSlug: string }) {
  const svc = getServiceBySlug(serviceSlug)!;
  const steps = svc.process ?? DEFAULT_SERVICE_PROCESS;
  const related = svc.related.map((s) => SERVICES.find((x) => x.slug === s)).filter((x) => x !== undefined);
  const faqs = serviceFaqs(svc);

  return (
    <main>
      <JsonLd data={serviceSchema({ name: svc.title, description: svc.metaDescription, url: absoluteUrl(`/${svc.slug}`) })} />

      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: svc.shortTitle, href: `/${svc.slug}` },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" aria-hidden />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              {svc.heroHeading}
              <br />
              <span className="text-accent">in Portland &amp; Vancouver</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">{svc.heroSubheading}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-xl transition-all hover:bg-accent-light"
              >
                Get a Free Estimate
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/20"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900">{svc.title}</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{svc.intro}</p>

              <h3 className="mt-8 text-lg font-bold text-gray-900">What&apos;s included</h3>
              <ul className="mt-4 space-y-3">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-surface p-6">
                <h3 className="text-lg font-bold text-gray-900">Pricing</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-brand">{svc.pricing.headline}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{svc.pricing.note}</p>
              </div>

              <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-brand-dark">
                  <CircleCheck className="h-5 w-5" aria-hidden />
                  {svc.callout.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{svc.callout.text}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
              <div className="mt-6 space-y-6">
                {steps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                      <p className="mt-1 leading-relaxed text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-5 rounded-2xl bg-gradient-to-br from-brand-dark to-brand p-8 text-white">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent">
                  <ServiceIcon name={svc.icon} className="h-8 w-8" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">Family-owned since 1999</p>
                  <p className="mt-1 text-sm text-white/80">
                    Licensed, bonded and insured in Oregon and Washington. Homes, HOAs and businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900">Get a Free {svc.shortTitle} Estimate</h2>
              <p className="mt-4 text-lg text-gray-600">
                {LEAD_FORM_ENABLED ? "Tell us" : "Call and tell us"} about the project. We respond the same day and send an itemized
                estimate within 1 business day.
              </p>
              {related.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-gray-900">Related Services</h3>
                  <div className="mt-4 space-y-2">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/${r.slug}`} className="flex items-center gap-2 font-medium text-brand hover:underline">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                        {r.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <LeadCapture compact defaultServices={checkboxServicesForSlug(svc.slug)} />
          </div>
        </div>
      </section>

      {/* Shared questions repeat across pages, so only this service's own are marked up. */}
      <FAQJsonLd faqs={svc.faqs} />
      <FAQSection faqs={faqs} heading={`${svc.shortTitle} FAQ`} />
    </main>
  );
}
