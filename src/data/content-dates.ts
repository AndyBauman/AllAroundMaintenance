/**
 * Per-page content dates for sitemap lastmod and WebPage dateModified.
 * Update a path's date when that page's copy or media changes — not on every deploy.
 * Stage 3 will also stamp dates on service/city data rows; this map remains the override.
 */
import { business } from "@/data/business";

/** Baseline from the Nov 13 performance/SEO cutover. */
const BASELINE = "2026-11-13";

/** Paths touched in Stage 1 (facts / schema / footer / about). */
const STAGE_1 = business.contentUpdated;

const STAGE_3 = "2026-11-26";
const STAGE_4 = "2026-11-26";
const STAGE_5 = "2026-11-26";

const OVERRIDES: Record<string, string> = {
  "/": STAGE_1,
  "/about-us": STAGE_1,
  "/services": STAGE_1,
  "/free-estimate": STAGE_1,
  "/faq": BASELINE,
  "/service-areas": BASELINE,
  "/reviews": STAGE_3,
  "/projects": STAGE_3,
  "/guides": STAGE_5,
};

/** Service pages refreshed in Stage 4 (answer blocks / pricing / FAQs). */
for (const slug of [
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
  "junk-removal-portland",
  "guest-ready-home-repairs",
  "yard-cleanup",
]) {
  OVERRIDES[`/${slug}`] = STAGE_4;
}

/** Restored guide slugs (Stage 5). */
for (const slug of [
  "8-roof-and-gutter-maintenance-tasks-for-winter",
  "cleaning-maintaining-decks",
  "dangers-clogged-gutters",
  "decks-and-fencing",
  "dry-rot-siding-trim",
  "essential-services-for-homeowners",
  "get-ready-for-summer-entertaining",
  "home-maintenance-tasks-never-do-yourself",
  "how-to-find-a-handyman",
  "new-homeowners-guide-to-gutter-maintenance",
  "professional-dry-rot-repair-smart-investment",
  "questions-to-ask-your-gutter-cleaners",
  "roof-gutter-cleaning-mistakes",
  "roof-maintenance-tips",
  "signs-trust-handyman",
  "tips-well-maintained-home",
  "what-to-do-if-roof-is-leaking",
  "why-is-moss-so-bad-for-your-roof",
  "year-round-home-maintenance",
]) {
  OVERRIDES[`/${slug}`] = STAGE_5;
}

/** Normalize to `/path` without trailing slash (except home `/`). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function pageDate(path: string): string {
  return OVERRIDES[normalizePath(path)] ?? BASELINE;
}
