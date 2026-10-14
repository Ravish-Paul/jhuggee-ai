import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad relative scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="How It Works"
          title="From Business Workflow to Voice Agent."
          description="The intended workflow for building on Jhuggee AI — a guided path from idea to a voice agent you can test, review, and refine."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[1.375rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent lg:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 right-8 top-[1.375rem] hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
          />

          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 0.1}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-ink font-mono text-xs font-semibold text-accent-soft shadow-[0_0_0_6px_rgba(8,11,20,1)]">
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent lg:hidden"
                  />
                </div>

                <article className="mt-5 rounded-2xl border border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/40 sm:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            This describes the intended product workflow. The platform is under
            development, so parts of this process are not yet available —
            early access will reveal what is ready first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
