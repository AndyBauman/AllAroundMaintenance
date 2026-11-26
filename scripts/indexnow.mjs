/**
 * Submit URLs to IndexNow (Bing / Copilot / ChatGPT search).
 *
 * Usage:
 *   npm run indexnow
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs https://www.allaroundmaintenanceinc.com/about-us/
 *
 * Env:
 *   SITE_URL — production host (default https://www.allaroundmaintenanceinc.com)
 *   INDEXNOW_KEY — override key (default from src/data/indexnow-key.ts)
 *
 * Never run against a preview host; IndexNow is production-only.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadKey() {
  if (process.env.INDEXNOW_KEY?.trim()) return process.env.INDEXNOW_KEY.trim();
  const src = readFileSync(join(ROOT, "src/data/indexnow-key.ts"), "utf8");
  const match = src.match(/INDEXNOW_KEY\s*=\s*"([a-f0-9]+)"/i);
  if (!match) throw new Error("Could not read INDEXNOW_KEY from src/data/indexnow-key.ts");
  return match[1];
}

function loadSitemapPaths(siteUrl) {
  // Prefer live sitemap so we submit exactly what is published.
  return fetch(`${siteUrl}/sitemap.xml`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`sitemap.xml → ${res.status}`);
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
      if (!urls.length) throw new Error("No <loc> entries in sitemap.xml");
      return urls;
    });
}

async function main() {
  const siteUrl = (process.env.SITE_URL || "https://www.allaroundmaintenanceinc.com").replace(/\/$/, "");
  if (/vercel\.app$/i.test(new URL(siteUrl).hostname) || /preview/i.test(siteUrl)) {
    throw new Error("Refusing to submit IndexNow for a preview host. Use production SITE_URL only.");
  }

  const key = loadKey();
  const keyLocation = `${siteUrl}/${key}.txt`;
  const args = process.argv.slice(2).filter((a) => a.startsWith("http"));
  const urlList = args.length ? args : await loadSitemapPaths(siteUrl);

  const body = {
    host: new URL(siteUrl).host,
    key,
    keyLocation,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log(`IndexNow ${res.status} — ${urlList.length} URL(s)`);
  if (text) console.log(text);
  if (!res.ok && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
