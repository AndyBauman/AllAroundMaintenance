"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";
import {
  HEARD_OPTIONS,
  REFERRAL_HEARD,
  QUOTE_SERVICES,
  US_STATES,
  captureAttribution,
  firstName,
  formatPhone,
  leadFieldErrors,
  quoteLeadSchema,
  readAttribution,
  type LeadField,
} from "@/lib/lead";

const inputClass =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";
const labelClass = "block text-sm font-semibold text-gray-800";

const FIELD_IDS: Record<LeadField, string> = {
  name: "qf-name",
  email: "qf-email",
  phone: "qf-phone",
  heard_from: "qf-heard",
  referral: "qf-referral",
  heard_detail: "qf-heard-detail",
  street: "qf-street",
  city: "qf-city",
  state: "qf-state",
  zip: "qf-zip",
  message: "qf-message",
};

const FAILURE = `Something went wrong sending your request. Please call ${PHONE} or try again.`;

type Errors = Partial<Record<LeadField, string>>;

function focusFirst(errors: Errors) {
  const key = (Object.keys(FIELD_IDS) as LeadField[]).find((field) => errors[field]);
  if (!key) return;
  document.getElementById(FIELD_IDS[key])?.focus();
}

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      <span className="sr-only"> required</span>
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
      {error}
    </p>
  );
}

export default function QuoteForm({
  defaultServices,
  compact = false,
  heading,
  defaultCity = "",
  defaultState = "",
}: {
  defaultServices?: string[];
  compact?: boolean;
  heading?: string;
  defaultCity?: string;
  defaultState?: string;
}) {
  const starting = (defaultServices ?? []).filter((service) => (QUOTE_SERVICES as readonly string[]).includes(service));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [referral, setReferral] = useState("");
  const [heardDetail, setHeardDetail] = useState("");
  const [services, setServices] = useState<string[]>(starting);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [state, setState] = useState(
    US_STATES.some(([abbr]) => abbr === defaultState) ? defaultState : "",
  );
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const renderedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
    captureAttribution();
  }, []);

  useEffect(() => {
    if (done) thanksRef.current?.focus();
  }, [done]);

  function clearError(field: LeadField) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleService(service: string) {
    setServices((current) => (current.includes(service) ? current.filter((item) => item !== service) : [...current, service]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setFormError("");

    captureAttribution();
    const attribution = readAttribution();
    const payload = {
      name,
      email,
      phone,
      heard_from: heardFrom,
      referral: heardFrom === REFERRAL_HEARD ? referral : "",
      heard_detail: heardDetail,
      services,
      street: compact ? "" : street,
      city,
      state,
      zip: compact ? "" : zip,
      message,
      page_url: window.location.href,
      referrer: document.referrer,
      ...attribution,
      company_website: honeypot.current?.value ?? "",
      rendered_at: renderedAt.current,
    };

    const parsed = quoteLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const next = leadFieldErrors(parsed.error);
      setErrors(next);
      focusFirst(next);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { fieldErrors?: Errors };
      if (!res.ok) {
        if (json.fieldErrors && Object.keys(json.fieldErrors).length > 0) {
          setErrors(json.fieldErrors);
          focusFirst(json.fieldErrors);
          setSending(false);
          return;
        }
        throw new Error("send");
      }

      const human = !(honeypot.current?.value ?? "").trim() && renderedAt.current > 0 && Date.now() - renderedAt.current >= 3000;
      if (human) {
        const w = window as Window & { dataLayer?: Record<string, unknown>[] };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "generate_lead",
          form_id: "quote",
          lead_services: parsed.data.services,
          page_path: window.location.pathname,
        });
      }
      setDone(true);
    } catch {
      setFormError(FAILURE);
      setSending(false);
    }
  }

  if (done) {
    return (
      <section id="quote" className="scroll-mt-28">
        <div
          ref={thanksRef}
          tabIndex={-1}
          role="status"
          className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg outline-none"
        >
          <p className="text-lg text-gray-800">
            Thanks, {firstName(name)}. We got your request and will reach out within one business day. Need help sooner? Call{" "}
            <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">
              {PHONE}
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  const invalid = (field: LeadField) => (errors[field] ? true : undefined);
  const described = (field: LeadField) => (errors[field] ? `${FIELD_IDS[field]}-error` : undefined);

  return (
    <section id="quote" className="scroll-mt-28" aria-labelledby={heading ? "quote-heading" : undefined}>
      <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
        {heading ? (
          <h2 id="quote-heading" className="mb-5 font-display text-2xl font-bold text-gray-900">
            {heading}
          </h2>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <RequiredLabel htmlFor={FIELD_IDS.name}>Name</RequiredLabel>
            <input
              id={FIELD_IDS.name}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              aria-invalid={invalid("name")}
              aria-describedby={described("name")}
              className={inputClass}
            />
            <FieldError id={FIELD_IDS.name} error={errors.name} />
          </div>
          <div>
            <RequiredLabel htmlFor={FIELD_IDS.email}>Email</RequiredLabel>
            <input
              id={FIELD_IDS.email}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearError("email");
              }}
              aria-invalid={invalid("email")}
              aria-describedby={described("email")}
              className={inputClass}
            />
            <FieldError id={FIELD_IDS.email} error={errors.email} />
          </div>
          <div>
            <RequiredLabel htmlFor={FIELD_IDS.phone}>Phone</RequiredLabel>
            <input
              id={FIELD_IDS.phone}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(999) 999-9999"
              value={phone}
              onChange={(event) => {
                setPhone(formatPhone(event.target.value));
                clearError("phone");
              }}
              onBlur={() => setPhone((current) => formatPhone(current))}
              aria-invalid={invalid("phone")}
              aria-describedby={described("phone")}
              className={inputClass}
            />
            <FieldError id={FIELD_IDS.phone} error={errors.phone} />
          </div>
          <div>
            <RequiredLabel htmlFor={FIELD_IDS.heard_from}>How did you hear about us?</RequiredLabel>
            <select
              id={FIELD_IDS.heard_from}
              name="heard_from"
              required
              value={heardFrom}
              onChange={(event) => {
                const next = event.target.value;
                setHeardFrom(next);
                if (next !== REFERRAL_HEARD) setReferral("");
                clearError("heard_from");
                clearError("referral");
              }}
              aria-invalid={invalid("heard_from")}
              aria-describedby={described("heard_from")}
              className={inputClass}
            >
              <option value="">Select one</option>
              {HEARD_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id={FIELD_IDS.heard_from} error={errors.heard_from} />
          </div>
          {heardFrom === REFERRAL_HEARD ? (
            <div className="sm:col-span-2">
              <RequiredLabel htmlFor={FIELD_IDS.referral}>Referral or referral code</RequiredLabel>
              <input
                id={FIELD_IDS.referral}
                name="referral"
                type="text"
                required
                autoComplete="off"
                placeholder="Name or code"
                value={referral}
                onChange={(event) => {
                  setReferral(event.target.value);
                  clearError("referral");
                }}
                aria-invalid={invalid("referral")}
                aria-describedby={described("referral")}
                className={inputClass}
              />
              <FieldError id={FIELD_IDS.referral} error={errors.referral} />
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <label htmlFor={FIELD_IDS.heard_detail} className={labelClass}>
              Tell us more (optional)
            </label>
            <input
              id={FIELD_IDS.heard_detail}
              name="heard_detail"
              type="text"
              autoComplete="off"
              value={heardDetail}
              onChange={(event) => {
                setHeardDetail(event.target.value);
                clearError("heard_detail");
              }}
              aria-invalid={invalid("heard_detail")}
              aria-describedby={described("heard_detail")}
              className={inputClass}
            />
            <FieldError id={FIELD_IDS.heard_detail} error={errors.heard_detail} />
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className={labelClass}>Services I&apos;m interested in</legend>
          <div className={compact ? "mt-3 grid grid-cols-2 gap-2" : "mt-3 grid gap-2 sm:grid-cols-2"}>
            {QUOTE_SERVICES.map((service) => (
              <label key={service} className="flex items-start gap-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={services.includes(service)}
                  onChange={() => toggleService(service)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {compact ? null : (
          <fieldset className="mt-5">
            <legend className={labelClass}>Address</legend>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={FIELD_IDS.street} className={labelClass}>
                  Street
                </label>
                <input
                  id={FIELD_IDS.street}
                  name="street"
                  type="text"
                  autoComplete="street-address"
                  value={street}
                  onChange={(event) => {
                    setStreet(event.target.value);
                    clearError("street");
                  }}
                  aria-invalid={invalid("street")}
                  aria-describedby={described("street")}
                  className={inputClass}
                />
                <FieldError id={FIELD_IDS.street} error={errors.street} />
              </div>
              <div>
                <label htmlFor={FIELD_IDS.city} className={labelClass}>
                  City
                </label>
                <input
                  id={FIELD_IDS.city}
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    clearError("city");
                  }}
                  aria-invalid={invalid("city")}
                  aria-describedby={described("city")}
                  className={inputClass}
                />
                <FieldError id={FIELD_IDS.city} error={errors.city} />
              </div>
              <div>
                <label htmlFor={FIELD_IDS.state} className={labelClass}>
                  State
                </label>
                <select
                  id={FIELD_IDS.state}
                  name="state"
                  autoComplete="address-level1"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value);
                    clearError("state");
                  }}
                  aria-invalid={invalid("state")}
                  aria-describedby={described("state")}
                  className={inputClass}
                >
                  <option value="">State</option>
                  {US_STATES.map(([abbr, stateName]) => (
                    <option key={abbr} value={abbr}>
                      {stateName}
                    </option>
                  ))}
                </select>
                <FieldError id={FIELD_IDS.state} error={errors.state} />
              </div>
              <div>
                <label htmlFor={FIELD_IDS.zip} className={labelClass}>
                  ZIP
                </label>
                <input
                  id={FIELD_IDS.zip}
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(event) => {
                    setZip(event.target.value);
                    clearError("zip");
                  }}
                  aria-invalid={invalid("zip")}
                  aria-describedby={described("zip")}
                  className={inputClass}
                />
                <FieldError id={FIELD_IDS.zip} error={errors.zip} />
              </div>
            </div>
          </fieldset>
        )}

        <div className="mt-5">
          <RequiredLabel htmlFor={FIELD_IDS.message}>How can we help you?</RequiredLabel>
          <textarea
            id={FIELD_IDS.message}
            name="message"
            required
            rows={5}
            maxLength={2000}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              clearError("message");
            }}
            aria-invalid={invalid("message")}
            aria-describedby={described("message")}
            className={inputClass}
          />
          <div className="mt-1 flex items-start justify-between gap-3">
            <FieldError id={FIELD_IDS.message} error={errors.message} />
            <p className="ml-auto text-xs text-gray-500">{message.length} / 2000</p>
          </div>
        </div>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
        </div>

        {formError ? (
          <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            Something went wrong sending your request. Please call{" "}
            <a href={PHONE_HREF} className="font-semibold underline">
              {PHONE}
            </a>{" "}
            or try again.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="mt-6 w-full rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-md transition-all hover:bg-accent-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Submit"}
        </button>
        <p className="mt-3 text-center text-sm text-gray-600">
          Or call{" "}
          <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">
            {PHONE}
          </a>{" "}
          in Portland or{" "}
          <a href={PHONE_WA_HREF} className="font-semibold text-brand hover:underline">
            {PHONE_WA}
          </a>{" "}
          in Vancouver.
        </p>
      </form>
    </section>
  );
}
