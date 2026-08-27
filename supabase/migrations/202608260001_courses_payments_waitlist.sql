-- Tayanch course delivery foundation.
-- Apply only in the Supabase project after reviewing the project and privacy settings.
-- Service-role-only tables are intentionally not writable from the browser.

create table if not exists public.course_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id ~ '^[a-z0-9][a-z0-9-]{1,80}$'),
  source text not null default 'inpay' check (source in ('inpay', 'admin', 'complimentary', 'migration')),
  payment_reference text,
  status text not null default 'active' check (status in ('active', 'revoked', 'refunded')),
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  unique (user_id, course_id)
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id ~ '^[a-z0-9][a-z0-9-]{1,80}$'),
  lesson_id text not null check (length(lesson_id) between 1 and 120),
  completed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id, lesson_id)
);

create table if not exists public.payment_events (
  provider text not null default 'inpay',
  provider_event_id text not null,
  payment_reference text,
  status text not null,
  course_id text,
  customer_email text,
  raw_payload jsonb not null default '{}'::jsonb,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  primary key (provider, provider_event_id)
);

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  course_id text not null check (course_id ~ '^[a-z0-9][a-z0-9-]{1,80}$'),
  email text not null check (length(email) between 5 and 254),
  consent boolean not null default false check (consent = true),
  source text not null default 'site',
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_course_email_idx
  on public.waitlist_signups (course_id, lower(email));

alter table public.course_entitlements enable row level security;
alter table public.course_progress enable row level security;
alter table public.payment_events enable row level security;
alter table public.waitlist_signups enable row level security;

drop policy if exists "course_entitlements_select_own" on public.course_entitlements;
create policy "course_entitlements_select_own" on public.course_entitlements
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "course_progress_select_own" on public.course_progress;
create policy "course_progress_select_own" on public.course_progress
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "course_progress_insert_own" on public.course_progress;
create policy "course_progress_insert_own" on public.course_progress
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "course_progress_update_own" on public.course_progress;
create policy "course_progress_update_own" on public.course_progress
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- A waitlist is intentionally the only anonymous insert surface. It accepts an
-- email only after explicit consent; reads and deletes remain service-role-only.
drop policy if exists "waitlist_public_insert_with_consent" on public.waitlist_signups;
create policy "waitlist_public_insert_with_consent" on public.waitlist_signups
  for insert to anon, authenticated with check (consent = true and source = 'site');

revoke all on table public.course_entitlements, public.course_progress, public.payment_events from anon;
revoke all on table public.payment_events from authenticated;
grant select on table public.course_entitlements, public.course_progress to authenticated;
grant insert, update on table public.course_progress to authenticated;
grant insert on table public.waitlist_signups to anon, authenticated;

-- Provider webhooks use the Supabase service role, never the browser publishable key.
revoke all on table public.payment_events from anon, authenticated;

-- The webhook may grant access only after the provider has reported a successful
-- payment. Email matching is explicit; the browser never receives this function.
create or replace function public.grant_course_entitlement(
  p_email text, p_course_id text, p_payment_reference text default null, p_source text default 'inpay'
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  target_user uuid;
  inserted boolean := false;
begin
  if p_email is null or length(trim(p_email)) < 5 or p_course_id is null
     or p_course_id !~ '^[a-z0-9][a-z0-9-]{1,80}$' then
    return jsonb_build_object('granted', false, 'reason', 'invalid_input');
  end if;
  select id into target_user from auth.users where lower(email) = lower(trim(p_email)) limit 1;
  if target_user is null then
    return jsonb_build_object('granted', false, 'reason', 'user_not_found');
  end if;
  insert into public.course_entitlements (user_id, course_id, source, payment_reference)
  values (target_user, p_course_id, coalesce(p_source, 'inpay'), p_payment_reference)
  on conflict (user_id, course_id) do update set
    status = 'active', payment_reference = coalesce(excluded.payment_reference, course_entitlements.payment_reference);
  inserted := true;
  return jsonb_build_object('granted', inserted, 'user_id', target_user, 'course_id', p_course_id);
end; $$;

revoke all on function public.grant_course_entitlement(text, text, text, text) from public, anon, authenticated;
grant execute on function public.grant_course_entitlement(text, text, text, text) to service_role;
