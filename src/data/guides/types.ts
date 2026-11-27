/**
 * Guide content model (Stage 5).
 * Only guides with reviewed: true are built, indexed, and listed on /guides/.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "table"; headers: [string, string]; rows: [string, string][]; note?: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  /** Original publish date when known; omit when unknown. */
  published?: string;
  updated: string;
  reviewedBy: string;
  relatedService: string;
  draft: boolean;
  reviewed: boolean;
  /** Direct answer, ~40–60 words. */
  answer: string;
  northwestHeading: string;
  northwest: string;
  body: GuideBlock[];
  /** Factual claims that still need Alex to confirm before treating as settled. */
  needsOwner?: string[];
  image?: { src: string; alt: string };
};
