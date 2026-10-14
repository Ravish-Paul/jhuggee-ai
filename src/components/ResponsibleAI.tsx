import type { LucideIcon } from "lucide-react";
import { Bot, Lock, Route, ShieldCheck, UserCheck } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { principles } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Bot,
  UserCheck,
  Lock,
  Route,
  ShieldCheck,
};

export function ResponsibleAI() {
  return (
    <section
      id="responsible-ai"
      className="section-pad relative scroll-mt-24 border-y border-line bg-ink-soft/60"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Trust & Responsible AI"
          title="Designed for Responsible Business Communication."
          description="Automated calling carries real responsibility. These are the principles Jhuggee AI is being built around."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = icons[principle.icon];
            return (
              <Reveal
                as="li"
                key={principle.id}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article className="flex h-full flex-col gap-3.5 rounded-2xl border border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-sky/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.04]">
                    <Icon className="h-4.5 w-4.5 text-sky" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            );
          })}

          <Reveal as="li" delay={0.14} className="h-full">
            <article className="flex h-full flex-col justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-white/[0.02] p-6">
              <h3 className="text-base font-semibold tracking-tight text-fg">
                Honest by default
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Jhuggee AI does not claim legal compliance or security
                certifications that have not been independently established.
                Requirements vary by market and should be reviewed with your
                own counsel before launch.
              </p>
            </article>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
