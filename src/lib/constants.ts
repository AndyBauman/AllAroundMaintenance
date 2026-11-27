/**
 * Core identity for All Around Maintenance Inc.
 * Confirmed facts live in `src/data/business.ts`. Owner-pending fields stay empty there
 * and are not rendered until set.
 */
import {
  business,
  phoneDisplay,
  phoneHref,
  profileUrls,
} from "@/data/business";
import { CITIES } from "@/lib/cities";

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
export const SITE_NAME = business.name;
export const LEGAL_NAME = business.legalName;
export const TAGLINE = "Roofs, Gutters & Decks. There's Nothing We Can't Handle.";
/** Npm `package.json` name and Vercel project slug. */
export const PROJECT_SLUG = "all-around-maintenance";

/** Portland line: the primary number site-wide. */
export const PHONE = phoneDisplay(business.phones.or);
export const PHONE_HREF = phoneHref(business.phones.or);
export const PHONE_RAW = business.phones.or.replace(/^\+1/, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
/** Vancouver, WA line: shown first on Washington pages. */
export const PHONE_WA = phoneDisplay(business.phones.wa);
export const PHONE_WA_HREF = phoneHref(business.phones.wa);
export const PHONE_WA_RAW = business.phones.wa.replace(/^\+1/, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

export const EMAIL = business.email.trim();
export const SMS_NUMBER = business.smsNumber.trim();
/** Legacy single-line hours string; prefer hoursDisplayLines() from business.ts. */
export const HOURS = "";

export const LICENSES = {
  oregonCcb: business.licenses[0].number,
  washington: business.licenses[1].number,
} as const;
export const LICENSE_LINE = `OR CCB #${LICENSES.oregonCcb} · WA #${LICENSES.washington}`;

export const SOCIAL = {
  facebook: business.profiles.facebook,
  instagram: business.profiles.instagram,
} as const;

export const ESTIMATE_PATH = "/free-estimate";

/**
 * Call-first sentences in page copy, FAQs, and the mobile bar.
 * Left false so existing titles, descriptions, H1s, and FAQ JSON-LD stay as they are.
 * The quote form is shown either way. See src/components/LeadCapture.tsx.
 */
export const LEAD_FORM_ENABLED: boolean = false;

/** Absolute URL in the site's canonical form (trailing slash, matching `trailingSlash: true`). */
export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${clean}/`;
}

const areaLabels = CITIES.filter((c) => c.kind !== "county").map((c) => `${c.name}, ${c.stateAbbr}`);

export const NAP = {
  name: LEGAL_NAME,
  phone: PHONE,
  phoneRaw: PHONE_RAW,
  phoneWaRaw: PHONE_WA_RAW,
  email: EMAIL,
  address: {
    city: business.address.city || "Vancouver",
    state: business.address.region,
    country: "US",
  },
  hours: HOURS,
  areaServed: areaLabels,
  sameAs: profileUrls(),
  priceRange: "$$",
};

/** Washington pages lead with the Vancouver line; everything else with Portland. */
export function phoneFor(stateAbbr?: string) {
  return stateAbbr === "WA"
    ? { display: PHONE_WA, href: PHONE_WA_HREF }
    : { display: PHONE, href: PHONE_HREF };
}
