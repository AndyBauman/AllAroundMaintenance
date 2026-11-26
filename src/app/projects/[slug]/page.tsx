import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import { pageDate } from "@/data/content-dates";
import { absoluteUrl } from "@/lib/constants";
import { getProject, publishedProjects } from "@/lib/projects";
import { webPageSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/social";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.title;
  const description = `${project.work} in ${project.city}, ${project.state}.`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    ...socialMeta(title, description, `/projects/${project.slug}`),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const updated = pageDate(`/projects/${project.slug}`);
  const path = `/projects/${project.slug}`;

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema({
            name: project.title,
            description: project.work,
            url: absoluteUrl(path),
            dateModified: updated,
          }),
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: project.title,
            about: `${project.service} in ${project.city}, ${project.state}`,
            image: project.photos.map((ph) => ({
              "@type": "ImageObject",
              contentUrl: absoluteUrl(ph.src),
              description: ph.alt,
              contentLocation: { "@type": "City", name: project.city },
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.title, href: path },
        ]}
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900">{project.title}</h1>
          <p className="mt-2 text-gray-600">
            {project.city}, {project.state} · {project.date}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">The problem</h2>
              <p className="mt-2 text-gray-700">{project.problem}</p>
              <h2 className="mt-6 text-lg font-bold text-gray-900">What we did</h2>
              <p className="mt-2 text-gray-700">{project.work}</p>
              {project.materials ? (
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-semibold">Materials:</span> {project.materials}
                </p>
              ) : null}
              {project.timeOnSite ? (
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Time on site:</span> {project.timeOnSite}
                </p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.photos.map((ph) => (
                <figure key={ph.src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                  <Image src={ph.src} alt={ph.alt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white">
                    {ph.stage}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LastUpdated date={updated} />
    </main>
  );
}
