import { Clock, MapPin, Phone } from "lucide-react";
import LeadCapture from "@/components/LeadCapture";
import { HOURS, LEAD_FORM_ENABLED, PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";
import { FACTS } from "@/lib/business-facts";

export default function Contact({ heading = "Ready to Cross It Off the List?" }: { heading?: string }) {
  return (
    <section id="contact" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">Free Estimate</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-lg text-gray-600">
              {LEAD_FORM_ENABLED ? "Tell us what needs attention." : "Call and tell us what needs attention."} We respond{" "}
              {FACTS.responseTime} and send a free itemized estimate within {FACTS.estimateTurnaround}.
            </p>

            <ul className="mt-8 space-y-5">
              {LEAD_FORM_ENABLED ? (
              <>
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-600">Portland, OR</p>
                  <a href={PHONE_HREF} className="text-xl font-bold text-gray-900 hover:text-brand">{PHONE}</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-600">Vancouver, WA</p>
                  <a href={PHONE_WA_HREF} className="text-xl font-bold text-gray-900 hover:text-brand">{PHONE_WA}</a>
                </div>
              </li>
              </>
              ) : null}
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-600">Service area</p>
                  <p className="font-semibold text-gray-900">Portland metro, Clark County, Longview &amp; Kelso</p>
                </div>
              </li>
              {HOURS ? (
                <li className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hours</p>
                    <p className="font-semibold text-gray-900">{HOURS}</p>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>

          <LeadCapture />
        </div>
      </div>
    </section>
  );
}
