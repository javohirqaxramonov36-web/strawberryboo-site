-- IELTS Speaking MVP: authenticated progress and AI feedback records.
-- Apply in Supabase SQL Editor after reviewing it. This migration does not expose provider secrets.

create table if not exists public.speaking_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_day smallint not null check (course_day between 1 and 30),
  pronunciation_done boolean not null default false,
  shadowing_done boolean not null default false,
  speaking_done boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_day)
);

alter table public.speaking_progress enable row level security;
drop policy if exists "speaking_progress_select_own" on public.speaking_progress;
create policy "speaking_progress_select_own" on public.speaking_progress
  for select to authenticated using (user_id = auth.uid());
-- All writes are performed by the authenticated Edge Function with service-role validation.

alter table public.attempts add column if not exists course_day smallint check (course_day between 1 and 30);
alter table public.attempts add column if not exists prompt_snapshot jsonb;
alter table public.attempts add column if not exists transcript text;
alter table public.attempts add column if not exists audio_path text;
create index if not exists idx_attempts_speaking_day on public.attempts(user_id, course_day, created_at desc)
  where product_type = 'speaking';
