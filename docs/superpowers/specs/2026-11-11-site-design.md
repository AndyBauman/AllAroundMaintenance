# All Around Maintenance site: design (approved 2026-11-11)

## Goal
Replace the WordPress site at allaroundmaintenanceinc.com with a fresh static Next.js site on Vercel,
built on the RemoveScrap site's structure, practices and layouts. No database in this phase.

## Decisions
- **Chassis:** RemoveScrap's stack and conventions (Next App Router, Tailwind 4 `@theme` tokens, data files in
  `src/lib`, `business-facts.ts`, JSON-LD helpers, FAQ schema, breadcrumbs, sitemap, robots, `llms.txt`,
  sticky mobile CTA, honeypot spam guard).
- **Dropped (junk-removal specific):** DIY-vs-pro calculator, scrap-metal pricing, community cleanup,
  referral program, photo estimate, admin CRM, Supabase, Twilio.
- **Added for this business:** HOA / commercial / financing bands, 6-month moss guarantee, two phone lines
  (WA pages lead with the Vancouver number), four-step process from the owner's published process.
- **URLs:** every existing service and city slug is kept, with trailing slashes, so rankings carry over.
  Merged pages 301; blog posts 307 to the closest service page until rewritten.
- **Brand:** navy #152A3F, blue #33567B, orange #FDA940 (from the existing identity). Dark header and
  footer because the logo is white.
- **Leads:** form → `/api/lead` → Resend email. If env is missing the visitor is told to call.
- **Facts:** only claims published on the previous site. Unverified numbers are not rendered.

## Out of scope for v1
Blog, real photography, photo-upload estimates, reviews page, analytics/GTM port, DNS cutover.

## Verification
`next build` passes; every sitemap URL returns 200 with one H1, a canonical, a description and JSON-LD;
no broken internal links; legacy redirects resolve; `/api/lead` validates, drops spam and reports
missing configuration.
