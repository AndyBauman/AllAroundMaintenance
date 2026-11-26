/**
 * Single source of truth for business facts (Stage 1).
 * Empty / null owner fields must not be rendered in HTML or JSON-LD.
 */

export type BusinessHours = {
  days: ReadonlyArray<"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">;
  opens: string;
  closes: string;
};

export const business = {
  legalName: "All Around Maintenance Inc.",
  name: "All Around Maintenance",
  founded: 1999,
  founder: {
    name: "Alex Svistun",
    title: "Founder & Owner",
    url: "/about-us/",
  },
  phones: {
    or: "+15032092023",
    wa: "+13607720224",
  },
  /** OWNER — public email. Empty = not shown. */
  email: "",
  /** OWNER — only if this line receives texts. Empty = no sms: link. */
  smsNumber: "",
  address: {
    /** false = service-area business; no street / geo in schema or footer. */
    public: false,
    street: "",
    city: "",
    region: "WA" as const,
    postalCode: "",
  },
  geo: { lat: null as number | null, lng: null as number | null },
  /** OWNER — e.g. { days: ["Mo","Tu","We","Th","Fr"], opens: "08:00", closes: "18:00" } */
  hours: [] as BusinessHours[],
  languages: ["English", "Russian", "Ukrainian", "Spanish"] as const,
  licenses: [
    {
      state: "OR" as const,
      label: "Oregon CCB #202731",
      number: "202731",
      /** Official lookup home (no stable deep link for this number). */
      verifyUrl: "https://search.ccb.state.or.us/search/",
    },
    {
      state: "WA" as const,
      label: "Washington contractor #ALLARAM926JB",
      number: "ALLARAM926JB",
      verifyUrl: "https://secure.lni.wa.gov/verify/",
    },
  ],
  profiles: {
    facebook: "https://www.facebook.com/allaroundmaintenanceinc/",
    instagram: "https://www.instagram.com/allaroundmaintenance/",
    google: "",
    yelp: "",
    bbb: "",
    angi: "",
    nextdoor: "",
    youtube: "",
    x: "",
    pinterest: "",
  },
  /** OWNER — visible HTML only in Stage 3; never emit AggregateRating JSON-LD. */
  rating: {
    source: "Google" as const,
    value: null as number | null,
    count: null as number | null,
    asOf: "",
    url: "",
  },
  payment: ["Credit card", "Debit card", "Bank transfer", "Check"] as const,
  notOffered: ["Sewer", "Septic", "Foundation work"] as const,
  /** Last content refresh used for WebPage dateModified until per-page dates land (Stage 3). */
  contentUpdated: "2026-11-26",
} as const;

export const FOUNDER_ID_PATH = "/about-us/#alex-svistun";

export function phoneDisplay(e164: string): string {
  const d = e164.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) {
    return `(${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  }
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return e164;
}

export function phoneHref(e164: string): string {
  return `tel:${e164}`;
}

export function profileUrls(): string[] {
  return Object.values(business.profiles).filter((url) => Boolean(url.trim()));
}

export function hasPublicAddress(): boolean {
  return (
    business.address.public &&
    Boolean(business.address.street.trim()) &&
    Boolean(business.address.city.trim()) &&
    Boolean(business.address.postalCode.trim())
  );
}

const DAY_LABEL: Record<string, string> = {
  Mo: "Mon",
  Tu: "Tue",
  We: "Wed",
  Th: "Thu",
  Fr: "Fri",
  Sa: "Sat",
  Su: "Sun",
};

/** Human-readable hours lines for footer / facts table. Empty when unset. */
export function hoursDisplayLines(): string[] {
  return business.hours.map((block) => {
    const days = block.days.map((d) => DAY_LABEL[d] ?? d).join("–");
    const span =
      block.days.length > 2
        ? `${DAY_LABEL[block.days[0]] ?? block.days[0]}–${DAY_LABEL[block.days[block.days.length - 1]] ?? block.days[block.days.length - 1]}`
        : days;
    return `${span} ${block.opens}–${block.closes}`;
  });
}

export function openingHoursSpecification(): Record<string, unknown>[] {
  return business.hours.map((block) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: block.days.map((d) => {
      const map: Record<string, string> = {
        Mo: "Monday",
        Tu: "Tuesday",
        We: "Wednesday",
        Th: "Thursday",
        Fr: "Friday",
        Sa: "Saturday",
        Su: "Sunday",
      };
      return map[d] ?? d;
    }),
    opens: block.opens,
    closes: block.closes,
  }));
}
