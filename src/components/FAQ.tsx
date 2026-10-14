"use client";

import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { faqs } from "@/lib/content";
import { contactEmail } from "@/lib/site";

const contactAnswer = contactEmail
  ? `You can reach the team directly at ${contactEmail}. For product updates, joining the waitlist is the fastest route.`
  : "A verified public contact address has not been published yet. The fastest way to reach the team is to join the waitlist with your details — we will reply from a verified address as early access opens.";

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative scroll-mt-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions, Answered Plainly."
              description="Early-stage means honest answers. Here is what is known today about the product, its status, and how to get involved."
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <Reveal as="li" key={faq.id} delay={index * 0.05}>
                  <details className="group rounded-2xl border border-line bg-surface/50 transition-colors duration-300 open:border-accent/40 [&::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-medium text-fg transition-colors hover:text-accent-soft sm:px-6 sm:text-base">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 sm:px-6">
                      <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                        {faq.id === "contact" ? contactAnswer : faq.answer}
                      </p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
