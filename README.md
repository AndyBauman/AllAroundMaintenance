# All Around Maintenance Inc. website

Marketing site for **allaroundmaintenanceinc.com**. Next.js (App Router) on Vercel.
Built on the same structure and practices as the RemoveScrap site: data files drive the pages, one
`business-facts.ts` is the source of truth for claims, and every page ships JSON-LD.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · lucide-react · self-hosted Inter + Outfit (`@fontsource-variable`)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things live

| Want to change… | Edit |
|---|---|
| Phone numbers, licenses, social links, site URL, form on/off | `src/lib/constants.ts` |
| Claims: response time, guarantee, payment, junk pricing | `src/lib/business-facts.ts` |
| A service page (copy, FAQs, pricing note, related links) | `src/lib/services.ts` |
| Cities and neighborhoods | `src/lib/cities.ts` |
| Home and FAQ-page questions, city FAQ templates | `src/lib/faqs.ts` |
| Brand colors and fonts | `src/app/globals.css` (`@theme`) |
| Legacy URL redirects | `next.config.ts` |
| Service page layout / city page layout | `src/components/pages/ServicePage.tsx`, `CityPage.tsx` |

Adding a service or a city is one object in the data file. The page, sitemap entry, footer link,
schema and `llms.txt` line are generated from it.

## Pages (59 indexable URLs)

- `/` home, `/services`, `/service-areas`, `/about-us`, `/faq`, `/free-estimate` (quote form)
- 25 service pages at their **original slugs** (e.g. `/gutter-repair-portland/`)
- 35 city pages (`/{city}-home-maintenance/`) and 5 roof-city pages (`/roof-maintenance-{city}/`)
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`

`trailingSlash: true` matches the old WordPress URLs exactly, so existing indexed URLs resolve with no redirect.

## Quote form

The form is on the home page, service pages, city pages, and `/free-estimate`. It posts to
`/api/lead/`. Titles, meta descriptions, H1s, canonicals, and FAQ JSON-LD stay call-first until
`LEAD_FORM_ENABLED` in `src/lib/constants.ts` is set to true.

Before requests can be stored or emailed:

1. Apply `supabase/migrations/20261126030000_site_leads.sql` in the Supabase SQL editor. Do not drop any existing table.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL`
   in Vercel. `NOTIFY_EMAIL` and `RESEND_FROM` are used when the `LEAD_*` names are unset.

The route saves the lead first, then emails it. If neither is configured, the visitor is told to call.

## Drop-in assets

Add the file to `/public`, redeploy, and the site uses it automatically (`src/lib/assets.ts`):

| File | Used for |
|---|---|
| `public/logo.svg` | Header and footer logo (in place). The brand logo is white, which is why both are navy. The emblem is cleaned up from a supplied banner image and the wordmark is redrawn, so swap in the original artwork when it is available (`logo.png` also works) |
| `public/hero.jpg` | Home page hero photo |
| `public/why-us.jpg` | Crew or job photo in the "Why us" section |
| `public/og.jpg` | 1200×630 social share image |

## Facts policy

Only facts published on the previous site are rendered. These stay off the site until the owner
confirms them: properties-served count, review count and rating,
award years, street address, hours, email. Address, hours, email and rating are env-driven
(`.env.example`) and appear as soon as they are set.

## Before pointing the domain here

1. Add real job photos, and replace `public/logo.svg` with the original logo artwork if the owner has it.
2. Decide whether to switch the online form on (see above).
3. Rewrite the 19 blog posts. Their old URLs currently 307 to the closest service page (`next.config.ts`).
4. Confirm the open business facts with the owner (address, hours, email, review count, warranty terms).
5. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` (and port the GTM container if still needed).
6. Add the domain in Vercel, then switch DNS.
