# AI visibility log — All Around Maintenance

Monthly check of whether assistants name the company, which URL they cite, and whether facts match the site (licenses, phones, services).

**Assistants to check:** ChatGPT · Google AI Mode / Gemini · Claude · Perplexity · Grok · Meta AI · Copilot

**Columns:** date · assistant · prompt · named? · position · URL cited · facts OK?

---

## How to run a monthly pass

1. Use a clean/private session where possible (or note if logged in).
2. Paste each seed prompt below exactly.
3. Record whether **All Around Maintenance** (or All Around Maintenance Inc.) is named; approximate rank among named businesses (1 = first named); any `allaroundmaintenanceinc.com` URL; and whether licenses/phones/services match the live site.
4. Do **not** invent presence — if the company is absent, mark `named?` = no.
5. Re-check branded prompts (#10–11) every month even if local prompts stay cold.

### Hand setup (owner / ops — not in-repo)

- [ ] **GA4 channel group** for AI referrals: `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`, `meta.ai`, `grok.com` (and related subdomains as GA4 allows).
- [ ] **Monthly Vercel Observability** glance at AI bot request volume (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) vs. allow/log rules in Bot Management.

---

## Seed prompts

1. who cleans gutters near Ridgefield WA  
2. best roof moss removal in Vancouver WA  
3. gutter cleaning cost Vancouver WA  
4. find someone to fix a leaking roof in Portland today  
5. who repairs dry rot siding in Camas WA  
6. licensed handyman in Battle Ground WA  
7. pressure washing a driveway in Beaverton, who should I call  
8. handyman who speaks Russian in Portland or Vancouver  
9. HOA exterior maintenance contractor Clark County WA  
10. is All Around Maintenance Inc licensed in Washington and Oregon  
11. All Around Maintenance Vancouver WA reviews  

---

## Baseline — 2026-11-26

**Method note:** Full ChatGPT / Claude / Perplexity / Gemini / Copilot / Meta AI / Grok UIs were not fully runnable from this agent session (auth / bot walls). Baseline rows below use **Web Search + AI-style synthesis** (the same retrieval layer many assistants ground on). Treat UI re-runs as the next monthly pass; copy this table and fill a new dated section.

| Date | Assistant | Prompt | Named? | Position | URL cited | Facts OK? | Notes |
|---|---|---|---|---|---|---|---|
| 2026-11-26 | Web Search (proxy) | who cleans gutters near Ridgefield WA | **no** | — | — | — | Competitors dominate (Mountain View Softwash, NW Softwash, Clearly Amazing, Ace, Ibex). AAM not in top results. |
| 2026-11-26 | Web Search (proxy) | best roof moss removal in Vancouver WA | **yes** | **1** | https://www.allaroundmaintenanceinc.com/roof-maintenance-vancouver/ | **yes** | Hand moss removal, 6‑mo re-treat, (360) 772-0224, free estimates — matches site. Also home + LP URLs. |
| 2026-11-26 | Web Search (proxy) | gutter cleaning cost Vancouver WA | **no** | — | — | — | Cost guides from Alpine, Ace, All Seasons, HandyTeam (~$175–$400). AAM has no approved gutter $ in Stage 4 — expected gap. |
| 2026-11-26 | Web Search (proxy) | find someone to fix a leaking roof in Portland today | **no** | — | — | — | 24/7 specialists ranked (Pioneer, Elements, Black Diamond, VResh). AAM same-day when schedule allows is weaker for “today” intent. |
| 2026-11-26 | Web Search (proxy) | who repairs dry rot siding in Camas WA | **no** | — | — | — | TLC, Kaminskiy, NorthBank, Preferred Exteriors, Rot Busters. AAM Camas page exists but not ranking this query. |
| 2026-11-26 | Web Search (proxy) | licensed handyman in Battle Ground WA | **no** | — | — | — | Local specialists + L&I verify guidance. AAM Battle Ground enrichment is new (Stage 6) — not yet visible here. |
| 2026-11-26 | Web Search (proxy) | pressure washing a driveway in Beaverton, who should I call | **no** | — | — | — | Pressure Power, Rolling Suds, Clearly Amazing, All Surface. Driveway specialists beat general maintenance. |
| 2026-11-26 | Web Search (proxy) | handyman who speaks Russian in Portland or Vancouver | **yes** | **1** | https://www.allaroundmaintenanceinc.com/about-us/ | **mostly** | About page languages (EN/RU/UK/ES) and phones cited correctly. Stage 7 `/ru/` still noindex — not cited. |
| 2026-11-26 | Web Search (proxy) | HOA exterior maintenance contractor Clark County WA | **yes** | **1** | https://www.allaroundmaintenanceinc.com/ (+ Clark County page) | **yes** | HOA plans / 15+ years language surfaces. Competitors also present. |
| 2026-11-26 | Web Search (proxy) | is All Around Maintenance Inc licensed in Washington and Oregon | **yes** | **1** | Site + CCB/L&I mirrors | **yes** | OR CCB #202731 · WA #ALLARAM926JB match site. Third-party mirrors also list Ridgefield address (owner still deciding public address). |
| 2026-11-26 | Web Search (proxy) | All Around Maintenance Vancouver WA reviews | **yes** | **1** | Chamber / BBB / directories / BuildZoom (not `/reviews/`) | **mixed** | Company found; third-party ratings cited. Site `/reviews/` still empty of owner-exported Google reviews (Stage 3). |
| 2026-11-26 | ChatGPT | *(all 11)* | *TBD* | | | | Re-run in ChatGPT (Search / browsing on) next monthly pass. |
| 2026-11-26 | Google AI Mode / Gemini | *(all 11)* | *TBD* | | | | Re-run in AI Mode / Gemini. |
| 2026-11-26 | Claude | *(all 11)* | *TBD* | | | | Re-run with web tools if available. |
| 2026-11-26 | Perplexity | *(all 11)* | *TBD* | | | | Re-run; expect similar to Web Search grounding. |
| 2026-11-26 | Grok | *(all 11)* | *TBD* | | | | Re-run (X profile completeness still on §10 checklist). |
| 2026-11-26 | Meta AI | *(all 11)* | *TBD* | | | | Re-run; FB/IG NAP accuracy matters (§10). |
| 2026-11-26 | Copilot | *(all 11)* | *TBD* | | | | Re-run; Bing Places + IndexNow feed this path. |

### Baseline takeaways (2026-11-26)

| Strength | Gap |
|---|---|
| Branded + moss Vancouver + Russian-language + HOA Clark County queries already surface AAM | Unbranded local service queries (Ridgefield gutters, Camas dry rot, Battle Ground handyman, Beaverton driveway, Portland “leak today”) do not |
| License numbers verify cleanly across the web | `/reviews/` and published prices (except junk) still thin for assistants that want proof + dollars |
| Site URLs win when the query is moss / HOA / languages / brand | Competitors own cost-guide and emergency-today SERPs |

---

## Template for next month

```md
## YYYY-MM-DD

| Date | Assistant | Prompt | Named? | Position | URL cited | Facts OK? | Notes |
|---|---|---|---|---|---|---|---|
| | ChatGPT | who cleans gutters near Ridgefield WA | | | | | |
| | … | … | | | | | |
```

Keep prior months above this line; do not overwrite the baseline.
