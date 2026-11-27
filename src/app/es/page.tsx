import type { Metadata } from "next";
import LanguageLandingPage from "@/components/pages/LanguageLandingPage";
import { getLanguagePage, hreflangLanguages } from "@/data/languages";
import { socialMeta } from "@/lib/social";

const page = getLanguagePage("es")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: {
    canonical: page.path,
    languages: hreflangLanguages(),
  },
  robots: page.reviewed
    ? { index: true, follow: true }
    : { index: false, follow: true },
  ...socialMeta(page.title, page.description, page.path),
};

export default function SpanishPage() {
  return <LanguageLandingPage page={page} />;
}
