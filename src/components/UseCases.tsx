"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BellRing,
  CalendarClock,
  Headphones,
  LifeBuoy,
  UserCheck,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { useCases } from "@/lib/content";
import { prefillUseCase } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  Headphones,
  UserCheck,
  CalendarClock,
  LifeBuoy,
  BellRing,
  Workflow,
};

export function UseCases() {
  return (
    <section id="use-cases" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Use Cases"
          title="One Platform. Multiple Business Workflows."
          description="Explore the conversations businesses most want to automate. Each path below leads to the waitlist — tell us which workflow matters to you."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = icons[useCase.icon];
            return (
              <Reveal
                as="li"
                key={useCase.id}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article
                  id={useCase.id}
                  className="group relative flex h-full flex-col scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-sky/10">
                      <Icon className="h-5 w-5 text-accent-soft" />
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-fg">
                    {useCase.title}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {useCase.body}
                  </p>

                  <a
                    href={useCase.href}
                    onClick={() => prefillUseCase(useCase.prefill)}
                    className="relative mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent-soft transition-colors hover:text-fg"
                    aria-label={`${useCase.linkLabel}: ${useCase.title}`}
                  >
                    {useCase.linkLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
