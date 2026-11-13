/**
 * Core identity for All Around Maintenance Inc.
 * Every fact here was published on the previous site. Facts the owner has not
 * confirmed yet (street address, hours, email, rating) come from env vars and
 * are simply not rendered while unset.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.allaroundmaintenanceinc.com"
).replace(/\/$/, "");

/**
 * Google Tag Manager container from the previous WordPress site, so its tags keep firing
 * after the domain moves. Set NEXT_PUBLIC_GTM_ID to "off" to disable it.
 */
const gtmEnv = process.env.NEXT_PUBLIC_GTM_ID?.trim();
export const GTM_ID = gtmEnv === "off" ? "" : gtmEnv || "GTM-KTHXVD7";

/** Meta (Facebook) domain verification code from the previous site. */
export const META_DOMAIN_VERIFICATION = "po5xqpw5zqg0pcrjq79tkht8g0keb9";

/** Public brand (titles, copy, schema). */
export const SITE_NAME = "All Around Maintenance";
export const LEGAL_NAME = "All Around Maintenance Inc.";
export const TAGLINE = "Roofs, Gutters & Decks. There's Nothing We Can't Handle.";
/** Npm `package.json` name and Vercel project slug. */
export const PROJECT_SLUG = "all-around-maintenance";

/** Portland line: the primary number site-wide. */
export const PHONE = "(503) 209-2023";
export const PHONE_HREF = "tel:+15032092023";
export const PHONE_RAW = "503-209-2023";
/** Vancouver, WA line: shown first on Washington pages. */
export const PHONE_WA = "(360) 772-0224";
export const PHONE_WA_HREF = "tel:+13607720224";
export const PHONE_WA_RAW = "360-772-0224";

export const EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || "";
export const HOURS = process.env.NEXT_PUBLIC_BUSINESS_HOURS?.trim() || "";

export const LICENSES = {
  oregonCcb: "202731",
  washington: "ALLARAM926JB",
} as const;
export const LICENSE_LINE = `OR CCB #${LICENSES.oregonCcb} · WA #${LICENSES.washington}`;

export const SOCIAL = {
  facebook: "https://www.facebook.com/allaroundmaintenanceinc/",
  instagram: "https://www.instagram.com/allaroundmaintenance/",
} as const;

export const ESTIMATE_PATH = "/free-estimate";

/**
 * Online estimate form and its email delivery (src/app/api/lead).
 * OFF for launch: the site is call-first and no lead endpoint is exposed.
 * To turn it on later: set this to true, add RESEND_API_KEY and NOTIFY_EMAIL
 * in Vercel, and redeploy. Every page and all copy switch over from this one flag.
 */
export const LEAD_FORM_ENABLED: boolean = false;

/** Absolute URL in the site's canonical form (trailing slash, matching `trailingSlash: true`). */
export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${clean}/`;
}

export const NAP = {
  name: LEGAL_NAME,
  phone: PHONE,
  phoneRaw: PHONE_RAW,
  phoneWaRaw: PHONE_WA_RAW,
  email: EMAIL,
  address: {
    city: "Vancouver",
    state: "WA",
    country: "US",
  },
  hours: HOURS,
  areaServed: [
    "Portland, OR", "Gresham, OR", "Fairview, OR", "Troutdale, OR", "Corbett, OR", "Beaverton, OR",
    "Cedar Hills, OR", "Aloha, OR", "Hillsboro, OR", "Tigard, OR", "Lake Oswego, OR", "West Linn, OR",
    "Milwaukie, OR", "Gladstone, OR", "Clackamas, OR", "Happy Valley, OR", "Wilsonville, OR",
    "Boring, OR", "Sandy, OR", "Estacada, OR",
    "Vancouver, WA", "Felida, WA", "Salmon Creek, WA", "Hockinson, WA", "Battle Ground, WA", "Camas, WA",
    "Washougal, WA", "Ridgefield, WA", "La Center, WA", "Woodland, WA", "Kalama, WA", "Longview, WA", "Kelso, WA",
  ],
  sameAs: [SOCIAL.facebook, SOCIAL.instagram] as string[],
  priceRange: "$$",
};

/** Washington pages lead with the Vancouver line; everything else with Portland. */
export function phoneFor(stateAbbr?: string) {
  return stateAbbr === "WA"
    ? { display: PHONE_WA, href: PHONE_WA_HREF }
    : { display: PHONE, href: PHONE_HREF };
}
