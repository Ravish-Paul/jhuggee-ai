import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description:
    "Draft privacy policy for Jhuggee AI describing what information the website collects, how it is used, and the choices available to visitors.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const contactLine = contactEmail
  ? `You can reach the team at ${contactEmail}.`
  : "A verified public contact address has not been published yet, so the waitlist form is currently the clearest way to reach the team.";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      intro="This draft explains what information the Jhuggee AI website is designed to collect, why it is collected, and the choices available to visitors. It will be reviewed and finalised before public launch."
      sections={[
        {
          heading: "Information you provide",
          paragraphs: [
            "If you join the waitlist, you provide your full name, work email address, an optional company name, and the primary use case you selected.",
            "We ask only for details needed to follow up about early access and product updates.",
          ],
        },
        {
          heading: "Information collected automatically",
          paragraphs: [
            "The hosting provider may record standard server logs, such as IP address, browser type, and request timestamps, for security and abuse prevention.",
            "This site does not install advertising trackers or third-party analytics cookies.",
          ],
        },
        {
          heading: "How information is used",
          paragraphs: [
            "To share product updates and early-access announcements you requested.",
            "To understand which workflows matter most to prospective users.",
            "To prevent spam, abuse, and unauthorised access to the site.",
          ],
        },
        {
          heading: "Storage and processors",
          paragraphs: [
            "Waitlist submissions are stored in a database provided by a hosting or database processor (for example, a managed Postgres service) only when that integration is configured for the deployment you are visiting.",
            "If storage has not been configured, submissions are validated but not saved, and the confirmation message will say so.",
          ],
        },
        {
          heading: "Sharing and retention",
          paragraphs: [
            "Personal information is not sold. It may be shared with service providers needed to operate the site, or where required by law.",
            "Information is retained for as long as it is useful for the purposes above, or until you ask us to delete it.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can request access, correction, or deletion of your details at any time by contacting the team.",
            "You can opt out of product updates at any time; every update will include a way to unsubscribe.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "Reasonable technical and organisational measures are used to protect information, and secrets are kept in server-side environment variables rather than browser code.",
            "No method of transmission or storage is completely secure, and this draft does not claim any certification.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "The site and product are intended for business users and are not directed at children.",
          ],
        },
        {
          heading: "Changes to this draft",
          paragraphs: [
            "This draft will be updated as the product takes shape, with the date shown at the top of the page.",
            "Material changes will be reflected before the site is publicly launched.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            contactLine,
            "This document is a draft for review and is not legal advice.",
          ],
        },
      ]}
    />
  );
}
