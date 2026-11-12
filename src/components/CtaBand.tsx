import Link from "next/link";
import { Phone } from "lucide-react";
import { ESTIMATE_PATH, LEAD_FORM_ENABLED, PHONE, PHONE_HREF } from "@/lib/constants";

export default function CtaBand({
  heading = "Not Sure What It'll Cost?",
  text = LEAD_FORM_ENABLED
    ? "Estimates are free, itemized and come with no obligation. Call or request one online."
    : "Estimates are free, itemized and come with no obligation. Call and we'll set one up.",
  phone = { display: PHONE, href: PHONE_HREF },
}: {
  heading?: string;
  text?: string;
  phone?: { display: string; href: string };
}) {
  return (
    <section className="bg-brand py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={phone.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-brand transition hover:bg-gray-50"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {phone.display}
          </a>
          <Link
            href={ESTIMATE_PATH}
            className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 transition hover:bg-accent-light"
          >
            {LEAD_FORM_ENABLED ? "Free Estimate Online →" : "How Estimates Work →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
