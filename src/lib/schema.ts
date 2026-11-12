import { SITE_URL, NAP, PHONE_RAW, PHONE_WA_RAW, SITE_NAME, LICENSES, absoluteUrl } from "./constants";
import { FACTS } from "./business-facts";
import { SERVICES } from "./services";

/** Stable @id for the business across all JSON-LD on the site. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function e164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

/** Only emitted when both values are set, and they must match the live Google Business Profile. */
function optionalAggregateRating() {
  const val = process.env.NEXT_PUBLIC_AGGREGATE_RATING_VALUE?.trim();
  const count = process.env.NEXT_PUBLIC_AGGREGATE_REVIEW_COUNT?.trim();
  if (!val || !count) return undefined;
  return { "@type": "AggregateRating", ratingValue: val, reviewCount: count, bestRating: "5" };
}

function postalAddress(): Record<string, unknown> {
  const street = process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS?.trim();
  const zip = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE?.trim();
  const addr: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: NAP.address.city,
    addressRegion: NAP.address.state,
    addressCountry: NAP.address.country,
  };
  if (street) addr.streetAddress = street;
  if (zip) addr.postalCode = zip;
  return addr;
}

/**
 * Site-wide @graph: LocalBusiness + WebSite, server-rendered in the root layout.
 * Street address, hours, email and rating are added only once they are set in env.
 */
export function siteWideGraphSchema() {
  const aggregateRating = optionalAggregateRating();

  const business: Record<string, unknown> = {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": ORGANIZATION_ID,
    name: NAP.name,
    alternateName: SITE_NAME,
    url: absoluteUrl("/"),
    telephone: e164(PHONE_RAW),
    contactPoint: [
      { "@type": "ContactPoint", telephone: e164(PHONE_RAW), contactType: "customer service", areaServed: "US-OR", availableLanguage: [...FACTS.languages] },
      { "@type": "ContactPoint", telephone: e164(PHONE_WA_RAW), contactType: "customer service", areaServed: "US-WA", availableLanguage: [...FACTS.languages] },
    ],
    foundingDate: String(FACTS.founded),
    founder: { "@type": "Person", name: FACTS.founder },
    priceRange: NAP.priceRange,
    address: postalAddress(),
    areaServed: NAP.areaServed.map((a) => ({ "@type": "City", name: a })),
    sameAs: NAP.sameAs,
    knowsLanguage: [...FACTS.languages],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: `Oregon CCB #${LICENSES.oregonCcb}` },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: `Washington contractor #${LICENSES.washington}` },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${SITE_NAME} services`,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name: s.shortTitle, description: s.metaDescription, url: absoluteUrl(`/${s.slug}`) },
      })),
    },
  };

  if (NAP.email) business.email = NAP.email;
  if (aggregateRating) business.aggregateRating = aggregateRating;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    description:
      "Roof, gutter, siding and deck repair plus full home maintenance in Portland OR and Vancouver WA. Family-owned since 1999. Free itemized estimates.",
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };

  return { "@context": "https://schema.org", "@graph": [business, website] };
}

export function serviceSchema(service: { name: string; description: string; url: string; areaServed?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@id": ORGANIZATION_ID },
    name: service.name,
    description: service.description,
    url: service.url,
    areaServed: (service.areaServed ?? ["Portland, OR", "Vancouver, WA"]).map((name) => ({ "@type": "City", name })),
  };
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

export function howToSchema(name: string, steps: readonly { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.description })),
  };
}
