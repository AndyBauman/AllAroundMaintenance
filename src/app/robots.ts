import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** Bots that match a named group ignore User-agent: *; every named group must repeat allow/disallow. */
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "meta-externalfetcher",
  "meta-webindexer",
] as const;

export default function robots(): MetadataRoute.Robots {
  const shared = { allow: "/", disallow: ["/api/"] as string[] };

  return {
    rules: [{ userAgent: "*", ...shared }, ...AI_BOTS.map((userAgent) => ({ userAgent, ...shared }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
