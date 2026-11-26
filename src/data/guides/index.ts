import { DRAFT_GUIDES } from "./drafts";
import { RESTORED_GUIDES } from "./restored";
import type { Guide } from "./types";

export type { Guide, GuideBlock } from "./types";

export const ALL_GUIDES: Guide[] = [...RESTORED_GUIDES, ...DRAFT_GUIDES];

/** Built, indexed, linked — reviewed: true only. */
export function publishedGuides(): Guide[] {
  return ALL_GUIDES.filter((g) => g.reviewed);
}

export function getGuide(slug: string): Guide | undefined {
  return publishedGuides().find((g) => g.slug === slug);
}

export function guidesForService(serviceSlug: string): Guide[] {
  return publishedGuides().filter((g) => g.relatedService === serviceSlug);
}

export function draftGuidesNeedingOwner(): Guide[] {
  return ALL_GUIDES.filter((g) => g.draft || !g.reviewed);
}
