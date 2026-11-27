/**
 * Stage 0 / Stage 6 city-page uniqueness audit (read-only).
 *
 * Fetches each city page's HTML, extracts <main> text, replaces that city's name
 * with a token, splits into sentences, and reports the share of sentences that
 * appear on no other city page.
 *
 * Usage:
 *   node scripts/audit-uniqueness.mjs
 *   BASE_URL=https://www.allaroundmaintenanceinc.com node scripts/audit-uniqueness.mjs
 *   After `npm run build && npx next start`, use BASE_URL=http://127.0.0.1:3000
 *
 * Exit 1 when any page scores below 30% (CI gate from Stage 6).
 * Target uniqueness for rewritten cities is 50%+ (Stage 6 report).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = (process.env.BASE_URL || "https://www.allaroundmaintenanceinc.com").replace(/\/$/, "");
const THRESHOLD = 0.3;

function loadCities() {
  const src = readFileSync(join(ROOT, "src/lib/cities.ts"), "utf8");
  const cities = [];
  const re = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*state:\s*"[^"]+",\s*stateAbbr:\s*"(OR|WA)"/g;
  let match;
  while ((match = re.exec(src))) {
    cities.push({ slug: match[1], name: match[2], stateAbbr: match[3] });
  }
  if (cities.length === 0) throw new Error("No cities parsed from src/lib/cities.ts");
  return cities;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractMain(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return stripTags(match ? match[1] : html);
}

function tokenizeCity(text, cityName) {
  const escaped = cityName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(escaped, "gi"), "CITY");
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 20);
}

async function fetchMain(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return extractMain(await res.text());
}

async function main() {
  const cities = loadCities();
  const pages = [];

  for (const city of cities) {
    const path = `/${city.slug}-home-maintenance/`;
    process.stderr.write(`fetch ${path}\n`);
    const raw = await fetchMain(path);
    const tokenized = tokenizeCity(raw, city.name);
    const sents = sentences(tokenized);
    pages.push({ ...city, path, sentences: sents });
  }

  const frequency = new Map();
  for (const page of pages) {
    const unique = new Set(page.sentences);
    for (const s of unique) frequency.set(s, (frequency.get(s) || 0) + 1);
  }

  const rows = pages.map((page) => {
    const uniqueSet = new Set(page.sentences);
    const total = uniqueSet.size;
    let onlyHere = 0;
    for (const s of uniqueSet) if (frequency.get(s) === 1) onlyHere += 1;
    const share = total === 0 ? 0 : onlyHere / total;
    return { ...page, total, onlyHere, share };
  });

  rows.sort((a, b) => a.share - b.share);

  console.log(`BASE ${BASE}`);
  console.log(`Cities ${rows.length}`);
  console.log("");
  console.log("| City | State | Sentences | Unique-only | Uniqueness |");
  console.log("|---|---|---:|---:|---:|");
  for (const row of rows) {
    const pct = `${(row.share * 100).toFixed(1)}%`;
    console.log(`| ${row.name} | ${row.stateAbbr} | ${row.total} | ${row.onlyHere} | ${pct} |`);
  }

  const below = rows.filter((r) => r.share < THRESHOLD);
  console.log("");
  console.log(`Below ${THRESHOLD * 100}%: ${below.length}/${rows.length}`);
  if (below.length) {
    console.log(below.map((r) => `${r.name} (${(r.share * 100).toFixed(1)}%)`).join(", "));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
