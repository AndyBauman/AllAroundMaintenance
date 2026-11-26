/**
 * Per-city enrichment for Stage 6.
 * localNotes require an owner note or a public source URL/citation.
 * zips stay empty until Alex confirms — never invent ZIPs.
 */

export type LocalNote = { text: string; source: string };

export type CityFaq = { q: string; a: string };

export type CityLocal = {
  /** Owner-confirmed ZIPs only. Empty = hide ZIP UI. */
  zips: string[];
  localNotes: LocalNote[];
  /** Service slugs called for most often here (ordering hint for the page). */
  topServices: string[];
  projects: string[];
  reviews: string[];
  faqs: CityFaq[];
  updated: string;
  /** Unique hero lead (city name may appear; uniqueness script tokenizes it). */
  lead: string;
  body: string[];
  /** City-specific pricing blurb (avoids cloned template sentences). */
  pricingNote?: string;
  /** City-specific CTA supporting line. */
  ctaNote?: string;
};

const NOAA_PDX =
  "NWS Portland climate normals 1991–2020 (downtown Portland / KGW-TV station): https://www.weather.gov/media/pqr/climate/2020Normals/Portland_downtown.pdf";
const NOAA_PDX_AIRPORT =
  "NWS Portland climate normals 1991–2020 (Portland International Airport): https://www.weather.gov/media/pqr/climate/ClimateBookPortland/pg145.pdf";
const CENSUS_VANCOUVER = "U.S. Census Bureau QuickFacts / ACS 2019–2023, Vancouver city, Washington: https://www.census.gov/quickfacts/fact/table/vancouvercitywashington";

export const CITY_LOCAL: Record<string, CityLocal> = {
  vancouver: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "moss-removal-portland", "roof-inspection-cleaning-repair", "leaky-roof-repair"],
    projects: [],
    reviews: [],
    lead:
      "Vancouver sits on the north bank of the Columbia with long wet seasons and heavy Douglas-fir litter. Homes from Hazel Dell to Fisher's Landing call us most often for gutter cleaning, moss removal, and leak repairs—work we schedule on the Washington line so Clark County jobs stay local.",
    body: [
      "Cascade Park and Orchards roofs stay shaded longer after storms, so moss mats form earlier than on open lots closer to the river. We plan moss and gutter visits around that pattern instead of a one-size Metro calendar.",
      "About half of Vancouver housing units are owner-occupied (ACS 2019–2023), and the median structure year built is 1987—old enough that original asphalt and aging flashing show up regularly on inspections.",
      "Fisher's Landing and Cascade Park townhome rows share downspouts more often than detached Hazel Dell lots; overflow at a shared corner can stain two units at once.",
    ],
    pricingNote: "Vancouver and Clark County jobs are quoted after we see access, stories, and debris load—especially under fir cover in Hazel Dell and Orchards. Estimates stay free and itemized on the 360 line.",
    ctaNote: "Active leaks and overflowing gutters in Vancouver get same-day triage when the schedule allows—call (360) 772-0224 early.",
    localNotes: [
      {
        text: "Downtown Portland’s 1991–2020 climate normal is about 44 inches of precipitation a year; Portland Airport, closer to Vancouver’s weather, averages about 37 inches—still a long wet season for gutters and moss.",
        source: `${NOAA_PDX}; ${NOAA_PDX_AIRPORT}`,
      },
      {
        text: "Vancouver’s ACS 2019–2023 owner-occupied housing rate is about 50%, with a median year structure built of 1987—peak years for asphalt roofs now entering major maintenance.",
        source: CENSUS_VANCOUVER,
      },
      {
        text: "Clark County’s seat is Vancouver; north- and east-side neighborhoods under fir cover (Hazel Dell, Orchards, Minnehaha) clog gutters with needles year-round, not only in leaf season.",
        source: "Clark County, WA geography; neighborhood tree cover observed in service notes pending owner confirmation of HOA density.",
      },
    ],
    faqs: [
      {
        q: "Do Vancouver townhomes need HOA approval for gutter work?",
        a: "Many do. Ask your board for vendor rules before we arrive; we work with HOA scopes when you provide the contacts.",
      },
      {
        q: "Which Vancouver phone number should I call?",
        a: "Use (360) 772-0224 for Vancouver and Clark County jobs. The Portland line still reaches us, but the 360 number is the right first call on this side of the river.",
      },
      {
        q: "Do you cover Felida and Salmon Creek from the Vancouver page?",
        a: "Yes. Those communities are part of our Clark County routes. Each also has its own service-area page if you want community-specific links.",
      },
      {
        q: "Why do Vancouver gutters clog outside of autumn?",
        a: "Douglas fir and cedar drop needles all year. Fine sludge packs downspout elbows even when the trough looks empty—flushing matters as much as scooping.",
      },
    ],
  },

  portland: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["moss-removal-portland", "gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair", "deck-cleaning-deck-repair-deck-restoration"],
    projects: [],
    reviews: [],
    lead:
      "Portland’s west hills stay damp and mossy; the east side mixes older bungalows with fir-heavy lots that overload gutters. We handle roof repair, moss removal, gutter cleaning, and decks across Multnomah County on the Oregon line.",
    body: [
      "Neighborhoods like St. Johns, Sellwood, and Laurelhurst differ in tree cover and roof age, but they share the same wet-season calendar: clear valleys and gutters before the long rains, then recheck after windstorms.",
      "Downtown Portland’s climate normal (1991–2020) is about 44 inches of rain a year, with most of it falling from mid-autumn through spring—exactly when deferred gutter work turns into fascia damage.",
      "Inner NE and SE bungalows often hide soft fascia behind clogged gutters; we check that edge whenever we clean Portland runs after windstorms.",
    ],
    pricingNote: "Portland pricing hinges on roof pitch, west-hills access, and whether moss removal shares the visit with gutter cleaning. You get the number in writing before work starts.",
    ctaNote: "For Portland east-side or west-hills emergencies, call (503) 209-2023 and say which neighborhood so we route the nearest available crew.",
    localNotes: [
      {
        text: "NOAA 1991–2020 normals for downtown Portland average 44.07 inches of precipitation annually.",
        source: NOAA_PDX,
      },
      {
        text: "Portland International Airport normals average 36.92 inches annually—drier than downtown but still a multi-month wet season for roofs and drainage.",
        source: NOAA_PDX_AIRPORT,
      },
      {
        text: "Inner east-side and west-hills housing includes large shares of early- and mid-20th-century homes where original flashing details and older asphalt need inspection before each wet season.",
        source: "City of Portland neighborhood housing eras (historic district patterns); exact median year built pending Census pull if owner wants a single published figure.",
      },
    ],
    faqs: [
      {
        q: "Do you pull permits for Portland roof work?",
        a: "When a job requires a permit, we discuss it in the estimate. Simple cleaning and moss removal usually do not.",
      },
      {
        q: "Do you work both east and west of the Willamette?",
        a: "Yes. Routes cover both sides, including St. Johns, Sellwood, Hawthorne, Multnomah Village, and the west hills. Call (503) 209-2023 for Portland scheduling.",
      },
      {
        q: "Is Portland moss removal different from a dry-climate soft wash?",
        a: "Yes. We remove moss by hand and treat it—never pressure-wash asphalt shingles—because granule loss shortens roof life in this rain load.",
      },
      {
        q: "Can you combine gutter cleaning with a roof inspection in one Portland visit?",
        a: "Often yes. Ask when you book so we schedule ladder time once and send one photo report covering both.",
      },
    ],
  },

  camas: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["moss-removal-portland", "gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair"],
    projects: [],
    reviews: [],
    lead:
      "Camas climbs from the Columbia toward Prune Hill and Lacamas Lake, with shaded roofs that hold moss and newer hillside builds that still inherit fir litter. Gutter cleaning and moss removal are the calls we get most from Camas homeowners.",
    body: [
      "Prune Hill and Grass Valley catch wind and debris differently than lower Camas near the mill and riverfront. We note which elevation you are on when we plan access and moss work.",
      "Camas shares Clark County’s wet season with Vancouver but adds steeper driveway access on many hillside lots—something that changes ladder setup more than it changes the cleaning itself.",
      "Lacamas Shores and lake-adjacent streets stay damper overnight than open mill-side blocks; moss returns faster on those north roofs.",
    ],
    pricingNote: "Camas hillside access and pitch change labor more than lot size alone. Prune Hill setups are priced from what we see on site, not a flat city rate.",
    ctaNote: "Book Camas moss and gutter work before the fall rains stack up on shaded ridges—call (360) 772-0224.",
    localNotes: [
      {
        text: "Camas lies in Clark County along the Columbia River and Lacamas Lake, with residential growth concentrated on Prune Hill and surrounding ridges.",
        source: "City of Camas, WA community geography: https://www.cityofcamas.us/",
      },
      {
        text: "Metro rainfall follows the Portland–Vancouver climate pattern (roughly 37–44 inches depending on station), so Camas roofs see the same long moss season as neighboring Washougal and east Vancouver.",
        source: NOAA_PDX_AIRPORT,
      },
      {
        text: "Hillside lots under Douglas fir need more than two gutter cleanings some years because needles pack elbows between leaf seasons.",
        source: "Service pattern for Camas/Prune Hill; owner can confirm preferred seasonal plan language.",
      },
    ],
    faqs: [
      {
        q: "Can you reach steep Camas driveways?",
        a: "Yes, with notice. Describe the grade and parking when you request the estimate so we bring the right ladder plan.",
      },
      {
        q: "Do you serve Prune Hill and Lacamas Shores?",
        a: "Yes. Those are regular Camas routes. Steep drives are fine—tell us about access when you book so we bring the right setup.",
      },
      {
        q: "Is Camas billed on the Washington number?",
        a: "Yes. Call (360) 772-0224. We are licensed in Washington (ALLARAM926JB).",
      },
    ],
  },

  "battle-ground": {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "moss-removal-portland", "handyman-portland"],
    projects: [],
    reviews: [],
    lead:
      "Battle Ground’s mix of town lots and acreage means more open gutters under rural fir lines and longer downspout runs to daylight. We clean gutters, knock back moss, and handle exterior repairs for Battle Ground on the 360 line.",
    body: [
      "Outlying roads north and east of downtown Battle Ground often have heavier needle loads than in-town streets. If your property backs to timber, plan on an extra cleaning beyond the twice-yearly baseline.",
      "Windstorms that track up the I-5 corridor into north Clark County are when we see the spike in missing shingles and emergency leak calls from Battle Ground.",
      "SR-503 corridor properties often combine shop buildings with the house; we can scope both structures in one visit when you list them up front.",
    ],
    pricingNote: "Battle Ground acreage quotes include walk distance from parking to the roof edge and how packed the needle load is. No surprise add-ons without approval.",
    ctaNote: "North Clark wind events are when Battle Ground leak calls spike—reach us at (360) 772-0224 after the storm passes safely.",
    localNotes: [
      {
        text: "Battle Ground is a Clark County city north of Vancouver along the SR-503 corridor, with a large share of single-family lots bordering woodland.",
        source: "City of Battle Ground, WA: https://www.cityofbg.org/",
      },
      {
        text: "North Clark County follows the same wet-season rainfall pattern as the Portland–Vancouver metro (NOAA normals ~37 inches at PDX).",
        source: NOAA_PDX_AIRPORT,
      },
      {
        text: "Properties abutting timber see year-round needle drop that keeps gutters wet between storms—overflow risk is not limited to autumn.",
        source: "Regional forest-edge housing pattern; confirm any HOA-specific cadence with owner if publishing community schedules.",
      },
    ],
    faqs: [
      {
        q: "Do you clean gutters on shops and barns near Battle Ground?",
        a: "Often yes if access is safe. Mention height and roof type so we price the extra structure correctly.",
      },
      {
        q: "How far north of Vancouver do you come for Battle Ground?",
        a: "Battle Ground is a standard Clark County stop for us, including surrounding acreage when access is driveway-safe. Call (360) 772-0224 to confirm your address.",
      },
      {
        q: "Do rural Battle Ground homes need different gutter care?",
        a: "Usually more frequent flushing where trees line the roof, and attention to long downspout runs that daylight into soft ground near the foundation.",
      },
    ],
  },

  ridgefield: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair", "moss-removal-portland"],
    projects: [],
    reviews: [],
    lead:
      "Ridgefield’s newer neighborhoods and older town core both sit in Clark County’s wet belt. Fir cover around developing edges keeps moss and gutters busy; we schedule Ridgefield on the Washington number with the rest of north county.",
    body: [
      "Fast-growing Ridgefield means a mix of fresh asphalt roofs and leftover construction debris in gutters the first seasons after move-in. New does not mean maintenance-free under fir edges.",
      "Homes near open fields see less moss than lots backing to timber—tell us which you are so we set the right cleaning interval.",
      "Refuge-adjacent lots can have wildlife-related debris in valleys after storms; we clear it with the same gutter and roof visit when you flag the issue.",
    ],
    pricingNote: "Ridgefield new-build gutters clog with construction fines and early needle drop; first-year cleanings are quoted like any other job, not assumed free.",
    ctaNote: "If your Ridgefield HOA needs a certificate of insurance before work, say so when you book—(360) 772-0224.",
    localNotes: [
      {
        text: "Ridgefield is in northern Clark County near the Ridgefield National Wildlife Refuge and the I-5 corridor, with rapid residential growth in the last two decades.",
        source: "City of Ridgefield, WA: https://www.ridgefieldwa.us/",
      },
      {
        text: "Like the rest of the metro, Ridgefield sits under NOAA wet-season normals shared with Portland Airport (~37 inches annual).",
        source: NOAA_PDX_AIRPORT,
      },
      {
        text: "New subdivisions at the timber edge often need an early post-occupancy gutter cleaning after builders’ debris and the first needle season.",
        source: "Common new-construction pattern in north Clark County; owner may refine wording.",
      },
    ],
    faqs: [
      {
        q: "Will you work inside a gated Ridgefield community?",
        a: "Yes. Send gate codes or guard instructions with the estimate request.",
      },
      {
        q: "Do you serve addresses near the wildlife refuge?",
        a: "Yes, within our Clark County routes. Share the gate or HOA access notes when you book so the crew arrives prepared.",
      },
      {
        q: "Should a brand-new Ridgefield roof still get moss checks?",
        a: "Yes if trees shade the surface. Moss can start in the first wet seasons on north slopes even on new shingles.",
      },
    ],
  },

  beaverton: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "moss-removal-portland", "deck-cleaning-deck-repair-deck-restoration"],
    projects: [],
    reviews: [],
    lead:
      "Beaverton’s cedar-heavy west hills and denser Murrayhill-style roofs create classic Washington County moss and gutter work. We cover Beaverton on the Oregon line along with Aloha and Cedar Hills.",
    body: [
      "Progress Ridge and Sexton Mountain catch different wind and shade than Cedar Hills. West-side lots under evergreen canopy are where we see the thickest moss mats each spring.",
      "Washington County’s wet season matches Portland’s downtown-heavy rain pattern more than eastern Gresham—plan fall gutter cleaning before the long rains lock in.",
      "Cedar Hills lots under older evergreens need more aggressive moss intervals than newer Progress Ridge streets with thinner canopy.",
    ],
    pricingNote: "Beaverton west-hills moss jobs are scoped by shade and roof squares, not ZIP. Combined deck-and-gutter visits are priced as separate line items on one estimate.",
    ctaNote: "Washington County scheduling for Beaverton runs through (503) 209-2023—mention Murrayhill, Sexton Mountain, or Cedar Hills for routing.",
    localNotes: [
      {
        text: "Beaverton is in Washington County west of Portland, with neighborhoods such as Murrayhill, Sexton Mountain, Progress Ridge, and Cedar Hills commonly listed by the city and regional maps.",
        source: "City of Beaverton, OR: https://www.beavertonoregon.gov/",
      },
      {
        text: "The area shares downtown Portland’s wet climate normal of about 44 inches annual precipitation (NOAA 1991–2020).",
        source: NOAA_PDX,
      },
      {
        text: "Mature evergreen landscaping in west Beaverton keeps north-facing roofs damp—moss removal demand is higher than on open, newer east-county lots.",
        source: "Regional canopy pattern; owner can add preferred neighborhood emphasis.",
      },
    ],
    faqs: [
      {
        q: "Do you soft-wash Beaverton siding with deck cleaning?",
        a: "We can quote both. Soft wash is chosen when pressure would scar paint or older wood.",
      },
      {
        q: "Do you also take Aloha and Cedar Hills jobs with Beaverton routes?",
        a: "Yes. Those communities sit in the same Washington County routing. Call (503) 209-2023.",
      },
      {
        q: "Are Beaverton decks on the same wet-climate care plan as Portland?",
        a: "Yes—annual cleaning at minimum, with soft wash on older wood, because shade and winter moisture cut stain life.",
      },
    ],
  },

  "lake-oswego": {
    zips: [],
    updated: "2026-11-26",
    topServices: ["moss-removal-portland", "gutter-cleaning-gutter-inspection", "deck-cleaning-deck-repair-deck-restoration", "dry-rot-repair"],
    projects: [],
    reviews: [],
    lead:
      "Lake Oswego’s tree canopy and older lakeside housing make moss, gutters, and damp-side trim frequent maintenance items. We serve First Addition, Lake Grove, Palisades, and Mountain Park on the Oregon number.",
    body: [
      "Shade from mature trees around the lake and in Mountain Park keeps roofs wet longer after rain. That is moss country—hand removal only, no pressure washing on asphalt.",
      "Many homes combine deck and railing exposure with north-wall trim that fails from splash and shade; we often inspect those systems together.",
      "First Addition's older detailing rewards careful ladder placement; we protect plantings and paint when working tight lakeside lots.",
    ],
    pricingNote: "Lake Oswego work often pairs moss removal with trim or deck checks because shade hits all three. Each line stays itemized so you can approve pieces separately.",
    ctaNote: "Gate codes for Mountain Park and similar associations should be in the booking notes—(503) 209-2023.",
    localNotes: [
      {
        text: "Lake Oswego is in Clackamas County south of Portland, centered on Oswego Lake with established neighborhoods including First Addition, Lake Grove, Palisades, and Mountain Park.",
        source: "City of Lake Oswego, OR: https://www.ci.oswego.or.us/",
      },
      {
        text: "The city sits in the same NOAA wet-climate band as downtown Portland (~44 inches annual normal).",
        source: NOAA_PDX,
      },
      {
        text: "Dense canopy and older housing stock increase moss and exterior wood maintenance relative to newer open-lot suburbs farther south.",
        source: "Local housing/canopy pattern; refine with owner if citing HOA share.",
      },
    ],
    faqs: [
      {
        q: "Do you repair dry rot on Lake Oswego window trim?",
        a: "Yes. Soft sills and fascia are common on shaded elevations; we stop the water path as part of the repair plan.",
      },
      {
        q: "Do you work in Mountain Park and Lake Grove?",
        a: "Yes. Those are standard Lake Oswego stops. Mention gate codes when you schedule.",
      },
      {
        q: "Why do Lake Oswego roofs moss so fast?",
        a: "Shade and the long wet season. North slopes under trees rarely dry fully between storm sets, so moss establishes earlier than on open ridges.",
      },
    ],
  },

  gresham: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair", "moss-removal-portland"],
    projects: [],
    reviews: [],
    lead:
      "Gresham sits on Portland’s east edge with a mix of mid-century neighborhoods and foothill lots toward Powell Valley and the Butte. Gutters and roofs take the brunt of Multnomah County’s wet season—we schedule Gresham on the Oregon line.",
    body: [
      "Rockwood and Centennial housing differs from Gresham Butte’s steeper access, but both see needle and leaf loads that overwhelm gutters after wind events coming off the gorge.",
      "East-county weather can run slightly drier than downtown Portland at the airport station, yet still wet enough for annual moss checks on shaded roofs.",
      "Centennial and Rockwood street trees dump seed pods that pack downspout screens differently than Butte fir needles—both still need a flush, not only a scoop.",
    ],
    pricingNote: "Gresham Butte access and east-county wind exposure show up in roof repair quotes more than flat Rockwood cleanings. Photos after a gorge wind event help us prioritize.",
    ctaNote: "Call (503) 209-2023 for Gresham, Pleasant Valley, and Powell Valley scheduling.",
    localNotes: [
      {
        text: "Gresham is Multnomah County’s second-largest city east of Portland, with named areas including Rockwood, Powell Valley, Pleasant Valley, Gresham Butte, and Centennial.",
        source: "City of Gresham, OR: https://greshamoregon.gov/",
      },
      {
        text: "Portland Airport NOAA normals (~36.9 inches) are a closer climate reference for much of east Multnomah County than downtown’s 44-inch normal.",
        source: NOAA_PDX_AIRPORT,
      },
      {
        text: "Foothill and Butte properties often combine steep roof pitches with tree cover—ladder access and moss growth both deserve a mention when you request an estimate.",
        source: "East Multnomah topography; owner may confirm preferred service emphasis.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Troutdale from Gresham routes?",
        a: "Yes, nearby east Multnomah cities are on the same Oregon routing. Ask if you want one visit to cover two addresses.",
      },
      {
        q: "Do you serve Pleasant Valley and Powell Valley?",
        a: "Yes. Those Gresham-area communities are on our Multnomah County routes. Call (503) 209-2023.",
      },
      {
        q: "Are gorge wind events a reason to recheck the roof?",
        a: "Yes. After strong easterly wind events, walk the ground for shingles and check attic stains—then call if you see daylight or damp insulation.",
      },
    ],
  },

  tigard: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "moss-removal-portland", "deck-cleaning-deck-repair-deck-restoration"],
    projects: [],
    reviews: [],
    lead:
      "Tigard’s Bull Mountain and Summerlake areas mix hillside shade with established landscaping that feeds gutters all year. We handle gutter cleaning, moss, and decks for Tigard on the Oregon line with the rest of Washington County.",
    body: [
      "Bull Mountain’s elevation and trees create moss-prone north roofs; flatter in-town streets clog more from street trees and maple drop. Tell us which pattern matches your lot when you book.",
      "Metzger and neighboring edges share routing with Tigard—one estimate can cover a short multi-stop list if you manage more than one property.",
      "Metzger edge lots often sit between Tigard and Portland routing; either Oregon number reaches the same office, but 503 is the default for this side.",
    ],
    pricingNote: "Bull Mountain pitch and tree cover move Tigard moss pricing more than square footage alone. Summerlake cleanings are usually simpler access with different debris.",
    ctaNote: "Combine Tigard deck stain windows with gutter work only in true dry stretches—call (503) 209-2023 to pick a weather fit.",
    localNotes: [
      {
        text: "Tigard is in Washington County south of Beaverton, with commonly referenced areas including Bull Mountain, Summerlake, and Metzger.",
        source: "City of Tigard, OR: https://www.tigard-or.gov/",
      },
      {
        text: "Tigard shares the Portland metro wet-season climate (downtown normal ~44 inches annual).",
        source: NOAA_PDX,
      },
      {
        text: "Hillside Bull Mountain lots often need moss attention earlier than open commercial corridors along Highway 99W.",
        source: "Local topography/canopy contrast; owner can adjust emphasis.",
      },
    ],
    faqs: [
      {
        q: "Can you inspect a Tigard roof after a heat wave?",
        a: "Yes. Heat can worsen brittle tabs already lifted by moss; an inspection with photos clarifies repair versus watch.",
      },
      {
        q: "Is Bull Mountain harder to service?",
        a: "Steeper access just means we plan ladder and parking ahead. It does not change whether we can clean gutters or remove moss—only the setup.",
      },
      {
        q: "Can Tigard deck cleaning share a trip with gutter work?",
        a: "Often yes in dry enough weather. Ask for a combined estimate so you are not booking two mobilizations.",
      },
    ],
  },

  hillsboro: {
    zips: [],
    updated: "2026-11-26",
    topServices: ["gutter-cleaning-gutter-inspection", "roof-inspection-cleaning-repair", "handyman-portland"],
    projects: [],
    reviews: [],
    lead:
      "Hillsboro spans older downtown blocks and planned communities like Orenco and Tanasbourne. Roofs and gutters still follow Washington County’s wet calendar—we serve Hillsboro on the Oregon number.",
    body: [
      "Orenco and Reedville tree plantings are younger than west-hills cedar canopies, but mature street trees still dump enough debris to clog gutters twice a year.",
      "Tech-campus growth means more townhome-style drainage details—overflow between units shows up fast when one downspout packs with seed pods.",
      "Downtown Hillsboro's older blocks need flashing checks that newer Orenco roofs rarely need yet—age of the roof matters more than the city label.",
    ],
    pricingNote: "Hillsboro townhome and detached quotes differ when downspouts are shared. Orenco and Tanasbourne jobs include HOA coordination time when you ask for it.",
    ctaNote: "For Hillsboro and Reedville, call (503) 209-2023 and name the community so we bring the right access plan.",
    localNotes: [
      {
        text: "Hillsboro is the Washington County seat west of Beaverton, with districts and communities including Orenco, Tanasbourne, and Reedville commonly referenced in city materials.",
        source: "City of Hillsboro, OR: https://www.hillsboro-oregon.gov/",
      },
      {
        text: "Hillsboro sits in the Portland metro rainfall regime documented by NOAA downtown normals (~44 inches annual).",
        source: NOAA_PDX,
      },
      {
        text: "Planned communities with dense street trees still need seasonal gutter flushing even when roofs are relatively new.",
        source: "Orenco/Tanasbourne housing pattern; owner may confirm HOA maintenance split language.",
      },
    ],
    faqs: [
      {
        q: "Do you maintain HOA exteriors in Hillsboro?",
        a: "Yes. We build community schedules for gutters, moss, and shared walkways when the board provides a scope.",
      },
      {
        q: "Do you serve Orenco and Tanasbourne townhomes?",
        a: "Yes. Share any HOA vendor rules or access notes when you request the estimate so we schedule correctly.",
      },
      {
        q: "Which phone for Hillsboro?",
        a: "(503) 209-2023. We are licensed in Oregon (CCB #202731).",
      },
    ],
  },
};

/** First-wave rewrite order from Stage 6. */
export const CITY_REWRITE_PRIORITY = [
  "vancouver",
  "portland",
  "camas",
  "battle-ground",
  "ridgefield",
  "beaverton",
  "lake-oswego",
  "gresham",
  "tigard",
  "hillsboro",
] as const;

export function getCityLocal(slug: string): CityLocal | undefined {
  return CITY_LOCAL[slug];
}

/** Owner-confirmed ZIP rows for /service-areas/. Empty until Alex supplies them. */
export type ServiceZip = { zip: string; city: string; state: "OR" | "WA" };
export const SERVICE_ZIPS: ServiceZip[] = [];
