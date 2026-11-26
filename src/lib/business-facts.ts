import { business } from "@/data/business";
import { LEAD_FORM_ENABLED, PHONE } from "./constants";

/**
 * Operational copy facts used in FAQs and page prose.
 * Legal identity, licenses, languages, payment and not-offered lists come from `src/data/business.ts`.
 *
 * NOT included on purpose (not yet confirmed with the owner):
 *  - "properties served" count
 *  - Angie's List award years
 *  - review count and star rating (visible HTML only, Stage 3)
 *  - written warranty terms beyond the moss guarantee
 */
export const FACTS = {
  founded: business.founded,
  founder: business.founder.name,
  languages: business.languages,
  /** Inquiries are answered the same day. */
  responseTime: "the same day",
  /** Itemized estimate turnaround. */
  estimateTurnaround: "1 business day",
  /** Typical lead time for repairs and maintenance. */
  schedulingWindow: "2 to 3 days",
  mossGuaranteeMonths: 6,
  hoaYears: 15,
  payment: business.payment,
  /** The only published prices. */
  junkRemoval: { perCubicYard: 50, minimum: 250 },
  /** Work the company does not take on. */
  notOffered: business.notOffered.map((item) => item.toLowerCase().replace(" work", "")),
} as const;

export const CREDENTIALS = "Licensed, bonded & insured";
export const CREDENTIALS_LONG = "Licensed, bonded and insured in Oregon and Washington";

export function languagesText(): string {
  const l = FACTS.languages;
  return `${l.slice(0, -1).join(", ")} and ${l[l.length - 1]}`;
}

export function estimateText(): string {
  return `Estimates are free, itemized and come with no obligation. You'll have yours within ${FACTS.estimateTurnaround}.`;
}

export function schedulingText(): string {
  return `We respond ${FACTS.responseTime}, and most repairs and maintenance are scheduled within ${FACTS.schedulingWindow}.`;
}

export function guaranteeText(): string {
  return "We stand behind our work. If something isn't right, tell us and we'll make it right.";
}

export function mossGuaranteeText(): string {
  return `If moss comes back within ${FACTS.mossGuaranteeMonths} months of treatment, we re-treat it free of charge.`;
}

export function changeOrderText(): string {
  return "If we find something unexpected on site, nothing changes in the budget or timeline until you sign off.";
}

export function paymentText(): string {
  const items = [...business.payment];
  if (items.length === 0) return "";
  if (items.length === 1) return `We accept ${items[0].toLowerCase()}s.`;
  const last = items[items.length - 1].toLowerCase();
  const head = items.slice(0, -1).map((p) => p.toLowerCase()).join(", ");
  return `We accept ${head} and ${last}.`;
}

export function junkPricingText(): string {
  const { perCubicYard, minimum } = FACTS.junkRemoval;
  return `Junk removal is $${perCubicYard} per cubic yard with a $${minimum} minimum.`;
}

export function callText(): string {
  return `Call ${PHONE}`;
}

/** How a visitor starts a job. Follows the lead-form switch so copy never mentions a form that isn't there. */
export function reachUsText(): string {
  return LEAD_FORM_ENABLED ? "Call or send the estimate form" : "Call us";
}

/** The standard customer journey, used on the home page, estimate page and HowTo schema. */
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description: `${LEAD_FORM_ENABLED ? "Call or send the estimate form" : "Call us and tell us what's going on"}. We respond ${FACTS.responseTime}.`,
  },
  {
    step: "02",
    title: "Free Itemized Estimate",
    description: `You get a written, line-by-line estimate within ${FACTS.estimateTurnaround}. No obligation.`,
  },
  {
    step: "03",
    title: "We Schedule the Work",
    description: `Most repairs and maintenance are booked within ${FACTS.schedulingWindow}. You don't need to be home.`,
  },
  {
    step: "04",
    title: "Guaranteed Work",
    description: "We finish on schedule, clean up, and make it right if anything falls short.",
  },
] as const;
