import {
  FACTS,
  estimateText,
  guaranteeText,
  junkPricingText,
  mossGuaranteeText,
  changeOrderText,
} from "./business-facts";

export type ServiceGroup = "roofs" | "gutters" | "decks" | "home";

export type ServiceIconName =
  | "roof" | "leak" | "layers" | "hardhat" | "moss" | "gutter" | "wrench" | "ruler"
  | "deck" | "spray" | "siding" | "fence" | "rot" | "trim" | "drain" | "pipe"
  | "cabinet" | "light" | "drywall" | "hammer" | "hoa" | "landscape" | "junk" | "guest" | "yard";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceData {
  /** URL slug. Kept identical to the previous site so rankings and links carry over. */
  slug: string;
  group: ServiceGroup;
  icon: ServiceIconName;
  title: string;
  shortTitle: string;
  /** One line for cards and footers. */
  blurb: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  includes: string[];
  process?: { step: string; title: string; description: string }[];
  pricing: { headline: string; note: string };
  callout: { title: string; text: string };
  faqs: ServiceFaq[];
  related: string[];
  popular?: boolean;
}

export const SERVICE_GROUPS: { id: ServiceGroup; label: string; description: string }[] = [
  { id: "roofs", label: "Roofs", description: "Inspection, repair, moss removal, replacement and new roofs." },
  { id: "gutters", label: "Gutters", description: "Cleaning, repair and replacement that keeps water away from the house." },
  { id: "decks", label: "Decks", description: "Cleaning, repair, staining and full restoration." },
  { id: "home", label: "Home Services", description: "Exterior, interior and property work handled by the same crew." },
];

/** Default three-step flow used on most service pages. */
export const DEFAULT_SERVICE_PROCESS = [
  {
    step: "01",
    title: "On-Site Assessment",
    description: "We look at the problem in person, find the cause, and explain what we see in plain language.",
  },
  {
    step: "02",
    title: "Itemized Estimate",
    description: `You get a written, line-by-line estimate within ${FACTS.estimateTurnaround}, with scope and timeline spelled out.`,
  },
  {
    step: "03",
    title: "Scheduled, Guaranteed Work",
    description: `Most jobs are booked within ${FACTS.schedulingWindow}. We finish on schedule, clean up, and stand behind the result.`,
  },
];

const FREE_ESTIMATE = { headline: "Free itemized estimate", note: estimateText() };

export const SERVICES: ServiceData[] = [
  // ───────────────────────────── ROOFS ─────────────────────────────
  {
    slug: "roof-inspection-cleaning-repair",
    group: "roofs",
    icon: "roof",
    popular: true,
    title: "Roof Inspection, Cleaning & Repair",
    shortTitle: "Roof Repair & Inspection",
    blurb: "Free inspections, leak and storm repair, and yearly maintenance.",
    metaTitle: "Roof Repair & Free Roof Inspection | Portland OR & Vancouver WA",
    metaDescription:
      "Free roof inspection with a photo report, plus leak, flashing and storm-damage repair across Portland and Vancouver WA. Licensed in OR & WA. Call (503) 209-2023.",
    heroHeading: "Roof Repair & Free Inspections",
    heroSubheading:
      "Find small roof problems before the rainy season turns them into big ones. Inspections are free and come with a photo report.",
    intro:
      "A Pacific Northwest roof takes months of rain, wind and falling fir needles every year. We inspect the roof inside and out, show you what we found, and fix what needs fixing, from a lifted shingle to storm damage.",
    includes: [
      "Free inspection of the roof exterior, attic side, ventilation and insulation",
      "Itemized findings report with photos",
      "Leak, flashing and chimney-seal repair",
      "Storm and wind damage: missing shingles, blow-offs and punctures",
      "Yearly maintenance: clear valleys, replace cracked shingles, catch early moss",
      "Safe removal of hazards such as exposed wires",
    ],
    pricing: {
      headline: "Free roof inspection",
      note: `The inspection and photo report cost nothing. If repairs are needed, you get an itemized estimate within ${FACTS.estimateTurnaround}.`,
    },
    callout: {
      title: "Best time to inspect",
      text: "Once a year, ideally before the rainy season, so small issues are handled before storms test them.",
    },
    faqs: [
      { question: "How much does a roof inspection cost?", answer: "Nothing. Roof and attic inspections are free and include an itemized report with photos, so you can see exactly what we saw." },
      { question: "What roof problems do you repair?", answer: "Leaks, failed flashing and chimney seals, missing or damaged shingles, wind blow-offs, punctures, blistering, ponding water, and problems left by poor installation or earlier repairs." },
      { question: "How often should a roof be inspected?", answer: "Once a year is a good rule in our climate, and again after any major wind storm. An annual visit before the rainy season catches most problems early." },
      { question: "Do you offer same-day roof repair?", answer: "When our schedule allows, yes. Call as early in the day as you can and tell us what's happening so we can prioritize active leaks." },
      { question: "What does a roof inspection cover?", answer: "The roof exterior, the attic side, ventilation and insulation. You get an itemized report with photos of what we found." },
      { question: "What are signs my roof needs repair?", answer: "Missing, cracked or curling shingles, granules collecting in the gutters, water stains on ceilings, damp spots in the attic, and moss that keeps coming back." },
      { question: "Do you repair storm and wind damage?", answer: "Yes. We repair missing shingles, blow-offs and punctures left by storms and wind." },
      { question: "What does yearly roof maintenance include?", answer: "Clearing the valleys, replacing cracked shingles and catching moss early, before it gets under the shingles." },
    ],
    related: ["leaky-roof-repair", "moss-removal-portland", "roof-replacement"],
  },
  {
    slug: "leaky-roof-repair",
    group: "roofs",
    icon: "leak",
    title: "Leaky Roof Repair",
    shortTitle: "Leaky Roof Repair",
    blurb: "Fast leak tracing, a temporary fix if needed, then a permanent repair.",
    metaTitle: "Leaky Roof Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Roof leaking? We trace the source, stop the water and plan the permanent repair for homes and businesses in Portland and Vancouver WA. Call (503) 209-2023.",
    heroHeading: "Leaky Roof Repair",
    heroSubheading: "Water coming in? Call now. We'll help you slow it down and get someone out to find the source.",
    intro:
      "A leak rarely starts where the stain shows up. We trace the water back to its entry point, stop it, and then lay out what a lasting repair looks like, whether that is a simple fix or something larger.",
    includes: [
      "Leak tracing from the attic and the roof surface",
      "Emergency response with a temporary fix when needed",
      "Flashing, vent boot and chimney-seal repair",
      "Shingle replacement and patching",
      "Clearing gutter backups that push water under the roof edge",
      "A written plan and estimate for any permanent repair",
    ],
    process: [
      { step: "01", title: "Inspection", description: "We find the actual cause and decide whether a simple repair will hold or something larger is needed." },
      { step: "02", title: "Consultation", description: "You see the findings, the options, the cost and the timeline before any work begins." },
      { step: "03", title: "Repair", description: "Our roof technicians make the repair and confirm the leak is stopped." },
    ],
    pricing: FREE_ESTIMATE,
    callout: {
      title: "If it's leaking right now",
      text: "Move furniture and electronics, catch the water in a bucket or large tote, then call. We'll walk you through slowing it down while we get to you.",
    },
    faqs: [
      { question: "What causes most roof leaks?", answer: "Aging roofing, failed flashing, fallen branches, clogged gutters that pool water at the roof edge, wildlife damage, and mistakes in the original installation." },
      { question: "Do you handle emergency leaks?", answer: "Yes. Call as soon as you notice water. We send someone to assess the problem and apply a quick fix, then help you plan the permanent repair." },
      { question: "Will I need a new roof?", answer: "Usually not. Most leaks are repairable. We only recommend replacement when the inspection shows a repair won't last." },
      { question: "Do you repair leaks on commercial buildings?", answer: "Yes. We repair leaks for homes and businesses across the Portland and Vancouver metro areas." },
      { question: "What should I do while I wait for a roof leak repair?", answer: "Catch the water in a bucket, move furniture and electronics out of the way, and call us. Stay off the roof, especially while it is wet." },
      { question: "How do you find where a roof leak is coming from?", answer: "We trace it from both sides: the attic and the roof surface. Water often travels along the framing before it shows, so the stain inside is rarely right under the leak." },
      { question: "Can a small roof leak wait?", answer: "It is better not to wait. Even a slow leak soaks insulation and framing, which leads to mold, dry rot and a larger repair." },
      { question: "Do I get an estimate before the permanent repair?", answer: "Yes. After any temporary fix, you get a written plan and estimate for the permanent repair." },
    ],
    related: ["roof-inspection-cleaning-repair", "gutter-repair-portland", "roof-replacement"],
  },
  {
    slug: "roof-replacement",
    group: "roofs",
    icon: "layers",
    title: "Roof Replacement",
    shortTitle: "Roof Replacement",
    blurb: "Honest repair-or-replace advice and a clean, well-communicated re-roof.",
    metaTitle: "Roof Replacement | Portland OR & Vancouver WA",
    metaDescription:
      "Roof replacement for Portland and Vancouver WA homes. We inspect first and only recommend a new roof when repair won't last. Call (503) 209-2023.",
    heroHeading: "Roof Replacement",
    heroSubheading: "We inspect first and only recommend a new roof when a repair won't do the job.",
    intro:
      "Replacing a roof is a major investment, so the first step is making sure you need one. If you do, you get a clear plan, regular updates during the job, and no hidden costs.",
    includes: [
      "Full roof inspection before any recommendation",
      "A straight answer on repair versus replacement",
      "Tear-off and installation with durable, weatherproof roofing products",
      "Updates throughout the job",
      "Complete clean-up when the work is done",
    ],
    process: [
      { step: "01", title: "Assessment", description: "We determine whether replacement or repair is the better option for your roof." },
      { step: "02", title: "Consultation", description: "We review cost, options and timeline with you before anything is scheduled." },
      { step: "03", title: "Re-Roofing", description: "Our roofing technicians complete the job and leave the property clean." },
    ],
    pricing: {
      headline: "Free itemized estimate",
      note: "A full replacement commonly runs from $5,000 to $20,000 or more depending on roof size and materials. You get the full number in writing before work starts.",
    },
    callout: {
      title: "Signs it may be time",
      text: "A sagging or drooping roofline, moisture or mold inside, cracked, curling or missing shingles, or a roof more than 25 years old.",
    },
    faqs: [
      { question: "How do I know if I need a new roof?", answer: "Common signs are sagging, interior moisture or mold, widespread cracked or curling shingles, and age beyond about 25 years. An inspection tells you for certain." },
      { question: "Will you tell me if a repair is enough?", answer: "Yes. Most damage can be repaired, and we recommend replacement only when it is the better long-term option." },
      { question: "How much does a roof replacement cost?", answer: "A full replacement commonly runs from $5,000 to $20,000 or more depending on roof size and materials. You get the full number in writing before work starts." },
      { question: "How long does a roof last?", answer: "Many asphalt shingle roofs last 20 to 30 years. Moss, poor attic ventilation and storm damage shorten that, and regular maintenance extends it." },
      { question: "What happens during a roof replacement?", answer: "We assess the roof, review cost, options and timeline with you, then our roofing technicians complete the re-roof and leave the property clean." },
      { question: "Will you keep me updated during the job?", answer: "Yes. You get updates throughout the job and a complete clean-up when the work is done." },
    ],
    related: ["roof-installation", "roof-inspection-cleaning-repair", "gutter-replacement"],
  },
  {
    slug: "roof-installation",
    group: "roofs",
    icon: "hardhat",
    title: "Roof Installation",
    shortTitle: "Roof Installation",
    blurb: "New roofs planned around your home, your budget and your schedule.",
    metaTitle: "Roof Installation | Portland OR & Vancouver WA",
    metaDescription:
      "Roof installation in Portland and Vancouver WA with a custom plan, clear costs and full clean-up. Licensed in OR & WA. Call (503) 209-2023 for a free estimate.",
    heroHeading: "Roof Installation",
    heroSubheading: "A roof built for Northwest weather, with costs and timeline agreed before we start.",
    intro:
      "Every installation starts with an assessment and a plan specific to your property. We review what we found, what it will cost and how long it will take, then schedule construction around you.",
    includes: [
      "Roof assessment and a custom installation plan",
      "Review of the roof deck, ventilation, insulation, chimney and flashing",
      "A repair recommendation instead, when a simple fix is enough",
      "Durable, weatherproof roofing products",
      "Scheduling at your convenience",
      "Full clean-up after the work",
    ],
    process: [
      { step: "01", title: "Inspection", description: "We confirm whether the roof needs replacing or a repair will do." },
      { step: "02", title: "Recommendation", description: "We go over findings, cost, timeline and what to expect." },
      { step: "03", title: "Construction", description: "We schedule around you, install the roof and clean up." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Repairs come first", text: "If the inspection shows a repair will solve the problem, that's what we'll recommend." },
    faqs: [
      { question: "What does the installation process look like?", answer: "Three steps: an inspection, a recommendation meeting where we cover cost and timeline, and then construction scheduled at a time that works for you." },
      { question: "How long does a roof installation take?", answer: "It depends on the size and complexity of the roof. You'll get a specific timeline with your estimate before anything is scheduled." },
      { question: "Do you clean up afterward?", answer: "Yes. Clean-up is part of every job, and our goal is to leave the property as clean as we found it." },
      { question: "What do you check before installing a roof?", answer: "The roof deck, ventilation, insulation, chimney and flashing. If a simple repair is enough, we recommend that instead." },
      { question: "How much does a new roof cost?", answer: "It depends on roof size and materials. A full replacement commonly runs from $5,000 to $20,000 or more, and you get the full number in writing before work starts." },
      { question: "Can you schedule the installation around my calendar?", answer: "Yes. Construction is scheduled at a time that works for you." },
    ],
    related: ["roof-replacement", "roof-inspection-cleaning-repair", "gutter-replacement"],
  },
  {
    slug: "moss-removal-portland",
    group: "roofs",
    icon: "moss",
    popular: true,
    title: "Roof Moss Removal & Roof Cleaning",
    shortTitle: "Moss Removal",
    blurb: `Hand removal plus root-killing treatment, guaranteed for ${FACTS.mossGuaranteeMonths} months.`,
    metaTitle: "Roof Moss Removal & Roof Cleaning | Portland OR & Vancouver WA",
    metaDescription:
      "Roof moss removed by hand, never pressure washed, then treated at the root. Gutters cleaned on every job. 6-month re-treatment guarantee. Call (503) 209-2023.",
    heroHeading: "Roof Moss Removal",
    heroSubheading: `Removed by hand, treated at the root, and guaranteed for ${FACTS.mossGuaranteeMonths} months.`,
    intro:
      "Moss holds water against your shingles and lifts their edges, which shortens the life of the roof. We remove it the careful way, by hand, then treat the roof so it does not grow straight back.",
    includes: [
      "Moss, leaves and debris removed by hand",
      "Remaining growth scrubbed off",
      "Gutters and downspouts cleaned and unclogged on every job",
      "Industrial-grade treatment that kills moss at the root",
      "No pressure washing on roofs, because it strips shingle granules",
    ],
    process: [
      { step: "01", title: "Clear by Hand", description: "We remove moss, leaves and debris from the roof surface by hand." },
      { step: "02", title: "Scrub", description: "Remaining moss and vegetation are scrubbed away." },
      { step: "03", title: "Clean the Gutters", description: "Gutters and downspouts are cleaned out and unclogged." },
      { step: "04", title: "Treat", description: "We apply a moss treatment that kills the roots." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: `${FACTS.mossGuaranteeMonths}-month moss guarantee`, text: mossGuaranteeText() },
    faqs: [
      { question: "How do you remove moss from a roof?", answer: "By hand first, then we scrub off what remains, clean the gutters and downspouts, and apply an industrial-grade treatment that kills the moss at the root." },
      { question: "Do you pressure wash roofs?", answer: "No. Pressure washing can strip the protective granules off asphalt shingles, so we remove moss by hand." },
      { question: "What if the moss comes back?", answer: mossGuaranteeText() },
      { question: "How often does a roof need moss treatment?", answer: "Heavily shaded roofs often need cleaning every year. Roofs that get more sun can usually go longer between treatments." },
      { question: "Why is moss bad for a roof?", answer: "Moss holds moisture against the shingles and works its way under their edges, which lifts them and lets water in. Left alone, it shortens the life of the roof." },
      { question: "Do you clean the gutters during moss removal?", answer: "Yes. Gutters and downspouts are cleaned and unclogged on every moss removal job." },
      { question: "How can I slow moss from coming back?", answer: "Trim back overhanging branches so the roof gets more sun and dries faster, and keep the roof and gutters clear of leaves and debris." },
    ],
    related: ["roof-inspection-cleaning-repair", "gutter-cleaning-gutter-inspection", "pressure-washing-portland"],
  },

  // ──────────────────────────── GUTTERS ────────────────────────────
  {
    slug: "gutter-cleaning-gutter-inspection",
    group: "gutters",
    icon: "gutter",
    popular: true,
    title: "Gutter Cleaning & Inspection",
    shortTitle: "Gutter Cleaning",
    blurb: "Gutters and downspouts cleared, flushed and checked for problems.",
    metaTitle: "Gutter Cleaning & Inspection | Portland OR & Vancouver WA",
    metaDescription:
      "Gutter cleaning in Portland and Vancouver WA: debris removed, downspouts flushed, leaks and sagging checked. Free estimates, same-day response. Call (503) 209-2023.",
    heroHeading: "Gutter Cleaning & Inspection",
    heroSubheading: "Stop overflowing gutters before they stain siding, rot fascia or pool water at the foundation.",
    intro:
      "Clogged gutters send water where it should never go. We clear them completely, flush the downspouts to prove they flow, and tell you about anything that needs attention.",
    includes: [
      "Leaves, needles and buildup removed from gutters and downspouts",
      "Downspouts flushed to clear clogs and confirm flow",
      "Check for leaks, sagging sections and loose fasteners",
      "Gutter guard inspection, if you have them",
      "Downspout rerouting when water is draining toward the house",
      "Scheduled plans for homes and HOA communities",
    ],
    pricing: {
      headline: "Free estimate",
      note: "Cost depends on the size and height of the home, how much debris there is, how easy the gutters are to reach, and whether repairs or unclogging are needed.",
    },
    callout: { title: "How often", text: "At least twice a year, in late fall and in spring. More often if trees hang over the roof." },
    faqs: [
      { question: "How much does gutter cleaning cost?", answer: "It depends on home size and height, the amount of debris, accessibility, and whether any repairs are needed. Estimates are free and itemized." },
      { question: "How often should gutters be cleaned?", answer: "At least twice a year, in late fall and spring. Homes under heavy tree cover usually need it more often." },
      { question: "What are signs of a gutter problem?", answer: "Overflow during rain, water dripping behind the gutter, sagging sections, stains on the siding, and water pooling near the foundation." },
      { question: "Can you reroute a downspout?", answer: "Yes. If a downspout drains toward the foundation or across a walkway, we can reroute or reconfigure it, either as part of a repair or on its own." },
      { question: "What does a gutter cleaning include?", answer: "We remove leaves, needles and buildup from the gutters and downspouts, flush the downspouts to confirm they drain, and check for leaks, sagging sections and loose fasteners." },
      { question: "When is the best time of year to clean gutters?", answer: "Late fall, after most of the leaves are down, and again in spring. With fir or pine trees overhead, plan on an extra cleaning, because needles drop all year." },
      { question: "What happens if gutters are not cleaned?", answer: "Clogged gutters overflow. Water then runs behind the gutter and rots the fascia, stains the siding, pools at the foundation and can back up under the roof edge." },
      { question: "What if you find damage while cleaning?", answer: "Every cleaning includes a check for leaks, sagging sections and loose fasteners. If something needs repair, we show you and price it. Nothing is added until you approve it." },
      { question: "Do you clean gutters that have gutter guards?", answer: "Yes. If your gutters have guards, we inspect them as part of the cleaning. Guards cut down on debris, but fine material still gets through, so the gutters still need to be checked." },
      { question: "Do you offer scheduled gutter cleaning?", answer: "Yes. We set up scheduled cleaning plans for homes and for HOA communities, so the gutters are cleared before they clog." },
    ],
    related: ["gutter-repair-portland", "gutter-replacement", "moss-removal-portland"],
  },
  {
    slug: "gutter-repair-portland",
    group: "gutters",
    icon: "wrench",
    title: "Gutter Repair",
    shortTitle: "Gutter Repair",
    blurb: "Leaks, sagging runs, failed hangers and downspouts that won't drain.",
    metaTitle: "Gutter Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Gutter repair for leaks, sagging sections, separated seams and bad downspouts in Portland and Vancouver WA. Same-day service often available. Call (503) 209-2023.",
    heroHeading: "Gutter Repair",
    heroSubheading: "Leaking, sagging or pulling away from the house? We fix the cause, not just the drip.",
    intro:
      "A gutter that leaks or sags is sending water into your fascia, siding or foundation. We inspect the whole run, explain the options and make a repair that lasts.",
    includes: [
      "Leak repair at seams, corners and end caps",
      "Loose or sagging sections re-secured",
      "Failed hangers and fasteners replaced",
      "Downspouts that don't drain corrected",
      "Cleaning and unclogging as part of the repair",
      "Emergency repair calls welcome",
    ],
    pricing: {
      headline: "Free estimate",
      note: "Cost depends on home size and height, how easy the gutters are to reach, the extent of the damage, and the parts needed.",
    },
    callout: { title: "Urgent problems first", text: "Issues that could cause water damage are prioritized, and same-day service is often possible." },
    faqs: [
      { question: "How do I know if I need repair or just cleaning?", answer: "Dripping at the seams, sagging runs, overflow that continues after a cleaning, pooling near the foundation, or gaps where the gutter pulls from the fascia all point to a repair." },
      { question: "Can you repair gutters the same day?", answer: "Often, depending on our schedule and the type of repair. Tell us if water is getting into the house so we can prioritize it." },
      { question: "Should I repair or replace my gutters?", answer: "Isolated problems are worth repairing. If damage is widespread, with multiple cracks, broken seams or recurring drainage trouble, replacement is usually the better value." },
      { question: "What gutter problems can you repair?", answer: "Leaks at seams, corners and end caps, loose or sagging sections, failed hangers and fasteners, and downspouts that don't drain." },
      { question: "What causes gutters to sag or pull away?", answer: "Usually the weight of debris and standing water, failed hangers, or fascia boards that have softened from rot. We re-secure the run and replace the failed hangers and fasteners." },
      { question: "How much does gutter repair cost?", answer: "It depends on home size and height, how easy the gutters are to reach, the extent of the damage and the parts needed. Estimates are free and itemized." },
      { question: "Is cleaning included with a gutter repair?", answer: "Yes. We clean and unclog the gutters as part of the repair." },
    ],
    related: ["gutter-cleaning-gutter-inspection", "gutter-replacement", "drainage-services"],
  },
  {
    slug: "gutter-replacement",
    group: "gutters",
    icon: "ruler",
    title: "Gutter Replacement & Installation",
    shortTitle: "Gutter Replacement",
    blurb: "New gutters pitched, placed and fastened correctly, matched to your home.",
    metaTitle: "Gutter Replacement & Installation | Portland OR & Vancouver WA",
    metaDescription:
      "Gutter replacement and installation in Portland and Vancouver WA. Correct pitch, smart downspout placement, matched to your home. Free itemized estimate. (503) 209-2023.",
    heroHeading: "Gutter Replacement",
    heroSubheading: "When cleaning and repair are no longer enough, we install gutters that drain the way they should.",
    intro:
      "We start by confirming you actually need new gutters. If you do, the details decide whether they work: the pitch, where the downspouts go, and what they are fastened to.",
    includes: [
      "Assessment first: clean, repair or replace",
      "Gutters pitched so water runs to the downspouts",
      "Downspouts placed to carry water away from the foundation",
      "Fastened to sound fascia",
      "Materials matched to the style of your home",
      "Dry rot checked during the job, with your approval before anything is added",
    ],
    pricing: {
      headline: "Free itemized estimate",
      note: "Cost depends on the size and height of the building, how much guttering is replaced, roofline complexity and any drainage work.",
    },
    callout: { title: "No surprises", text: changeOrderText() },
    faqs: [
      { question: "How long do gutters last?", answer: "Often 20 to 30 years, depending on maintenance, exposure and whether clogs or damage were left unaddressed." },
      { question: "What are the warning signs?", answer: "Extensive cracking, open seams, rust, peeling paint, water pooling near the house, or water damage at the foundation." },
      { question: "What if you find dry rot behind the old gutters?", answer: "We show you what we found and price the repair. Nothing is added to the job until you approve it." },
      { question: "How much does gutter replacement cost?", answer: "It depends on the size and height of the building, how much guttering is replaced, the complexity of the roofline and any drainage work. Estimates are free and itemized." },
      { question: "Do I need to replace all of my gutters?", answer: "Not always. We assess first and tell you whether cleaning, a repair or replacement is the right fix." },
      { question: "How do you make sure new gutters drain properly?", answer: "We pitch the gutters so water runs to the downspouts, place the downspouts to carry water away from the foundation, and fasten everything to sound fascia." },
      { question: "Will new gutters match my house?", answer: "Yes. We match the materials to the style of your home." },
    ],
    related: ["gutter-repair-portland", "gutter-cleaning-gutter-inspection", "dry-rot-repair"],
  },

  // ───────────────────────────── DECKS ─────────────────────────────
  {
    slug: "deck-cleaning-deck-repair-deck-restoration",
    group: "decks",
    icon: "deck",
    popular: true,
    title: "Deck Cleaning, Repair & Restoration",
    shortTitle: "Deck Repair & Restoration",
    blurb: "Cleaning, board and railing repair, staining and full refinishing.",
    metaTitle: "Deck Cleaning, Repair & Refinishing | Portland OR & Vancouver WA",
    metaDescription:
      "Deck cleaning, board and railing repair, staining and refinishing in Portland and Vancouver WA. Wood and composite. Free in-person assessment. Call (503) 209-2023.",
    heroHeading: "Deck Repair & Restoration",
    heroSubheading: "Bring a gray, slick or wobbly deck back to something you want to stand on.",
    intro:
      "Our damp climate is hard on decks. We start with a free in-person assessment that tells you whether yours needs cleaning, refinishing or structural repair, and why.",
    includes: [
      "Deck cleaning by pressure wash, or soft wash for older and delicate wood",
      "Damaged boards and railings replaced, with the underlying cause fixed",
      "Sanding and professionally applied stain",
      "Power wash and stain package: the full job in one visit at one price",
      "Wood and composite decks",
      "New deck builds in wood or composite on request",
    ],
    process: [
      { step: "01", title: "Free Assessment", description: "We inspect the deck in person and tell you whether it needs cleaning, refinishing or repair." },
      { step: "02", title: "Scope Walkthrough", description: "You see the scope and the cost before deciding anything." },
      { step: "03", title: "Restore", description: "We wash, repair, sand and stain as needed, then clean up." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Fix the cause", text: "When a board rots we look for the reason, such as trapped water or poor drainage, so the repair lasts." },
    faqs: [
      { question: "How often should a deck be cleaned?", answer: "At least once a year, ideally before or after the rainy season. Shaded or damp decks need it more often." },
      { question: "Does my deck need repair or just cleaning?", answer: "Soft, spongy or loose boards and railings need repair. Wood that is dirty but solid usually needs only cleaning or refinishing." },
      { question: "Is refinishing cheaper than replacing?", answer: "Usually, yes. Replacement becomes necessary when the structural framing has failed." },
      { question: "How long does deck stain last?", answer: "Generally several years, depending on the product, sun exposure and foot traffic. Sunny decks need restaining sooner than shaded ones." },
      { question: "Do you work on composite decks?", answer: "Yes. We clean and repair both wood and composite decks." },
      { question: "Can you clean and stain my deck in one visit?", answer: "Yes. Our power wash and stain package covers the full job in one visit at one price." },
      { question: "Do you replace individual boards and railings?", answer: "Yes. We replace damaged boards and railings and fix the underlying cause, so the same spot doesn't fail again." },
      { question: "Is pressure washing safe for an older deck?", answer: "For older and delicate wood we use a soft wash instead of full pressure, which cleans without tearing up the surface." },
      { question: "Do you build new decks?", answer: "Yes. We build new decks in wood or composite on request." },
    ],
    related: ["pressure-washing-portland", "fence-repair-portland", "dry-rot-repair"],
  },

  // ───────────────────────── HOME SERVICES ─────────────────────────
  {
    slug: "pressure-washing-portland",
    group: "home",
    icon: "spray",
    popular: true,
    title: "Pressure Washing",
    shortTitle: "Pressure Washing",
    blurb: "Decks, siding, patios, driveways and walkways cleaned with commercial equipment.",
    metaTitle: "Pressure Washing | Portland OR & Vancouver WA",
    metaDescription:
      "Pressure washing and soft washing for decks, siding, patios, driveways and pavers in Portland and Vancouver WA. Licensed, bonded and insured. Call (503) 209-2023.",
    heroHeading: "Pressure Washing",
    heroSubheading: "Clear the moss, mildew and grime that make surfaces slick and tired-looking.",
    intro:
      "We inspect the surface first, then choose the right approach: full pressure for concrete and pavers, a gentler soft wash for older wood and delicate surfaces.",
    includes: [
      "Decks, siding, patios, concrete, driveways and paving stones",
      "Soft washing for older wood and delicate surfaces",
      "Commercial-grade equipment",
      "Pre-work inspection with findings and a recommendation",
      "Optional waterproof stain after a deck wash, in the same visit",
      "Shared outdoor spaces for HOA communities",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Not for roofs", text: "We never pressure wash a roof. Moss on shingles is removed by hand to protect the granules." },
    faqs: [
      { question: "What surfaces do you pressure wash?", answer: "Decks, siding, patios, concrete, driveways, walkways, paving stones and fences." },
      { question: "What is soft washing?", answer: "A lower-pressure cleaning method we use on older wood and delicate surfaces that full pressure could damage." },
      { question: "Can you stain my deck after washing it?", answer: "Yes. Our power wash and stain package covers both in one visit." },
      { question: "Can pressure washing damage siding or wood?", answer: "Too much pressure can. We inspect the surface first and use soft washing on older wood and delicate surfaces." },
      { question: "Do you pressure wash roofs?", answer: "No. Pressure washing strips the protective granules off shingles. For roofs, we remove moss by hand instead." },
      { question: "How often should a driveway or patio be pressure washed?", answer: "About once a year is typical in our climate, because shade and rain encourage moss and algae that make concrete and pavers slippery." },
      { question: "Do you pressure wash for HOA communities?", answer: "Yes. We pressure wash shared outdoor spaces for HOA communities." },
    ],
    related: ["deck-cleaning-deck-repair-deck-restoration", "siding-repair-portland", "moss-removal-portland"],
  },
  {
    slug: "siding-repair-portland",
    group: "home",
    icon: "siding",
    title: "Siding Repair",
    shortTitle: "Siding Repair",
    blurb: "Cracked, punctured or peeling siding repaired and matched to your home.",
    metaTitle: "Siding Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Siding repair for cracked, damaged or poorly installed siding in Portland and Vancouver WA. Materials matched to your home. Free estimate. Call (503) 209-2023.",
    heroHeading: "Siding Repair",
    heroSubheading: "Fix cracked or peeling siding before water finds its way behind it.",
    intro:
      "Siding is your home's rain jacket. Small cracks and gaps let moisture in, and in our climate that leads to rot. We repair the damage and match the existing look.",
    includes: [
      "Repair of cracked, damaged or poorly installed siding",
      "Puncture repair",
      "Chipped and peeling paint repair",
      "Siding cleaning and pressure washing",
      "Siding installation and replacement on request",
      "Maintenance plans for HOA communities",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Matched materials", text: "We match materials to your home's existing style, or provide labor only if you supply them." },
    faqs: [
      { question: "When should siding be repaired?", answer: "As soon as you see cracks, holes, loose boards or peeling paint. Each one is a path for water to get behind the siding." },
      { question: "Will the repair match the rest of my house?", answer: "We match materials to the existing style of your home as closely as possible." },
      { question: "What if there is rot behind the siding?", answer: "We'll show you, explain the cause and give you a price for the dry rot repair before doing any additional work." },
      { question: "What siding problems do you repair?", answer: "Cracked, damaged or poorly installed siding, punctures, and chipped or peeling paint." },
      { question: "Can you replace siding instead of repairing it?", answer: "Yes. Siding installation and replacement are available on request when a repair isn't enough." },
      { question: "Do you clean siding?", answer: "Yes. Siding cleaning and pressure washing are part of the service." },
    ],
    related: ["dry-rot-repair", "trims-around-houses", "pressure-washing-portland"],
  },
  {
    slug: "fence-repair-portland",
    group: "home",
    icon: "fence",
    title: "Fence Repair & Staining",
    shortTitle: "Fence Repair",
    blurb: "Boards, posts and gates repaired, plus cleaning and staining.",
    metaTitle: "Fence Repair & Staining | Portland OR & Vancouver WA",
    metaDescription:
      "Fence repair in Portland and Vancouver WA: leaning posts, broken boards, gates, staining and refinishing for cedar, privacy, picket and hogwire fences. (503) 209-2023.",
    heroHeading: "Fence Repair & Staining",
    heroSubheading: "Leaning posts, broken boards and sagging gates fixed, then protected with a fresh stain.",
    intro:
      "We evaluate the whole fence, not just the broken section, and build a repair or maintenance plan around what will actually keep it standing.",
    includes: [
      "Wood board repair and replacement",
      "Leaning or broken post repair and replacement",
      "Gate repair and replacement",
      "Pest and weather damage repair",
      "Pressure washing, staining and refinishing",
      "Cedar, privacy, picket and hogwire fences",
      "New fence installation on request",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Staining schedule", text: "Most fences in our area benefit from staining about every four years." },
    faqs: [
      { question: "When should I call about my fence?", answer: "Loose or missing boards, rot or insect damage, leaning posts, rusty hardware and gates that won't latch are all worth a look." },
      { question: "How much does fence repair cost?", answer: "It depends on the extent of the damage. We give you a free estimate based on what your fence actually needs." },
      { question: "How often should a fence be stained?", answer: "About every four years for most fences in the Portland and Vancouver area." },
      { question: "Can you fix a leaning fence?", answer: "Yes. A lean usually means a post has rotted or come loose at the base. We repair or replace the post and re-secure the fence." },
      { question: "Should I repair or replace my fence?", answer: "If the damage is limited to a few boards, a gate or a post or two, repair makes sense. When most of the posts have rotted, a new fence is usually the better value, and we install new fences on request." },
      { question: "What types of fences do you work on?", answer: "Cedar, privacy, picket and hogwire fences, including the gates." },
      { question: "Do you stain and refinish fences?", answer: "Yes. We pressure wash, stain and refinish fences." },
    ],
    related: ["deck-cleaning-deck-repair-deck-restoration", "pressure-washing-portland", "landscape-maintenance-portland"],
  },
  {
    slug: "dry-rot-repair",
    group: "home",
    icon: "rot",
    title: "Dry Rot Repair",
    shortTitle: "Dry Rot Repair",
    blurb: "Find the moisture source, replace the damaged wood, stop it coming back.",
    metaTitle: "Dry Rot Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Dry rot repair for homes and businesses in Portland and Vancouver WA. We find the moisture source, replace damaged wood and fix the cause. Call (503) 209-2023.",
    heroHeading: "Dry Rot Repair",
    heroSubheading: "Rot spreads quietly. We find where the water is coming from and repair the damage it left.",
    intro:
      "Replacing rotted wood without fixing the leak behind it only buys time. Our repair starts with the cause, then restores the structure.",
    includes: [
      "Inspection to find the root cause and every affected area",
      "Replacement of wood that can't be saved",
      "Repair of the leak or siding and roofing issue feeding the rot",
      "Price, timeline and scope laid out before work starts",
      "Homes of all sizes and commercial buildings",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Act early", text: "Dry rot gets more expensive the longer it sits. Early repair prevents structural damage." },
    faqs: [
      { question: "What causes dry rot?", answer: "Moisture combined with fungal growth, usually from a leak, a plumbing problem or poor ventilation." },
      { question: "How do I spot dry rot?", answer: "Look for wood that is discolored, cracked, soft or sunken, and for a musty smell." },
      { question: "How can I prevent it?", answer: "Fix leaks quickly, keep gutters clear, maintain paint and caulk, make sure crawl spaces and attics are ventilated, and have vulnerable areas inspected." },
      { question: "Is dry rot serious?", answer: "Yes. It spreads through damp wood and weakens it, so a small trim or siding repair can become a structural one if it's left alone." },
      { question: "Where does dry rot usually show up?", answer: "Around windows and doors, at the bottom of siding and trim, on decks and railings, on fascia boards behind gutters, and anywhere water sits." },
      { question: "Can rotted wood be saved?", answer: "Wood that can't be saved is replaced. We also repair the leak or the siding or roofing issue feeding the rot, so it doesn't come back." },
      { question: "Will I know the cost before you start?", answer: "Yes. Price, timeline and scope are laid out before work starts." },
    ],
    related: ["siding-repair-portland", "trims-around-houses", "gutter-replacement"],
  },
  {
    slug: "trims-around-houses",
    group: "home",
    icon: "trim",
    title: "Exterior Trim Repair & Installation",
    shortTitle: "Exterior Trim",
    blurb: "New trim, trim repair and updates that seal out moisture.",
    metaTitle: "Exterior Trim Repair & Installation | Portland OR & Vancouver WA",
    metaDescription:
      "Exterior trim installation and repair for homes and businesses in Portland and Vancouver WA. Protect against moisture and sharpen curb appeal. Call (503) 209-2023.",
    heroHeading: "Exterior Trim",
    heroSubheading: "Trim does two jobs: it finishes the look of the house and keeps water out of the joints.",
    intro:
      "Cracked, warped or rotting trim lets moisture in around windows, doors and corners. We repair or replace it and can update the style while we're there.",
    includes: [
      "New trim installation",
      "Repair of cracked, warped or misaligned trim",
      "Trim design updates",
      "Replacement of water-damaged or pest-damaged pieces",
      "Homes and commercial buildings",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Signs trim needs attention", text: "Cracks, warping, mold or mildew, visible water damage, pest activity, and fading or peeling paint." },
    faqs: [
      { question: "Why does trim matter?", answer: "It seals the gaps where siding meets windows, doors and corners. Failing trim is one of the most common ways water gets into a wall." },
      { question: "Can you match my existing trim?", answer: "We match materials to your home's existing style, or we can update the design if you want a new look." },
      { question: "When does trim need to be replaced?", answer: "When it is cracked, warped, pulling away, or soft from water or pest damage. Paint that keeps peeling in one spot is often a sign of moisture behind it." },
      { question: "Do you repair trim or only replace it?", answer: "Both. We repair cracked, warped or misaligned trim and replace pieces that are water-damaged or pest-damaged." },
      { question: "Do you install trim on commercial buildings?", answer: "Yes. We install and repair trim on homes and commercial buildings." },
    ],
    related: ["siding-repair-portland", "dry-rot-repair", "handyman-portland"],
  },
  {
    slug: "drainage-services",
    group: "home",
    icon: "drain",
    title: "Drainage Services",
    shortTitle: "Drainage",
    blurb: "Standing water in the yard, crawl space or basement diagnosed and fixed.",
    metaTitle: "Drainage Services | Portland OR & Vancouver WA",
    metaDescription:
      "Drainage solutions for standing water in yards, crawl spaces and basements in Portland and Vancouver WA: French drains, pumps, rain gardens and more. (503) 209-2023.",
    heroHeading: "Drainage Services",
    heroSubheading: "Standing water doesn't fix itself. We find where it's coming from and give it somewhere to go.",
    intro:
      "Blocking water at the point it shows up rarely works. We diagnose the root cause, then recommend a solution with options, cost and timeline before any work begins.",
    includes: [
      "French drains",
      "Pumps that move water away from problem areas",
      "Rain gardens",
      "Interior drainage systems",
      "New gutters where roof runoff is the cause",
      "Vapor barrier seam sealing",
      "Restoration of damaged flooring or insulation",
    ],
    process: [
      { step: "01", title: "Tell Us What's Happening", description: "Describe the problem in detail. If it's an emergency, we give you immediate steps." },
      { step: "02", title: "Diagnosis", description: "A specialist visits to find the root cause." },
      { step: "03", title: "Solution", description: "We outline options, cost and timeline, answer your questions, then do the work." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Where we solve it", text: "Basements, crawl spaces, lawns, driveways and around the foundation." },
    faqs: [
      { question: "What drainage problems do you fix?", answer: "Standing water in yards, wet crawl spaces and basements, water against the foundation, and runoff from roofs and driveways." },
      { question: "Do you handle sewer or septic problems?", answer: "No. We don't do sewer, septic or foundation work, but we can tell you if that's what your problem looks like." },
      { question: "What drainage solutions do you install?", answer: "French drains, pumps that move water away from problem areas, rain gardens and interior drainage systems." },
      { question: "How do I know if I have a drainage problem?", answer: "Standing water after rain, soggy areas in the lawn, a damp or musty crawl space, and water collecting against the foundation are the usual signs." },
      { question: "Can gutters cause drainage problems?", answer: "Yes. Clogged gutters and downspouts that empty next to the house are a common source of water at the foundation. Where roof runoff is the cause, we install new gutters." },
      { question: "Do you repair damage caused by water?", answer: "Yes. We restore damaged flooring and insulation and seal vapor barrier seams." },
    ],
    related: ["gutter-replacement", "gutter-repair-portland", "landscape-maintenance-portland"],
  },
  {
    slug: "plumbing-leaks",
    group: "home",
    icon: "pipe",
    title: "Plumbing Leak Repair",
    shortTitle: "Plumbing Leak Repair",
    blurb: "Dripping faucets, running toilets and small leaks fixed for good.",
    metaTitle: "Plumbing Leak Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Small plumbing leak repairs for faucets, toilets, tubs, showers and drains in Portland and Vancouver WA homes and businesses. Call (503) 209-2023.",
    heroHeading: "Plumbing Leak Repair",
    heroSubheading: "A small leak wastes water every day and damages whatever is underneath it.",
    intro:
      "We inspect the problem, explain the repair options with cost and timeline, and fix it so it stays fixed. If it can't be done on the spot, we schedule a time that suits you.",
    includes: [
      "Sink faucets",
      "Toilets",
      "Bathtubs and showers",
      "Drains",
      "Visible water-line leaks",
      "Complete clean-up afterward",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "What we don't do", text: "Sewer and septic work is outside our scope. We'll tell you up front if your problem needs a specialist." },
    faqs: [
      { question: "What kinds of leaks do you repair?", answer: "Small plumbing leaks at faucets, toilets, tubs, showers, drains and accessible water lines, in homes and businesses." },
      { question: "Do you work on sewer or septic lines?", answer: "No. Sewer, septic and foundation work is outside what we do." },
      { question: "What should I do if I find a leak?", answer: "Shut off the water at the fixture's valve, or at the main if you can't find it, and call us. Even a slow drip can damage cabinets, flooring and drywall over time." },
      { question: "Do you repair running toilets and dripping faucets?", answer: "Yes. We repair leaks at sink faucets, toilets, bathtubs, showers and drains." },
      { question: "Do you clean up after the repair?", answer: "Yes. Complete clean-up is part of the job." },
    ],
    related: ["handyman-portland", "guest-ready-home-repairs", "drywall-installation"],
  },
  {
    slug: "cabinet-repair",
    group: "home",
    icon: "cabinet",
    title: "Cabinet Repair & Refinishing",
    shortTitle: "Cabinet Repair",
    blurb: "Loose hinges, chipped doors and worn finishes repaired, not replaced.",
    metaTitle: "Cabinet Repair & Refinishing | Portland OR & Vancouver WA",
    metaDescription:
      "Kitchen cabinet repair and refinishing in Portland and Vancouver WA: hinges, hardware, chips, cracks and worn finishes. Less cost and waste than replacing. (503) 209-2023.",
    heroHeading: "Cabinet Repair & Refinishing",
    heroSubheading: "A new look for your kitchen at a fraction of the cost and waste of replacement.",
    intro:
      "Most tired cabinets are structurally fine. We repair what is broken and refinish what is worn, and we handle the project from start to clean-up.",
    includes: [
      "Hardware re-secured and broken hinges replaced",
      "Chips and cracks repaired",
      "Deteriorating wood repaired",
      "Old paint or stain removed",
      "Refinishing and staining",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We look at the cabinets, identify damage and learn what you want them to look like." },
      { step: "02", title: "Recommendation", description: "You get a repair or refinishing plan with a timeline and cost estimate." },
      { step: "03", title: "Repair & Clean-Up", description: "We do the work and leave the kitchen clean." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Repair before replace", text: "Repairing and refinishing costs less and wastes less than tearing out sound cabinets." },
    faqs: [
      { question: "Can my cabinets be repaired instead of replaced?", answer: "In most cases, yes. Loose hardware, broken hinges, chips, cracks and worn finishes can all be repaired or refinished." },
      { question: "Do you refinish and stain cabinets?", answer: "Yes. We strip old paint or stain and apply a new finish." },
      { question: "What cabinet problems can you fix?", answer: "Loose hardware and broken hinges, chips and cracks, deteriorating wood, and worn paint or stain." },
      { question: "Is refinishing cheaper than new cabinets?", answer: "Usually. If the cabinet boxes are solid, repairing and refinishing them costs less than replacing them." },
    ],
    related: ["handyman-portland", "guest-ready-home-repairs", "drywall-installation"],
  },
  {
    slug: "light-fixture-replacements",
    group: "home",
    icon: "light",
    title: "Light Fixture Replacement",
    shortTitle: "Fixture Replacement",
    blurb: "Dated or damaged fixtures, fans, covers and shades swapped out cleanly.",
    metaTitle: "Light Fixture Replacement | Portland OR & Vancouver WA",
    metaDescription:
      "Light fixture replacement in Portland and Vancouver WA: ceiling lights, pendants, chandeliers, ceiling fans, covers and shades. Free estimate. Call (503) 209-2023.",
    heroHeading: "Light Fixture Replacement",
    heroSubheading: "Swap a failing or dated fixture for something that works and suits the room.",
    intro:
      "We assess the existing fixture and the area around it, talk through what you want, then handle the replacement and the clean-up.",
    includes: [
      "Ceiling lights and pendants",
      "Chandeliers and ceiling fans",
      "Replacement covers, globes and glass shades",
      "LED tube light upgrades",
      "Dust, debris and packaging removed when we're done",
    ],
    process: [
      { step: "01", title: "Inspection", description: "An on-site look at the fixture and a conversation about your goals." },
      { step: "02", title: "Planning", description: "We sort out the details and help you settle on the right replacement." },
      { step: "03", title: "Replacement & Clean-Up", description: "The fixture goes in and the space is left as clean as we found it." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Repair or replace?", text: "Repair is sometimes possible, but replacement is often the more economical choice." },
    faqs: [
      { question: "When should I replace a light fixture?", answer: "When it is visibly damaged, no longer works reliably, looks dated after a remodel, or doesn't give the room the light it needs." },
      { question: "Do you install heavy fixtures like chandeliers and fans?", answer: "Yes. Tell us what you have in mind and we'll confirm the details at the assessment." },
      { question: "What kinds of fixtures do you replace?", answer: "Ceiling lights, pendants, chandeliers and ceiling fans. We also replace covers, globes and glass shades, and upgrade to LED tube lights." },
      { question: "Do you clean up after the installation?", answer: "Yes. Dust, debris and packaging are removed when we're done." },
    ],
    related: ["handyman-portland", "guest-ready-home-repairs", "drywall-installation"],
  },
  {
    slug: "drywall-installation",
    group: "home",
    icon: "drywall",
    title: "Drywall Installation & Repair",
    shortTitle: "Drywall",
    blurb: "New walls, patched holes and ceiling repairs with clean, flat finishes.",
    metaTitle: "Drywall Installation & Repair | Portland OR & Vancouver WA",
    metaDescription:
      "Drywall installation and repair for homes and offices in Portland and Vancouver WA: new rooms, dividers, closets, patches and ceilings. Free estimate. (503) 209-2023.",
    heroHeading: "Drywall Installation & Repair",
    heroSubheading: "From a fist-sized patch to a new room, finished so you can't tell where the work was done.",
    intro:
      "Good drywall work disappears. That means no visible fasteners, no uneven joints and frames that line up. Every project starts with an assessment and a plan built for your space.",
    includes: [
      "New rooms and room dividers",
      "Closets",
      "Damaged ceiling repair",
      "Hole and crack patching",
      "Bathrooms, living rooms, basements and bedrooms",
      "Homes and offices",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "The finish matters", text: "We sweat the details that show: flat joints, hidden fasteners and aligned frames." },
    faqs: [
      { question: "Do you do small drywall repairs?", answer: "Yes. We patch holes and cracks as well as hanging drywall for whole rooms." },
      { question: "Do you work in offices?", answer: "Yes. We install and repair drywall in both homes and offices." },
      { question: "What drywall work do you do?", answer: "New rooms, room dividers and closets, damaged ceiling repair, and hole and crack patching." },
      { question: "Can you repair a damaged ceiling?", answer: "Yes. We repair damaged ceilings as well as walls. If a leak caused the damage, the leak needs to be fixed first so the repair lasts." },
    ],
    related: ["handyman-portland", "guest-ready-home-repairs", "dry-rot-repair"],
  },
  {
    slug: "handyman-portland",
    group: "home",
    icon: "hammer",
    popular: true,
    title: "Handyman Services",
    shortTitle: "Handyman Services",
    blurb: "The whole to-do list handled in one visit by a licensed crew.",
    metaTitle: "Handyman Services | Portland OR & Vancouver WA",
    metaDescription:
      "Licensed handyman services in Portland and Vancouver WA: mounting, doors, locks, drywall, dry rot, cabinets, small plumbing and more. Up-front quotes. (503) 209-2023.",
    heroHeading: "Handyman Services",
    heroSubheading: "No job is too big or too small. Hand us the list and we'll fix it all at once.",
    intro:
      "We bring the tools and materials, handle the prep and the clean-up, and give you a quote up front so there are no surprises.",
    includes: [
      "TV and shelf mounting",
      "Door, doorjamb, latch and lock repair",
      "Window and door replacement",
      "Drywall, dry rot and cabinet repair",
      "Sprinkler head replacement",
      "Small plumbing repairs",
      "Fences, siding, decks, gutters and pressure washing",
    ],
    pricing: { headline: "Up-front quote", note: "You know the price before we start. We bring the tools and materials and handle prep and clean-up." },
    callout: { title: "Bundle the list", text: "Group your small repairs into a single visit. It costs less than calling someone for each one." },
    faqs: [
      { question: "What handyman jobs do you take?", answer: "Mounting, door and lock repair, drywall, dry rot, cabinets, small plumbing, sprinkler heads, window and door replacement, and most exterior repairs." },
      { question: "Do I need to supply materials?", answer: "No. We bring the tools and materials. If you would rather supply your own, we can provide labor only." },
      { question: "Is your work guaranteed?", answer: guaranteeText() },
      { question: "Will I know the price before you start?", answer: "Yes. You know the price before we start. We bring the tools and materials and handle prep and clean-up." },
      { question: "Can I combine several small jobs in one visit?", answer: "Yes. Give us the whole list and we price it together, so you know the total before we start." },
      { question: "Do you mount TVs and shelves?", answer: "Yes. TV and shelf mounting are among the jobs we take." },
    ],
    related: ["guest-ready-home-repairs", "drywall-installation", "plumbing-leaks"],
  },
  {
    slug: "hoa-maintenance",
    group: "home",
    icon: "hoa",
    popular: true,
    title: "HOA Maintenance",
    shortTitle: "HOA Maintenance",
    blurb: "Custom maintenance plans and on-demand repairs for communities of any size.",
    metaTitle: "HOA Maintenance Services | Portland OR & Vancouver WA",
    metaDescription:
      "HOA maintenance for condos, townhomes, apartments and subdivisions in Portland and Vancouver WA. Custom plans, emergency repairs, off-hours scheduling. (503) 209-2023.",
    heroHeading: "HOA Maintenance",
    heroSubheading: `One licensed contractor for roofs, gutters, grounds and repairs. More than ${FACTS.hoaYears} years serving HOAs.`,
    intro:
      "Boards and property managers use us as a single point of contact for the whole community: scheduled maintenance that prevents problems, and fast response when something breaks.",
    includes: [
      "Custom ongoing maintenance packages",
      "On-demand and emergency repairs",
      "Roof inspections, roof cleaning and leak repair",
      "Community-wide gutter cleaning and repair",
      "Landscaping, fences, siding, decks and patios",
      "Pressure washing of shared spaces and junk removal",
      "Weekend and off-hours scheduling to limit disruption to residents",
    ],
    process: [
      { step: "01", title: "Free On-Site Quote", description: "We walk the property with you and learn what the community needs." },
      { step: "02", title: "Custom Plan", description: "You get a plan sized to the community: ongoing, on-demand or both." },
      { step: "03", title: "Reliable Service", description: "Scheduled work happens on schedule, and urgent problems get a fast response." },
    ],
    pricing: { headline: "Free on-site quote", note: "Plans are built around the size and needs of your community. There's no charge for the walkthrough or the quote." },
    callout: { title: "Communities we serve", text: "Condos, townhome communities, apartment complexes and subdivisions of any size." },
    faqs: [
      { question: "Can an HOA hire you for ongoing maintenance?", answer: "Yes. We build custom maintenance and repair plans for condos, townhome communities, subdivisions and apartment complexes." },
      { question: "Do you handle emergencies?", answer: "Yes. Communities can use us on demand for urgent repairs as well as scheduled maintenance." },
      { question: "Can work be done outside business hours?", answer: "Yes. Weekend and off-hours scheduling is available to minimize disruption to residents." },
      { question: "What can an HOA maintenance plan cover?", answer: "Plans are built around your community and can include roof inspections, roof cleaning and leak repair, community-wide gutter cleaning and repair, landscaping, fences, siding, decks and patios, pressure washing of shared spaces and junk removal." },
      { question: "How much does an HOA maintenance plan cost?", answer: "Plans are built around the size and needs of your community. There's no charge for the walkthrough or the quote." },
      { question: "How long have you worked with HOAs?", answer: `More than ${FACTS.hoaYears} years.` },
    ],
    related: ["gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair", "landscape-maintenance-portland"],
  },
  {
    slug: "landscape-maintenance-portland",
    group: "home",
    icon: "landscape",
    title: "Landscaping & Landscape Maintenance",
    shortTitle: "Landscaping",
    blurb: "Mowing, trimming, weeding and clean-ups on a monthly plan or one time.",
    metaTitle: "Landscape Maintenance | Portland OR & Vancouver WA",
    metaDescription:
      "Landscape maintenance in Portland and Vancouver WA: mowing, trimming, pruning, weeding, bark and clean-ups. Monthly plans or one-time service. Call (503) 209-2023.",
    heroHeading: "Landscape Maintenance",
    heroSubheading: "A yard that stays tidy without taking your weekends.",
    intro:
      "Set up a monthly plan and the work simply gets done, whether you're home or not. Or book a one-time clean-up when things have gotten away from you.",
    includes: [
      "Lawn mowing, edging and lawn care",
      "Tree, bush and shrub trimming and pruning",
      "Weeding and weed control",
      "Fertilizing",
      "Bark spreading",
      "Raking, debris removal and seasonal clean-ups",
      "Monthly maintenance plans or one-time service",
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Bigger projects", text: "Planning something larger? We'll work with you on the vision and the plan." },
    faqs: [
      { question: "Do you offer recurring service?", answer: "Yes. Monthly maintenance plans keep the yard on a regular schedule, and you don't need to be home." },
      { question: "Can I book a one-time clean-up?", answer: "Yes. One-time clean-ups are available alongside recurring plans." },
      { question: "What does landscape maintenance include?", answer: "Lawn mowing, edging and lawn care, trimming and pruning of trees, bushes and shrubs, weeding and weed control, fertilizing, bark spreading, raking and seasonal clean-ups." },
      { question: "Do you trim trees and shrubs?", answer: "Yes. Tree, bush and shrub trimming and pruning are part of the service." },
      { question: "Do you remove the yard debris?", answer: "Yes. Raking and debris removal are part of the service." },
    ],
    related: ["yard-cleanup", "junk-removal-portland", "fence-repair-portland"],
  },
  {
    slug: "junk-removal-portland",
    group: "home",
    icon: "junk",
    title: "Junk Removal",
    shortTitle: "Junk Removal",
    blurb: `Hauling and disposal at $${FACTS.junkRemoval.perCubicYard} per cubic yard, $${FACTS.junkRemoval.minimum} minimum.`,
    metaTitle: "Junk Removal | Portland OR & Vancouver WA",
    metaDescription:
      "Junk hauling from a few items to whole-home cleanouts in Portland and Vancouver WA. $50 per cubic yard, $250 minimum. Same-day or next-day when available. (503) 209-2023.",
    heroHeading: "Junk Removal",
    heroSubheading: "A few items or a whole house. We load it, haul it and sweep up.",
    intro:
      "We visit, see what needs to go and give you a quote up front. Then the crew does the lifting, sorts what can be donated or recycled, and cleans up afterward.",
    includes: [
      "Single items up to whole-home cleanouts",
      "Appliances, including refrigerators and hot tubs",
      "E-waste: computers and printers",
      "Construction and remodeling debris",
      "Mattresses, scrap metal and yard waste",
      "Usable goods donated or recycled where possible",
    ],
    pricing: {
      headline: `$${FACTS.junkRemoval.perCubicYard} per cubic yard`,
      note: `$${FACTS.junkRemoval.minimum} minimum. You get an up-front quote after we see what needs to go. Same-day or next-day service depending on availability.`,
    },
    callout: { title: "Can't take it?", text: "If there's something we can't haul, we'll help you find another disposal option." },
    faqs: [
      { question: "How much does junk removal cost?", answer: `${junkPricingText()} We quote the job up front after seeing it.` },
      { question: "What do you take?", answer: "Appliances, e-waste, furniture, mattresses, construction debris, scrap metal, yard waste and general household junk." },
      { question: "How soon can you come?", answer: "Same-day or next-day service is available depending on our schedule." },
      { question: "Do you take appliances and hot tubs?", answer: "Yes. We haul appliances, including refrigerators and hot tubs." },
      { question: "Can you clear out a whole house?", answer: "Yes. We handle anything from a single item to a whole-home cleanout." },
      { question: "Do you take construction debris?", answer: "Yes. We take construction and remodeling debris, along with scrap metal and yard waste." },
      { question: "What happens to the items you haul away?", answer: "Usable goods are donated or recycled where possible." },
    ],
    related: ["yard-cleanup", "landscape-maintenance-portland", "hoa-maintenance"],
  },
  {
    slug: "guest-ready-home-repairs",
    group: "home",
    icon: "guest",
    title: "Guest-Ready Home Repairs",
    shortTitle: "Guest-Ready Repairs",
    blurb: "Every small repair on the list knocked out in one visit before company arrives.",
    metaTitle: "Guest-Ready Home Repairs | Portland OR & Vancouver WA",
    metaDescription:
      "One-visit home repairs before guests arrive: bathrooms, doors, lights, drywall patches, railings and more in Portland and Vancouver WA. Call (503) 209-2023.",
    heroHeading: "Guest-Ready Home Repairs",
    heroSubheading: "Company coming? Send us the list and we'll take care of it in as few trips as possible.",
    intro:
      "Write down what needs fixing, room by room, and send it over. We review the list, bring the parts and work through it together, so the house is ready before the doorbell rings.",
    includes: [
      "Guest bath: running toilets, dripping faucets, slow drains, caulk, towel bars, fans",
      "Guest room and living space: sticking doors, locks, drywall patches, hanging art and shelves",
      "Kitchen: sagging cabinet doors, loose hinges, sticky drawers",
      "Entry and exterior: porch lights, loose steps and railings, doorbells, weatherstripping",
      "Safety: smoke and CO detectors, grab bars, handrails, childproofing",
    ],
    process: [
      { step: "01", title: "Send Your List", description: "Go room by room and write down what needs attention." },
      { step: "02", title: "We Prep", description: "We review the list and bring the parts needed." },
      { step: "03", title: "One Visit", description: "The work gets done in as few trips as possible." },
    ],
    pricing: { headline: "Up-front quote", note: "We price the whole list together so you know the total before we start." },
    callout: { title: "Give us lead time", text: "Send your list a few weeks ahead so there's time to order specific locks or fixtures." },
    faqs: [
      { question: "How far ahead should I book?", answer: "A few weeks before guests arrive is ideal. That leaves time to order any specific parts." },
      { question: "What kinds of repairs can be bundled?", answer: "Almost any small repair: plumbing drips, doors and locks, drywall patches, light fixtures, cabinet doors, railings, weatherstripping and safety items." },
      { question: "What does a guest-ready visit usually cover?", answer: "Running toilets and dripping faucets in the guest bath, sticking doors and locks, drywall patches, sagging cabinet doors, porch lights, loose steps and railings, and smoke and CO detectors." },
      { question: "Will I know the total cost up front?", answer: "Yes. We price the whole list together so you know the total before we start." },
      { question: "Can you add safety items for older guests or kids?", answer: "Yes. We install grab bars and handrails, take care of smoke and CO detectors, and handle childproofing." },
    ],
    related: ["handyman-portland", "plumbing-leaks", "light-fixture-replacements"],
  },
  {
    slug: "yard-cleanup",
    group: "home",
    icon: "yard",
    title: "Yard Cleanup",
    shortTitle: "Yard Cleanup",
    blurb: "Leaves, debris and overgrowth cleared and hauled away.",
    metaTitle: "Yard Cleanup | Portland OR & Vancouver WA",
    metaDescription:
      "Yard cleanup in Portland and Vancouver WA: leaves, sticks, debris and overgrowth cleared and hauled away for homes and businesses. Call (503) 209-2023.",
    heroHeading: "Yard Cleanup",
    heroSubheading: "Reset an overgrown or storm-littered yard in a single scheduled visit.",
    intro:
      "Our crews know what Northwest weather does to a yard. We clear it, haul the debris away and can take on other landscaping work while we're there.",
    includes: [
      "Leaves, sticks and debris removed",
      "Overgrowth and eyesores cleared",
      "Lawn cleanup",
      "Debris hauled away",
      "Weed control and fertilizing on request",
      "Yards of every size, residential and commercial",
    ],
    process: [
      { step: "01", title: "Inspection", description: "We visit, or you describe the yard, and we talk through what you want done." },
      { step: "02", title: "Recommendation", description: "We propose the work and lay out price and timeline." },
      { step: "03", title: "Clean Up", description: "The crew arrives on the agreed day, clears everything and hauls it off." },
    ],
    pricing: FREE_ESTIMATE,
    callout: { title: "Keep it that way", text: "Ask about a monthly landscape maintenance plan after the cleanup." },
    faqs: [
      { question: "Do you haul the debris away?", answer: "Yes. Hauling is part of the cleanup." },
      { question: "Can you handle ongoing maintenance afterward?", answer: "Yes. We offer monthly landscape maintenance plans as well as one-time cleanups." },
      { question: "What does a yard cleanup include?", answer: "Removing leaves, sticks and debris, clearing overgrowth and eyesores, cleaning up the lawn, and hauling everything away." },
      { question: "Do you clean up overgrown yards?", answer: "Yes. We clear overgrowth in yards of every size, residential and commercial." },
      { question: "Can you add weed control or fertilizing?", answer: "Yes. Weed control and fertilizing are available on request." },
    ],
    related: ["landscape-maintenance-portland", "junk-removal-portland", "pressure-washing-portland"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesInGroup(group: ServiceGroup): ServiceData[] {
  return SERVICES.filter((s) => s.group === group);
}

/** Options shown in the estimate form's service dropdown. */
export const FORM_SERVICE_OPTIONS = [
  "Roof Repair or Inspection",
  "Roof Cleaning / Moss Removal",
  "Roof Replacement or Installation",
  "Gutter Cleaning",
  "Gutter Repair or Replacement",
  "Deck Cleaning, Repair or Restoration",
  "Pressure Washing",
  "Siding",
  "Fence Repair or Staining",
  "Dry Rot Repair",
  "Drywall",
  "Landscaping or Yard Cleanup",
  "Handyman / Several Small Repairs",
  "HOA Services",
  "Junk Removal",
  "Other",
];
