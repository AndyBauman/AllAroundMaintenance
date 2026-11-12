import type { NextConfig } from "next";

/**
 * Legacy URLs from the previous WordPress site.
 *
 * Service and city pages keep their exact old slugs, so they need no redirect.
 * Only pages that were merged or renamed are listed here.
 */
const PERMANENT_REDIRECTS: [string, string][] = [
  ["/contact-us", "/free-estimate/"],
  ["/contact", "/free-estimate/"],
  ["/quote", "/free-estimate/"],
  ["/residential-services", "/services/"],
  ["/sitemap", "/service-areas/"],
  ["/vancouver-wa", "/vancouver-home-maintenance/"],
  ["/home", "/"],
  ["/index.html", "/"],
];

/**
 * The 19 blog posts are being rewritten (phase 2). Until they are live, each old post
 * URL forwards to the closest service page with a TEMPORARY redirect, so nothing 404s
 * at cutover and the original URL can be restored when the post is republished.
 */
const TEMPORARY_BLOG_REDIRECTS: [string, string][] = [
  ["/blog", "/services/"],
  ["/what-to-do-if-roof-is-leaking", "/leaky-roof-repair/"],
  ["/professional-dry-rot-repair-smart-investment", "/dry-rot-repair/"],
  ["/roof-maintenance-tips", "/roof-inspection-cleaning-repair/"],
  ["/why-is-moss-so-bad-for-your-roof", "/moss-removal-portland/"],
  ["/8-roof-and-gutter-maintenance-tasks-for-winter", "/gutter-cleaning-gutter-inspection/"],
  ["/new-homeowners-guide-to-gutter-maintenance", "/gutter-cleaning-gutter-inspection/"],
  ["/dangers-clogged-gutters", "/gutter-cleaning-gutter-inspection/"],
  ["/roof-gutter-cleaning-mistakes", "/gutter-cleaning-gutter-inspection/"],
  ["/questions-to-ask-your-gutter-cleaners", "/gutter-cleaning-gutter-inspection/"],
  ["/cleaning-maintaining-decks", "/deck-cleaning-deck-repair-deck-restoration/"],
  ["/decks-and-fencing", "/deck-cleaning-deck-repair-deck-restoration/"],
  ["/get-ready-for-summer-entertaining", "/deck-cleaning-deck-repair-deck-restoration/"],
  ["/signs-trust-handyman", "/handyman-portland/"],
  ["/essential-services-for-homeowners", "/services/"],
  ["/year-round-home-maintenance", "/services/"],
  ["/tips-well-maintained-home", "/services/"],
  ["/how-to-find-a-handyman", "/handyman-portland/"],
  ["/home-maintenance-tasks-never-do-yourself", "/handyman-portland/"],
  ["/dry-rot-siding-trim", "/dry-rot-repair/"],
];

const nextConfig: NextConfig = {
  // The previous site served every URL with a trailing slash. Matching it means the
  // existing indexed URLs resolve with no redirect at all.
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    qualities: [60, 75],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Canonical host: bare domain -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "allaroundmaintenanceinc.com" }],
        destination: "https://www.allaroundmaintenanceinc.com/:path*",
        permanent: true,
      },
      ...PERMANENT_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...TEMPORARY_BLOG_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: false })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/free-estimate",
        headers: [{ key: "Cache-Control", value: "private, no-cache, no-store, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
