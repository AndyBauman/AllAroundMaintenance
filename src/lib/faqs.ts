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
import { SERVICES, type ServiceData } from "./services";

export interface Faq {
  question: string;
  answer: string;
}

const OR_FORM = LEAD_FORM_ENABLED ? " or send the free estimate form" : "";

const LICENSE_ANSWER = `Yes. All Around Maintenance Inc. is a licensed, bonded and insured contractor in both states: Oregon CCB #${LICENSES.oregonCcb} and Washington #${LICENSES.washington}.`;

const AREAS_ANSWER =
  "The Portland, Oregon and Vancouver, Washington metro areas, including Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, West Linn, Milwaukie, Happy Valley, Wilsonville, Sandy, Camas, Washougal, Battle Ground, Ridgefield, Woodland, Kalama, Longview and Kelso.";

const AWAY_ANSWER = "No. Once we agree on the scope, most exterior work can be completed without you there.";

const CLEANUP_ANSWER = "Yes. Cleanup is part of every job, and our goal is to leave the property as clean as we found it.";

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
      {
        question: `Do you repair roof leaks in ${place}?`,
        answer: `Yes. Call ${phone} as soon as you notice water. We send someone to assess the problem and apply a quick fix, then help you plan the permanent repair. Most leaks can be repaired without replacing the roof.`,
      },
      {
        question: `What does a roof inspection in ${place} include?`,
        answer: "The roof exterior, the attic side, ventilation and insulation, followed by an itemized report with photos.",
      },
      {
        question: `How do I know if my ${place} roof needs to be replaced?`,
        answer: "Common signs are sagging, interior moisture or mold, widespread cracked or curling shingles, and age beyond about 25 years. Most damage can be repaired, and we recommend replacement only when a repair won't last.",
      },
      {
        question: `Do you repair storm and wind damage in ${place}?`,
        answer: "Yes. We repair missing shingles, blow-offs and punctures left by storms and wind.",
      },
      { question: `Is your roof work in ${place} guaranteed?`, answer: `Yes. ${guaranteeText()} For moss removal: ${mossGuaranteeText()}` },
      { question: `Do I need to be home for roof work in ${place}?`, answer: AWAY_ANSWER },
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
    {
      question: `Do you handle emergency repairs in ${place}?`,
      answer: `Yes. For urgent problems such as a leaking roof or overflowing gutters, call ${phone} as soon as you can. We send someone to assess the problem and apply a quick fix, then help you plan the permanent repair.`,
    },
    {
      question: `Do you remove roof moss in ${place}?`,
      answer: `Yes. We remove moss by hand, never with a pressure washer, then clean the gutters and apply a treatment that kills the roots. ${mossGuaranteeText()}`,
    },
    {
      question: `Do you clean and repair gutters in ${place}?`,
      answer: "Yes. We clean gutters and downspouts, repair leaks and sagging sections, and replace gutters that are past repair. Twice a year, in late fall and spring, is a good cleaning schedule here.",
    },
    { question: `Do I need to be home for work at my ${place} property?`, answer: AWAY_ANSWER },
    { question: `Is your work in ${place} guaranteed?`, answer: `Yes. ${guaranteeText()}` },
    { question: `How can I pay for work in ${place}?`, answer: paymentText() },
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
  const label = SERVICE_LABELS[svc.slug] ?? svc.shortTitle.toLowerCase().replace("hoa", "HOA").replace(" & ", " and ");
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

/** Picks general questions by exact text, so a reworded question fails the build instead of silently vanishing. */
function general(...questions: string[]): Faq[] {
  return questions.map((question) => {
    const faq = HOME_FAQS.find((item) => item.question === question);
    if (!faq) throw new Error(`Unknown general FAQ: ${question}`);
    return faq;
  });
}

/** Picks questions from a service's own FAQ list, with the same build-time check. */
function fromService(slug: string, ...questions: string[]): Faq[] {
  const svc = SERVICES.find((item) => item.slug === slug);
  return questions.map((question) => {
    const faq = svc?.faqs.find((item) => item.question === question);
    if (!faq) throw new Error(`Unknown FAQ for ${slug}: ${question}`);
    return faq;
  });
}

const CALL_ANSWER = `Call ${PHONE} in the Portland area or ${PHONE_WA} in the Vancouver area${LEAD_FORM_ENABLED ? ", or send the free estimate form" : ""}.`;

/** /services */
export const SERVICES_PAGE_FAQS: Faq[] = [
  ...general("What services does All Around Maintenance offer?"),
  {
    question: "I'm not sure which service I need. What should I do?",
    answer: `${CALL_ANSWER} Describe what you're seeing. Roof and attic inspections are free, and estimates are free and itemized, so you know what the job involves before you decide anything.`,
  },
  {
    question: "Can I combine several jobs in one visit?",
    answer: "Yes. Give us the whole list and we price it together, so you know the total before we start.",
  },
  ...general(
    "Do you work on businesses as well as homes?",
    "Can an HOA hire All Around Maintenance?",
    "Do you handle emergency repairs?",
    "Is there anything you don't do?",
    "Do you offer free estimates?",
    "Are you licensed and insured?",
    "Do you guarantee your work?",
  ),
];

/** /service-areas */
export const SERVICE_AREA_FAQS: Faq[] = [
  ...general("What areas do you serve?"),
  { question: "Do you work in both Oregon and Washington?", answer: LICENSE_ANSWER },
  { question: "Which number should I call?", answer: `${CALL_ANSWER} We respond ${FACTS.responseTime}.` },
  {
    question: "My town isn't on the list. Do you still come out?",
    answer: "Call and ask. If you're in or near the Portland or Vancouver metro, the answer is probably yes.",
  },
  { question: "How soon can you get to my area?", answer: schedulingText() },
  ...general("Can an HOA hire All Around Maintenance?", "Do I need to be home while you work?"),
];

/** /about-us */
export const ABOUT_FAQS: Faq[] = [
  {
    question: "How long has All Around Maintenance been in business?",
    answer: `Since ${FACTS.founded}. ${FACTS.founder} founded the company, and it is still family-owned.`,
  },
  { question: "How big is your team?", answer: `We have ${FACTS.fieldCrew} field crew members and ${FACTS.officeStaff} office staff.` },
  ...general(
    "What languages does your team speak?",
    "Are you licensed and insured?",
    "What services does All Around Maintenance offer?",
    "Can an HOA hire All Around Maintenance?",
    "Do you work on businesses as well as homes?",
    "Do you guarantee your work?",
  ),
];

/** /free-estimate */
export const ESTIMATE_FAQS: Faq[] = [
  { question: "Is the estimate really free?", answer: `Yes. ${estimateText()}` },
  { question: "How do I request an estimate?", answer: `${CALL_ANSWER} We respond ${FACTS.responseTime}.` },
  {
    question: "What should I have ready when I call?",
    answer: "The property address, what needs attention and when you noticed it, and the best time to reach you.",
  },
  {
    question: "How quickly will I get my estimate?",
    answer: `We respond ${FACTS.responseTime}, and you'll have your itemized estimate within ${FACTS.estimateTurnaround}.`,
  },
  {
    question: "Are roof inspections free too?",
    answer: "Yes. Roof and attic inspections are free and include an itemized report with photos.",
  },
  { question: "Can the price change after work starts?", answer: changeOrderText() },
  {
    question: "How soon can the work start once I approve?",
    answer: `Most repairs and maintenance are scheduled within ${FACTS.schedulingWindow}.`,
  },
  ...general("How can I pay?", "Do I need to be home while you work?"),
];

/** /faq: the most-asked questions from the service pages, grouped by topic. */
export const FAQ_TOPICS: { heading: string; faqs: Faq[] }[] = [
  {
    heading: "Roof Questions",
    faqs: [
      ...fromService("roof-inspection-cleaning-repair", "How much does a roof inspection cost?", "How often should a roof be inspected?", "What are signs my roof needs repair?"),
      ...fromService("leaky-roof-repair", "What causes most roof leaks?", "What should I do while I wait for a roof leak repair?", "Will I need a new roof?"),
      ...fromService("moss-removal-portland", "How do you remove moss from a roof?", "Do you pressure wash roofs?", "What if the moss comes back?"),
      ...fromService("roof-replacement", "How much does a roof replacement cost?", "How long does a roof last?"),
    ],
  },
  {
    heading: "Gutter Questions",
    faqs: [
      ...fromService("gutter-cleaning-gutter-inspection", "How much does gutter cleaning cost?", "How often should gutters be cleaned?", "What does a gutter cleaning include?", "What happens if gutters are not cleaned?", "Do you clean gutters that have gutter guards?"),
      ...fromService("gutter-repair-portland", "How do I know if I need repair or just cleaning?", "Should I repair or replace my gutters?"),
      ...fromService("gutter-replacement", "How long do gutters last?", "Do I need to replace all of my gutters?"),
    ],
  },
  {
    heading: "Deck, Siding & Exterior Questions",
    faqs: [
      ...fromService("deck-cleaning-deck-repair-deck-restoration", "How often should a deck be cleaned?", "Does my deck need repair or just cleaning?", "How long does deck stain last?"),
      ...fromService("pressure-washing-portland", "What surfaces do you pressure wash?", "What is soft washing?"),
      ...fromService("siding-repair-portland", "When should siding be repaired?"),
      ...fromService("fence-repair-portland", "Should I repair or replace my fence?"),
      ...fromService("dry-rot-repair", "What causes dry rot?", "How do I spot dry rot?"),
    ],
  },
  {
    heading: "Home Repair & Property Care Questions",
    faqs: [
      ...fromService("handyman-portland", "What handyman jobs do you take?", "Do I need to supply materials?", "Can I combine several small jobs in one visit?"),
      ...fromService("drywall-installation", "Do you do small drywall repairs?"),
      ...fromService("plumbing-leaks", "What kinds of leaks do you repair?"),
      ...fromService("junk-removal-portland", "How much does junk removal cost?", "What do you take?"),
      ...fromService("landscape-maintenance-portland", "Do you offer recurring service?"),
      ...fromService("hoa-maintenance", "What can an HOA maintenance plan cover?"),
    ],
  },
];
