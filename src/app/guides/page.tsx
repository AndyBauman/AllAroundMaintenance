import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import { pageDate } from "@/data/content-dates";
import { publishedGuides } from "@/data/guides";
import { getServiceBySlug } from "@/lib/services";
import { socialMeta } from "@/lib/social";

const TITLE = "Home Maintenance Guides";
const DESCRIPTION =
  "Practical guides on roofs, gutters, decks, dry rot, and hiring help for Portland, OR and Vancouver, WA homeowners.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  ...socialMeta(TITLE, DESCRIPTION, "/guides"),
};

export default function GuidesHubPage() {
  const guides = publishedGuides().slice().sort((a, b) => a.title.localeCompare(b.title));
  const updated = pageDate("/guides");

  return (
    <main>
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <section className="bg-white pb-4 pt-6">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Guides</h1>
          <p className="mt-4 text-lg text-gray-600">
            Straight answers for Northwest homeowners—rewritten for today&apos;s site, not copied from old blog posts.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-4">
            {guides.map((g) => {
              const svc = getServiceBySlug(g.relatedService);
              return (
                <li key={g.slug} className="rounded-xl bg-white p-5 shadow-sm">
                  <Link href={`/${g.slug}/`} className="font-display text-xl font-bold text-brand hover:underline">
                    {g.title}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{g.description}</p>
                  {svc ? (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Related: {svc.shortTitle}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <LastUpdated date={updated} />
    </main>
  );
}
