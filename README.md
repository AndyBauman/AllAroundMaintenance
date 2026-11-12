# All Around Maintenance Inc. website

Marketing site for **allaroundmaintenanceinc.com**. Static Next.js (App Router) on Vercel. **No database.**
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
| Phone numbers, licenses, social links, site URL | `src/lib/constants.ts` |
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

- `/` home, `/services`, `/service-areas`, `/about-us`, `/faq`, `/free-estimate`
- 25 service pages at their **original slugs** (e.g. `/gutter-repair-portland/`)
- 23 city pages (`/{city}-home-maintenance/`) and 5 roof-city pages (`/roof-maintenance-{city}/`)
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`

`trailingSlash: true` matches the old WordPress URLs exactly, so existing indexed URLs resolve with no redirect.

## Lead form (no database)

`/free-estimate` and the form on every service and city page POST to `src/app/api/lead/route.ts`,
which validates, drops bots (honeypot + minimum fill time) and emails the lead through Resend.

Set in Vercel → Settings → Environment Variables:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | **Required.** Resend API key |
| `NOTIFY_EMAIL` | **Required.** Where leads go (comma-separated for several) |
| `RESEND_FROM` | Optional. Verified sender. Defaults to Resend's test sender, which only delivers to the Resend account owner |

Until both required variables are set, the form tells the visitor to call instead of failing silently.

## Drop-in assets

Add the file to `/public`, redeploy, and the site uses it automatically (`src/lib/assets.ts`):

| File | Used for |
|---|---|
| `public/logo.png` | Header and footer logo. The brand logo is white, which is why both are navy |
| `public/hero.jpg` | Home page hero photo |
| `public/why-us.jpg` | Crew or job photo in the "Why us" section |
| `public/og.jpg` | 1200×630 social share image |

## Facts policy

Only facts published on the previous site are rendered. These stay off the site until the owner
confirms them: properties-served count, review count and rating,
award years, street address, hours, email. Address, hours, email and rating are env-driven
(`.env.example`) and appear as soon as they are set.

## Before pointing the domain here

1. Set `RESEND_API_KEY` and `NOTIFY_EMAIL`, then submit a test lead.
2. Add `public/logo.png` and real job photos.
3. Rewrite the 19 blog posts. Their old URLs currently 307 to the closest service page (`next.config.ts`).
4. Confirm the open business facts with the owner (address, hours, email, review count, warranty terms).
5. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` (and port the GTM container if still needed).
6. Add the domain in Vercel, then switch DNS.
