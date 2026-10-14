import Link from "next/link";
import { ScrollText } from "lucide-react";

import { Reveal } from "@/components/Reveal";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 ambient opacity-60" />

      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="link-underline self-start text-sm text-muted transition-colors hover:text-fg"
            >
              ← Back to home
            </Link>
            <p className="eyebrow">Legal · Draft</p>
            <h1 className="display-title max-w-3xl text-balance">{title}</h1>
            <p className="text-sm text-muted">Draft v0.1 · {updated}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5">
            <ScrollText className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
            <p className="text-sm leading-relaxed text-fg">
              This page is a working draft created for internal and partner
              review before public launch. It is not legal advice and is not a
              published policy. Have qualified counsel review and approve it
              before you direct real customers to it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
            {intro}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {sections.map((section, index) => (
            <Reveal
              key={section.heading}
              delay={0.05 + (index % 2) * 0.05}
              className="h-full"
            >
              <section className="h-full rounded-2xl border border-line bg-surface/50 p-6">
                <h2 className="text-base font-semibold tracking-tight text-fg">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
