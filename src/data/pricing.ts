/**
 * Service price guides. Numbers render only when `approved` is true.
 * Junk removal is the only published price today ($50/yd³, $250 minimum).
 */
export type PriceGuide = {
  service: string;
  unit: string;
  from: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  minimum?: number | null;
  factors: string[];
  approved: boolean;
  asOf: string;
};

export const PRICING: PriceGuide[] = [
  {
    service: "junk-removal-portland",
    unit: "cubic yard",
    from: 50,
    typicalLow: 50,
    typicalHigh: null,
    minimum: 250,
    factors: ["Volume of material", "Stairs or long carry", "Items that need special disposal"],
    approved: true,
    asOf: "2026-11-26",
  },
  // Unapproved rows: structure ready for Alex; never shown as dollar amounts.
  ...[
    "roof-inspection-cleaning-repair",
    "leaky-roof-repair",
    "roof-replacement",
    "roof-installation",
    "moss-removal-portland",
    "gutter-cleaning-gutter-inspection",
    "gutter-repair-portland",
    "gutter-replacement",
    "deck-cleaning-deck-repair-deck-restoration",
    "pressure-washing-portland",
    "siding-repair-portland",
    "fence-repair-portland",
    "dry-rot-repair",
    "trims-around-houses",
    "drainage-services",
    "plumbing-leaks",
    "cabinet-repair",
    "light-fixture-replacements",
    "drywall-installation",
    "handyman-portland",
    "hoa-maintenance",
    "landscape-maintenance-portland",
    "guest-ready-home-repairs",
    "yard-cleanup",
  ].map(
    (service): PriceGuide => ({
      service,
      unit: "job",
      from: null,
      typicalLow: null,
      typicalHigh: null,
      minimum: null,
      factors: ["Scope", "Access", "Materials"],
      approved: false,
      asOf: "",
    }),
  ),
];

export function pricingFor(serviceSlug: string): PriceGuide | undefined {
  return PRICING.find((p) => p.service === serviceSlug);
}

export function approvedPricing(serviceSlug: string): PriceGuide | undefined {
  const row = pricingFor(serviceSlug);
  return row?.approved ? row : undefined;
}

/** Visible price line for cards / quick facts. */
export function pricingHeadline(serviceSlug: string, fallback: { headline: string; note: string }): { headline: string; note: string } {
  const row = approvedPricing(serviceSlug);
  if (!row || row.from == null) return fallback;
  const min = row.minimum != null ? `$${row.minimum} minimum. ` : "";
  const factors = row.factors.length ? ` Price moves with: ${row.factors.join("; ").toLowerCase()}.` : "";
  return {
    headline: `$${row.from} per ${row.unit}`,
    note: `${min}As of ${row.asOf}. You get an up-front quote after we see the job.${factors}`,
  };
}
