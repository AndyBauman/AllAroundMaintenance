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

const OVERRIDES: Record<string, string> = {
  "/": STAGE_1,
  "/about-us": STAGE_1,
  "/services": STAGE_1,
  "/free-estimate": STAGE_1,
  "/faq": BASELINE,
  "/service-areas": BASELINE,
  "/reviews": STAGE_3,
  "/projects": STAGE_3,
};

/** Normalize to `/path` without trailing slash (except home `/`). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function pageDate(path: string): string {
  return OVERRIDES[normalizePath(path)] ?? BASELINE;
}
