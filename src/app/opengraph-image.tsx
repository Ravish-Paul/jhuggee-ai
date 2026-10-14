import { ImageResponse } from "next/og";

export const alt = "Jhuggee AI — AI Voice Agents for Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080B14",
          backgroundImage:
            "radial-gradient(45% 55% at 15% 0%, rgba(139,92,246,0.35), transparent 70%), radial-gradient(40% 45% at 90% 10%, rgba(96,165,250,0.25), transparent 70%)",
          padding: 72,
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <path
              d="M9 4.5h14A5.5 5.5 0 0 1 28.5 10v8.2a5.5 5.5 0 0 1-5.5 5.5h-6.7l-6.1 4.6c-.7.5-1.7 0-1.7-.9v-3.7A5.5 5.5 0 0 1 3.5 18.2V10A5.5 5.5 0 0 1 9 4.5Z"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <g fill="#F8FAFC">
              <rect x="8.2" y="11.4" width="2.2" height="6.4" rx="1.1" />
              <rect x="12.6" y="8.8" width="2.2" height="11.6" rx="1.1" />
              <rect x="17" y="7.2" width="2.2" height="14.8" rx="1.1" />
              <rect x="21.4" y="10.2" width="2.2" height="8.8" rx="1.1" />
            </g>
          </svg>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            Jhuggee AI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Your Next Conversation Runs on AI.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#94A3B8",
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            AI voice agents for customer support, sales, and everyday business
            workflows.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#94A3B8",
          }}
        >
          <div>AI voice agents for real business conversations</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(148,163,184,0.35)",
              borderRadius: 999,
              padding: "8px 20px",
              color: "#A78BFA",
              fontSize: 20,
            }}
          >
            Early access waitlist open
          </div>
        </div>
      </div>
    ),
    size,
  );
}
