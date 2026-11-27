import { FACTS, estimateText, guaranteeText, mossGuaranteeText, schedulingText } from "@/lib/business-facts";
import { LICENSE_LINE, PHONE } from "@/lib/constants";
import type { ServiceData } from "@/lib/services";
import { approvedPricing } from "@/data/pricing";

export type DecisionTable = {
  title: string;
  columns: [string, string];
  rows: { label: string; a: string; b: string }[];
  note?: string;
};

/** Direct answer under the H1 — must stand alone with service name + Portland and Vancouver. */
export function answerBlock(svc: ServiceData): string {
  const overrides: Record<string, string> = {
    "roof-inspection-cleaning-repair":
      "Roof repair and free roof inspections from All Around Maintenance help homeowners in Portland and Vancouver find leaks, storm damage and early moss before the rainy season. An inspection covers the roof exterior and attic side and comes with a photo report; repairs are itemized before we start. Call (503) 209-2023 or request a free estimate to book.",
    "leaky-roof-repair":
      "Leaky roof repair from All Around Maintenance stops active water for homes and businesses in Portland and Vancouver. We trace the leak from the attic and roof surface, apply a temporary fix when needed, then give a written plan for the permanent repair. Call (503) 209-2023 as soon as you see water.",
    "roof-replacement":
      "Roof replacement from All Around Maintenance is for Portland and Vancouver homes where a repair will not last. We inspect first, explain repair versus replace in plain language, and only re-roof when that is the better long-term option. Call (503) 209-2023 for a free inspection and written estimate.",
    "moss-removal-portland":
      "Roof moss removal from All Around Maintenance is hand work for Portland and Vancouver roofs — we never pressure-wash shingles. We remove the moss, clean the roof and gutters, and treat the roots, with a free re-treat if moss returns within six months. Call (503) 209-2023 to schedule.",
    "gutter-cleaning-gutter-inspection":
      "Gutter cleaning from All Around Maintenance clears and flushes gutters for homes in Portland and Vancouver so water leaves the roof edge instead of soaking the fascia. The visit includes an inspection of hangers, seams and downspouts, then a free itemized estimate for any repairs. Call (503) 209-2023 to book.",
    "junk-removal-portland":
      "Junk removal from All Around Maintenance hauls household junk, appliances and debris for customers in Portland and Vancouver at $50 per cubic yard with a $250 minimum. We quote up front after seeing the load, then load, haul and sweep up — same-day or next-day when the schedule allows. Call (503) 209-2023 to book.",
  };

  if (overrides[svc.slug]) return overrides[svc.slug];

  const includeHint = svc.includes[0] ? svc.includes[0].replace(/\.$/, "") : "the work listed on this page";
  return `${svc.shortTitle} from All Around Maintenance serves homeowners, HOAs and businesses in Portland and Vancouver. ${svc.intro} Typical scope includes ${includeHint.toLowerCase()}, and more. ${schedulingText()} Call ${PHONE} or request a free estimate to book.`;
}

export type QuickFact = { label: string; value: string };

export function quickFacts(svc: ServiceData): QuickFact[] {
  const price = approvedPricing(svc.slug);
  const rows: QuickFact[] = [
    { label: "Service area", value: "Portland, OR and Vancouver, WA metro areas" },
    { label: "What's included", value: svc.includes.slice(0, 3).join("; ") },
    {
      label: "Price guide",
      value: price
        ? `$${price.from} per ${price.unit}${price.minimum != null ? `, $${price.minimum} minimum` : ""} (as of ${price.asOf})`
        : "Free itemized estimate — pricing depends on the job",
    },
    { label: "Availability", value: `We respond ${FACTS.responseTime}. ${schedulingText()}` },
    { label: "License", value: LICENSE_LINE },
  ];

  if (svc.slug === "moss-removal-portland") {
    rows.splice(3, 0, { label: "Guarantee", value: mossGuaranteeText() });
  } else if (!["junk-removal-portland", "yard-cleanup", "landscape-maintenance-portland", "pressure-washing-portland"].includes(svc.slug)) {
    rows.splice(3, 0, { label: "Guarantee", value: guaranteeText() });
  }

  // Typical time on site stays hidden until the owner supplies values (see NEEDS-OWNER-INPUT).
  return rows.filter((r) => Boolean(r.value.trim()));
}

const DECISIONS: Record<string, DecisionTable> = {
  "leaky-roof-repair": {
    title: "Repair or replace the roof?",
    columns: ["Repair", "Replace"],
    rows: [
      { label: "When we recommend it", a: "Leak is local; most of the roof is sound", b: "Widespread failure; a repair will not last" },
      { label: "What you get", a: "Trace the leak, stop the water, lasting patch", b: "Full re-roof after an honest inspection" },
      { label: "Our default", a: "Repair first whenever it will hold", b: "Only when inspection shows repair is not enough" },
    ],
    note: "We recommend replacement only when the inspection shows a repair will not last.",
  },
  "roof-replacement": {
    title: "Repair or replace the roof?",
    columns: ["Repair", "Replace"],
    rows: [
      { label: "When we recommend it", a: "Damage is limited and the rest of the roof is sound", b: "Age, sagging, or widespread failure" },
      { label: "Cost approach", a: "Itemized repair estimate", b: "Project quote after inspection" },
      { label: "Our default", a: "Prefer repair when it will last", b: "Re-roof only when repair is the worse long-term option" },
    ],
  },
  "gutter-cleaning-gutter-inspection": {
    title: "Gutter cleaning or gutter guards?",
    columns: ["Cleaning", "Guards"],
    rows: [
      { label: "Best for", a: "Most homes; fir needles and seasonal debris", b: "Homes that clog constantly between cleanings" },
      { label: "What we do first", a: "Clear, flush and inspect hangers and seams", b: "Confirm the gutters are sound before any guard talk" },
      { label: "Our default", a: "Start with a thorough cleaning and inspection", b: "Discuss only after we see how your gutters behave" },
    ],
    note: "Guard products and pricing need owner approval before we publish a recommendation table with dollars.",
  },
  "gutter-repair-portland": {
    title: "Gutter repair or replacement?",
    columns: ["Repair", "Replace"],
    rows: [
      { label: "When we recommend it", a: "Loose hangers, seam leaks, short damaged runs", b: "Rusted-through pans, chronic pitch problems, failed system" },
      { label: "What you get", a: "Targeted fixes after cleaning and inspection", b: "New gutters sized and pitched for the house" },
      { label: "Our default", a: "Repair what will hold", b: "Replace when repair will not stop the leaks" },
    ],
  },
  "gutter-replacement": {
    title: "Gutter repair or replacement?",
    columns: ["Repair", "Replace"],
    rows: [
      { label: "When we recommend it", a: "Isolated damage on an otherwise sound system", b: "System-wide failure or wrong pitch/size" },
      { label: "Our default", a: "Repair first when it will last", b: "Full replacement when the inspection says repair is wasted money" },
    ],
  },
  "deck-cleaning-deck-repair-deck-restoration": {
    title: "Clean, repair, or restore the deck?",
    columns: ["Clean / refinish", "Structural repair"],
    rows: [
      { label: "When we recommend it", a: "Boards are sound; finish is worn or dirty", b: "Rot, soft spots, failed railings or framing" },
      { label: "What happens first", a: "Free in-person assessment", b: "Same assessment — we show you what is structural" },
      { label: "Our default", a: "Clean and refinish when the structure is solid", b: "Repair structure before any cosmetic work" },
    ],
  },
  "siding-repair-portland": {
    title: "Siding repair or larger replacement?",
    columns: ["Repair", "Larger scope"],
    rows: [
      { label: "When we recommend it", a: "Localized damage, failed caulk, small dry-rot patches", b: "Widespread rot or failed walls behind the siding" },
      { label: "Our default", a: "Patch and match when the rest of the wall is sound", b: "Open up only as far as the damage requires — we explain before we cut" },
    ],
  },
  "pressure-washing-portland": {
    title: "Pressure wash or soft wash?",
    columns: ["Pressure wash", "Soft wash / gentler method"],
    rows: [
      { label: "Typical use", a: "Concrete, driveways, tough grime on hard surfaces", b: "Siding, painted surfaces, and anywhere high pressure can scar" },
      { label: "Our default", a: "Match the method to the surface", b: "We will not blast soft materials — ask us which method fits your job" },
    ],
    note: "Exact soft-wash chemical products are not listed until the owner confirms what the crew uses.",
  },
};

export function decisionTable(serviceSlug: string): DecisionTable | undefined {
  return DECISIONS[serviceSlug];
}

export { estimateText };
