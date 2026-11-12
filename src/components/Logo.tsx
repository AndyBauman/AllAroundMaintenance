import { Compass } from "lucide-react";
import { hasPublicFile } from "@/lib/assets";
import { LEGAL_NAME } from "@/lib/constants";

/** Fills the header bar on phones and wide screens; steps down at `lg`, where the nav first appears. */
const LOGO_CLASS = "h-13 w-auto md:h-16 lg:h-12 xl:h-16";

/**
 * Header and footer logo. Uses /public/logo.svg (the banner lockup: compass emblem,
 * wordmark and red rule) or, failing that, /public/logo.png. The artwork is white,
 * made for dark backgrounds, which is why the header and footer are navy. With
 * neither file present, a text wordmark stands in.
 */
export default function Logo() {
  if (hasPublicFile("logo.svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logo.svg" alt={LEGAL_NAME} width={237} height={64} className={LOGO_CLASS} />
    );
  }

  if (hasPublicFile("logo.png")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logo.png" alt={LEGAL_NAME} width={250} height={64} className="h-11 w-auto md:h-12" />
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-accent">
        <Compass className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-white">All Around</span>
        <span className="block text-[10px] font-medium uppercase tracking-widest text-accent">Maintenance Inc.</span>
      </span>
    </span>
  );
}
