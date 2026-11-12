import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export type FAQItem = { question: string; answer: string };

/** Server-only FAQ JSON-LD so crawlers receive markup without relying on client hydration. */
export default function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;
  return <JsonLd data={faqSchema(faqs)} />;
}
