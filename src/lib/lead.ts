import { z } from "zod";
import { detectSpam } from "@/lib/spam-guard";

/** How the visitor found the company. Referral reveals a name-or-code field. */
export const HEARD_OPTIONS = ["Google", "Facebook", "Referral", "Word of Mouth Referral", "Other"] as const;
export const REFERRAL_HEARD = "Referral";

export const QUOTE_SERVICES = [
  "HOA Services",
  "Roof Repair",
  "Roof Cleaning",
  "Roof Installation",
  "Gutter Repair",
  "Gutter Replacement",
  "Gutter Cleaning",
  "Deck Repair or Restoration",
  "Deck Cleaning",
  "Landscaping",
  "Siding",
  "Pressure Washing",
  "Fence Repair or Maintenance",
  "Drywall Repair or Installation",
  "Dry Rot Repair",
  "Other",
] as const;

/** Oregon and Washington first, then the other states by name. */
export const US_STATES: ReadonlyArray<readonly [string, string]> = [
  ["OR", "Oregon"],
  ["WA", "Washington"],
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
];

const HEARD = new Set<string>(HEARD_OPTIONS);
const SERVICES = new Set<string>(QUOTE_SERVICES);
const STATE_ABBRS = new Set(US_STATES.map(([abbr]) => abbr));

const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
export type AttrKey = (typeof ATTR_KEYS)[number];

const ATTR_STORAGE_KEY = "aam_quote_attribution";

/** Previous dropdown labels, mapped onto the checkbox list. */
const LEGACY_SERVICE: Record<string, readonly string[]> = {
  "Roof Repair or Inspection": ["Roof Repair"],
  "Roof Cleaning / Moss Removal": ["Roof Cleaning"],
  "Roof Replacement or Installation": ["Roof Installation"],
  "Gutter Cleaning": ["Gutter Cleaning"],
  "Gutter Repair or Replacement": ["Gutter Repair", "Gutter Replacement"],
  "Deck Cleaning, Repair or Restoration": ["Deck Repair or Restoration", "Deck Cleaning"],
  "Pressure Washing": ["Pressure Washing"],
  Siding: ["Siding"],
  "Fence Repair or Staining": ["Fence Repair or Maintenance"],
  "Dry Rot Repair": ["Dry Rot Repair"],
  Drywall: ["Drywall Repair or Installation"],
  "Landscaping or Yard Cleanup": ["Landscaping"],
  "HOA Services": ["HOA Services"],
};

const SLUG_SERVICE: Record<string, readonly string[]> = {
  "roof-inspection-cleaning-repair": ["Roof Repair", "Roof Cleaning"],
  "leaky-roof-repair": ["Roof Repair"],
  "roof-replacement": ["Roof Installation"],
  "roof-installation": ["Roof Installation"],
  "moss-removal-portland": ["Roof Cleaning"],
  "gutter-cleaning-gutter-inspection": ["Gutter Cleaning"],
  "gutter-repair-portland": ["Gutter Repair"],
  "gutter-replacement": ["Gutter Replacement"],
  "deck-cleaning-deck-repair-deck-restoration": ["Deck Repair or Restoration", "Deck Cleaning"],
  "pressure-washing-portland": ["Pressure Washing"],
  "siding-repair-portland": ["Siding"],
  "fence-repair-portland": ["Fence Repair or Maintenance"],
  "dry-rot-repair": ["Dry Rot Repair"],
  "drywall-installation": ["Drywall Repair or Installation"],
  "hoa-maintenance": ["HOA Services"],
  "landscape-maintenance-portland": ["Landscaping"],
  "yard-cleanup": ["Landscaping"],
};

function knownServices(labels: readonly string[] | undefined): string[] | undefined {
  if (!labels) return undefined;
  const matched = labels.filter((label) => SERVICES.has(label));
  return matched.length > 0 ? matched : undefined;
}

export function checkboxServicesFor(label?: string): string[] | undefined {
  if (!label) return undefined;
  if (SERVICES.has(label)) return [label];
  return knownServices(LEGACY_SERVICE[label]);
}

export function checkboxServicesForSlug(slug: string): string[] | undefined {
  return knownServices(SLUG_SERVICE[slug]);
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(max: number, tooLong: string) {
  return z.preprocess(asText, z.string().max(max, tooLong).transform((value) => value || null));
}

export const quoteLeadSchema = z.object({
  name: z.preprocess(asText, z.string().min(1, "Enter your name.").max(120, "Name is too long.")),
  email: z.preprocess(
    asText,
    z.string().min(1, "Enter your email address.").max(160, "Email is too long.").email("Enter a valid email address."),
  ),
  phone: z.preprocess(
    asText,
    z.string().refine((value) => value.replace(/\D/g, "").length === 10, "Enter a 10-digit phone number."),
  ),
  heard_from: z.preprocess(asText, z.string().refine((value) => HEARD.has(value), "Select how you heard about us.")),
  referral: optionalText(200, "Keep this to 200 characters."),
  heard_detail: optionalText(200, "Keep this to 200 characters."),
  services: z.preprocess(
    (value) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []),
    z.array(z.string()).transform((items) => {
      const unique: string[] = [];
      for (const item of items) {
        if (SERVICES.has(item) && !unique.includes(item)) unique.push(item);
      }
      return unique;
    }),
  ),
  street: optionalText(200, "Street is too long."),
  city: optionalText(80, "City is too long."),
  state: z.preprocess(
    asText,
    z
      .string()
      .refine((value) => value === "" || STATE_ABBRS.has(value), "Choose a state.")
      .transform((value) => value || null),
  ),
  zip: z.preprocess(
    asText,
    z
      .string()
      .refine((value) => value === "" || /^\d{5}(?:-\d{4})?$/.test(value), "Enter a 5-digit ZIP code.")
      .transform((value) => value || null),
  ),
  message: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : ""),
    z.string().min(1, "Tell us how we can help.").max(2000, "Keep this to 2000 characters."),
  ),
  page_url: optionalText(500, "Page address is too long."),
  referrer: optionalText(500, "Referrer is too long."),
  utm_source: optionalText(200, "utm_source is too long."),
  utm_medium: optionalText(200, "utm_medium is too long."),
  utm_campaign: optionalText(200, "utm_campaign is too long."),
  utm_term: optionalText(200, "utm_term is too long."),
  utm_content: optionalText(200, "utm_content is too long."),
  gclid: optionalText(200, "gclid is too long."),
  fbclid: optionalText(200, "fbclid is too long."),
  company_website: z.preprocess(asText, z.string().max(200)),
  rendered_at: z.preprocess((value) => {
    const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
    return Number.isFinite(number) ? number : null;
  }, z.number().nullable()),
}).superRefine((value, ctx) => {
  if (value.heard_from === REFERRAL_HEARD && !value.referral) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["referral"], message: "Enter the referral or referral code." });
  }
}).transform(({ referral, heard_detail, ...lead }) => ({
  ...lead,
  heard_detail:
    lead.heard_from === REFERRAL_HEARD
      ? [referral, heard_detail].filter(Boolean).join(" — ") || null
      : heard_detail,
}));

export type QuoteLead = z.infer<typeof quoteLeadSchema>;

export const LEAD_FIELDS = ["name", "email", "phone", "heard_from", "referral", "heard_detail", "street", "city", "state", "zip", "message"] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];

export function leadFieldErrors(error: z.ZodError): Partial<Record<LeadField, string>> {
  const allowed = new Set<string>(LEAD_FIELDS);
  const out: Partial<Record<LeadField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && allowed.has(key) && !out[key as LeadField]) out[key as LeadField] = issue.message;
  }
  return out;
}

/** Bots get a normal success and nothing is stored. */
export function spamReason(
  input: { honeypot?: string | null; renderedAt?: number | null; name?: string | null; message?: string | null },
  now = Date.now(),
): string | null {
  if (input.honeypot?.trim()) return "honeypot";
  if (typeof input.renderedAt !== "number" || !Number.isFinite(input.renderedAt)) return "no_timestamp";
  const elapsed = now - input.renderedAt;
  if (elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS) return "timing";
  return detectSpam({ name: input.name, message: input.message, honeypot: "", elapsedMs: elapsed });
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const stored = readAttribution();
    const next: Partial<Record<AttrKey, string>> = { ...stored };
    let changed = false;
    for (const key of ATTR_KEYS) {
      if (next[key]) continue;
      const value = params.get(key)?.trim();
      if (!value) continue;
      next[key] = value.slice(0, 200);
      changed = true;
    }
    if (changed) sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* Private browsing can throw. The form still submits. */
  }
}

export function readAttribution(): Partial<Record<AttrKey, string>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ATTR_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const record = parsed as Record<string, unknown>;
    const out: Partial<Record<AttrKey, string>> = {};
    for (const key of ATTR_KEYS) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) out[key] = value.trim().slice(0, 200);
    }
    return out;
  } catch {
    return {};
  }
}
