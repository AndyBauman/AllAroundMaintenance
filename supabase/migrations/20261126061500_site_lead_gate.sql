-- Lets the website save a quote without the service-role key.
-- The server sends LEAD_DB_SECRET. The database stores only its hash.
-- Direct reads and writes stay closed. This does not drop or rewrite site_leads.

create table if not exists public.site_lead_gate (
  id int primary key default 1 check (id = 1),
  secret_hash text not null
);

alter table public.site_lead_gate enable row level security;

revoke all on table public.site_lead_gate from public, anon, authenticated;

create or replace function public.accept_site_lead(payload jsonb, secret text)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  new_id uuid;
  expected text;
  given text;
  iph text;
  recent int;
begin
  select g.secret_hash into expected from public.site_lead_gate g where g.id = 1;
  given := encode(extensions.digest(coalesce(secret, ''), 'sha256'), 'hex');
  if expected is null or given is distinct from expected then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  iph := nullif(left(coalesce(payload->>'ip_hash', ''), 64), '');
  if iph is not null then
    select count(*) into recent
    from public.site_leads
    where ip_hash = iph
      and created_at >= now() - interval '10 minutes';
    if recent >= 5 then
      raise exception 'rate_limited' using errcode = 'P0001';
    end if;
  end if;

  insert into public.site_leads (
    name, email, phone, heard_from, heard_detail, services,
    street, city, state, zip, message,
    page_url, referrer, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    gclid, fbclid, user_agent, ip_hash, email_status
  ) values (
    left(payload->>'name', 200),
    left(payload->>'email', 320),
    left(payload->>'phone', 40),
    left(payload->>'heard_from', 80),
    nullif(left(coalesce(payload->>'heard_detail', ''), 500), ''),
    coalesce(
      (
        select array_agg(left(value, 80))
        from jsonb_array_elements_text(
          case
            when jsonb_typeof(payload->'services') = 'array' then payload->'services'
            else '[]'::jsonb
          end
        )
      ),
      '{}'::text[]
    ),
    nullif(left(coalesce(payload->>'street', ''), 200), ''),
    nullif(left(coalesce(payload->>'city', ''), 80), ''),
    nullif(left(coalesce(payload->>'state', ''), 40), ''),
    nullif(left(coalesce(payload->>'zip', ''), 20), ''),
    left(payload->>'message', 2000),
    nullif(left(coalesce(payload->>'page_url', ''), 500), ''),
    nullif(left(coalesce(payload->>'referrer', ''), 500), ''),
    nullif(left(coalesce(payload->>'utm_source', ''), 200), ''),
    nullif(left(coalesce(payload->>'utm_medium', ''), 200), ''),
    nullif(left(coalesce(payload->>'utm_campaign', ''), 200), ''),
    nullif(left(coalesce(payload->>'utm_term', ''), 200), ''),
    nullif(left(coalesce(payload->>'utm_content', ''), 200), ''),
    nullif(left(coalesce(payload->>'gclid', ''), 200), ''),
    nullif(left(coalesce(payload->>'fbclid', ''), 200), ''),
    nullif(left(coalesce(payload->>'user_agent', ''), 400), ''),
    iph,
    'pending'
  )
  returning id into new_id;

  return new_id;
end;
$$;

create or replace function public.record_site_lead_email(
  lead_id uuid,
  email_status text,
  email_error text,
  secret text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  expected text;
  given text;
begin
  select g.secret_hash into expected from public.site_lead_gate g where g.id = 1;
  given := encode(extensions.digest(coalesce(secret, ''), 'sha256'), 'hex');
  if expected is null or given is distinct from expected then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  if email_status not in ('sent', 'failed', 'pending') then
    raise exception 'bad_status' using errcode = '22023';
  end if;

  update public.site_leads
    set email_status = record_site_lead_email.email_status,
        email_error = nullif(left(coalesce(record_site_lead_email.email_error, ''), 500), '')
    where id = lead_id;
end;
$$;

revoke all on function public.accept_site_lead(jsonb, text) from public, anon, authenticated;
revoke all on function public.record_site_lead_email(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.accept_site_lead(jsonb, text) to anon, service_role;
grant execute on function public.record_site_lead_email(uuid, text, text, text) to anon, service_role;
