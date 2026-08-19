-- Tayanch core: auth profile, Qadam wallet, attempts and AI jobs.
-- Apply only through the Supabase project SQL Editor / migration workflow.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  ielts_prep_bonus_granted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  qadam_balance integer not null default 0 check (qadam_balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  delta_qadam integer not null check (delta_qadam <> 0),
  reason text not null check (reason in (
    'purchase', 'usage', 'refund', 'ielts_prep_bonus', 'admin_adjustment'
  )),
  product_type text check (product_type in ('mock', 'speaking', 'shadowing')),
  attempt_id uuid,
  payment_reference text,
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.mock_tests (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^MOCK [0-9]{3}$'),
  title text not null,
  difficulty text not null default 'Standard' check (difficulty in ('Foundation', 'Standard', 'Challenge')),
  estimated_minutes integer not null default 165 check (estimated_minutes > 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  mock_test_id uuid references public.mock_tests(id) on delete set null,
  product_type text not null check (product_type in ('mock', 'speaking', 'shadowing')),
  module_type text not null check (module_type in ('listening', 'reading', 'writing', 'speaking', 'shadowing')),
  qadam_cost integer not null default 1 check (qadam_cost between 1 and 4),
  status text not null default 'created' check (status in (
    'created', 'in_progress', 'submitted', 'analysis_pending', 'completed',
    'refunded', 'failed', 'cancelled'
  )),
  started_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  score jsonb,
  result_summary jsonb,
  model_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.wallet_transactions
  drop constraint if exists wallet_transactions_attempt_id_fkey;
alter table public.wallet_transactions
  add constraint wallet_transactions_attempt_id_fkey
  foreign key (attempt_id) references public.attempts(id) on delete set null;

create table if not exists public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  stage text not null check (stage in ('scoring', 'transcript', 'quality_gate', 'alignment', 'feedback')),
  provider text not null check (provider in ('anthropic', 'google', 'deterministic')),
  model text,
  status text not null default 'queued' check (status in ('queued', 'running', 'succeeded', 'retrying', 'failed', 'refunded')),
  idempotency_key text not null unique,
  provider_request_id text,
  input_tokens integer,
  output_tokens integer,
  latency_ms integer,
  retry_count integer not null default 0,
  error_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_wallet_transactions_user_created
  on public.wallet_transactions(user_id, created_at desc);
create index if not exists idx_attempts_user_created
  on public.attempts(user_id, created_at desc);
create index if not exists idx_attempts_status
  on public.attempts(status);
create index if not exists idx_ai_jobs_attempt
  on public.ai_jobs(attempt_id, created_at asc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;

  insert into public.wallets (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.mock_tests enable row level security;
alter table public.attempts enable row level security;
alter table public.ai_jobs enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = auth.uid());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "wallets_select_own" on public.wallets;
create policy "wallets_select_own" on public.wallets
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "wallet_transactions_select_own" on public.wallet_transactions;
create policy "wallet_transactions_select_own" on public.wallet_transactions
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "mock_tests_select_published" on public.mock_tests;
create policy "mock_tests_select_published" on public.mock_tests
  for select using (is_published = true);
drop policy if exists "attempts_select_own" on public.attempts;
create policy "attempts_select_own" on public.attempts
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "ai_jobs_select_own_attempt" on public.ai_jobs;
create policy "ai_jobs_select_own_attempt" on public.ai_jobs
  for select to authenticated using (
    exists (
      select 1 from public.attempts a
      where a.id = attempt_id and a.user_id = auth.uid()
    )
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'attempt-audio', 'attempt-audio', false, 52428800,
  array['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm', 'video/webm']
)
on conflict (id) do nothing;

drop policy if exists "attempt_audio_insert_own" on storage.objects;
create policy "attempt_audio_insert_own" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'attempt-audio' and (storage.foldername(name))[1] = auth.uid()::text
  );
drop policy if exists "attempt_audio_select_own" on storage.objects;
create policy "attempt_audio_select_own" on storage.objects
  for select to authenticated using (
    bucket_id = 'attempt-audio' and (storage.foldername(name))[1] = auth.uid()::text
  );
