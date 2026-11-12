import Link from "next/link";
import {
  BadgeCheck, CalendarCheck, Check, ClipboardList, CreditCard, FileText, Gift, MessageSquare,
  Search, ShieldCheck, Sparkles, type LucideIcon,
} from "lucide-react";
import { ESTIMATE_PATH, LICENSE_LINE } from "@/lib/constants";
import { FACTS, changeOrderText, guaranteeText, mossGuaranteeText } from "@/lib/business-facts";

/** The right-hand tag states a fact, never an invented dollar value. */
const VALUE_ITEMS: { icon: LucideIcon; title: string; description: string; tag: string; isBonus?: boolean }[] = [
  { icon: FileText, title: "Free Itemized Estimate", description: "Every line of the job priced in writing before you decide anything.", tag: "Free" },
  { icon: Search, title: "Free Roof & Attic Inspection", description: "Comes with an itemized report and photos of what we found.", tag: "Free" },
  { icon: MessageSquare, title: "Same-Day Response", description: "Call or send the form and you'll hear back the same day.", tag: "Same day" },
  { icon: CalendarCheck, title: "Fast Scheduling", description: `Estimate within ${FACTS.estimateTurnaround}. Most work booked within ${FACTS.schedulingWindow}.`, tag: FACTS.schedulingWindow },
  { icon: ClipboardList, title: "No Surprise Changes", description: changeOrderText(), tag: "Your approval" },
  { icon: BadgeCheck, title: "Licensed, Bonded & Insured", description: LICENSE_LINE, tag: "OR + WA" },
  { icon: Sparkles, title: "Clean-Up Included", description: "We leave the property as clean as we found it.", tag: "Included" },
  { icon: Gift, title: "6-Month Moss Guarantee", description: mossGuaranteeText(), tag: `${FACTS.mossGuaranteeMonths} months`, isBonus: true },
  { icon: CreditCard, title: "Financing Available", description: "Check your options through Hearth in under two minutes, with no impact on your credit score.", tag: "Hearth", isBonus: true },
];

export default function OfferStack() {
  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Here&apos;s Everything You Get</h2>
          <p className="mt-4 text-lg text-gray-300">Clear pricing, clear timing and a crew that stands behind the work.</p>
        </div>

        <div className="space-y-4">
          {VALUE_ITEMS.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 rounded-lg border p-4 ${
                item.isBonus ? "border-accent/50 bg-accent/15" : "border-gray-700 bg-gray-800/50"
              }`}
            >
              <div className={`rounded-lg p-3 ${item.isBonus ? "bg-accent/25" : "bg-brand-light/25"}`}>
                <item.icon className={`h-6 w-6 ${item.isBonus ? "text-accent" : "text-sky-300"}`} aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {item.isBonus && <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-black">BONUS</span>}
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <Check className="h-5 w-5 text-sky-300" aria-hidden />
                <span
                  className={`whitespace-nowrap rounded px-2 py-1 text-sm font-medium ${
                    item.isBonus ? "bg-accent/20 text-accent-light" : "bg-brand-light/25 text-sky-200"
                  }`}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={ESTIMATE_PATH}
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-black transition-colors hover:bg-accent-light"
          >
            Get My Free Estimate
          </Link>
        </div>

        <div className="mt-12 rounded-lg border-2 border-accent/50 bg-accent/10 p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-12 w-12 shrink-0 text-accent" aria-hidden />
            <div>
              <h3 className="text-xl font-bold text-accent">Quality Guaranteed</h3>
              <p className="mt-2 text-gray-300">{guaranteeText()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
