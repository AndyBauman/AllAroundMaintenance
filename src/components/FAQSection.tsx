import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs, heading }: { faqs: FAQ[]; heading?: string }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          {heading || "Frequently Asked Questions"}
        </h2>
        <div className="mt-10 divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <details key={faq.question} className="group" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="pr-4 text-base font-semibold text-gray-900 sm:text-lg">{faq.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="pb-5 leading-relaxed text-gray-700">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
