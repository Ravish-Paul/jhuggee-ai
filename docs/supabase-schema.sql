-- Waitlist storage for Jhuggee AI
-- Run this in the Supabase SQL editor (or `supabase db push`) once.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  use_case text not null,
  source text not null default 'landing-page',
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_lower_key
  on public.waitlist_signups (lower(email));

-- The application writes from the server with the service role key.
-- No anon/authenticated policies are defined, so browser clients cannot read
-- or write this table directly.
alter table public.waitlist_signups enable row level security;
revoke all on table public.waitlist_signups from anon, authenticated;
