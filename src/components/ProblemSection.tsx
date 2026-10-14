import { PhoneOff, Repeat, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { problems } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  PhoneOff,
  Repeat,
  Timer,
};

export function ProblemSection() {
  return (
    <section id="problem" className="section-pad relative">
      <div className="shell">
        <SectionHeading
          eyebrow="The Problem"
          title="Business Conversations Shouldn't Be a Bottleneck."
          description="Phones still connect businesses with customers, but the way teams handle those conversations has not kept up with expectations."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = icons[problem.icon];
            return (
              <Reveal as="li" key={problem.id} delay={index * 0.08} className="h-full">
                <article className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Icon className="h-5 w-5 text-accent-soft" />
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-fg">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {problem.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
