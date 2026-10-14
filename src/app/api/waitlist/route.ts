import type { NextRequest } from "next/server";

import { useCaseOptions } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FILL_MS = 800;

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (rateLimits.size > 500) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
  }

  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function json(
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

async function storeSignup(payload: {
  fullName: string;
  email: string;
  company: string;
  useCase: string;
}): Promise<"stored" | "duplicate" | "unconfigured" | "error"> {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

  if (!url || !key) return "unconfigured";

  try {
    const response = await fetch(`${url}/rest/v1/waitlist_signups`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({
        full_name: payload.fullName,
        email: payload.email.toLowerCase(),
        company: payload.company || null,
        use_case: payload.useCase,
        source: "landing-page",
        created_at: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (response.ok) return "stored";

    const text = await response.text();
    if (response.status === 409 || text.includes("23505")) {
      return "duplicate";
    }
    return "error";
  } catch {
    return "error";
  }
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIp(request))) {
    return json(
      {
        ok: false,
        stored: false,
        message: "Too many attempts. Please wait a few minutes and try again.",
      },
      429,
      { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) },
    );
  }

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 10_000) throw new Error("payload too large");
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return json({ ok: false, stored: false, message: "Invalid request body." }, 400);
  }

  const honeypot = sanitizeText(body.website, 200);
  if (honeypot.length > 0) {
    return json({ ok: true, stored: false, message: "Received." });
  }

  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (startedAt <= 0 || elapsed < MIN_FILL_MS || elapsed > 1000 * 60 * 60 * 24) {
    return json({ ok: false, stored: false, message: "Invalid submission." }, 400);
  }

  const fullName = sanitizeText(body.fullName, 100);
  const email = sanitizeText(body.email, 254).toLowerCase();
  const company = sanitizeText(body.company, 120);
  const useCase = sanitizeText(body.useCase, 80);

  const errors: string[] = [];
  if (fullName.length < 2) errors.push("Enter your full name.");
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    errors.push("Enter a valid work email address.");
  }
  if (!useCaseOptions.includes(useCase as (typeof useCaseOptions)[number])) {
    errors.push("Choose a primary use case.");
  }

  if (errors.length > 0) {
    return json(
      { ok: false, stored: false, message: errors[0], errors },
      400,
    );
  }

  const result = await storeSignup({ fullName, email, company, useCase });

  if (result === "error") {
    return json(
      {
        ok: false,
        stored: false,
        message:
          "We could not save your signup right now. Please try again shortly.",
      },
      502,
    );
  }

  if (result === "unconfigured") {
    return json({
      ok: true,
      stored: false,
      mode: "demo",
      message:
        "Signup validated, but waitlist storage is not configured yet, so nothing was saved.",
    });
  }

  return json({
    ok: true,
    stored: true,
    mode: "live",
    message:
      result === "duplicate"
        ? "This email is already on the waitlist."
        : "You are on the waitlist.",
  });
}
