import { Compass } from "lucide-react";
import { hasPublicFile } from "@/lib/assets";
import { LEGAL_NAME } from "@/lib/constants";

/**
 * Renders /public/logo.png when it exists (the brand logo is white, made for dark
 * backgrounds, which is why the header and footer are navy). Until the file is added,
 * a text wordmark stands in.
 */
export default function Logo() {
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
