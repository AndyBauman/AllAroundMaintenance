import { ratingSummary } from "@/lib/reviews";

/** Renders nothing until Google rating fields are filled in business.ts. */
export default function ReviewRatingLine({ className = "" }: { className?: string }) {
  const rating = ratingSummary();
  if (!rating) return null;

  const monthYear = rating.asOf;
  return (
    <p className={className}>
      <a href={rating.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
        {rating.value} from {rating.count} {rating.source} reviews
      </a>
      , as of {monthYear}
    </p>
  );
}
