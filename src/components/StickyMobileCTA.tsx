"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { ESTIMATE_PATH, LEAD_FORM_ENABLED, PHONE_HREF, PHONE_WA_HREF } from "@/lib/constants";

/** Fixed bottom bar on phones once the visitor scrolls. Hidden on the estimate page itself. */
export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 400);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  if (pathname?.replace(/\/$/, "") === ESTIMATE_PATH) return null;
  if (!visible) return null;

  return (
    <div className="pb-safe fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-3 shadow-lg lg:hidden">
      <div className="flex gap-3">
        {LEAD_FORM_ENABLED ? (
          <>
            <Link href={ESTIMATE_PATH} className="flex-1 rounded-lg bg-accent py-3 text-center font-bold text-gray-950">
              Free Estimate
            </Link>
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-bold text-white">
              <Phone className="h-5 w-5" aria-hidden />
              <span>Call</span>
            </a>
          </>
        ) : (
          <>
            <a href={PHONE_HREF} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-3 font-bold text-gray-950">
              <Phone className="h-5 w-5" aria-hidden />
              <span>Call Portland</span>
            </a>
            <a href={PHONE_WA_HREF} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-3 font-bold text-white">
              <Phone className="h-5 w-5" aria-hidden />
              <span>Call Vancouver</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
