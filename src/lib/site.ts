export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const site = {
  name: "Jhuggee AI",
  legalName: "Jhuggee AI",
  title: "Jhuggee AI — AI Voice Agents for Business",
  description:
    "Jhuggee AI is developing AI-powered voice agents for business calling workflows: inbound support, outbound follow-ups, lead qualification, and appointment booking.",
  tagline: "Your Next Conversation Runs on AI.",
  supportingTagline:
    "Build smarter business conversations with AI voice agents designed for customer support, sales, and everyday business workflows.",
  positioning: "AI voice agents for real business conversations.",
  twitterHandle: null as string | null,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Product", href: "#product" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Developers", href: "#developers" },
  { label: "FAQ", href: "#faq" },
];

export const useCaseOptions = [
  "Customer support",
  "Sales & lead qualification",
  "Appointment scheduling",
  "Receptionist / front desk",
  "Reminders & follow-ups",
  "Developer / API access",
  "Other",
] as const;

export const waitlistPrefills: Record<string, string> = {
  receptionist: "Receptionist / front desk",
  leads: "Sales & lead qualification",
  appointments: "Appointment scheduling",
  support: "Customer support",
  reminders: "Reminders & follow-ups",
  custom: "Other",
  developers: "Developer / API access",
};

export function prefillUseCase(key: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("jhuggee:prefill-use-case", { detail: key }),
  );
}
