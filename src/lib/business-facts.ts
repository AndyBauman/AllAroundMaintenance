import { PHONE } from "./constants";

/**
 * Single source of truth for claims used in copy, FAQs and schema.
 * Change a fact here and every page that mentions it updates.
 *
 * NOT included on purpose (not yet confirmed with the owner):
 *  - "properties served" count
 *  - Angie's List award years
 *  - review count and star rating (env-driven in schema.ts)
 *  - written warranty terms beyond the moss guarantee
 */
export const FACTS = {
  founded: 1999,
  founder: "Alex Svistun",
  fieldCrew: 7,
  officeStaff: 2,
  languages: ["English", "Russian", "Ukrainian", "Spanish"],
  /** Inquiries are answered the same day. */
  responseTime: "the same day",
  /** Itemized estimate turnaround. */
  estimateTurnaround: "1 business day",
  /** Typical lead time for repairs and maintenance. */
  schedulingWindow: "2 to 3 days",
  mossGuaranteeMonths: 6,
  hoaYears: 15,
  payment: ["credit cards", "debit cards", "bank transfers", "checks"],
  /** The only published prices. */
  junkRemoval: { perCubicYard: 50, minimum: 250 },
  /** Work the company does not take on. */
  notOffered: ["sewer", "septic", "foundation"],
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
  return "We accept credit and debit cards, bank transfers and checks. Financing is available through our partner Hearth.";
}

export function junkPricingText(): string {
  const { perCubicYard, minimum } = FACTS.junkRemoval;
  return `Junk removal is $${perCubicYard} per cubic yard with a $${minimum} minimum.`;
}

export function callText(): string {
  return `Call ${PHONE}`;
}

/** The standard customer journey, used on the home page, estimate page and HowTo schema. */
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description: `Call or send the estimate form. We respond ${FACTS.responseTime}.`,
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
