import { Logo } from "@/components/Logo";
import { mainNav } from "@/lib/site";
import { useCases } from "@/lib/content";

const resourceLinks = [
  { label: "Join the Waitlist", href: "#waitlist" },
  { label: "Contact Us", href: "#contact" },
  { label: "Interactive Demo", href: "#demo" },
  { label: "Responsible AI", href: "#responsible-ai" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();

  return (
    <footer className="relative border-t border-line bg-ink-soft/70">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Jhuggee AI is building AI-powered voice agents for real business
              conversations — an early-stage platform for inbound support,
              outbound follow-ups, and structured calling workflows.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted/70">
              Currently under development. Features described on this site are
              planned or in progress unless stated otherwise.
            </p>
          </div>

          <nav
            aria-label="Footer product"
            className="md:col-span-2 lg:col-span-2"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
              Product
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer use cases" className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
              Use Cases
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1">
              {useCases.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer resources" className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
              Resources
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
              Legal
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                    <span className="ml-2 rounded-full border border-line px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-muted/70">
                      Draft
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} Jhuggee AI. All rights reserved.
          </p>
          <p className="text-xs text-muted/70">
            {`AI voice agents for real business conversations.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
