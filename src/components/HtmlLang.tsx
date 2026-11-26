"use client";

import { useEffect } from "react";

/** Sets <html lang> for this route; restores previous value on leave. */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = lang;
    return () => {
      el.lang = prev || "en";
    };
  }, [lang]);

  return null;
}
