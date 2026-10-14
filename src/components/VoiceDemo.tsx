"use client";

import { CircleAlert, Phone, PhoneOff, Play, Radio } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Waveform } from "@/components/Waveform";
import { Button, SectionHeading } from "@/components/ui";
import { requestDemoSession } from "@/lib/demo";
import type { DemoSession } from "@/lib/demo";
import type { DemoLine } from "@/lib/content";

type Status = "idle" | "connecting" | "live" | "complete" | "ended";

const statusCopy: Record<Status, { label: string; tone: string }> = {
  idle: { label: "Ready to start", tone: "text-muted" },
  connecting: { label: "Connecting preview…", tone: "text-sky" },
  live: { label: "Sample conversation playing", tone: "text-signal-soft" },
  complete: { label: "Preview finished", tone: "text-signal-soft" },
  ended: { label: "Preview ended", tone: "text-muted" },
};

export function VoiceDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [session, setSession] = useState<DemoSession | null>(null);
  const [lines, setLines] = useState<DemoLine[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [failed, setFailed] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status !== "live" && status !== "connecting") return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status !== "live") return;
    if (revealed >= lines.length) {
      const finish = window.setTimeout(() => setStatus("complete"), 700);
      return () => window.clearTimeout(finish);
    }
    const delay = revealed === 0 ? 500 : 1600;
    const id = window.setTimeout(() => setRevealed((value) => value + 1), delay);
    return () => window.clearTimeout(id);
  }, [status, revealed, lines.length]);

  const start = useCallback(async () => {
    setFailed(false);
    setLines([]);
    setRevealed(0);
    setSeconds(0);
    setSession(null);
    setStatus("connecting");

    const data = await requestDemoSession();
    if (!mounted.current) return;

    if (data.lines.length === 0) {
      setFailed(true);
      setStatus("idle");
      return;
    }

    setSession(data);
    setLines(data.lines);
    setStatus("live");
  }, []);

  const stop = useCallback(() => {
    setStatus((current) =>
      current === "idle" ? current : "ended",
    );
  }, []);

  const running = status === "connecting" || status === "live";
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");

  return (
    <section id="demo" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 ambient opacity-70" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Interactive Demo"
          title="Experience a Voice Agent in Action."
          description="Play through a sample conversation below. It runs entirely in your browser against a local simulation — nothing is dialled, and no live AI model is contacted."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-12">
            <div className="panel flex flex-col gap-6 p-6 sm:p-7 lg:col-span-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/[0.04]">
                    <Radio className="h-5 w-5 text-accent-soft" />
                    {running ? (
                      <span className="absolute inset-0 rounded-full border border-signal/60 animate-pulse-dot" />
                    ) : null}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-fg">
                      Voice Agent Preview
                    </p>
                    <p
                      className={`text-xs ${statusCopy[status].tone}`}
                      role="status"
                      aria-live="polite"
                    >
                      {statusCopy[status].label}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-sm tabular-nums text-muted">
                  {minutes}:{remainder}
                </span>
              </div>

              <div className="rounded-2xl border border-line bg-black/25 px-4 py-6">
                <Waveform
                  active={running}
                  barCount={30}
                  className="h-28"
                  seed={4}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={start}
                  disabled={running}
                  className="flex-1 py-3.5"
                >
                  <Play className="h-4 w-4" />
                  Start Demo
                </Button>
                <Button
                  variant="outline"
                  onClick={stop}
                  disabled={!running}
                  className="flex-1 py-3.5"
                >
                  <PhoneOff className="h-4 w-4" />
                  End Demo
                </Button>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-line bg-white/[0.03] p-3.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <p className="text-xs leading-relaxed text-muted">
                  Interactive preview — sample conversation, not a live AI
                  call.
                </p>
              </div>
            </div>

            <div className="panel flex flex-col overflow-hidden lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-signal" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="h-2 w-2 rounded-full bg-line-strong" />
                  <p className="ml-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    Call transcript
                  </p>
                </div>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-accent-soft">
                  Demo Preview
                </span>
              </div>

              <div className="flex min-h-[22rem] flex-1 flex-col gap-4 p-5 sm:min-h-[24rem] sm:p-6">
                {lines.length === 0 ? (
                  <div className="flex flex-1 flex-col justify-center gap-7">
                    <div
                      aria-hidden="true"
                      className="flex flex-col gap-5 opacity-50"
                    >
                      <div className="flex flex-col items-start gap-2">
                        <span className="h-2 w-16 rounded-full bg-white/10" />
                        <span className="h-11 w-3/4 rounded-2xl rounded-tl-sm bg-white/[0.05]" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="h-2 w-12 rounded-full bg-white/10" />
                        <span className="h-9 w-1/2 rounded-2xl rounded-tr-sm bg-white/[0.05]" />
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <span className="h-2 w-16 rounded-full bg-white/10" />
                        <span className="h-12 w-2/3 rounded-2xl rounded-tl-sm bg-white/[0.05]" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 text-sm text-muted">
                      <Play className="h-4 w-4" />
                      Press Start Demo to play through a sample appointment
                      conversation.
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {lines.slice(0, revealed).map((line, index) => (
                      <li
                        key={`${line.speaker}-${index}`}
                        className={`animate-rise flex flex-col gap-1.5 ${
                          line.speaker === "caller"
                            ? "items-end"
                            : "items-start"
                        }`}
                      >
                        <span
                          className={`text-[0.65rem] font-semibold uppercase tracking-widest ${
                            line.speaker === "agent"
                              ? "text-accent-soft"
                              : "text-sky"
                          }`}
                        >
                          {line.speaker === "agent" ? "AI Agent" : "Caller"}
                        </span>
                        <span
                          className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            line.speaker === "agent"
                              ? "rounded-tl-sm bg-accent/15 text-fg"
                              : "rounded-tr-sm bg-white/[0.06] text-muted"
                          }`}
                        >
                          {line.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {status === "connecting" ? (
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
                    Preparing sample conversation…
                  </div>
                ) : null}

                {status === "complete" ? (
                  <div className="mt-auto rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-xs leading-relaxed text-accent-soft">
                    Preview complete. This is a scripted simulation — a real
                    voice provider can be connected behind the server endpoint
                    later.
                  </div>
                ) : null}

                {failed ? (
                  <div className="flex items-start gap-2 rounded-xl border border-line-strong bg-white/[0.04] px-4 py-3 text-xs text-muted">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                    The preview could not start. Please try again.
                  </div>
                ) : null}

                {session ? (
                  <p className="mt-auto text-[0.7rem] leading-relaxed text-muted/80">
                    {session.label}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
