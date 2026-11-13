import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Logo from "@/components/Logo";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { GTM_ID, META_DOMAIN_VERIFICATION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { siteWideGraphSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/social";

/*
 * Self-hosted variable fonts (latin subset only; the site is English). next/font preloads them
 * and generates size-matched fallbacks, so text paints early without shifting when they arrive.
 */
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const outfit = localFont({
  src: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

const TITLE = "Roof, Gutter, Siding & Deck Repair Portland & Vancouver | All Around Maintenance";
const DESCRIPTION =
  "Family-owned since 1999. Roof, gutter, siding and deck repair plus home maintenance in Portland, OR & Vancouver, WA. Free estimates: (503) 209-2023.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  ...socialMeta(TITLE, DESCRIPTION, "/"),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "geo.region": "US-OR",
    "geo.placename": "Portland, OR and Vancouver, WA",
    "facebook-domain-verification": META_DOMAIN_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#152a3f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <JsonLd data={siteWideGraphSchema()} />
        <Header logo={<Logo />} />
        {children}
        <Footer />
        <StickyMobileCTA />

        {gaMeasurementId ? (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              var gaLoaded = false;
              function loadGa(){
                if (gaLoaded) return;
                gaLoaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}';
                document.head.appendChild(s);
              }
              function gtag(){ dataLayer.push(arguments); }
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
              document.addEventListener('click', function (event) {
                var node = event.target;
                if (!node || !node.closest) return;
                var link = node.closest('a[href^="tel:"]');
                if (!link) return;
                gtag('event', 'phone_click', { link_url: link.getAttribute('href') || '', event_category: 'engagement' });
              }, true);
              /* Load the GA library after first interaction or when the browser is idle, to keep it out of the critical path. */
              window.addEventListener('pointerdown', loadGa, { once: true, passive: true });
              window.addEventListener('keydown', loadGa, { once: true });
              window.setTimeout(function(){
                if (window.requestIdleCallback) window.requestIdleCallback(loadGa, { timeout: 4000 });
                else loadGa();
              }, 3500);
            `}
          </Script>
        ) : null}

        {GTM_ID ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              /*
               * Tag Manager loads the old marketing tags (GA4, Google Ads, Meta Pixel, CallRail,
               * ClickCease): roughly 700 KB of script. Loading it with the page pushed mobile
               * LCP to ~9s on slow 4G. It now loads on the visitor's first touch, scroll, click
               * or key press, or 3.5s after the page finishes loading, whichever comes first.
               * Events pushed to dataLayer before then are queued and sent when it loads.
               */
              (function (w, d, id) {
                w.dataLayer = w.dataLayer || [];
                w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var loaded = false;
                var evts = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel', 'mousemove'];
                function load() {
                  if (loaded) return;
                  loaded = true;
                  evts.forEach(function (e) { w.removeEventListener(e, load); });
                  var j = d.createElement('script');
                  j.async = true;
                  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
                  d.head.appendChild(j);
                }
                evts.forEach(function (e) { w.addEventListener(e, load, { once: true, passive: true }); });
                function later() {
                  w.setTimeout(function () {
                    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 2000 });
                    else load();
                  }, 3500);
                }
                if (d.readyState === 'complete') later();
                else w.addEventListener('load', later, { once: true });
              })(window, document, '${GTM_ID}');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
