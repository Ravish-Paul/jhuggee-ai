# Jhuggee AI — Marketing Site

Landing site for **Jhuggee AI**, an early-stage startup building AI-powered voice
agents for business calling workflows (inbound support, outbound follow-ups,
lead qualification, appointment booking).

> **Honesty rules baked into this codebase**
>
> - No fabricated metrics, customers, testimonials, logos, or partnerships.
> - Features that are not shipped are labelled **Planned** or **In Development**.
> - The interactive call demo is a **local simulation**. It never dials a phone
>   network and never calls a live AI model.
> - The waitlist only claims success when a row is actually stored. Without
>   database credentials the UI says the submission was **not saved**.

---

## Stack

| Layer      | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, Cache Components)       |
| Language   | TypeScript                                                 |
| Styling    | Tailwind CSS v4 (`src/app/globals.css` design tokens)      |
| Motion     | CSS keyframes + IntersectionObserver (reduced-motion safe) |
| Icons      | Lucide                                                     |
| Fonts      | Geist Sans / Geist Mono via `next/font/google`             |
| Backend    | Route Handlers: `/api/waitlist`, `/api/voice/session`      |
| Database   | Supabase (Postgres) — optional, documented below           |

No CMS, no analytics SDK, no tracking cookies.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional for a preview)
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Quality gates:

```bash
npm run lint     # ESLint (flat config, eslint-config-next)
npm run build    # TypeScript + production build
```

---

## Environment variables

See [.env.example](.env.example) — variable names only, never real secrets.

| Variable                      | Required | Purpose                                                                 |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | For launch | Canonical origin for metadata, sitemap, robots.txt, Open Graph. Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | No       | Verified mailbox shown in the FAQ and waitlist success state. Hidden when empty. |
| `SUPABASE_URL`                | No       | Supabase project URL. When missing, the waitlist runs in demo mode.     |
| `SUPABASE_SERVICE_ROLE_KEY`   | No       | Server-only key used to insert signups. Never expose with `NEXT_PUBLIC_`. |

---

## Waitlist storage (Supabase)

**Endpoint:** `POST /api/waitlist` — `src/app/api/waitlist/route.ts`

Validates and sanitises input (name length, email format, use-case allowlist),
rate-limits per IP (5 requests / 10 minutes, in-memory), and rejects honeypot
spam. It then writes to Supabase's Postgres REST API over `fetch`, so no extra
SDK dependency is required.

Setup:

1. Create a Supabase project.
2. Run [docs/supabase-schema.sql](docs/supabase-schema.sql) in the SQL editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your deployment
   environment (Vercel → Project → Settings → Environment Variables).
4. Redeploy.

**Demo mode (no credentials):** the route still validates and returns
`{ ok: true, stored: false, mode: "demo" }`. The UI then shows:

> Details checked — nothing stored yet. Your submission is valid, but waitlist
> storage has not been configured for this deployment, so it was not saved.

Nothing is silently discarded, and nothing is falsely claimed.

**Spam protection today:** honeypot field + minimum fill time + per-IP rate
limit. The in-memory limiter is per server instance; for multi-instance or
high-traffic launches, move it to a shared store (Upstash Redis, Vercel KV) or
add Turnstile/hCaptcha server-side verification.

---

## Interactive demo (voice)

**Endpoint:** `POST /api/voice/session` — `src/app/api/voice/session/route.ts`

The browser requests a session; the server currently returns a scripted
conversation with `mode: "simulation"`. `src/lib/demo.ts` falls back to the
same local transcript if the request fails, so the demo always works.

To connect a real provider later:

1. Keep the API key **server-side only** (route handler / server action).
2. Replace the body of `POST /api/voice/session` with a call to your telephony
   or speech provider, returning the same JSON shape:
   `{ mode, label, lines: [{ speaker, text }] }`.
3. Set `mode: "live"` only when a real session exists, and update the visible
   disclaimer in `src/components/VoiceDemo.tsx` at the same time.

The UI already displays: *"Interactive preview — sample conversation, not a
live AI call."*

---

## Project structure

```
src/
  app/
    layout.tsx               Fonts, metadata, Navbar, Footer, skip link
    page.tsx                 Landing page assembly
    globals.css              Tailwind v4 theme tokens + component classes
    icon.svg                 Favicon (logo mark)
    opengraph-image.tsx      Generated 1200×630 OG image
    sitemap.ts  robots.ts    SEO files
    privacy/page.tsx         Draft privacy policy
    terms/page.tsx           Draft terms of service
    api/waitlist/route.ts    Waitlist intake (validation, rate limit, storage)
    api/voice/session/route.ts  Demo session provider (integration point)
  components/
    Navbar.tsx  Hero.tsx  ProblemSection.tsx  SolutionSection.tsx
    UseCases.tsx  HowItWorks.tsx  VoiceDemo.tsx  DeveloperSection.tsx
    ResponsibleAI.tsx  WaitlistForm.tsx  FAQ.tsx  FinalCTA.tsx  Footer.tsx
    Logo.tsx  Reveal.tsx  Waveform.tsx  ui.tsx  LegalPage.tsx
  lib/
    site.ts                  Brand, navigation, env-driven settings
    content.ts               All page copy (edit here)
    demo.ts                  Demo session client
docs/
  supabase-schema.sql        Waitlist table + RLS hardening
```

All marketing copy lives in `src/lib/content.ts` and `src/lib/site.ts`, so
text changes do not require touching component markup.

---

## SEO & performance

- Title: **Jhuggee AI — AI Voice Agents for Business**
- Description, Open Graph, Twitter card, canonical URL (from
  `NEXT_PUBLIC_SITE_URL`), `sitemap.xml`, `robots.txt`, SVG favicon, generated
  OG image.
- Semantic heading structure, skip-to-content link, labelled form controls,
  keyboard-accessible menu and accordion (`<details>`).
- No raster images: logo, artwork and OG image are SVG/vector or generated, so
  there are no image payloads to optimise.
- Animations respect `prefers-reduced-motion` (CSS media query + Framer
  Motion's `useReducedMotion`). A `<noscript>` rule reveals any animated
  content when JavaScript is unavailable.

**Before launch:** set `NEXT_PUBLIC_SITE_URL` to the verified domain. Sitemap,
canonical and OG URLs all derive from it.

---

## Deploy to Vercel

1. Push the repository to GitHub/GitLab.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset:
   Next.js (auto-detected).
3. Add the environment variables from `.env.example` in the project settings
   (`Production`, `Preview`, `Development`).
4. Deploy. Subsequent pushes to `main` deploy automatically.

Any Node 20.9+ host works (`npm run build && npm run start`) — Vercel is simply
the path of least resistance for Next.js.

---

## Accessibility & responsiveness notes

- Breakpoints verified with headless Chromium at **375 / 768 / 1024 / 1440**
  px; no horizontal overflow at any of them.
- Mobile navigation: toggle with `aria-expanded`, Escape closes and restores
  focus, body scroll locked while open.
- Waitlist form: inline `role="alert"` errors, `aria-invalid`,
  `aria-describedby`, loading state, honeypot field hidden from the
  accessibility tree.
- Reveals/animations are CSS-driven: `prefers-reduced-motion: reduce` and
  `scripting: none` both force content visible (verified in headless
  Chromium — no hidden sections at the top of the page).
- `npm audit` reports 5 **high** findings in the ESLint toolchain only
  (`braces` → `fast-glob` → `eslint-config-next`); they are dev-dependency
  issues with no runtime impact. The only available fix forces a breaking
  downgrade to `eslint-config-next@14`, so it is left alone deliberately.

---

## Open items before public launch

Configuration or integrations that are **not** finished:

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the verified production domain.
- [ ] Create the Supabase table and set `SUPABASE_URL` /
      `SUPABASE_SERVICE_ROLE_KEY` (otherwise the waitlist stays in demo mode).
- [ ] Publish a real contact mailbox and set `NEXT_PUBLIC_CONTACT_EMAIL`; the
      FAQ and success state currently show an honest "not published yet"
      message.
- [ ] Have counsel review `/privacy` and `/terms` — both are marked **DRAFT**
      and are not legal advice.
- [ ] Replace the simulated `/api/voice/session` provider with a real voice
      integration when one exists, and update the demo disclaimers.
- [ ] Harden rate limiting with a shared store or CAPTCHA before launch.
- [ ] Add analytics/consent tooling only if required for your markets (none is
      installed today).
- [ ] Confirm brand/trademark clearance for the name and logo.
- [ ] Optional: real OG image art direction (the current OG image is generated
      from code in `src/app/opengraph-image.tsx`).
