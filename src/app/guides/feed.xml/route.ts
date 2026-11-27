import { publishedGuides } from "@/data/guides";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const guides = publishedGuides().slice().sort((a, b) => b.updated.localeCompare(a.updated));
  const items = guides
    .map((g) => {
      const link = absoluteUrl(`/${g.slug}`);
      const pub = g.published ?? g.updated;
      return `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(g.description)}</description>
      <pubDate>${new Date(pub + "T12:00:00Z").toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} Guides</title>
    <link>${SITE_URL}/guides/</link>
    <description>Home maintenance guides for Portland, OR and Vancouver, WA.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
