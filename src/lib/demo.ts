import { demoConversation } from "@/lib/content";
import type { DemoLine } from "@/lib/content";

export type DemoSession = {
  mode: "simulation" | "live";
  label: string;
  lines: DemoLine[];
};

export const demoFallbackSession: DemoSession = {
  mode: "simulation",
  label: "Interactive preview — sample conversation, not a live AI call.",
  lines: demoConversation,
};

export async function requestDemoSession(): Promise<DemoSession> {
  try {
    const response = await fetch("/api/voice/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ use_case: "appointment_booking" }),
    });

    if (response.ok) {
      const data = (await response.json()) as Partial<DemoSession>;
      if (Array.isArray(data.lines) && data.lines.length > 0) {
        return {
          mode: data.mode === "live" ? "live" : "simulation",
          label:
            typeof data.label === "string" && data.label.length > 0
              ? data.label
              : demoFallbackSession.label,
          lines: data.lines as DemoLine[],
        };
      }
    }
  } catch {
    return demoFallbackSession;
  }

  return demoFallbackSession;
}
