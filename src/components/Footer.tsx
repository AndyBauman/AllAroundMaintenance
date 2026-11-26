import Link from "next/link";
import Logo from "@/components/Logo";
import {
  business,
  hasPublicAddress,
  hoursDisplayLines,
  phoneDisplay,
} from "@/data/business";
import {
  ESTIMATE_PATH,
  LEGAL_NAME,
  PHONE,
  PHONE_HREF,
  PHONE_WA,
  PHONE_WA_HREF,
  SOCIAL,
} from "@/lib/constants";
import { CREDENTIALS } from "@/lib/business-facts";
import { CITIES, cityLabel, cityPath } from "@/lib/cities";
import { SERVICES } from "@/lib/services";

const linkClass = "text-sm text-gray-300 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();
  const featured = SERVICES.filter((s) => s.popular || s.group !== "home").slice(0, 12);
  const email = business.email.trim();
  const sms = business.smsNumber.trim();
  const hours = hoursDisplayLines();

  return (
    <footer className="bg-gray-900 pb-24 pt-16 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Family-owned home maintenance and repair in Portland, OR &amp; Vancouver, WA since {business.founded}.{" "}
              {CREDENTIALS}.
            </p>
            <address className="mt-4 not-italic">
              <p className="text-sm font-semibold text-white">{LEGAL_NAME}</p>
              {hasPublicAddress() ? (
                <p className="mt-1 text-sm text-gray-300">
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.region} {business.address.postalCode}
                </p>
              ) : null}
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>
                  Portland:{" "}
                  <a href={PHONE_HREF} className="font-semibold text-white transition-colors hover:text-accent">
                    {PHONE}
                  </a>
                </li>
                <li>
                  Vancouver:{" "}
                  <a href={PHONE_WA_HREF} className="font-semibold text-white transition-colors hover:text-accent">
                    {PHONE_WA}
                  </a>
                </li>
                {sms ? (
                  <li>
                    <a
                      href={`sms:${sms}`}
                      className="font-semibold text-white transition-colors hover:text-accent"
                    >
                      Text us: {phoneDisplay(sms.startsWith("+") ? sms : `+1${sms.replace(/\D/g, "").slice(-10)}`)}
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className="text-gray-200 transition-colors hover:text-white">
                      {email}
                    </a>
                  </li>
                ) : null}
                {hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                {business.licenses.map((lic) => (
                  <li key={lic.number}>
                    <a
                      href={lic.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {lic.label}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          <div>
            <h3 className="font-bold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {featured.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className={linkClass}>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-semibold text-accent transition-colors hover:text-accent-light">
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Service Areas</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link href={cityPath(c.slug)} className={linkClass}>
                    {c.kind === "county" ? c.name : cityLabel(c)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about-us" className={linkClass}>About Us</Link></li>
              <li><Link href="/reviews" className={linkClass}>Reviews</Link></li>
              <li><Link href="/projects" className={linkClass}>Projects</Link></li>
              <li><Link href="/guides" className={linkClass}>Guides</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/hoa-maintenance" className={linkClass}>HOA Maintenance</Link></li>
              <li><Link href="/service-areas" className={linkClass}>All Service Areas</Link></li>
              <li><Link href={ESTIMATE_PATH} className={linkClass}>Get a Free Estimate</Link></li>
              {SOCIAL.facebook ? (
                <li>
                  <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Facebook
                  </a>
                </li>
              ) : null}
              {SOCIAL.instagram ? (
                <li>
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-400">
            &copy; {year} {LEGAL_NAME} All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/service-areas" className="text-gray-300 transition-colors hover:text-white">Sitemap</Link>
            <Link href={ESTIMATE_PATH} className="text-gray-300 transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
