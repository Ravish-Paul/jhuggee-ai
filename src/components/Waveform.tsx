"use client";

import type { CSSProperties } from "react";

type WaveformProps = {
  active?: boolean;
  className?: string;
  barCount?: number;
  seed?: number;
  tone?: "violet" | "mono";
};

const BASE_HEIGHTS = [
  34, 58, 42, 76, 92, 64, 48, 84, 70, 40, 62, 88, 54, 36, 72, 96, 60, 44, 78,
  52, 68, 86, 46, 64, 38, 80, 56, 74, 42, 66, 90, 50, 62, 36, 70, 58,
];

export function Waveform({
  active = false,
  className = "h-28",
  barCount = 36,
  seed = 0,
  tone = "violet",
}: WaveformProps) {
  const heights = Array.from({ length: barCount }, (_, index) => {
    const base = BASE_HEIGHTS[(index + seed) % BASE_HEIGHTS.length];
    return base;
  });

  return (
    <div
      className={`flex w-full items-center justify-between gap-[3px] ${className}`}
      aria-hidden="true"
    >
      {heights.map((height, index) => {
        const style = {
          height: `${height}%`,
          "--i": index,
          backgroundImage:
            tone === "violet"
              ? active
                ? "linear-gradient(180deg, #6EE7B7 0%, #34D399 100%)"
                : "linear-gradient(180deg, #A78BFA 0%, #60A5FA 100%)"
              : "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(148,163,184,0.45) 100%)",
          opacity: active ? 0.55 + ((index % 5) * 0.1) : 0.35,
          transition: "opacity 0.4s ease",
        } as CSSProperties;

        return (
          <span
            key={index}
            data-active={active ? "true" : "false"}
            className="wave-bar block w-[3px] min-w-[2px] rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}
