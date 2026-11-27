import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import ReviewGrid from "@/components/ReviewGrid";
import ReviewRatingLine from "@/components/ReviewRatingLine";
import { pageDate } from "@/data/content-dates";
import { absoluteUrl } from "@/lib/constants";
import { LEAVE_REVIEW_PATH, REVIEWS, ratingSummary } from "@/lib/reviews";
import { webPageSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/social";

const TITLE = "Customer Reviews";
const DESCRIPTION =
  "Google reviews for All Around Maintenance Inc. Roof, gutter, siding and deck work in Portland, OR and Vancouver, WA.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/reviews" },
  ...socialMeta(TITLE, DESCRIPTION, "/reviews"),
};

export default function ReviewsPage() {
  const rating = ratingSummary();
  const updated = pageDate("/reviews");

  return (
    <main>
      <JsonLd
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl("/reviews"),
          dateModified: updated,
        })}
      />
      <Breadcrumbs items={[{ label: "Reviews", href: "/reviews" }]} />

      <section className="bg-white pb-6 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-gray-900 sm:text-5xl">Customer Reviews</h1>
          {rating ? (
            <ReviewRatingLine className="mt-4 text-lg text-gray-700" />
          ) : (
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Reviews are published on Google. When the office exports them into the site, they appear here with the source
              and date.
            </p>
          )}
          <p className="mt-4">
            <Link href={LEAVE_REVIEW_PATH} className="font-semibold text-brand hover:underline">
              Leave a Google review →
            </Link>
          </p>
        </div>
      </section>

      {REVIEWS.length > 0 ? (
        <ReviewGrid reviews={REVIEWS} heading="From Google" />
      ) : (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-gray-600">
              No reviews have been imported onto the site yet. Use the link above to leave one on Google, or check back
              after the next content update.
            </p>
          </div>
        </section>
      )}

      <LastUpdated date={updated} />
    </main>
  );
}
