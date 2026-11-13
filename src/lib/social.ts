import type { Metadata } from "next";
import { SITE_NAME } from "./constants";

/** Share card used on every page (1200x630, real business branding over the hero photo). */
export const SHARE_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "All Around Maintenance: roof, gutter, siding and deck repair in Portland and Vancouver",
};

/**
 * Open Graph + Twitter tags for one page. Next replaces (not merges) these objects per page,
 * so every page builds the full set here, image included.
 */
export function socialMeta(title: string, description: string, path: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_US", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}
