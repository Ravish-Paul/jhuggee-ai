"use client";

import { Braces, Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Badge, ButtonLink, SectionHeading } from "@/components/ui";
import { apiExample } from "@/lib/content";
import { prefillUseCase } from "@/lib/site";

const roadmap = [
  "REST endpoints for creating and configuring voice agents",
  "Webhooks for call outcomes and handoff events",
  "Templates for common conversation workflows",
];

function HighlightedCode() {
  const [useCaseLine, objectLines] = apiExample.split("\n\n");

  return (
    <pre className="code-panel" tabIndex={0} aria-label="Illustrative API example">
      <code>
        <span className="text-accent-soft">{useCaseLine.split(" ")[0]}</span>{" "}
        <span className="text-fg">{useCaseLine.split(" ")[1]}</span>
        {"\n\n"}
        <span className="text-muted">{objectLines}</span>
      </code>
    </pre>
  );
}

export function DeveloperSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(apiExample);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="developers" className="section-pad relative scroll-mt-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-6">
              <SectionHeading
                align="left"
                eyebrow="Developers"
                title="Build the Future of Voice Experiences."
                description="Jhuggee AI aims to make voice-agent workflows easier to configure and integrate into business applications."
              />

              <ul className="flex flex-col gap-3">
                {roadmap.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink
                  href="#waitlist"
                  onClick={() => prefillUseCase("developers")}
                  className="px-6 py-3"
                >
                  Get Developer Updates
                </ButtonLink>
                <Badge>Developer APIs — Planned</Badge>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Terminal className="h-4 w-4 text-muted" />
                  <span className="text-xs font-medium text-muted">
                    api-concept.http
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
                  aria-label="Copy illustrative API example"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-signal-soft" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-black/30 px-5 py-6 sm:px-6">
                <HighlightedCode />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                <span className="inline-flex items-center gap-2 text-xs text-muted">
                  <Braces className="h-3.5 w-3.5 text-accent-soft" />
                  Illustrative API concept — not a live endpoint.
                </span>
                <span className="font-mono text-[0.7rem] text-muted/70">
                  no SDK published yet
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
