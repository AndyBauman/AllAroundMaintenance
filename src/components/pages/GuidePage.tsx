import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import type { Guide, GuideBlock } from "@/data/guides";
import { absoluteUrl, ESTIMATE_PATH, PHONE, PHONE_HREF } from "@/lib/constants";
import { hasPublicFile } from "@/lib/assets";
import { blogPostingSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

function Block({ block }: { block: GuideBlock }) {
  if (block.type === "h2") {
    return <h2 className="mt-10 font-display text-2xl font-bold text-gray-900">{block.text}</h2>;
  }
  if (block.type === "p") {
    return <p className="mt-4 text-base leading-relaxed text-gray-700">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-gray-700">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "checklist") {
    return (
      <ul className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-base text-gray-700">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 pr-4 font-semibold text-gray-900">{block.headers[0]}</th>
            <th className="py-3 font-semibold text-gray-900">{block.headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row[0]} className="border-b border-gray-100">
              <td className="py-3 pr-4 align-top font-medium text-gray-800">{row[0]}</td>
              <td className="py-3 align-top text-gray-700">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {block.note ? <p className="mt-2 text-xs text-gray-500">{block.note}</p> : null}
    </div>
  );
}

export default function GuidePage({ guide }: { guide: Guide }) {
  const service = getServiceBySlug(guide.relatedService);
  const path = `/${guide.slug}`;
  const showImage = guide.image && hasPublicFile(guide.image.src.replace(/^\//, ""));

  return (
    <main>
      <JsonLd
        data={blogPostingSchema({
          headline: guide.title,
          description: guide.description,
          url: absoluteUrl(path),
          datePublished: guide.published,
          dateModified: guide.updated,
          image: showImage && guide.image ? absoluteUrl(guide.image.src) : undefined,
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: guide.title, href: path },
        ]}
      />

      <article className="bg-white pb-4 pt-6">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Guide</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">{guide.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-800">{guide.answer}</p>

          {showImage && guide.image ? (
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl bg-surface">
              <Image src={guide.image.src} alt={guide.image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          ) : null}

          {guide.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <h2 className="mt-10 font-display text-2xl font-bold text-gray-900">{guide.northwestHeading}</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">{guide.northwest}</p>

          {service ? (
            <aside className="mt-12 rounded-xl border border-gray-200 bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-gray-900">Related service</h2>
              <p className="mt-2 text-sm text-gray-600">
                Need this done on your home? See our {service.shortTitle.toLowerCase()} page or request a free estimate.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark"
                >
                  {service.shortTitle}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={ESTIMATE_PATH}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
                >
                  Free estimate
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-brand hover:underline"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {PHONE}
                </a>
              </div>
            </aside>
          ) : null}
        </div>
      </article>

      <LastUpdated date={guide.updated} />
    </main>
  );
}
