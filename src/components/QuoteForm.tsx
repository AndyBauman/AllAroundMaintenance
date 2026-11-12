"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/lib/constants";
import { FORM_SERVICE_OPTIONS } from "@/lib/services";
import { ELAPSED_FIELD, HONEYPOT_FIELD } from "@/lib/spam-guard";

const HEARD_OPTIONS = ["Google", "Referral / Word of Mouth", "Facebook or Instagram", "Saw your truck or sign", "Repeat customer", "Other"];

const inputClass =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";
const labelClass = "block text-sm font-semibold text-gray-800";

type Status = "idle" | "submitting" | "done";

/**
 * Lead form. Posts JSON to /api/lead, which emails the lead (no database).
 * `service` preselects the dropdown; `city` is passed along for context.
 */
export default function QuoteForm({ service, city }: { service?: string; city?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const preselect = service && FORM_SERVICE_OPTIONS.includes(service) ? service : "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const payload = {
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      service: get("service"),
      location: get("location"),
      address: get("address"),
      message: get("message"),
      heard: get("heard"),
      context_service: service ?? "",
      context_city: city ?? "",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      [HONEYPOT_FIELD]: get(HONEYPOT_FIELD),
      [ELAPSED_FIELD]: mountedAt.current ? String(Date.now() - mountedAt.current) : "",
    };

    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong sending your request.");

      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form: "estimate", service: payload.service, city: payload.context_city });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong sending your request.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
        <CircleCheck className="mx-auto h-14 w-14 text-brand" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-bold text-gray-900">Request received</h3>
        <p className="mt-3 text-gray-600">
          Thank you. We respond the same day and will have your itemized estimate to you within 1 business day.
        </p>
        <p className="mt-4 text-gray-600">
          Need us sooner? Call{" "}
          <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">
            {PHONE}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className={labelClass}>Name *</label>
          <input id="qf-name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="qf-phone" className={labelClass}>Phone *</label>
          <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="qf-email" className={labelClass}>Email</label>
          <input id="qf-email" name="email" type="email" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="qf-service" className={labelClass}>Service needed</label>
          <select id="qf-service" name="service" defaultValue={preselect} className={inputClass}>
            <option value="">Select a service</option>
            {FORM_SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qf-location" className={labelClass}>City or ZIP *</label>
          <input id="qf-location" name="location" type="text" required defaultValue={city ?? ""} autoComplete="address-level2" className={inputClass} />
        </div>
        <div>
          <label htmlFor="qf-address" className={labelClass}>Property address</label>
          <input id="qf-address" name="address" type="text" autoComplete="street-address" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-message" className={labelClass}>How can we help? *</label>
          <textarea
            id="qf-message"
            name="message"
            required
            rows={4}
            placeholder="Tell us what's going on: what needs fixing, where it is, and anything we should know about access."
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="qf-heard" className={labelClass}>How did you hear about us?</label>
          <select id="qf-heard" name="heard" defaultValue="" className={inputClass}>
            <option value="">Select one</option>
            {HEARD_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="qf-company-site">Company website</label>
        <input id="qf-company-site" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
          {error.includes(PHONE) ? null : (
            <>
              {" "}
              <a href={PHONE_HREF} className="font-semibold underline">Call {PHONE}</a>
            </>
          )}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-md transition-all hover:bg-accent-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Estimate"}
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">Free, itemized, no obligation. We respond the same day.</p>
    </form>
  );
}
