# All Around Maintenance: SEO / GEO / AEO build-out (Cursor prompt)

**Date:** 2026-11-26
**Repo:** `aam-site` (`C:\Websites\All-Around-Maintenance\site`), live at www.allaroundmaintenanceinc.com, Vercel project `all-around-maintenance`
**Goal:** be the business that Google, Bing, Brave and the AI assistants built on them (ChatGPT, Gemini, Claude, Grok, Meta AI, Copilot, Perplexity) can find, verify and recommend when someone asks who can repair, fix, maintain or clean something near Portland or Vancouver.

**How to use:** save this file in the repo as `docs/AAM-SEO-GEO-AEO.md`, then paste this into Cursor chat:

> Read `docs/AAM-SEO-GEO-AEO.md` fully. Do Stage 0 only, report, and wait for my OK. After that, one stage at a time, each on its own feature branch with a Vercel preview, stopping after each stage for my review. Never break the rules in section 0.

---

## 0. Rules (never break)

1. **Branches.** One feature branch per stage (`seo/01-facts-schema`, `seo/02-crawl`, ...). Never push to `main`. No DNS changes, no Vercel project or firewall changes, no env var changes without my OK. No secrets in Git.
2. **URLs.** Do not rename, remove or re-canonical any existing URL. Keep trailing slashes. Only touch redirects where this doc says so.
3. **Content rules.** Never put the name "Andy" on any page. Never mention financing. Never state crew or staff headcount. Phones: (503) 209-2023 Portland, (360) 772-0224 Vancouver. Licenses: OR CCB #202731, WA #ALLARAM926JB. Founded 1999 by Alex Svistun. Languages: English, Russian, Ukrainian, Spanish. Not offered: sewer, septic, foundation work.
4. **No invented facts.** No made-up reviews, ratings, prices, addresses, hours, ZIP codes, statistics, awards, neighborhoods or job details. If a fact is not in the repo or in this doc, add it to `docs/NEEDS-OWNER-INPUT.md` and make the component render nothing until the value exists. Never ship placeholder text.
5. **No rating markup.** Do not add `AggregateRating` or `Review` JSON-LD for the business. The reviews live on Google, and marking up third-party or self-serving ratings on a LocalBusiness goes against Google's review-snippet rules. Ratings and reviews go in visible HTML with the source and an "as of" date.
6. **Performance budget.** Lighthouse mobile performance 95 or higher and CLS 0 on home, one service page and one city page. Tag Manager deferral stays as is. No new third-party scripts. All new images through `next/image` with width and height.
7. **Every new page** gets: unique title (60 characters or fewer), meta description (160 or fewer), one H1, canonical, `socialMeta()`, breadcrumb JSON-LD, an entry in the sitemap and llms.txt generators, and links from at least two existing pages.
8. **Before each report:** `npm run build` plus the existing audit/parity checks. Report what changed, what you verified, and what is waiting on owner input.

---

## 1. Where the site stands (audit of the live site, Nov 26)

**Already solid. Do not redo.**

| Item | State |
|---|---|
| Rendering | Next.js prerendered HTML, all content readable without JavaScript |
| Speed | 98 mobile on PageSpeed after the Nov 13 pass |
| Indexing basics | 71 URLs in `sitemap.xml`, self-canonicals, `index, follow`, OG and Twitter cards on every page |
| `robots.txt` | Allows everything except `/api/`. No AI crawler is blocked |
| `llms.txt` | Present, lists all services and areas |
| JSON-LD | Organization (`HomeAndConstructionBusiness` + `GeneralContractor`) with 25-service catalog, two contact points, licenses, languages; `WebSite`; `BreadcrumbList`; `Service` and `FAQPage` on home, service and city pages |
| Lead form | Live, labelled fields, `tel:` links on both numbers |
| Legacy URLs | Old WordPress paths redirect (checked `/vancouver-wa/`, `/contact-us/`, `/blog/`) |

**Gaps, in priority order.**

| # | Gap (observed) | Why it matters |
|---|---|---|
| 1 | No review, rating or testimonial text anywhere on the site (home, service, city, about all checked) | Assistants and people both look for proof. The site currently gives them none to quote |
| 2 | No prices. Every "Pricing" block says it depends; the one number on the site is junk removal ($50 per cubic yard, $250 minimum). A national competitor's Vancouver page leads with a "from $208" gutter price | Cost is one of the first things people ask an assistant, and it cites pages that give a number |
| 3 | The 19 old guides are gone. Their URLs now redirect to service pages (`/why-is-moss-so-bad-for-your-roof/` goes to `/moss-removal-portland/`, `/blog/` goes to `/services/`) | The site has no guide content left to be cited for how, why, when and cost questions |
| 4 | The 35 city pages are one template. Vancouver and Felida are 98% identical once the city name is swapped (59 of 62 sentences shared). The old Vancouver, Beaverton, Tigard, La Center and Longview pages had 780 to 950 words of local detail and keyword-led titles ("Gutter & Roof Cleaning Vancouver, WA"); the rebuild flattened them | Doorway-page risk with Google, and nothing city-specific for an assistant to use |
| 5 | Business entity is thin: schema address is only "Vancouver, WA" (no street, ZIP, geo, hours or map link); `sameAs` lists only Facebook and Instagram; no email; no hours on the site; homepage `geo.region` says US-OR while the schema says WA | Engines match a business across sources by name, address, phone, hours and profile links. Missing fields mean weaker matching |
| 6 | No service pages for the home market. Each service has one page shared by Portland and Vancouver (eight of them slugged `-portland`), while the business is based in Clark County. Nothing targets "gutter cleaning Vancouver WA", "moss removal Camas" and similar | Local results weight proximity. The nearest, easiest wins have no page |
| 7 | One content photo per service page; the homepage hero is a picture of a house, not a job; no project gallery, no before/after | Real job photos are evidence nobody else can copy. The organized photo library exists and is unused on the site |
| 8 | No dates, no author, founder is a bare name in schema | Freshness and "who says so" are missing |
| 9 | Four languages claimed, English-only site | Customers who search or ask in Russian, Ukrainian or Spanish have nothing of the company's to land on |
| 10 | Plumbing: every sitemap `lastmod` is the same fixed date (2026-11-13); no Bing verification tag in the HTML and no sign of IndexNow (confirm in Stage 0); a `HowTo` block on the homepage that is not a how-to; Service schema lists only two cities; `/services/`, `/about-us/` and `/free-estimate/` show FAQs with no `FAQPage` markup | Small, quick fixes |

**Outside the code (see section 10):** directory listings disagree with each other today. Angi shows ZIP 98665 and 8:00 to 5:30; Birdeye shows 98682 and 8:00 to 6:00. Fix those before publishing the same data on the site.

---

## Stage 0. Recon (report only, change nothing)

Report:
1. How pages are generated: where service, city and FAQ data live, which components render them, where JSON-LD is built.
2. The full redirect map (file and count), and which rules cover the 19 old guide slugs listed in Stage 5.
3. How `sitemap.ts`, `robots.ts` and the `llms.txt` route are generated, and what `CONTENT_UPDATED` controls.
4. Every image in `/public` with dimensions and where it is used. Flag any stock or AI-generated photo.
5. What loads the StatCounter pixel and whether it can be removed.
6. Baseline: run the uniqueness script from Stage 6 (write it now, read-only) and paste the table for all 35 city pages.
7. Create `docs/NEEDS-OWNER-INPUT.md` with every item from section 9 as an unchecked box.

**Stop and wait.**

---

## Stage 1. One source of truth for business facts, then better schema

### 1a. `src/data/business.ts`

Create one typed object that every page, the footer, JSON-LD, `llms.txt` and the new facts table read from. Move the hard-coded values there.

```ts
export const business = {
  legalName: "All Around Maintenance Inc.",
  name: "All Around Maintenance",
  founded: 1999,
  founder: { name: "Alex Svistun", title: "Founder & Owner", url: "/about-us/" },
  phones: { or: "+15032092023", wa: "+13607720224" },
  email: "",                       // OWNER
  smsNumber: "",                   // OWNER: only if this line receives texts
  address: {                       // OWNER: must match the Google Business Profile exactly
    public: false,                 // false = service-area business, no street shown
    street: "", city: "", region: "WA", postalCode: "",
  },
  geo: { lat: null, lng: null },   // only used when address.public is true
  hours: [],                       // OWNER, e.g. { days: ["Mo","Tu","We","Th","Fr"], opens: "08:00", closes: "18:00" }
  languages: ["English", "Russian", "Ukrainian", "Spanish"],
  licenses: [
    { state: "OR", label: "Oregon CCB #202731", number: "202731", verifyUrl: "" },
    { state: "WA", label: "Washington contractor #ALLARAM926JB", number: "ALLARAM926JB", verifyUrl: "" },
  ],
  profiles: {                      // only verified, claimed profiles; empty = not emitted
    facebook: "https://www.facebook.com/allaroundmaintenanceinc/",
    instagram: "https://www.instagram.com/allaroundmaintenance/",
    google: "", yelp: "", bbb: "", angi: "", nextdoor: "", youtube: "", x: "", pinterest: "",
  },
  rating: { source: "Google", value: null, count: null, asOf: "", url: "" },  // OWNER
  payment: ["Credit card", "Debit card", "Bank transfer", "Check"],
  notOffered: ["Sewer", "Septic", "Foundation work"],
} as const;
```

License links: find the record page for each number on the Oregon CCB license search and on Washington L&I's Verify tool (`secure.lni.wa.gov/verify/`). Open each in a browser and confirm it shows this company before saving it as `verifyUrl`. If there is no stable deep link, link to the lookup home and show the number beside it.

### 1b. JSON-LD changes

- Organization node: add `email`, `openingHoursSpecification`, `hasMap`, `paymentAccepted`, full `sameAs` from `profiles`, and `knowsAbout` (the service names). Add `PostalAddress` street, postal code and `GeoCoordinates` only when `address.public` is true. Emit nothing for empty values.
- Founder: make `Person` a full node with `@id` (`/about-us/#alex-svistun`), `jobTitle`, `worksFor`, `knowsLanguage`, `image` (the real owner photo), and reference it from the Organization.
- `areaServed`: type each place as `City` with `containedInPlace` (`State` Oregon or Washington). Add the two counties as `AdministrativeArea`.
- `Service` nodes on service pages: reference the full `areaServed` list instead of two cities; add `image`; add `offers` only when Stage 4 pricing is approved for that service.
- Remove the `HowTo` block from the homepage. It describes a sales process, not a how-to.
- Add `FAQPage` JSON-LD on every page that shows a FAQ without it (`/services/`, `/about-us/`, `/free-estimate/`; check `/faq/` too). The markup must match the visible questions and answers word for word.
- Add `WebPage` with `dateModified` on every page (see Stage 3).
- `geo.region` and `geo.placename` meta: set per page from the page's state (US-WA on Washington pages, US-OR on Oregon pages, both on shared pages), or remove them.

### 1c. Visible facts

- Footer: wrap name, address (when public), both phones, email and hours in an `<address>` block. Add a "Text us" `sms:` link only when `smsNumber` is set.
- `/about-us/`: add a "Company facts" table rendered from `business.ts`: legal name, founded, owner, both licenses with their verify links, service area, hours, languages, phones, email, payment methods, what is not offered. One clear table that states every fact once.

**Done when:** Google's Rich Results Test and the Schema.org validator pass on home, one service and one city page with no errors; no empty or placeholder field appears in the HTML; facts appear identically in the footer, the facts table, JSON-LD and `llms.txt`.

**Stop and wait.**

---

## Stage 2. Crawl and index plumbing

1. **Sitemap.** Replace the single `CONTENT_UPDATED` date with a per-page `lastmod` taken from each page's data. Add image entries for content photos.
2. **IndexNow** (Bing, which also feeds Copilot and ChatGPT search). Generate a key, serve it at `/{key}.txt`, add `scripts/indexnow.mjs` that posts changed URLs to `https://api.indexnow.org/indexnow`. Run it from a GitHub Action on a successful production `deployment_status`, with `npm run indexnow` as the manual fallback. Never run on preview deploys.
3. **Verification tags.** Read `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` from env and emit the meta tags when set.
4. **robots.txt.** Keep `User-agent: *` as is. Add named groups for the documented AI agents so intent is explicit: `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `Claude-SearchBot`, `Claude-User`, `ClaudeBot`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `meta-externalfetcher`, `meta-webindexer`. A bot that matches a named group ignores the `*` group, so every named group must repeat `Allow: /` and `Disallow: /api/`.
5. **Feeds.** Add `/guides/feed.xml` (RSS) once Stage 5 ships.
6. **llms.txt.** Keep generating it from the same data so new pages appear automatically. Do not spend more time on it: published log studies show almost nothing fetches these files.
7. **Report for me to check by hand (do not change):** in Vercel, Firewall, Bot Management, the AI Bots ruleset should be Allow or Log for both crawlers and assistants, and Bot Protection should not be challenging verified bots.

**Done when:** `sitemap.xml` shows real per-page dates; the IndexNow key file resolves on the preview; `robots.txt` parses cleanly in a robots tester.

**Stop and wait.**

---

## Stage 3. Proof: reviews, real jobs, dates

### 3a. Reviews (visible HTML only)

- `src/data/reviews.json`: `{ id, author, date, rating, text, source: "Google", sourceUrl, city?, service? }`. Only reviews the owner supplies from the Google profile. Never write, reword or merge one. An excerpt is fine if it is marked with an ellipsis.
- Components: a rating line in the form "{value} from {count} Google reviews, as of {Month YYYY}" (built only from `business.rating`, linked to the profile, hidden when empty) and a review card grid.
- Placement: homepage (three to six), each service page (reviews tagged with that service), each city page (reviews tagged with that city), and a new `/reviews/` page with all of them plus the link to leave one (`/review/`).

### 3b. Projects

- `src/content/projects/*.json`: `{ slug, title, service, city, state, date (month and year), problem, work, materials?, timeOnSite?, photos: [{ src, alt, stage: "before" | "during" | "after" }], video? }`.
- Source photos are in the owner's library at `C:\AllAroundMaintenance\INSTAGRAM\GOOD PHOTOS\ORGANIZED` (folders such as `Gutters`, `Roof_Moss`, `Siding_DryRot`). Copy selected sets to `public/projects/{slug}/`, convert to WebP or AVIF at 250 KB or less, and **strip all EXIF, especially GPS**. Show city only: no house numbers, street names, faces or license plates.
- Do not guess a job's city, date or scope from a photo. Generate `docs/project-intake.csv` listing each photo set with blank city, month, service and "what we did" columns for the office to fill in. Build pages only for completed rows.
- Pages: `/projects/` (filter by service and city) and `/projects/{slug}/`. Each service page shows its two to four most recent projects; each city page shows projects in that city.
- JSON-LD: `ImageObject` for each photo with `contentLocation` at city level; `VideoObject` when a video is present. Embed video with a click-to-load facade so it costs nothing until tapped.
- Replace the homepage hero with a real job photo.

### 3c. Dates and authorship

- Add `updated` to every page's data. Render "Last updated {Month YYYY}" near the bottom of the main content and emit it as `dateModified`. Only change the date when the content changes.
- Service pages and guides: add "Reviewed by Alex Svistun, founder" linked to `/about-us/`, once the owner confirms he reviews them.

**Done when:** every review on the site traces to a row in `reviews.json`; every project page traces to a completed intake row; no image carries GPS EXIF (add a build check that fails if one does).

**Stop and wait.**

---

## Stage 4. Answer-first service pages and real prices

1. **Answer block.** Directly under the H1 on each of the 25 service pages, two or three sentences that fully answer "what is this, who is it for, what does it include, how fast, how do I book" in plain words, with the service name and "Portland and Vancouver" in the first sentence. It must make sense when read alone.
2. **Quick facts.** A `<dl>` or table on each service page: service area, what's included, typical time on site, price guide, guarantee, availability, license. Hide any row with no value.
3. **Pricing data.** `src/data/pricing.ts`: `{ service, unit, from, typicalLow, typicalHigh, minimum?, factors: string[], approved: boolean, asOf }`. Render numbers only where `approved` is true; otherwise keep the current "free itemized estimate" copy. When approved, add `offers` with a `PriceSpecification` to that page's Service schema. Junk removal is already public ($50 per cubic yard, $250 minimum), so migrate it first.
4. **Question headings.** Rewrite FAQ questions the way people ask them, including the place: "How much does gutter cleaning cost in Vancouver, WA?", "How often should gutters be cleaned in the Portland area?", "Is pressure washing safe for a roof?". Each answer leads with the direct answer in its first sentence, then the detail. Remove FAQ entries that only restate brand claims.
5. **Decision content.** On the relevant service pages add a short comparison table where a real choice exists: repair or replace (roof, gutters, deck, siding), gutter cleaning or gutter guards, pressure wash or soft wash. Tables must reflect what the company recommends in practice; put anything uncertain in the owner-input list.

**Done when:** each service page answers its main question in the first 80 words of the main content; every number on the site maps to an approved row in `pricing.ts`.

**Stop and wait.**

---

## Stage 5. Guides: restore the 19 lost URLs, then add the cost and "who do I call" set

1. Build a `/guides/` hub and an MDX (or JSON) guide type with `title, description, slug, published?, updated, reviewedBy, relatedService, draft, reviewed`. Guides stay at root-level slugs. Only `reviewed: true` guides are built and indexed.
2. **Restore these slugs** as rewritten, current guides, and delete the matching redirect in the same commit each one goes live. Change `/blog/` to redirect to `/guides/`.

   `/8-roof-and-gutter-maintenance-tasks-for-winter/` · `/cleaning-maintaining-decks/` · `/dangers-clogged-gutters/` · `/decks-and-fencing/` · `/dry-rot-siding-trim/` · `/essential-services-for-homeowners/` · `/get-ready-for-summer-entertaining/` · `/home-maintenance-tasks-never-do-yourself/` · `/how-to-find-a-handyman/` · `/new-homeowners-guide-to-gutter-maintenance/` · `/professional-dry-rot-repair-smart-investment/` · `/questions-to-ask-your-gutter-cleaners/` · `/roof-gutter-cleaning-mistakes/` · `/roof-maintenance-tips/` · `/signs-trust-handyman/` · `/tips-well-maintained-home/` · `/what-to-do-if-roof-is-leaking/` · `/why-is-moss-so-bad-for-your-roof/` · `/year-round-home-maintenance/`

   Write each from scratch on the same topic. Do not copy the old text. Two old posts carried stray phone numbers; use only the two numbers in section 0.
3. **New guides** (drafts until reviewed): gutter cleaning cost in Portland and Vancouver; roof moss removal cost and whether it harms shingles; how often to clean gutters under fir and maple; roof repair or replacement; dry rot signs and repair cost; gutter guards in the Northwest; handyman, roofer or gutter company: who to call for what; how to check a contractor's license in Oregon and Washington (link the CCB and L&I lookups); a yearly HOA exterior maintenance schedule.
4. **Format for every guide:** a 40 to 60 word direct answer first; question-style H2s; one table or checklist; a Northwest-specific section; one real project photo where available; a related-service box and estimate link; "Last updated" and "Reviewed by"; `BlogPosting` JSON-LD with `author`, `datePublished` (when known) and `dateModified`; breadcrumb. Mark every number and factual claim that needs the owner's confirmation in the draft.
5. Link each guide from its related service page and the reverse.

**Done when:** all 19 slugs return 200 with their own canonical, none redirect, and each links to a service page.

**Stop and wait.**

---

## Stage 6. Local pages that are worth indexing

### 6a. Uniqueness script

`scripts/audit-uniqueness.mjs`: build, extract each city page's `<main>` text, replace the city name with a token, split into sentences, and report for each page the share of sentences found on no other city page. Baseline today is about 5% (Felida against Vancouver). Target is 50% or higher. Print a table and exit non-zero below 30% so it can run in CI.

### 6b. City data

```ts
type CityData = {
  slug: string; name: string; state: "OR" | "WA"; county: string;
  phone: "or" | "wa";
  neighborhoods: string[];        // real named areas
  zips: string[];                 // owner-confirmed
  localNotes: { text: string; source: string }[];  // 3 or more specific, checkable facts
  topServices: string[];          // what the company is called for most in this city
  projects: string[];             // project slugs in this city
  reviews: string[];              // review ids from this city
  faqs: { q: string; a: string }[];  // city-specific only
  updated: string;
};
```

- `localNotes` must come from the owner or from a public source recorded in `source` (city or county site, Census housing data, NOAA rainfall). Examples of the kind of fact wanted: dominant tree cover and what it does to gutters, age and type of housing, HOA density, which side of town gets the most moss. No filler.
- Delete the cloned FAQ set ("Do you offer free estimates in {city}?"). Shared answers live on `/faq/`. City FAQs are only questions whose answer differs by city.
- Titles lead with the services people search: `Gutter Cleaning, Roof & Home Repair in {City}, {ST}` (drop the brand suffix when over 60 characters). The Washington pages show the 360 number first.
- Rewrite order: Vancouver, Portland, Camas, Battle Ground, Ridgefield, Beaverton, Lake Oswego, Gresham, Tigard, Hillsboro, then the rest. After each batch, run the script and list every page still under 50% in the report. Do not noindex anything without my OK.

### 6c. Service-in-city pages (limited, gated)

- Pattern: `/gutter-cleaning-vancouver-wa/`, `/moss-removal-camas-wa/`.
- First wave only: gutter cleaning and roof moss removal, in Vancouver, Camas, Battle Ground, Ridgefield, Portland and Beaverton. Twelve pages at most.
- **Gate:** a page is generated only when that service and city pair has at least one project or one review in the data, plus city `localNotes`. No evidence, no page.
- Each page: answer block, local notes, the city's projects and reviews for that service, price guide (when approved), the city phone number, links up to the main service page and the city page. Self-canonical.
- Link the existing `/roof-maintenance-{city}/` pages into this set. Keep their URLs.

### 6d. Service areas page

Add an owner-confirmed ZIP table to `/service-areas/` (ZIP, city, state) so "do you serve 98642?" has a literal answer. Do not generate ZIPs yourself.

**Done when:** the uniqueness table shows the first ten cities at 50% or higher, and every service-in-city page passes the gate.

**Stop and wait.**

---

## Stage 7. Russian, Ukrainian and Spanish

1. One landing page per language: `/ru/`, `/uk/`, `/es/`. Content: what the company does, the areas, both phones, licenses, the estimate process, and that customers can talk through a project in that language. Do not promise a named person or a guaranteed same-language crew on site.
2. Correct `lang` attribute for each page, `hreflang` alternates between `/`, `/ru/`, `/uk/`, `/es/` plus `x-default`, and a language switch in the footer.
3. Each page is `noindex` and out of the sitemap until a native speaker has reviewed it and `reviewed: true` is set.
4. List the three language pages in `llms.txt` and in the facts table.

**Stop and wait.**

---

## Stage 8. Measurement (docs only)

Create `docs/ai-visibility-log.md` with a monthly table: date, assistant, prompt, was the company named, position, which URL was cited, were the facts right. Assistants: ChatGPT, Google AI Mode / Gemini, Claude, Perplexity, Grok, Meta AI, Copilot. Seed it with these prompts and run them once now as the baseline:

- who cleans gutters near Ridgefield WA
- best roof moss removal in Vancouver WA
- gutter cleaning cost Vancouver WA
- find someone to fix a leaking roof in Portland today
- who repairs dry rot siding in Camas WA
- licensed handyman in Battle Ground WA
- pressure washing a driveway in Beaverton, who should I call
- handyman who speaks Russian in Portland or Vancouver
- HOA exterior maintenance contractor Clark County WA
- is All Around Maintenance Inc licensed in Washington and Oregon
- All Around Maintenance Vancouver WA reviews

Also list, for me to set up by hand: a GA4 channel group for referrals from chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com, meta.ai and grok.com; and a monthly look at AI bot requests in Vercel Observability.

---

## 9. Owner inputs (goes into `docs/NEEDS-OWNER-INPUT.md`)

- [ ] Public address decision. Must match the surviving Google Business Profile. Candidates on file: 3502 NW 289th St, Ridgefield, WA 98642 (preferred) and 9111 NE 163rd Ave, Vancouver, WA (directories disagree on its ZIP: 98682 and 98665). Or keep it hidden as a service-area business.
- [ ] Business hours. Old site and Birdeye say Mon to Fri 8:00 to 6:00 (Birdeye adds Saturday by appointment); Angi says 8:00 to 5:30.
- [ ] Public email address.
- [ ] Whether either number receives texts.
- [ ] Current Google rating, review count, date checked, and the profile URL.
- [ ] Claimed profile URLs: Google, Yelp, BBB, Angi, Nextdoor, YouTube, X, Pinterest.
- [ ] 15 to 25 Google reviews exported as written, each tagged with service and city.
- [ ] Price guide per service (from, typical range, minimum, what moves the price), approved by Alex.
- [ ] `docs/project-intake.csv` filled in for the first 20 photo sets.
- [ ] Confirmation that Alex reviews service pages and guides, for the "Reviewed by" line.
- [ ] Native-speaker reviewers for the Russian, Ukrainian and Spanish pages.
- [ ] ZIP codes served.
- [ ] Per city: neighborhoods worked in most and any local facts the crew knows.

---

## 10. Outside the repo (not Cursor's job, listed so the site and the listings match)

| Where | What to do | Feeds |
|---|---|---|
| Google Business Profile | Finish consolidating to one profile, primary category Gutter cleaning service, full service list, weekly photos and posts | Google Search, Maps, Gemini, AI Mode |
| Bing Places + Bing Webmaster Tools | Claim, match name, address, phone and hours, submit the sitemap | Bing, Copilot, ChatGPT search |
| Yelp | Claim, complete, add photos, answer reviews | ChatGPT business cards, Apple Maps, Siri |
| Apple Business Connect | Claim | Apple Maps, Siri |
| Facebook Page and Instagram | Keep name, phones, hours and service area current; post real jobs with the city named | Meta AI |
| X | A profile with the same facts and job posts | Grok |
| YouTube | Upload the job reels as Shorts with service and city in the title | Google, assistants that cite video |
| Angi, Birdeye, Blue Book, BBB, Nextdoor, Foursquare | Make name, address, ZIP, phone, hours and website URL identical everywhere. Angi still points to `/vancouver-wa/` | Every engine that cross-checks listings |
| Brave Search | Search the main queries; confirm the site is indexed | Claude |
| Reviews | Keep the review requests going; invite customers to describe the job that was done. Never offer anything in exchange | All of the above |

---

## Done when

- Stages 1 and 2 are merged: facts consistent in four places, schema valid, per-page sitemap dates, IndexNow live.
- Real reviews and at least ten real projects are on the site.
- Every service page answers its main question in the first 80 words, and approved prices are visible.
- All 19 guide URLs serve content again.
- The first ten city pages score 50% or higher on the uniqueness script.
- The baseline row for every prompt in `docs/ai-visibility-log.md` is filled in, so next month's run shows what moved.
