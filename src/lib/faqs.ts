import { LICENSES, PHONE, PHONE_WA } from "./constants";
import {
  FACTS,
  estimateText,
  guaranteeText,
  languagesText,
  mossGuaranteeText,
  paymentText,
  schedulingText,
} from "./business-facts";
import type { CityData } from "./cities";

export interface Faq {
  question: string;
  answer: string;
}

const LICENSE_ANSWER = `Yes. All Around Maintenance Inc. is a licensed, bonded and insured contractor in both states: Oregon CCB #${LICENSES.oregonCcb} and Washington #${LICENSES.washington}.`;

export const HOME_FAQS: Faq[] = [
  {
    question: "What services does All Around Maintenance offer?",
    answer:
      "We're a full-service home maintenance and repair company. Our specialties are roofs (inspection, repair, moss removal), gutters (cleaning, repair, replacement) and decks (cleaning, repair, refinishing). We also handle pressure washing, siding, fences, dry rot, drywall, landscaping, junk removal and general handyman work.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "The Portland, Oregon and Vancouver, Washington metro areas, including Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, West Linn, Wilsonville, Camas, Washougal, Battle Ground, Ridgefield, Longview and Kelso.",
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
  { question: "Do I need to be home while you work?", answer: "No. Once the scope is agreed, most exterior work can be completed without you there." },
  { question: "How can I pay?", answer: paymentText() },
  { question: "What languages does your team speak?", answer: `Our team can help you in ${languagesText()}.` },
  {
    question: "Is there anything you don't do?",
    answer: "We don't take on sewer, septic or foundation work. If your project needs one of those, we'll tell you up front.",
  },
  {
    question: "How do I get started?",
    answer: `Call ${PHONE} in the Portland area or ${PHONE_WA} in the Vancouver area, or send the free estimate form. We respond ${FACTS.responseTime}.`,
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
      { question: `How do I schedule roof work in ${place}?`, answer: `Call ${phone} or send the free estimate form. ${schedulingText()}` },
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
    { question: `How do I book service in ${place}?`, answer: `Call ${phone} or send the free estimate form. We respond ${FACTS.responseTime}.` },
  ];
}
