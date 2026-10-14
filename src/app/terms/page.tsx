import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  description:
    "Draft terms of service for the Jhuggee AI website, covering early-access status, acceptable use, and disclaimers.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const contactLine = contactEmail
  ? `You can reach the team at ${contactEmail}.`
  : "A verified public contact address has not been published yet, so the waitlist form is currently the clearest way to reach the team.";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2026"
      intro="These draft terms describe the rules for using the Jhuggee AI website while the product is in development. They will be reviewed and finalised before public launch."
      sections={[
        {
          heading: "Acceptance",
          paragraphs: [
            "By using this website you agree to these draft terms. If you do not agree, please do not use the site.",
            "These terms apply to the website only. Product-specific agreements will be published separately when the platform opens for early access.",
          ],
        },
        {
          heading: "Early-stage product",
          paragraphs: [
            "Jhuggee AI is an early-stage product under development. Described features, integrations, and workflows are planned or in progress unless explicitly stated otherwise.",
            "Nothing on this site is a commitment that a specific capability will be released, or that it will be available on a particular date.",
          ],
        },
        {
          heading: "Waitlist submissions",
          paragraphs: [
            "You agree to provide accurate, current information when joining the waitlist and to keep it up to date.",
            "Joining the waitlist does not guarantee early access, pricing, or any particular feature set.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "Do not use the site to violate any law, infringe the rights of others, or submit malicious, misleading, or automated bulk submissions.",
            "Do not attempt to interfere with the operation of the site, probe its security, or bypass access controls.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The site, its design, written content, logo, and code are owned by or licensed to Jhuggee AI and are protected by applicable intellectual property laws.",
            "You may not reproduce or redistribute site content without permission, except for brief quotations with attribution.",
          ],
        },
        {
          heading: "Third-party services",
          paragraphs: [
            "The site may rely on third-party hosting, database, or content-delivery providers. Those services operate under their own terms and policies.",
          ],
        },
        {
          heading: "Disclaimers",
          paragraphs: [
            "The website and any previews, demos, or illustrative content are provided on an 'as is' and 'as available' basis, without warranties of any kind.",
            "Demonstrations on the site are simulations. They do not connect to telephone networks or live AI services.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the maximum extent permitted by law, Jhuggee AI will not be liable for indirect, incidental, or consequential damages arising from use of this site.",
            "This draft will be reviewed by counsel to confirm it complies with the requirements of each market before launch.",
          ],
        },
        {
          heading: "Governing terms and changes",
          paragraphs: [
            "Governing law and dispute-resolution details will be added after review; this draft intentionally does not select a jurisdiction.",
            "These terms may be updated as the product develops, with the revision date shown at the top of the page.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [contactLine, "This document is a draft for review and is not legal advice."],
        },
      ]}
    />
  );
}
