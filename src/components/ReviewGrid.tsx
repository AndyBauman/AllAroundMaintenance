import type { Review } from "@/lib/reviews";
import { LEAVE_REVIEW_PATH } from "@/lib/reviews";
import Link from "next/link";

function stars(n: number): string {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return "★".repeat(full) + "☆".repeat(5 - full);
}

/** Renders nothing when the list is empty — no placeholder cards. */
export default function ReviewGrid({
  reviews,
  heading = "What customers say",
  limit,
}: {
  reviews: Review[];
  heading?: string;
  limit?: number;
}) {
  const list = typeof limit === "number" ? reviews.slice(0, limit) : reviews;
  if (list.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-bold text-gray-900">{heading}</h2>
          <Link href="/reviews/" className="text-sm font-semibold text-brand hover:underline">
            All reviews →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article key={r.id} className="rounded-2xl border border-gray-100 bg-surface p-6 shadow-sm">
              <p className="text-accent" aria-label={`${r.rating} out of 5 stars`}>
                {stars(r.rating)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{r.text}</p>
              <p className="mt-4 text-sm font-semibold text-gray-900">{r.author}</p>
              <p className="text-xs text-gray-500">
                {r.source}
                {r.city ? ` · ${r.city}` : ""}
                {r.date ? ` · ${r.date}` : ""}
              </p>
              {r.sourceUrl ? (
                <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-brand hover:underline">
                  View on {r.source}
                </a>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          <Link href={LEAVE_REVIEW_PATH} className="font-semibold text-brand hover:underline">
            Leave a Google review
          </Link>
        </p>
      </div>
    </section>
  );
}
