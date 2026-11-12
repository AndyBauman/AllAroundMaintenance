import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/constants";

interface Crumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const schemaItems = all.map((c) => ({ name: c.label, url: absoluteUrl(c.href) }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {all.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 text-gray-300" aria-hidden />}
              {i < all.length - 1 ? (
                <Link href={crumb.href} className="transition-colors hover:text-brand">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-gray-900">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
