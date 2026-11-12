import Link from "next/link";
import { ESTIMATE_PATH, PHONE, PHONE_HREF } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-gray-900">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-gray-600">
          It may have moved. Try one of these, or call{" "}
          <a href={PHONE_HREF} className="font-semibold text-brand hover:underline">{PHONE}</a>.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-xl bg-brand px-6 py-3 font-bold text-white hover:bg-brand-light">Home</Link>
          <Link href="/services" className="rounded-xl border-2 border-brand px-6 py-3 font-bold text-brand hover:bg-brand/10">All Services</Link>
          <Link href={ESTIMATE_PATH} className="rounded-xl bg-accent px-6 py-3 font-bold text-gray-950 hover:bg-accent-light">Free Estimate</Link>
        </div>
      </div>
    </main>
  );
}
