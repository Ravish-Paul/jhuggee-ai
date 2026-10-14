export type FeatureStatus = "In Development" | "Planned";

export const problems = [
  {
    id: "missed-calls",
    title: "Missed Calls",
    body: "Customers may call outside business hours or while your team is busy. Every unanswered ring is a conversation that never starts.",
    icon: "PhoneOff",
  },
  {
    id: "repetitive-work",
    title: "Repetitive Work",
    body: "Teams spend time answering the same questions and handling the same follow-ups, instead of the work that needs a human.",
    icon: "Repeat",
  },
  {
    id: "slow-response",
    title: "Slow Lead Response",
    body: "Delays in responding to new inquiries can create a poor customer experience before a real conversation ever begins.",
    icon: "Timer",
  },
] as const;

export const features = [
  {
    id: "conversations",
    title: "AI-Powered Conversations",
    body: "Natural-sounding voice interactions designed for real business workflows.",
    status: "In Development" as FeatureStatus,
    icon: "AudioLines",
  },
  {
    id: "inbound",
    title: "Inbound Call Handling",
    body: "Help callers get information, route requests, and initiate support workflows.",
    status: "Planned" as FeatureStatus,
    icon: "Headphones",
  },
  {
    id: "outbound",
    title: "Outbound Follow-Ups",
    body: "Support consent-based reminders, lead follow-ups, and appointment confirmations.",
    status: "Planned" as FeatureStatus,
    icon: "PhoneCall",
  },
  {
    id: "workflows",
    title: "Workflow Automation",
    body: "Connect conversations to business processes through APIs and integrations as these capabilities become available.",
    status: "Planned" as FeatureStatus,
    icon: "Workflow",
  },
  {
    id: "multilingual",
    title: "Multilingual Voice Experiences",
    body: "Plan for conversations in English, Hindi, and other supported languages as implementation permits.",
    status: "Planned" as FeatureStatus,
    icon: "Languages",
  },
  {
    id: "developers",
    title: "Developer-Friendly Infrastructure",
    body: "A long-term vision for APIs and configurable voice-agent workflows.",
    status: "Planned" as FeatureStatus,
    icon: "Braces",
  },
] as const;

export const useCases = [
  {
    id: "ai-receptionist",
    title: "AI Receptionist",
    body: "Answer common questions and help direct callers to the right place.",
    icon: "Headphones",
    prefill: "receptionist",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
  {
    id: "lead-qualification",
    title: "Lead Qualification",
    body: "Collect relevant information from interested prospects and route qualified leads to your team.",
    icon: "UserCheck",
    prefill: "leads",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
  {
    id: "appointment-scheduling",
    title: "Appointment Scheduling",
    body: "Help callers request appointments and connect with scheduling systems when integrated.",
    icon: "CalendarClock",
    prefill: "appointments",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
  {
    id: "customer-support",
    title: "Customer Support",
    body: "Handle common questions and route complex cases to human agents.",
    icon: "LifeBuoy",
    prefill: "support",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
  {
    id: "reminders-follow-ups",
    title: "Reminders and Follow-Ups",
    body: "Support authorized reminders, confirmations, and follow-up conversations.",
    icon: "BellRing",
    prefill: "reminders",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
  {
    id: "custom-voice-agents",
    title: "Custom Voice Agents",
    body: "Design tailored conversation workflows for specific business needs.",
    icon: "Workflow",
    prefill: "custom",
    href: "#waitlist",
    linkLabel: "Explore Use Case",
  },
] as const;

export const steps = [
  {
    id: "step-1",
    number: "01",
    title: "Define Your Workflow",
    body: "Choose the purpose of the agent, the information it needs, and when a human should take over.",
  },
  {
    id: "step-2",
    number: "02",
    title: "Configure the Conversation",
    body: "Design instructions, conversation steps, language, voice, and integrations.",
  },
  {
    id: "step-3",
    number: "03",
    title: "Connect and Improve",
    body: "Connect a supported telephony provider, test the workflow, review results, and refine the experience.",
  },
] as const;

export const principles = [
  {
    id: "identify",
    title: "Clear AI Identification",
    body: "Callers should be able to understand when they are speaking with an AI agent where appropriate.",
    icon: "Bot",
  },
  {
    id: "consent",
    title: "Consent and Opt-Out",
    body: "Respect consent and opt-out requests in every outbound and recorded interaction.",
    icon: "UserCheck",
  },
  {
    id: "data",
    title: "Secure Data Handling",
    body: "Handle customer information carefully, with access limited to what a workflow genuinely needs.",
    icon: "Lock",
  },
  {
    id: "escalation",
    title: "Human Escalation",
    body: "Route sensitive, ambiguous, or complex requests to a human instead of forcing an automated answer.",
    icon: "Route",
  },
  {
    id: "compliance",
    title: "Regulatory Awareness",
    body: "Design with applicable calling, privacy, and recording requirements in mind for each market you operate in.",
    icon: "ShieldCheck",
  },
] as const;

export const faqs = [
  {
    id: "what-is-jhuggee",
    question: "What is Jhuggee AI?",
    answer:
      "Jhuggee AI is an early-stage startup developing AI-powered calling workflows for businesses.",
  },
  {
    id: "what-can-agents-do",
    question: "What can AI calling agents do?",
    answer:
      "Depending on implementation and integrations, they can assist with customer support, lead qualification, appointment requests, and follow-ups.",
  },
  {
    id: "inbound-outbound",
    question: "Does Jhuggee AI support inbound and outbound calls?",
    answer:
      "These are planned product use cases. Availability will depend on the features and telephony integrations released.",
  },
  {
    id: "languages",
    question: "Which languages will be supported?",
    answer:
      "We intend to explore English, Hindi, and additional languages based on model capabilities and testing.",
  },
  {
    id: "available-now",
    question: "Is Jhuggee AI available now?",
    answer:
      "The platform is under development. Visitors can join the waitlist for product updates and early-access announcements.",
  },
  {
    id: "developers",
    question: "How can developers get involved?",
    answer:
      "Developers can join the waitlist and request updates about future integrations and APIs.",
  },
  {
    id: "contact",
    question: "How can businesses contact the team?",
    answer: "__CONTACT__",
  },
] as const;

export type DemoLine = {
  speaker: "agent" | "caller";
  text: string;
};

export const demoConversation: DemoLine[] = [
  {
    speaker: "agent",
    text: "Hello! Thanks for calling. How can I help you today?",
  },
  { speaker: "caller", text: "I'd like to schedule an appointment." },
  { speaker: "agent", text: "Of course. What day works best for you?" },
  { speaker: "caller", text: "Thursday afternoon works for me." },
  {
    speaker: "agent",
    text: "Thursday afternoon works. I'll note that down and a team member can confirm the exact time.",
  },
];

export const apiExample = `POST /api/voice-agents

{
  "use_case": "appointment_booking",
  "language": "en",
  "handoff_enabled": true
}`;
