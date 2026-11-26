import { describe, expect, it } from "vitest";
import {
  HEARD_OPTIONS,
  REFERRAL_HEARD,
  US_STATES,
  checkboxServicesFor,
  checkboxServicesForSlug,
  firstName,
  formatPhone,
  leadFieldErrors,
  quoteLeadSchema,
  spamReason,
} from "./lead";

const NOW = 1_700_000_000_000;

function validLead(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jordan Lee",
    email: "jordan@example.com",
    phone: "(503) 555-0199",
    heard_from: "Google",
    heard_detail: "",
    services: ["Gutter Cleaning", "Not a service"],
    street: "1 Main St",
    city: "Portland",
    state: "OR",
    zip: "97214",
    message: "The gutter over the garage is overflowing.",
    page_url: "https://www.allaroundmaintenanceinc.com/free-estimate/",
    referrer: "",
    company_website: "",
    rendered_at: NOW - 10_000,
    ...overrides,
  };
}

describe("formatPhone", () => {
  it("formats a full number as the visitor types", () => {
    expect(formatPhone("")).toBe("");
    expect(formatPhone("503")).toBe("(503");
    expect(formatPhone("5032")).toBe("(503) 2");
    expect(formatPhone("5032092023")).toBe("(503) 209-2023");
    expect(formatPhone("503-209-2023")).toBe("(503) 209-2023");
    expect(formatPhone("50320920239999")).toBe("(503) 209-2023");
  });
});

describe("quoteLeadSchema", () => {
  it("keeps a complete request and drops unknown services", () => {
    const parsed = quoteLeadSchema.parse(validLead());
    expect(parsed.services).toEqual(["Gutter Cleaning"]);
    expect(parsed.heard_detail).toBeNull();
    expect(parsed.state).toBe("OR");
  });

  it("reports the first problem on each required field", () => {
    const parsed = quoteLeadSchema.safeParse(validLead({ name: " ", email: "nope", phone: "503", heard_from: "", message: "" }));
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(leadFieldErrors(parsed.error)).toMatchObject({
        name: "Enter your name.",
        email: "Enter a valid email address.",
        phone: "Enter a 10-digit phone number.",
        heard_from: "Select how you heard about us.",
        message: "Tell us how we can help.",
      });
    }
  });

  it("rejects a message over 2000 characters", () => {
    const parsed = quoteLeadSchema.safeParse(validLead({ message: "a".repeat(2001) }));
    expect(parsed.success).toBe(false);
  });

  it("accepts Facebook and stores a referral name or code", () => {
    expect(HEARD_OPTIONS).toContain("Facebook");
    expect(HEARD_OPTIONS).not.toContain("KVN Referral");
    const facebook = quoteLeadSchema.parse(validLead({ heard_from: "Facebook" }));
    expect(facebook.heard_from).toBe("Facebook");
    const missing = quoteLeadSchema.safeParse(validLead({ heard_from: REFERRAL_HEARD, referral: " " }));
    expect(missing.success).toBe(false);
    if (!missing.success) expect(leadFieldErrors(missing.error).referral).toBe("Enter the referral or referral code.");
    const referred = quoteLeadSchema.parse(validLead({ heard_from: REFERRAL_HEARD, referral: "Jane Smith", heard_detail: "Neighbor" }));
    expect(referred.heard_detail).toBe("Jane Smith — Neighbor");
    expect("referral" in referred).toBe(false);
  });
});

describe("service prechecks", () => {
  it("maps service pages and the old dropdown onto the checkbox labels", () => {
    expect(checkboxServicesForSlug("gutter-cleaning-gutter-inspection")).toEqual(["Gutter Cleaning"]);
    expect(checkboxServicesForSlug("deck-cleaning-deck-repair-deck-restoration")).toEqual([
      "Deck Repair or Restoration",
      "Deck Cleaning",
    ]);
    expect(checkboxServicesFor("Roof Repair or Inspection")).toEqual(["Roof Repair"]);
    expect(checkboxServicesForSlug("handyman-portland")).toBeUndefined();
  });
});

describe("states", () => {
  it("lists Oregon and Washington before the other states", () => {
    expect(US_STATES[0]?.[0]).toBe("OR");
    expect(US_STATES[1]?.[0]).toBe("WA");
    expect(US_STATES).toHaveLength(50);
  });
});

describe("spamReason", () => {
  it("drops a filled honeypot and a form submitted too quickly", () => {
    expect(spamReason({ honeypot: "https://spam.example", renderedAt: NOW - 10_000, name: "Jordan Lee", message: "Gutters" }, NOW)).toBe(
      "honeypot",
    );
    expect(spamReason({ honeypot: "", renderedAt: NOW - 500, name: "Jordan Lee", message: "Gutters" }, NOW)).toBe("timing");
    expect(spamReason({ honeypot: "", renderedAt: NOW - 10_000, name: "Jordan Lee", message: "Gutters" }, NOW)).toBeNull();
  });
});

describe("firstName", () => {
  it("uses the first word of the name", () => {
    expect(firstName("Jordan Lee")).toBe("Jordan");
  });
});
