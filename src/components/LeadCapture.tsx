import dynamic from "next/dynamic";
import { checkboxServicesFor } from "@/lib/lead";

const QuoteForm = dynamic(() => import("@/components/QuoteForm"));

/**
 * The quote form. LEAD_FORM_ENABLED still controls the call-first sentences
 * in page copy and FAQ schema. It does not hide this form.
 */
export default function LeadCapture({
  service,
  city,
  stateAbbr,
  compact = false,
  heading,
  defaultServices,
}: {
  service?: string;
  city?: string;
  stateAbbr?: string;
  compact?: boolean;
  heading?: string;
  defaultServices?: string[];
}) {
  return (
    <QuoteForm
      defaultServices={defaultServices ?? checkboxServicesFor(service)}
      compact={compact}
      heading={heading}
      defaultCity={city || undefined}
      defaultState={stateAbbr}
    />
  );
}
