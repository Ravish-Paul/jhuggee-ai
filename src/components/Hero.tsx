"use client";

import { ArrowRight, AudioLines, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/Reveal";
import { Waveform } from "@/components/Waveform";
import { ButtonLink } from "@/components/ui";

const transcript = [
  {
    speaker: "AI Agent",
    text: "Hello! Thanks for calling. How can I help you today?",
    tone: "agent" as const,
  },
  {
    speaker: "Caller",
    text: "I'd like to schedule an appointment.",
    tone: "caller" as const,
  },
  {
    speaker: "AI Agent",
    text: "Of course. What day works best for you?",
    tone: "agent" as const,
  },
];

function CallTimer() {
  const [seconds, setSeconds] = useState(12);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setSeconds((value) => value + 1);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");

  return (
    <span className="font-mono text-xs tabular-nums text-muted">
      {minutes}:{remainder}
    </span>
  );
}

function AgentVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" />

      <div className="panel relative overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-white/[0.04]">
              <AudioLines className="h-5 w-5 text-accent-soft" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-signal animate-pulse-dot" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-fg">Jhuggee Voice Agent</p>
              <p className="text-xs text-muted">Illustrative preview</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse-dot" />
            Demo Preview
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-black/25 px-4 py-5">
          <Waveform active barCount={32} className="h-24" />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-sky/30">
              <Phone className="h-4 w-4 text-fg" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-fg">Incoming call</p>
              <p className="text-xs text-muted">Sample conversation</p>
            </div>
          </div>
          <CallTimer />
        </div>

        <div className="mt-4 rounded-2xl border border-line bg-black/20 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted">
              Transcript
            </p>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-accent-soft">
              Illustrative conversation
            </p>
          </div>

          <ul className="space-y-3">
            {transcript.map((line, index) => (
              <li
                key={line.text}
                className={`animate-rise flex flex-col gap-1 ${
                  line.tone === "caller" ? "items-end" : "items-start"
                }`}
                style={
                  {
                    "--reveal-delay": `${0.5 + index * 0.45}s`,
                  } as CSSProperties
                }
              >
                <span
                  className={`text-[0.65rem] font-semibold uppercase tracking-widest ${
                    line.tone === "agent" ? "text-accent-soft" : "text-sky"
                  }`}
                >
                  {line.speaker}
                </span>
                <span
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    line.tone === "agent"
                      ? "rounded-tl-sm bg-accent/15 text-fg"
                      : "rounded-tr-sm bg-white/[0.06] text-muted"
                  }`}
                >
                  {line.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Demo preview — illustrative conversation, not a live AI call.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 ambient" />
      <div className="pointer-events-none absolute inset-0 grid-lines" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-accent-soft">
                Introducing Jhuggee AI
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 display-title text-balance">
                Your Next Conversation{" "}
                <span className="gradient-text">Runs on AI.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Build smarter business conversations with AI voice agents
                designed to handle customer calls, qualify leads, book
                appointments, and automate repetitive workflows.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#waitlist" className="px-7 py-3.5">
                  Join the Waitlist
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#use-cases" variant="outline" className="px-7 py-3.5">
                  Explore Use Cases
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-7 flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Built for businesses ready to rethink how they communicate.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal delay={0.2} className="mx-auto max-w-xl lg:max-w-none">
              <AgentVisual />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8 md:mt-24">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-muted">
              Early-stage platform · Built for India, the US, the UK, Canada,
              and beyond
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
