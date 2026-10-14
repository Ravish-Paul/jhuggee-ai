import { demoConversation } from "@/lib/content";

export async function POST() {
  return Response.json({
    mode: "simulation",
    provider: null,
    label: "Interactive preview — sample conversation, not a live AI call.",
    lines: demoConversation,
  });
}
