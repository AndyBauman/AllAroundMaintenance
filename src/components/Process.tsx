import { CalendarCheck, ClipboardList, MessageSquare, ShieldCheck, type LucideIcon } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/business-facts";

const ICONS: LucideIcon[] = [MessageSquare, ClipboardList, CalendarCheck, ShieldCheck];

export default function Process() {
  return (
    <section id="process" className="bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
            Simple &amp; Predictable
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200">
            You always know what happens next, what it costs and when we&apos;ll be there.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div key={step.step} className="relative text-center">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute left-[60%] top-12 hidden h-0.5 w-[80%] bg-white/20 lg:block" />
                )}
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                  <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-gray-950">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-200">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
