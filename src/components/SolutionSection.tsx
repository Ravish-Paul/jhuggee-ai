import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Braces,
  Headphones,
  Languages,
  PhoneCall,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui";
import { features } from "@/lib/content";
import type { FeatureStatus } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  AudioLines,
  Headphones,
  PhoneCall,
  Workflow,
  Languages,
  Braces,
};

function statusStyles(status: FeatureStatus) {
  return status === "In Development"
    ? "border-sky/40 bg-sky/10 text-sky"
    : "border-line-strong bg-white/[0.04] text-muted";
}

export function SolutionSection() {
  return (
    <section id="product" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">The Solution</p>
              <h2 className="section-title text-balance">
                Meet a Smarter Way to Handle Calls.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Jhuggee AI is a platform being developed to help businesses
              create AI-powered voice agents for repetitive and structured
              conversations — so your team spends its time where it matters
              most.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Reveal
                as="li"
                key={feature.id}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-accent/15 to-sky/10">
                      <Icon className="h-5 w-5 text-accent-soft" />
                    </span>
                    <Badge className={statusStyles(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {feature.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            Features marked as planned or in development describe intended
            direction. The platform is under development and capabilities are
            not yet generally available.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
