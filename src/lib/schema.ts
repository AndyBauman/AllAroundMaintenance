import {
  business,
  FOUNDER_ID_PATH,
  hasPublicAddress,
  openingHoursSpecification,
  profileUrls,
} from "@/data/business";
import { SITE_URL, SITE_NAME, absoluteUrl } from "./constants";
import { CITIES } from "./cities";
import { SERVICES } from "./services";

/** Stable @id for the business across all JSON-LD on the site. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}${FOUNDER_ID_PATH}`;

function e164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : digits.startsWith("1") && digits.length === 11 ? `+${digits}` : `+${digits}`;
}

function postalAddress(): Record<string, unknown> | undefined {
  if (!hasPublicAddress()) {
    // Service-area business: city/region only when we have a public locality; otherwise omit street-level address.
    if (!business.address.city.trim()) return undefined;
    return {
      "@type": "PostalAddress",
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: "US",
    };
  }
  return {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: "US",
  };
}

function geoCoordinates(): Record<string, unknown> | undefined {
  if (!hasPublicAddress()) return undefined;
  if (business.geo.lat == null || business.geo.lng == null) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  };
}

function areaServedNodes(): Record<string, unknown>[] {
  const cities = CITIES.filter((c) => c.kind !== "county").map((c) => ({
    "@type": "City",
    name: c.name,
    containedInPlace: {
      "@type": "State",
      name: c.state,
      addressCountry: "US",
    },
  }));
  const counties = [
    { name: "Multnomah County", state: "Oregon" },
    { name: "Washington County", state: "Oregon" },
    { name: "Clackamas County", state: "Oregon" },
    { name: "Clark County", state: "Washington" },
    { name: "Cowlitz County", state: "Washington" },
  ].map((c) => ({
    "@type": "AdministrativeArea",
    name: c.name,
    containedInPlace: { "@type": "State", name: c.state, addressCountry: "US" },
  }));
  return [...cities, ...counties];
}

function founderPerson(): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: business.founder.name,
    jobTitle: business.founder.title,
    url: absoluteUrl(business.founder.url),
    worksFor: { "@id": ORGANIZATION_ID },
    knowsLanguage: [...business.languages],
    image: `${SITE_URL}/about-team.jpg`,
  };
}

/**
 * Site-wide @graph: LocalBusiness + WebSite + Founder Person.
 * Empty owner fields are omitted. AggregateRating is never emitted (section 0 rule 5).
 */
export function siteWideGraphSchema() {
  const sameAs = profileUrls();
  const hours = openingHoursSpecification();
  const address = postalAddress();
  const geo = geoCoordinates();

  const businessNode: Record<string, unknown> = {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": ORGANIZATION_ID,
    name: business.legalName,
    alternateName: business.name,
    url: absoluteUrl("/"),
    description:
      "Family-owned roof, gutter, siding and deck repair and home maintenance company serving Portland, OR and Vancouver, WA since 1999. Licensed in Oregon and Washington.",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-schema.png`, width: 1200, height: 397 },
    image: [`${SITE_URL}/why-us.jpg`, `${SITE_URL}/about-team.jpg`],
    telephone: e164(business.phones.or),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: e164(business.phones.or),
        contactType: "customer service",
        areaServed: "US-OR",
        availableLanguage: [...business.languages],
      },
      {
        "@type": "ContactPoint",
        telephone: e164(business.phones.wa),
        contactType: "customer service",
        areaServed: "US-WA",
        availableLanguage: [...business.languages],
      },
    ],
    foundingDate: String(business.founded),
    founder: { "@id": FOUNDER_ID },
    priceRange: "$$",
    areaServed: areaServedNodes(),
    knowsLanguage: [...business.languages],
    knowsAbout: SERVICES.map((s) => s.shortTitle),
    paymentAccepted: [...business.payment],
    hasCredential: business.licenses.map((lic) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: lic.label,
      identifier: lic.number,
      url: lic.verifyUrl,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.name} services`,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name: s.shortTitle, description: s.metaDescription, url: absoluteUrl(`/${s.slug}`) },
      })),
    },
  };

  if (address) businessNode.address = address;
  if (geo) businessNode.geo = geo;
  if (sameAs.length) businessNode.sameAs = sameAs;
  if (business.email.trim()) businessNode.email = business.email.trim();
  if (hours.length) businessNode.openingHoursSpecification = hours;
  if (hasPublicAddress() && business.address.street) {
    businessNode.hasMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`,
    )}`;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    description:
      "Roof, gutter, siding and deck repair plus full home maintenance in Portland, OR and Vancouver, WA. Family-owned since 1999. Free itemized estimates.",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };

  return { "@context": "https://schema.org", "@graph": [businessNode, website, founderPerson()] };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
  image?: string;
}) {
  const area =
    service.areaServed?.map((name) => ({ "@type": "City", name })) ??
    areaServedNodes().filter((n) => n["@type"] === "City");

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@id": ORGANIZATION_ID },
    name: service.name,
    description: service.description,
    url: service.url,
    areaServed: area,
  };
  if (service.image) node.image = service.image;
  return node;
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function webPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    dateModified: opts.dateModified ?? business.contentUpdated,
    inLanguage: "en-US",
  };
}
