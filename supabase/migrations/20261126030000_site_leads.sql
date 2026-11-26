-- Quote requests from the website. Apply this in the Supabase SQL editor.
-- Do not run it from the app. It does not drop or rewrite any existing table.
--
-- New public tables are not visible to the Data API until a role is granted
-- (Supabase change enforced 2026-10-30). Only service_role, used by the
-- server, can read or write this table. RLS stays on with no policies.

create table if not exists public.site_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  heard_from text not null,
  heard_detail text,
  services text[] not null default '{}',
  street text,
  city text,
  state text,
  zip text,
  message text not null,
  page_url text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  user_agent text,
  ip_hash text,
  email_status text not null default 'pending',
  email_error text,
  status text not null default 'new'
);

create index if not exists site_leads_created_at_idx on public.site_leads (created_at desc);
create index if not exists site_leads_ip_hash_idx on public.site_leads (ip_hash, created_at desc);

alter table public.site_leads enable row level security;

revoke all on table public.site_leads from public, anon, authenticated;
grant select, insert, update on table public.site_leads to service_role;
