import Link from "next/link";
import { business } from "@/data/business";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatMonthYear(isoDate: string): string {
  const [y, m] = isoDate.split("-").map(Number);
  if (!y || !m) return isoDate;
  return `${MONTHS[m - 1]} ${y}`;
}

/**
 * "Reviewed by" stays hidden until the owner confirms in business.founderReviewsContent.
 * Last updated always shows when a date is provided.
 */
export default function LastUpdated({
  date,
  showReviewedBy = true,
}: {
  date: string;
  showReviewedBy?: boolean;
}) {
  const reviewed = showReviewedBy && business.founderReviewsContent;

  return (
    <p className="mx-auto max-w-7xl px-4 pb-10 text-sm text-gray-500 sm:px-6 lg:px-8">
      Last updated {formatMonthYear(date)}
      {reviewed ? (
        <>
          {" · "}
          Reviewed by{" "}
          <Link href={business.founder.url} className="font-medium text-brand hover:underline">
            {business.founder.name}
          </Link>
          , founder
        </>
      ) : null}
    </p>
  );
}
