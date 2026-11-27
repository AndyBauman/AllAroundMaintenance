import type { Guide } from "./types";

const UPDATED = "2026-11-26";
const REVIEWED_BY = "Alex Svistun";

/**
 * New cost / "who do I call" guides — drafts until Alex reviews.
 * Not built or indexed while reviewed: false.
 */
export const DRAFT_GUIDES: Guide[] = [
  {
    slug: "gutter-cleaning-cost-portland-vancouver",
    title: "Gutter Cleaning Cost in Portland and Vancouver",
    description:
      "What drives gutter cleaning prices in Portland, OR and Vancouver, WA—and how to get an itemized estimate. Dollar amounts pending owner approval.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "gutter-cleaning-gutter-inspection",
    draft: true,
    reviewed: false,
    answer:
      "Gutter cleaning cost depends on home size and height, debris load, access, and whether repairs are found. Estimates are free and itemized. Published dollar ranges will appear here only after the owner approves them—until then, call for a quote on your house.",
    northwestHeading: "What local conditions change the price",
    northwest:
      "Fir needles and multi-story access are the usual cost drivers on this side of the river. Guards add inspection time but can cut how often a full scoop is needed.",
    needsOwner: ["Approved typical / from / minimum prices for gutter cleaning"],
    body: [
      { type: "h2", text: "What factors move the price?" },
      {
        type: "ul",
        items: ["Stories and ladder access", "Length of gutter runs", "Debris type and volume", "Repairs found during cleaning"],
      },
      { type: "h2", text: "When will numbers be listed here?" },
      {
        type: "p",
        text: "When Alex approves a price guide row for gutter cleaning. Until then this page stays draft and unpublished.",
      },
    ],
  },
  {
    slug: "roof-moss-removal-cost-shingles",
    title: "Roof Moss Removal Cost and Shingle Safety",
    description:
      "How moss removal is priced and why pressure washing harms asphalt shingles. Dollar amounts pending owner approval.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "moss-removal-portland",
    draft: true,
    reviewed: false,
    answer:
      "Moss should be removed by hand and treated—not pressure-washed—so shingle granules stay intact. Cost depends on roof size, pitch, and how thick the growth is. Exact dollar ranges wait on owner approval; inspections remain free.",
    northwestHeading: "Moss is normal here—damage is optional",
    northwest: "Shaded Portland and Vancouver roofs grow moss every wet season. Early hand removal is cheaper than waiting until tabs lift.",
    needsOwner: ["Approved moss removal price guide"],
    body: [
      { type: "h2", text: "Does moss removal harm shingles?" },
      {
        type: "p",
        text: "Done by hand with a proper treatment, no. Pressure washing can strip granules and shorten roof life—avoid it on asphalt.",
      },
      { type: "h2", text: "What still needs owner confirmation?" },
      { type: "checklist", items: ["Published from / typical price range", "Any package pricing with gutter cleaning"] },
    ],
  },
  {
    slug: "how-often-clean-gutters-fir-maple",
    title: "How Often to Clean Gutters Under Fir and Maple",
    description: "Cleaning frequency for Northwest homes under Douglas fir and maple—needles versus leaves, and seasonal timing.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "gutter-cleaning-gutter-inspection",
    draft: true,
    reviewed: false,
    answer:
      "Under maple, plan cleanings after major leaf drop and again in spring. Under fir or pine, needles fall year-round—expect more than two visits. Watch for overflow in ordinary rain; that means your interval is too long regardless of the calendar.",
    northwestHeading: "Tree cover sets the clock",
    northwest: "Clark County and east-Portland lots under mature firs clog differently than open Willamette Valley lots. Frequency is local, not generic.",
    body: [
      { type: "h2", text: "Fir versus maple—what changes?" },
      {
        type: "table",
        headers: ["Tree", "Pattern"],
        rows: [
          ["Maple / deciduous", "Heavy fall dump; spring cleanup"],
          ["Douglas fir / cedar", "Year-round needles; fine sludge in elbows"],
        ],
      },
      { type: "h2", text: "What is a sensible starting schedule?" },
      {
        type: "p",
        text: "Twice yearly minimum for most homes; add visits under dense evergreens. Scheduled plans exist for homes that clog predictably.",
      },
    ],
  },
  {
    slug: "roof-repair-or-replacement",
    title: "Roof Repair or Replacement: How to Decide",
    description: "How a photo inspection separates repairable leaks from roofs that need replacement in Portland and Vancouver.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "roof-replacement",
    draft: true,
    reviewed: false,
    answer:
      "Most leaks are repairable. Replacement makes sense when damage is widespread, the roof is past a practical service life, or repairs will not last. A free inspection with photos is how we decide—and we recommend replacement only when it is the better long-term option.",
    northwestHeading: "Moss and ventilation tip the scales",
    northwest: "Here, moss and attic ventilation problems can age a roof faster than calendar years alone suggest. Inspection beats guessing from the curb.",
    needsOwner: ["Any published replacement price bands beyond existing on-site ranges"],
    body: [
      { type: "h2", text: "When is repair enough?" },
      {
        type: "ul",
        items: ["Isolated missing shingles", "Localized flashing failure", "Single leak path with sound surrounding roof"],
      },
      { type: "h2", text: "When does replacement enter the conversation?" },
      {
        type: "p",
        text: "Widespread curling, repeated leaks, soft decking, or an inspection that shows repairs will not hold. You get that call in writing with the estimate.",
      },
    ],
  },
  {
    slug: "dry-rot-signs-repair-cost",
    title: "Dry Rot Signs and Repair Cost",
    description: "How to recognize dry rot and what drives repair pricing. Dollar amounts pending owner approval.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "dry-rot-repair",
    draft: true,
    reviewed: false,
    answer:
      "Soft, crumbly trim, bubbling paint, and staining at windows or fascia are classic signs. Cost depends on how far rot has traveled and whether water paths must be rebuilt. Published dollar ranges wait on owner approval; surprises behind trim are priced before work continues.",
    northwestHeading: "Chronic wet wood, not one flood",
    northwest: "Northwest rot often comes from slow overflow and splash-back, not a single dramatic leak.",
    needsOwner: ["Approved dry-rot repair price guide"],
    body: [
      { type: "h2", text: "What should you look for?" },
      {
        type: "checklist",
        items: ["Soft trim under light pressure", "Failed paint over spongy wood", "Musty odors after storms", "Gutter overflow above the damaged area"],
      },
      { type: "h2", text: "Why are prices not listed yet?" },
      { type: "p", text: "This guide stays draft until Alex approves dollar ranges. Scope varies too widely to invent a number." },
    ],
  },
  {
    slug: "gutter-guards-northwest",
    title: "Gutter Guards in the Northwest",
    description: "Do gutter guards help under fir and maple—and what they do not replace. Product recommendations pending owner confirmation.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "gutter-cleaning-gutter-inspection",
    draft: true,
    reviewed: false,
    answer:
      "Guards reduce large debris but fine needles and seeds still get through. They cut cleaning frequency for some homes; they do not eliminate inspections. Specific product recommendations wait until the owner confirms what the crew installs.",
    northwestHeading: "Needles test every guard design",
    northwest: "Douglas fir litter is the local stress test. Ask how a proposed guard handles fine debris, not only maple leaves.",
    needsOwner: ["Confirmed gutter-guard product recommendation"],
    body: [
      { type: "h2", text: "What guards help with" },
      { type: "ul", items: ["Large leaves and twigs", "Reducing how often a full scoop is needed"] },
      { type: "h2", text: "What they do not replace" },
      { type: "p", text: "Flushing downspouts, checking hangers, and periodic cleaning of fine buildup under or through the guard." },
    ],
  },
  {
    slug: "handyman-roofer-or-gutter-company",
    title: "Handyman, Roofer, or Gutter Company: Who to Call",
    description: "A simple decision guide for Portland and Vancouver homeowners choosing between handyman work, roofing, and gutter specialists.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "handyman-portland",
    draft: true,
    reviewed: false,
    answer:
      "Call a handyman for mixed small interior and exterior punch lists. Call a roof crew for leaks, moss, flashing, and shingle work. Call a gutter crew for cleaning, hangers, seams, and replacement runs. When the job crosses categories, ask for one coordinated estimate so visits are not duplicated.",
    northwestHeading: "One company can cover more than one lane",
    northwest:
      "All Around Maintenance handles roofs, gutters, decks, and handyman work across Portland and Vancouver—so you can often keep the project under one license and one schedule.",
    body: [
      { type: "h2", text: "Who should I call for what?" },
      {
        type: "table",
        headers: ["Problem", "Start with"],
        rows: [
          ["Ceiling drip / missing shingles", "Roof"],
          ["Overflowing gutters", "Gutter cleaning / repair"],
          ["Mixed punch list indoors and out", "Handyman"],
          ["Soft fascia under a clogged run", "Gutter + dry-rot assessment together"],
        ],
      },
    ],
  },
  {
    slug: "check-contractor-license-oregon-washington",
    title: "How to Check a Contractor's License in Oregon and Washington",
    description: "Use Oregon CCB search and Washington L&I Verify before you hire. Includes All Around Maintenance license numbers.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "handyman-portland",
    draft: true,
    reviewed: false,
    answer:
      "In Oregon, search the Construction Contractors Board. In Washington, use L&I Verify. Match the business name and license number to the person at your door. All Around Maintenance is OR CCB #202731 and WA #ALLARAM926JB.",
    northwestHeading: "Cross-river jobs need the right state",
    northwest: "A Portland crew on a Vancouver job should show Washington registration—and the reverse. Check the state where the property sits.",
    body: [
      { type: "h2", text: "Where do you look it up?" },
      {
        type: "ul",
        items: [
          "Oregon CCB search: https://search.ccb.state.or.us/search/",
          "Washington L&I Verify: https://secure.lni.wa.gov/verify/",
        ],
      },
      { type: "h2", text: "What should match?" },
      {
        type: "checklist",
        items: ["Legal business name", "License / registration number", "Active status", "The address state of your job"],
      },
    ],
  },
  {
    slug: "yearly-hoa-exterior-maintenance-schedule",
    title: "Yearly HOA Exterior Maintenance Schedule",
    description: "A sample year-round exterior schedule for HOA boards in the Portland–Vancouver area. Customize per community.",
    updated: UPDATED,
    reviewedBy: REVIEWED_BY,
    relatedService: "hoa-maintenance",
    draft: true,
    reviewed: false,
    answer:
      "HOAs in this climate usually need spring and fall gutter passes, roof moss checks on shaded buildings, shared-deck and fence inspections, and a storm follow-up plan. Build the calendar around wet-season risk, then assign vendors before leaf drop—not after the first overflow complaint.",
    northwestHeading: "Shared roofs amplify small delays",
    northwest: "One clogged run on a townhome row can stain several units. Seasonal contracts beat reactive tickets.",
    needsOwner: ["Any community-specific cadence Alex wants published as the default HOA plan"],
    body: [
      { type: "h2", text: "Sample yearly cadence" },
      {
        type: "table",
        headers: ["Window", "Shared-area focus"],
        rows: [
          ["Early spring", "Gutter pass, moss survey, deck soft-spot walk"],
          ["Early summer", "Fence and siding punch lists, stain windows"],
          ["Late fall", "Primary gutter cleaning after leaf drop"],
          ["After major storms", "Roof and drainage ticket triage"],
        ],
      },
      { type: "h2", text: "What should boards lock in writing?" },
      {
        type: "p",
        text: "Scope per building type, access rules, approval path for extras, and which phone line residents use for active leaks.",
      },
    ],
  },
];
