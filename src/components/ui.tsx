import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent via-sky to-signal px-6 py-3 text-ink font-semibold shadow-[0_10px_40px_-12px_rgba(52,211,153,0.55)] hover:shadow-[0_14px_46px_-10px_rgba(52,211,153,0.75)] hover:brightness-110 active:scale-[0.98]",
  outline:
    "border border-line-strong bg-white/[0.03] px-6 py-3 text-fg hover:border-accent/60 hover:bg-white/[0.06] active:scale-[0.98]",
  ghost:
    "px-3 py-2 text-muted hover:text-fg",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-[0.6875rem] font-medium tracking-wide text-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title max-w-3xl text-balance">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
