import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import { pageDate } from "@/data/content-dates";
import { ESTIMATE_PATH, absoluteUrl } from "@/lib/constants";
import { publishedProjects } from "@/lib/projects";
import { webPageSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/social";

const TITLE = "Project Gallery";
const DESCRIPTION =
  "Real roof, gutter, deck and home maintenance jobs by All Around Maintenance in Portland, OR and Vancouver, WA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  ...socialMeta(TITLE, DESCRIPTION, "/projects"),
};

export default function ProjectsPage() {
  const projects = publishedProjects();
  const updated = pageDate("/projects");

  return (
    <main>
      <JsonLd
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl("/projects"),
          dateModified: updated,
        })}
      />
      <Breadcrumbs items={[{ label: "Projects", href: "/projects" }]} />

      <section className="bg-white pb-6 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Project Gallery</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Job photos go live here after the office fills in city, month and scope for each set. Until then, ask us about
            similar work when you request an estimate.
          </p>
        </div>
      </section>

      {projects.length > 0 ? (
        <section className="bg-surface py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand/30 hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-900">{p.title}</h2>
                <p className="mt-2 text-sm text-gray-600">
                  {p.city}, {p.state} · {p.date}
                </p>
                <p className="mt-3 text-sm text-gray-700">{p.work}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-gray-600">
              The photo library is organized; project pages unlock when{" "}
              <code className="text-sm">docs/project-intake.csv</code> rows are completed.{" "}
              <Link href={ESTIMATE_PATH} className="font-semibold text-brand hover:underline">
                Get a free estimate
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <LastUpdated date={updated} />
    </main>
  );
}
