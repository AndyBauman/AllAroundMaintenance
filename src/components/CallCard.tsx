import { Phone } from "lucide-react";
import { LICENSE_LINE, PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";
import { FACTS } from "@/lib/business-facts";

const READY = ["The property address", "What needs attention and when you noticed it", "The best time to reach you"];

/**
 * Call-first contact card. Shown wherever the online form would be while
 * LEAD_FORM_ENABLED is false. Washington pages lead with the Vancouver line.
 */
export default function CallCard({ stateAbbr }: { stateAbbr?: string }) {
  const portland = { label: "Portland, OR", display: PHONE, href: PHONE_HREF };
  const vancouver = { label: "Vancouver, WA", display: PHONE_WA, href: PHONE_WA_HREF };
  const lines = stateAbbr === "WA" ? [vancouver, portland] : [portland, vancouver];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
      <h3 className="font-display text-2xl font-bold text-gray-900">Call for your free estimate</h3>
      <p className="mt-2 text-gray-600">
        Free, itemized and no obligation. We respond {FACTS.responseTime} and send your estimate within{" "}
        {FACTS.estimateTurnaround}.
      </p>

      <div className="mt-6 space-y-3">
        {lines.map((line, i) => (
          <a
            key={line.href}
            href={line.href}
            className={
              i === 0
                ? "flex items-center gap-4 rounded-xl bg-accent px-5 py-4 font-bold text-gray-950 shadow-md transition-all hover:bg-accent-light hover:shadow-lg"
                : "flex items-center gap-4 rounded-xl border-2 border-brand px-5 py-4 font-bold text-brand transition-colors hover:bg-brand/10"
            }
          >
            <Phone className="h-6 w-6 shrink-0" aria-hidden />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{line.label}</span>
              <span className="whitespace-nowrap text-xl sm:text-2xl">{line.display}</span>
            </span>
          </a>
        ))}
      </div>

      <h4 className="mt-8 text-sm font-bold uppercase tracking-wide text-gray-500">Have this ready</h4>
      <ul className="mt-3 space-y-2 text-gray-700">
        {READY.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">{LICENSE_LINE}</p>
    </div>
  );
}
