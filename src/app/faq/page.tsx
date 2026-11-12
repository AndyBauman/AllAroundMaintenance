import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FAQJsonLd from "@/components/FAQJsonLd";
import FAQSection from "@/components/FAQSection";
import { HOME_FAQS } from "@/lib/faqs";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Answers about All Around Maintenance: services, service areas, licensing, free estimates, scheduling, HOA plans, guarantees and payment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      <section className="bg-white pb-2 pt-6">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600">Straight answers about how we work, where we work and what to expect.</p>
        </div>
      </section>
      <FAQJsonLd faqs={HOME_FAQS} />
      <FAQSection faqs={HOME_FAQS} heading="Working With All Around Maintenance" />
      <CtaBand heading="Still Have a Question?" text="Call us or send the estimate form. We respond the same day." />
    </main>
  );
}
