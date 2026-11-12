import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "@fontsource-variable/outfit";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Logo from "@/components/Logo";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { hasPublicFile } from "@/lib/assets";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { siteWideGraphSchema } from "@/lib/schema";

const TITLE = "Roof, Gutter, Siding & Deck Repair Portland & Vancouver | All Around Maintenance";
const DESCRIPTION =
  "Family-owned since 1999. Roof, gutter, siding and deck repair plus home maintenance in Portland OR & Vancouver WA. Free estimates: (503) 209-2023.";

const ogImages = hasPublicFile("og.jpg")
  ? [{ url: "/og.jpg", width: 1200, height: 630, alt: "All Around Maintenance: roof, gutter, siding and deck repair in Portland and Vancouver" }]
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: ogImages,
  },
  twitter: {
    card: ogImages ? "summary_large_image" : "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ogImages?.map((i) => i.url),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "geo.region": "US-OR",
    "geo.placename": "Portland, OR and Vancouver, WA",
  },
};

export const viewport: Viewport = {
  themeColor: "#152a3f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  return (
    <html lang="en">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
