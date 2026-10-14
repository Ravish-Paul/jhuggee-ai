"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode, Ref } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-40px 0px -60px 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const classes = `reveal${className ? ` ${className}` : ""}`;
  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  if (as === "li") {
    return (
      <li ref={ref as unknown as Ref<HTMLLIElement>} className={classes} style={style}>
        {children}
      </li>
    );
  }

  if (as === "section") {
    return (
      <section
        ref={ref as unknown as Ref<HTMLElement>}
        className={classes}
        style={style}
      >
        {children}
      </section>
    );
  }

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
