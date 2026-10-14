"use client";

import { useId } from "react";

type LogoProps = {
  className?: string;
  variant?: "gradient" | "mono";
  title?: string;
};

export function LogoMark({
  className = "h-8 w-8",
  variant = "gradient",
  title = "Jhuggee AI logo",
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `jhuggee-grad-${uid}`;

  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="2"
          y1="2"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B5CF6" />
          <stop offset="0.55" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <path
        d="M9 4.5h14A5.5 5.5 0 0 1 28.5 10v8.2a5.5 5.5 0 0 1-5.5 5.5h-6.7l-6.1 4.6c-.7.5-1.7 0-1.7-.9v-3.7A5.5 5.5 0 0 1 3.5 18.2V10A5.5 5.5 0 0 1 9 4.5Z"
        stroke={variant === "gradient" ? `url(#${gradientId})` : "currentColor"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <rect x="8.2" y="11.4" width="2.2" height="6.4" rx="1.1" />
        <rect x="12.6" y="8.8" width="2.2" height="11.6" rx="1.1" />
        <rect x="17" y="7.2" width="2.2" height="14.8" rx="1.1" />
        <rect x="21.4" y="10.2" width="2.2" height="8.8" rx="1.1" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  variant = "gradient",
  markClassName = "h-8 w-8",
}: LogoProps & { markClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={markClassName} variant={variant} />
      <span className="text-[0.95rem] font-semibold tracking-tight text-fg">
        Jhuggee&nbsp;
        <span className="text-muted">AI</span>
      </span>
    </span>
  );
}
