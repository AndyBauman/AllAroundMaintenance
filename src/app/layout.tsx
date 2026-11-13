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
import { GTM_ID, META_DOMAIN_VERIFICATION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { siteWideGraphSchema } from "@/lib/schema";

const TITLE = "Roof, Gutter, Siding & Deck Repair Portland & Vancouver | All Around Maintenance";
const DESCRIPTION =
  "Family-owned since 1999. Roof, gutter, siding and deck repair plus home maintenance in Portland, OR & Vancouver, WA. Free estimates: (503) 209-2023.";

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
  // No title or description here: each page's own Open Graph values carry over to the card.
  twitter: {
    card: ogImages ? "summary_large_image" : "summary",
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
    "facebook-domain-verification": META_DOMAIN_VERIFICATION,
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
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
