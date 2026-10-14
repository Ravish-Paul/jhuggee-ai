"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Button, Badge } from "@/components/ui";
import { contactEmail, useCaseOptions, waitlistPrefills } from "@/lib/site";

type Values = {
  fullName: string;
  email: string;
  company: string;
  useCase: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClasses =
  "w-full rounded-xl border border-line bg-black/25 px-4 py-3 text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-accent/60 focus:outline-none";

const labelClasses = "mb-2 block text-sm font-medium text-fg";

const perks = [
  "Early-access announcements for the platform",
  "Product updates as capabilities come online",
  "A direct line for the workflows you want automated",
];

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid work email address.";
  }
  if (values.useCase.trim().length === 0) {
    errors.useCase = "Choose your primary use case.";
  }

  return errors;
}

export function WaitlistForm() {
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    company: "",
    useCase: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [stored, setStored] = useState<boolean | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef<number>(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      const option = waitlistPrefills[key];
      if (option) {
        setValues((current) => ({ ...current, useCase: option }));
        setErrors((current) => ({ ...current, useCase: undefined }));
      }
    };

    window.addEventListener("jhuggee:prefill-use-case", handler);
    return () => window.removeEventListener("jhuggee:prefill-use-case", handler);
  }, []);

  const update = (field: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          useCase: values.useCase,
          website: honeypotRef.current?.value ?? "",
          startedAt: startedAtRef.current,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        stored?: boolean;
        message?: string;
      };

      if (!response.ok || data.ok !== true) {
        setStatus("error");
        setMessage(
          data.message ?? "Something went wrong. Please try again shortly.",
        );
        return;
      }

      setStored(Boolean(data.stored));
      setStatus("success");
      setMessage(data.message ?? "Thanks — we have your details.");
      startedAtRef.current = Date.now();
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Check your connection and try again.",
      );
    }
  };

  return (
    <section
      id="waitlist"
      className="section-pad relative scroll-mt-24 overflow-hidden"
    >
      <span
        id="contact"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-full"
      />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky/10 blur-[120px]" />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-6">
              <p className="eyebrow">Early Access</p>
              <h2 className="section-title text-balance">
                Be Among the First to Explore Jhuggee AI.
              </h2>
              <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                We&apos;re developing a new approach to AI-powered business
                calling. Join the waitlist to follow our progress and hear when
                early access becomes available.
              </p>

              <ul className="flex flex-col gap-3 border-t border-line pt-6">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-soft" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <Badge>No spam · Unsubscribe anytime</Badge>
                <Badge>Early-stage product</Badge>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="panel p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-signal/50 bg-signal/15">
                    <Check className="h-6 w-6 text-signal-soft" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg">
                      {stored
                        ? "You're on the waitlist."
                        : "Details checked — nothing stored yet."}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {stored
                        ? message
                        : "Your submission is valid, but waitlist storage has not been configured for this deployment, so it was not saved. Configure the database (see the README) to start collecting signups."}
                    </p>
                  </div>
                  {contactEmail ? (
                    <a
                      href={`mailto:${contactEmail}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-fg"
                    >
                      <Mail className="h-4 w-4" />
                      Or reach us at {contactEmail}
                    </a>
                  ) : null}
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setValues({
                        fullName: "",
                        email: "",
                        company: "",
                        useCase: "",
                      });
                      setStored(null);
                      setMessage("");
                      setStatus("idle");
                      startedAtRef.current = Date.now();
                    }}
                  >
                    Submit another response
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className={labelClasses} htmlFor="waitlist-name">
                        Full name
                        <span aria-hidden="true" className="text-accent">
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        id="waitlist-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={100}
                        placeholder="Priya Sharma"
                        value={values.fullName}
                        onChange={(event) =>
                          update("fullName", event.target.value)
                        }
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? "waitlist-name-error" : undefined
                        }
                        className={inputClasses}
                      />
                      {errors.fullName ? (
                        <p
                          id="waitlist-name-error"
                          role="alert"
                          className="mt-2 flex items-center gap-1.5 text-xs text-[#FCA5A5]"
                        >
                          <CircleAlert className="h-3.5 w-3.5" />
                          {errors.fullName}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-1">
                      <label className={labelClasses} htmlFor="waitlist-email">
                        Work email
                        <span aria-hidden="true" className="text-accent">
                          {" "}
                          *
                        </span>
                      </label>
                      <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={(event) =>
                          update("email", event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "waitlist-email-error" : undefined
                        }
                        className={inputClasses}
                      />
                      {errors.email ? (
                        <p
                          id="waitlist-email-error"
                          role="alert"
                          className="mt-2 flex items-center gap-1.5 text-xs text-[#FCA5A5]"
                        >
                          <CircleAlert className="h-3.5 w-3.5" />
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="sm:col-span-1">
                      <label className={labelClasses} htmlFor="waitlist-company">
                        Company name
                        <span className="text-muted"> (optional)</span>
                      </label>
                      <input
                        id="waitlist-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        maxLength={120}
                        placeholder="Acme Retail"
                        value={values.company}
                        onChange={(event) =>
                          update("company", event.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label className={labelClasses} htmlFor="waitlist-use-case">
                        Primary use case
                        <span aria-hidden="true" className="text-accent">
                          {" "}
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          id="waitlist-use-case"
                          name="useCase"
                          required
                          value={values.useCase}
                          onChange={(event) =>
                            update("useCase", event.target.value)
                          }
                          aria-invalid={Boolean(errors.useCase)}
                          aria-describedby={
                            errors.useCase
                              ? "waitlist-use-case-error"
                              : undefined
                          }
                          className={`${inputClasses} appearance-none pr-11 ${
                            values.useCase ? "" : "text-muted/70"
                          }`}
                        >
                          <option value="">Select a use case</option>
                          {useCaseOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      </div>
                      {errors.useCase ? (
                        <p
                          id="waitlist-use-case-error"
                          role="alert"
                          className="mt-2 flex items-center gap-1.5 text-xs text-[#FCA5A5]"
                        >
                          <CircleAlert className="h-3.5 w-3.5" />
                          {errors.useCase}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="relative h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="waitlist-website">Website</label>
                    <input
                      ref={honeypotRef}
                      id="waitlist-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5"
                    >
                      {status === "submitting" ? (
                        <>
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Joining…
                        </>
                      ) : (
                        <>
                          Join the Waitlist
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {status === "error" ? (
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-[#FCA5A5]/30 bg-[#FCA5A5]/10 px-4 py-3 text-xs leading-relaxed text-[#FCA5A5]"
                      >
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                        {message}
                      </p>
                    ) : null}

                    <p className="text-xs leading-relaxed text-muted">
                      We&apos;ll only use your details to share Jhuggee AI
                      product updates and early-access information.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
