"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui";
import { mainNav } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = mainNav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <a
            href="#top"
            className="shrink-0 rounded-full py-1"
            aria-label="Jhuggee AI home"
          >
            <Logo markClassName="h-8 w-8" />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {mainNav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg md:inline-flex"
            >
              Contact Us
            </a>
            <ButtonLink
              href="#waitlist"
              className="hidden px-5 py-2.5 sm:inline-flex"
            >
              Join Waitlist
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-white/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="animate-fade-in border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-xl px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
              <a
                href="#contact"
                onClick={close}
                className="rounded-xl px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                Contact Us
              </a>
              <ButtonLink
                href="#waitlist"
                onClick={close}
                className="w-full py-3"
              >
                Join Waitlist
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
