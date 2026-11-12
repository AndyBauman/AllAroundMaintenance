import Link from "next/link";
import Logo from "@/components/Logo";
import {
  EMAIL, ESTIMATE_PATH, HOURS, LEGAL_NAME, LICENSES,
  PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF, SOCIAL,
} from "@/lib/constants";
import { CREDENTIALS } from "@/lib/business-facts";
import { CITIES, cityLabel, cityPath } from "@/lib/cities";
import { SERVICES } from "@/lib/services";

const linkClass = "text-sm text-gray-300 transition-colors hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();
  const featured = SERVICES.filter((s) => s.popular || s.group !== "home").slice(0, 12);

  return (
    <footer className="bg-gray-900 pb-24 pt-16 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* NAP block */}
          <div itemScope itemType="https://schema.org/HomeAndConstructionBusiness">
            <Logo />
            <meta itemProp="name" content={LEGAL_NAME} />
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              Family-owned home maintenance and repair in Portland, OR &amp; Vancouver, WA since 1999. {CREDENTIALS}.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                Portland:{" "}
                <a href={PHONE_HREF} itemProp="telephone" className="font-semibold text-white transition-colors hover:text-accent">
                  {PHONE}
                </a>
              </li>
              <li>
                Vancouver:{" "}
                <a href={PHONE_WA_HREF} className="font-semibold text-white transition-colors hover:text-accent">
                  {PHONE_WA}
                </a>
              </li>
              {EMAIL ? (
                <li>
                  <a href={`mailto:${EMAIL}`} itemProp="email" className="text-gray-200 transition-colors hover:text-white">
                    {EMAIL}
                  </a>
                </li>
              ) : null}
              {HOURS ? <li>{HOURS}</li> : null}
              <li>Oregon CCB #{LICENSES.oregonCcb}</li>
              <li>Washington #{LICENSES.washington}</li>
            </ul>
          </div>

          {/* Services */}
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

          {/* Service areas */}
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

          {/* Company */}
          <div>
            <h3 className="font-bold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about-us" className={linkClass}>About Us</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/hoa-maintenance" className={linkClass}>HOA Maintenance</Link></li>
              <li><Link href="/service-areas" className={linkClass}>All Service Areas</Link></li>
              <li><Link href={ESTIMATE_PATH} className={linkClass}>Get a Free Estimate</Link></li>
              <li><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>Facebook</a></li>
              <li><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
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
