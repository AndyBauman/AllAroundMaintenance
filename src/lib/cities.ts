export interface CityData {
  /** Base slug. Page URL is `/${slug}-home-maintenance` (kept from the previous site). */
  slug: string;
  name: string;
  state: "Oregon" | "Washington";
  stateAbbr: "OR" | "WA";
  county: string;
  /** Counties and unincorporated communities read slightly differently in copy. */
  kind: "city" | "county" | "community";
  /** Neighborhoods or member cities. Optional: only listed where we're confident. */
  areas?: string[];
}

export const CITIES: CityData[] = [
  // ── Oregon ──
  { slug: "portland", name: "Portland", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "city",
    areas: ["Sellwood", "Laurelhurst", "Irvington", "Alberta", "St. Johns", "Hawthorne", "Multnomah Village", "Montavilla"] },
  { slug: "gresham", name: "Gresham", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "city",
    areas: ["Rockwood", "Powell Valley", "Pleasant Valley", "Gresham Butte", "Centennial"] },
  { slug: "fairview", name: "Fairview", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "city" },
  { slug: "troutdale", name: "Troutdale", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "city" },
  { slug: "corbett", name: "Corbett", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "community" },
  { slug: "beaverton", name: "Beaverton", state: "Oregon", stateAbbr: "OR", county: "Washington County", kind: "city",
    areas: ["Cedar Hills", "Murrayhill", "Sexton Mountain", "Progress Ridge", "West Slope"] },
  { slug: "cedar-hills", name: "Cedar Hills", state: "Oregon", stateAbbr: "OR", county: "Washington County", kind: "community" },
  { slug: "aloha", name: "Aloha", state: "Oregon", stateAbbr: "OR", county: "Washington County", kind: "community" },
  { slug: "hillsboro", name: "Hillsboro", state: "Oregon", stateAbbr: "OR", county: "Washington County", kind: "city",
    areas: ["Orenco", "Tanasbourne", "Reedville"] },
  { slug: "tigard", name: "Tigard", state: "Oregon", stateAbbr: "OR", county: "Washington County", kind: "city",
    areas: ["Bull Mountain", "Summerlake", "Metzger"] },
  { slug: "lake-oswego", name: "Lake Oswego", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city",
    areas: ["First Addition", "Lake Grove", "Palisades", "Mountain Park"] },
  { slug: "west-linn", name: "West Linn", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city",
    areas: ["Willamette", "Bolton", "Robinwood", "Sunset"] },
  { slug: "milwaukie", name: "Milwaukie", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city" },
  { slug: "gladstone", name: "Gladstone", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city" },
  { slug: "clackamas", name: "Clackamas", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "community" },
  { slug: "happy-valley", name: "Happy Valley", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city" },
  { slug: "wilsonville", name: "Wilsonville", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city",
    areas: ["Charbonneau", "Villebois"] },
  { slug: "boring", name: "Boring", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "community" },
  { slug: "sandy", name: "Sandy", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city" },
  { slug: "estacada", name: "Estacada", state: "Oregon", stateAbbr: "OR", county: "Clackamas County", kind: "city" },
  { slug: "multnomah-county", name: "Multnomah County", state: "Oregon", stateAbbr: "OR", county: "Multnomah County", kind: "county",
    areas: ["Portland", "Gresham", "Troutdale", "Fairview", "Wood Village", "Corbett"] },

  // ── Washington ──
  { slug: "vancouver", name: "Vancouver", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city",
    areas: ["Hazel Dell", "Felida", "Fisher's Landing", "Cascade Park", "Orchards", "Minnehaha"] },
  { slug: "felida", name: "Felida", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "community" },
  { slug: "salmon-creek", name: "Salmon Creek", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "community" },
  { slug: "hockinson", name: "Hockinson", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "community" },
  { slug: "battle-ground", name: "Battle Ground", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city" },
  { slug: "camas", name: "Camas", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city",
    areas: ["Prune Hill", "Grass Valley", "Lacamas Shores"] },
  { slug: "washougal", name: "Washougal", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city" },
  { slug: "ridgefield", name: "Ridgefield", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city" },
  { slug: "la-center", name: "La Center", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "city" },
  { slug: "woodland", name: "Woodland", state: "Washington", stateAbbr: "WA", county: "Cowlitz County", kind: "city" },
  { slug: "kalama", name: "Kalama", state: "Washington", stateAbbr: "WA", county: "Cowlitz County", kind: "city" },
  { slug: "longview", name: "Longview", state: "Washington", stateAbbr: "WA", county: "Cowlitz County", kind: "city" },
  { slug: "kelso", name: "Kelso", state: "Washington", stateAbbr: "WA", county: "Cowlitz County", kind: "city" },
  { slug: "clark-county", name: "Clark County", state: "Washington", stateAbbr: "WA", county: "Clark County", kind: "county",
    areas: ["Vancouver", "Camas", "Washougal", "Battle Ground", "Ridgefield", "La Center", "Salmon Creek", "Felida", "Hockinson"] },
];

/** Cities that also have a roof-focused page at `/roof-maintenance-${slug}`. */
export const ROOF_CITY_SLUGS = ["vancouver", "kelso", "la-center", "longview", "wilsonville"] as const;

export const CITY_SUFFIX = "-home-maintenance";
export const ROOF_CITY_PREFIX = "roof-maintenance-";

export function cityPath(slug: string): string {
  return `/${slug}${CITY_SUFFIX}`;
}

export function roofCityPath(slug: string): string {
  return `/${ROOF_CITY_PREFIX}${slug}`;
}

export function getCity(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function citiesInState(stateAbbr: "OR" | "WA"): CityData[] {
  return CITIES.filter((c) => c.stateAbbr === stateAbbr);
}

/** "Portland, OR" for cities; "Multnomah County, OR" reads fine for counties too. */
export function cityLabel(c: CityData): string {
  return `${c.name}, ${c.stateAbbr}`;
}

/** Up to five other places in the same state, starting with the neighbors in list order. */
export function nearbyCities(slug: string, count = 5): CityData[] {
  const city = getCity(slug);
  if (!city) return [];
  const sameState = citiesInState(city.stateAbbr);
  const i = sameState.findIndex((c) => c.slug === slug);
  const ring = [...sameState.slice(i + 1), ...sameState.slice(0, i)];
  return ring.slice(0, count);
}
