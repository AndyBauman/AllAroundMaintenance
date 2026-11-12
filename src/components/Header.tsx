"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { ESTIMATE_PATH, PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/roof-inspection-cleaning-repair", label: "Roofs" },
  { href: "/gutter-cleaning-gutter-inspection", label: "Gutters" },
  { href: "/deck-cleaning-deck-repair-deck-restoration", label: "Decks" },
  { href: "/services", label: "All Services" },
  { href: "/service-areas", label: "Areas" },
  { href: "/about-us", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/** `logo` is rendered on the server (it checks /public for the logo file) and passed in. */
export default function Header({ logo }: { logo: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-dark/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center" aria-label="All Around Maintenance home">
            {logo}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white xl:px-3"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href={PHONE_HREF} className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent">
              <Phone className="h-4 w-4" aria-hidden />
              {PHONE}
            </a>
            <Link
              href={ESTIMATE_PATH}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-gray-950 shadow-md transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Free Estimate
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-dark lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-gray-100 transition-colors hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-white/10 pt-4">
              <a href={PHONE_HREF} className="block px-3 py-2 text-base font-semibold text-white">
                Portland: {PHONE}
              </a>
              <a href={PHONE_WA_HREF} className="block px-3 py-2 text-base font-semibold text-white">
                Vancouver: {PHONE_WA}
              </a>
              <Link
                href={ESTIMATE_PATH}
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-lg bg-accent px-5 py-3 text-center text-base font-semibold text-gray-950"
              >
                Get a Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
