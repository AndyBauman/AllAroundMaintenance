import CallCard from "@/components/CallCard";
import dynamic from "next/dynamic";

// Loaded only when the form is switched on, so its script never ships while it is off.
const QuoteForm = dynamic(() => import("@/components/QuoteForm"));
import { LEAD_FORM_ENABLED } from "@/lib/constants";

/**
 * The one place that decides how a visitor reaches the business.
 * Form off (launch): call card. Form on: online estimate form.
 */
export default function LeadCapture({ service, city, stateAbbr }: { service?: string; city?: string; stateAbbr?: string }) {
  if (!LEAD_FORM_ENABLED) return <CallCard stateAbbr={stateAbbr} />;
  return <QuoteForm service={service} city={city} />;
}
