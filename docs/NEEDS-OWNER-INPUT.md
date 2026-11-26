# Needs owner input (All Around Maintenance)

Unchecked items block Stages that depend on them. Do not invent values; leave components empty until a box is checked and the value is in the repo.

Source: `docs/AAM-SEO-GEO-AEO.md` §9 (2026-11-26).

## Business entity

- [ ] Public address decision. Must match the surviving Google Business Profile. Candidates on file: 3502 NW 289th St, Ridgefield, WA 98642 (preferred) and 9111 NE 163rd Ave, Vancouver, WA (directories disagree on its ZIP: 98682 and 98665). Or keep it hidden as a service-area business.
- [ ] Business hours. Old site and Birdeye say Mon to Fri 8:00 to 6:00 (Birdeye adds Saturday by appointment); Angi says 8:00 to 5:30.
- [ ] Public email address.
- [ ] Whether either number receives texts.
- [ ] Current Google rating, review count, date checked, and the profile URL.
- [ ] Claimed profile URLs: Google, Yelp, BBB, Angi, Nextdoor, YouTube, X, Pinterest.

## Proof and pricing

- [ ] 15 to 25 Google reviews exported as written, each tagged with service and city.
- [ ] Price guide per service (from, typical range, minimum, what moves the price), approved by Alex.
- [ ] `docs/project-intake.csv` filled in for the first 20 photo sets.
- [ ] Confirmation that Alex reviews service pages and guides, for the "Reviewed by" line. (Set `business.founderReviewsContent = true` in `src/data/business.ts` when confirmed.)
- [ ] After filling `docs/project-intake.csv`, approve which sets become `/projects/{slug}/` pages (and which photo replaces the homepage hero).

## Local and language

- [ ] Native-speaker reviewers for the Russian, Ukrainian and Spanish pages.
- [ ] ZIP codes served.
- [ ] Per city: neighborhoods worked in most and any local facts the crew knows.

## Off-site (not in-repo, but must match before publishing address/hours)

See `docs/AAM-SEO-GEO-AEO.md` §10. Angi vs Birdeye still disagree on ZIP and closing time — resolve listings before Stage 1 emits those fields on the site.
