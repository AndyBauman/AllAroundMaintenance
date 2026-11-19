import { trackedForwardHtml } from "@/lib/tracked-forward";

const GIVEAWAY_REEL_URL = "https://www.instagram.com/reel/Dfrceo6heK8/";

export function GET() {
  return new Response(trackedForwardHtml("Opening the giveaway…", GIVEAWAY_REEL_URL), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
