import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { CircleCheck, Phone } from "lucide-react";
import { hasPublicFile } from "@/lib/assets";
import { ESTIMATE_PATH, PHONE, PHONE_HREF } from "@/lib/constants";
import { FACTS } from "@/lib/business-facts";

const BADGES = ["Licensed in OR & WA", `Family-Owned Since ${FACTS.founded}`, "Free Itemized Estimates"];

const PHOTO_ALT = "Modern Pacific Northwest home with gray siding, a covered patio and a green lawn";

/**
 * On phones and tablets the hero is taller than it is wide, so the photo is scaled up to
 * cover it. These sizes tell the browser how wide the photo is really drawn, so it picks
 * a file sharp enough instead of one sized for the screen width.
 */
const WIDE_SIZES = "(max-width: 1023px) 220vw, 100vw";
const TALL_SIZES = "200vw";

/** public/hero.jpg everywhere; public/hero-mobile.jpg (a tall crop) on phones when present. */
function HeroPhoto() {
  const shared = { alt: PHOTO_ALT, fill: true, priority: true, quality: 60 } as const;

  if (!hasPublicFile("hero-mobile.jpg")) {
    return <Image {...shared} src="/hero.jpg" sizes={WIDE_SIZES} className="object-cover" />;
  }

  const { props: wide } = getImageProps({ ...shared, src: "/hero.jpg", sizes: WIDE_SIZES });
  const { props: tall } = getImageProps({ ...shared, src: "/hero-mobile.jpg", sizes: TALL_SIZES });

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={tall.srcSet} sizes={TALL_SIZES} />
      <img {...wide} alt={PHOTO_ALT} className="object-cover" />
    </picture>
  );
}

export default function Hero() {
  const hasPhoto = hasPublicFile("hero.jpg");

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 z-0">
        {hasPhoto ? (
          <>
            <HeroPhoto />
            {/* Light enough to show the house; a little heavier on small screens, where the copy runs the full width. */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/75 via-brand-dark/55 to-brand-dark/35 lg:from-brand-dark/70 lg:via-brand-dark/35 lg:to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand" />
            <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-brand-light/20 blur-3xl" aria-hidden />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Serving Portland &amp; Vancouver
          </div>

          <h1 className="[text-shadow:0_2px_12px_rgb(0_0_0/0.55)] font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:whitespace-nowrap lg:text-6xl">
            Roof, Gutter, <span className="whitespace-nowrap">Siding &amp; Deck</span>
            <br />
            <span className="text-accent">Repair &amp; Maintenance</span>
            <br />
            Portland &amp; Vancouver
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.6)] sm:text-xl">
            One licensed, family-owned crew for the roof, the gutters, the siding, the deck and nearly everything else on your list.
            We respond {FACTS.responseTime} and send a free itemized estimate within {FACTS.estimateTurnaround}.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={ESTIMATE_PATH}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-bold text-gray-950 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-2xl"
            >
              Get a Free Estimate
            </Link>
            <Link
              href="/roof-inspection-cleaning-repair"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Free Roof Inspection
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {PHONE}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-200">
            {BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-accent" aria-hidden />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
