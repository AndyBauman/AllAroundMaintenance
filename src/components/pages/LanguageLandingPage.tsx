import Link from "next/link";
import { Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import HtmlLang from "@/components/HtmlLang";
import LastUpdated from "@/components/LastUpdated";
import type { LanguagePage } from "@/data/languages";
import { LANGUAGE_PAGES } from "@/data/languages";
import { ESTIMATE_PATH, LICENSE_LINE, PHONE, PHONE_HREF, PHONE_WA, PHONE_WA_HREF } from "@/lib/constants";

export default function LanguageLandingPage({ page }: { page: LanguagePage }) {
  return (
    <main>
      <HtmlLang lang={page.htmlLang} />
      <Breadcrumbs items={[{ label: page.nativeName, href: page.path }]} />

      <section className="relative overflow-hidden bg-brand-dark py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">{page.h1}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-xl hover:bg-accent-light"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {PHONE}
              </a>
              <Link
                href={ESTIMATE_PATH}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white hover:bg-white/20"
              >
                {page.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">{page.servicesHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">{page.servicesBody}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">{page.areasHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">{page.areasBody}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">{page.phonesHeading}</h2>
            <ul className="mt-4 space-y-2 text-base text-gray-800">
              <li>
                Portland, OR:{" "}
                <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">
                  {PHONE}
                </a>
              </li>
              <li>
                Vancouver, WA:{" "}
                <a href={PHONE_WA_HREF} className="font-semibold text-brand hover:underline">
                  {PHONE_WA}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">{page.estimateHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">{page.estimateBody}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">{page.licensesHeading}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700">{LICENSE_LINE}</p>
          </div>
          <p className="rounded-xl bg-surface p-5 text-base leading-relaxed text-gray-800">{page.languageNote}</p>

          <nav aria-label="Languages" className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="font-medium text-brand hover:underline">
              English
            </Link>
            {LANGUAGE_PAGES.map((p) => (
              <Link
                key={p.code}
                href={p.path}
                className={p.code === page.code ? "font-bold text-gray-900" : "font-medium text-brand hover:underline"}
                hrefLang={p.htmlLang}
              >
                {p.nativeName}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <LastUpdated date={page.updated} />
    </main>
  );
}
