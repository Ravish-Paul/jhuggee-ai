import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Waveform } from "@/components/Waveform";
import { ButtonLink } from "@/components/ui";

export function FinalCTA() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent/20 via-surface to-signal/12 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-signal/20 blur-[100px]" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Reveal>
              <h2 className="display-title text-balance">
                Every Business Deserves{" "}
                <span className="gradient-text">Smarter Conversations.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Follow the journey toward more natural, automated business
                calling.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#waitlist" className="px-7 py-3.5">
                  Join the Waitlist
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="#product"
                  variant="outline"
                  className="px-7 py-3.5"
                >
                  Explore the Product
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-12 opacity-40 sm:mt-14"
          >
            <Waveform
              active
              barCount={64}
              className="h-16 sm:h-20"
              tone="mono"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
