import { trackedForwardHtml } from "@/lib/tracked-forward";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJVVUJJV0wLVQRgzSgZKiUExk";

export function GET() {
  return new Response(trackedForwardHtml("Opening the Google review form…", GOOGLE_REVIEW_URL), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
