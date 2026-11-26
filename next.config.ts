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
  // /reviews is a live page again (Stage 3); do not redirect it.
  ["/resources", "/faq/"],
  ["/thank-you", "/"],
  ["/vancouver-wa", "/vancouver-home-maintenance/"],
  ["/home", "/"],
  ["/index.html", "/"],
];

/**
 * Stage 5: the 19 restored guide slugs are live pages again (no redirects).
 * /blog forwards to the new /guides/ hub.
 */
const BLOG_TO_GUIDES: [string, string][] = [["/blog", "/guides/"]];

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
      // Leftover WordPress archive and feed URLs that crawlers still request.
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/services/", permanent: true },
      { source: "/tag/:path*", destination: "/services/", permanent: true },
      { source: "/author/:path*", destination: "/about-us/", permanent: true },
      ...BLOG_TO_GUIDES.map(([source, destination]) => ({ source, destination, permanent: true })),
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
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Fingerprinted build assets never change for a given URL.
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // next/image optimizer output — match images.minimumCacheTTL.
        source: "/_next/image",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" }],
      },
      {
        // Photos and the logo in /public. Long browser + CDN cache; filenames change on replace.
        source: "/:file(.+\\.(?:jpg|jpeg|png|webp|avif|svg))",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, s-maxage=31536000, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
