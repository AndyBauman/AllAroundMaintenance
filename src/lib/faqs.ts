import { LEAD_FORM_ENABLED, LICENSES, PHONE, PHONE_WA } from "./constants";
import {
  FACTS,
  changeOrderText,
  estimateText,
  guaranteeText,
  languagesText,
  mossGuaranteeText,
  paymentText,
  schedulingText,
} from "./business-facts";
import type { CityData } from "./cities";
import type { ServiceData } from "./services";

export interface Faq {
  question: string;
  answer: string;
}

const OR_FORM = LEAD_FORM_ENABLED ? " or send the free estimate form" : "";

const LICENSE_ANSWER = `Yes. All Around Maintenance Inc. is a licensed, bonded and insured contractor in both states: Oregon CCB #${LICENSES.oregonCcb} and Washington #${LICENSES.washington}.`;

const AREAS_ANSWER =
  "The Portland, Oregon and Vancouver, Washington metro areas, including Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, West Linn, Wilsonville, Camas, Washougal, Battle Ground, Ridgefield, Longview and Kelso.";

const AWAY_ANSWER = "No. Once the scope is agreed, most exterior work can be completed without you there.";

const CLEANUP_ANSWER = "Yes. Clean-up is part of every job, and our goal is to leave the property as clean as we found it.";

export const HOME_FAQS: Faq[] = [
  {
    question: "What services does All Around Maintenance offer?",
    answer:
      "We're a full-service home maintenance and repair company. Our specialties are roofs (inspection, repair, moss removal), gutters (cleaning, repair, replacement) and decks (cleaning, repair, refinishing). We also handle pressure washing, siding, fences, dry rot, drywall, landscaping, junk removal and general handyman work.",
  },
  {
    question: "What areas do you serve?",
    answer: AREAS_ANSWER,
  },
  { question: "Are you licensed and insured?", answer: LICENSE_ANSWER },
  {
    question: "Do you offer free estimates?",
    answer: `Yes. ${estimateText()} Roof and attic inspections are also free and include an itemized report with photos.`,
  },
  { question: "How quickly can you get to my project?", answer: schedulingText() },
  {
    question: "Do you work on businesses as well as homes?",
    answer:
      "Yes. We handle commercial maintenance and repair alongside residential work. Simple fixes and preventive maintenance usually cost far less than an emergency repair later.",
  },
  {
    question: "Can an HOA hire All Around Maintenance?",
    answer: `Yes. We've worked with HOAs for more than ${FACTS.hoaYears} years, building custom maintenance plans for condos, townhome communities, subdivisions and apartment complexes, plus on-demand emergency repairs.`,
  },
  {
    question: "Do you handle emergency repairs?",
    answer:
      "Yes. For urgent problems such as a leaking roof or overflowing gutters, call as soon as you can. We send someone to assess the problem and apply a quick fix, then help you plan the permanent repair.",
  },
  { question: "Do you guarantee your work?", answer: `${guaranteeText()} For moss removal specifically: ${mossGuaranteeText()}` },
  { question: "Do I need to be home while you work?", answer: AWAY_ANSWER },
  { question: "How can I pay?", answer: paymentText() },
  { question: "What languages does your team speak?", answer: `Our team can help you in ${languagesText()}.` },
  {
    question: "Is there anything you don't do?",
    answer: "We don't take on sewer, septic or foundation work. If your project needs one of those, we'll tell you up front.",
  },
  {
    question: "How do I get started?",
    answer: `Call ${PHONE} in the Portland area or ${PHONE_WA} in the Vancouver area${LEAD_FORM_ENABLED ? ", or send the free estimate form" : ""}. We respond ${FACTS.responseTime}.`,
  },
];

/** City-page FAQs. `focus: "roof"` produces the roof-maintenance variant. */
export function cityFaqs(city: CityData, focus: "home" | "roof" = "home"): Faq[] {
  const place = city.name;
  const phone = city.stateAbbr === "WA" ? PHONE_WA : PHONE;

  if (focus === "roof") {
    return [
      {
        question: `Do you offer free roof inspections in ${place}?`,
        answer: `Yes. Roof and attic inspections in ${place} are free and include an itemized report with photos.`,
      },
      {
        question: `What roof services do you provide in ${place}?`,
        answer: `Roof inspection, leak and storm-damage repair, moss removal and roof cleaning, yearly maintenance, and roof replacement when a repair won't last.`,
      },
      { question: `How do you remove moss from roofs in ${place}?`, answer: `By hand, never with a pressure washer. We then scrub the roof, clean the gutters and apply a treatment that kills the roots. ${mossGuaranteeText()}` },
      { question: `How often should a roof in ${place} be maintained?`, answer: "Once a year is a good rule in the Pacific Northwest, ideally before the rainy season." },
      { question: `Are you licensed to work in ${city.state}?`, answer: LICENSE_ANSWER },
      { question: `How do I schedule roof work in ${place}?`, answer: `Call ${phone}${OR_FORM}. ${schedulingText()}` },
    ];
  }

  return [
    {
      question: `What home maintenance services do you offer in ${place}?`,
      answer: `Roof repair and moss removal, gutter cleaning and repair, deck restoration, pressure washing, siding and fence repair, dry rot repair, drywall, landscaping, junk removal and general handyman work.`,
    },
    { question: `Do you offer free estimates in ${place}?`, answer: `Yes. ${estimateText()}` },
    { question: `Are you licensed to work in ${city.state}?`, answer: LICENSE_ANSWER },
    { question: `How soon can you start a job in ${place}?`, answer: schedulingText() },
    {
      question: `Do you work with HOAs and businesses in ${place}?`,
      answer: `Yes. We provide custom maintenance plans and on-demand repairs for HOAs, and maintenance and repair for commercial properties.`,
    },
    { question: `How do I book service in ${place}?`, answer: `Call ${phone}${OR_FORM}. We respond ${FACTS.responseTime}.` },
  ];
}

/** Service names that read wrong mid-sentence ("schedule drainage") get a noun phrase instead. */
const SERVICE_LABELS: Record<string, string> = {
  "trims-around-houses": "exterior trim work",
  "drainage-services": "drainage work",
  "drywall-installation": "drywall work",
};

/** Services in the "home" group that are done entirely outside. Roofs, gutters and decks always are. */
const OUTDOOR_HOME_SLUGS = new Set([
  "pressure-washing-portland",
  "siding-repair-portland",
  "fence-repair-portland",
  "trims-around-houses",
  "yard-cleanup",
]);

/** Recurring or haul-away services, where questions about repairs and hidden damage don't apply. */
const NON_REPAIR_SLUGS = new Set([
  "landscape-maintenance-portland",
  "junk-removal-portland",
  "yard-cleanup",
  "pressure-washing-portland",
  "hoa-maintenance",
]);

/** Re-roofs are scheduled to a project timeline, not the usual 2 to 3 day window. */
const PROJECT_SLUGS = new Set(["roof-replacement", "roof-installation"]);

/** The contractor licence answer is left off plumbing and electrical pages until trade licensing is confirmed. */
const TRADE_SLUGS = new Set(["plumbing-leaks", "light-fixture-replacements"]);

const MAX_SERVICE_FAQS = 13;
const MIN_SHARED_FAQS = 3;

/**
 * FAQs for a service page: the service's own questions, then the questions customers ask about
 * any job (licensing, scheduling, estimates), worded for that service. A shared question is left
 * out when the service already answers it or when it doesn't fit that kind of work.
 */
export function serviceFaqs(svc: ServiceData): Faq[] {
  const own = svc.faqs;
  const asked = own.map((faq) => faq.question).join(" | ");
  const covers = (pattern: RegExp) => pattern.test(asked);
  const label = SERVICE_LABELS[svc.slug] ?? svc.shortTitle.toLowerCase().replace("hoa", "HOA");
  const outdoor = svc.group !== "home" || OUTDOOR_HOME_SLUGS.has(svc.slug);
  const repair = !NON_REPAIR_SLUGS.has(svc.slug);

  const shared: (Faq | false)[] = [
    !TRADE_SLUGS.has(svc.slug) && { question: "Are you licensed and insured?", answer: LICENSE_ANSWER },
    !PROJECT_SLUGS.has(svc.slug) &&
      !covers(/how soon|same.day|how far ahead|emergenc/i) && {
        question: `How soon can you schedule ${label}?`,
        answer: schedulingText(),
      },
    outdoor && !covers(/be home/i) && { question: `Do I need to be home during ${label}?`, answer: AWAY_ANSWER },
    !covers(/cost|price|charge/i) && { question: `Is there a charge for ${label} estimates?`, answer: `No. ${estimateText()}` },
    repair && !covers(/guarantee|comes back/i) && { question: `Do you guarantee your ${label}?`, answer: `Yes. ${guaranteeText()}` },
    { question: `Where do you offer ${label}?`, answer: AREAS_ANSWER },
    repair &&
      !covers(/what if you find|find damage|rot behind/i) && {
        question: "What if you find more damage once you start?",
        answer: changeOrderText(),
      },
    repair && !covers(/clean.?up|haul/i) && { question: `Do you clean up after ${label}?`, answer: CLEANUP_ANSWER },
  ];

  const room = Math.max(MIN_SHARED_FAQS, MAX_SERVICE_FAQS - own.length);
  return [...own, ...shared.filter((faq): faq is Faq => faq !== false).slice(0, room)];
}
