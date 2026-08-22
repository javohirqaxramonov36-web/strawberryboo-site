-- IELTS Writing progress + unified IELTS streak (Qadam 2/5)
-- Apply in Supabase SQL Editor. Reads speaking_progress read-only; adds writing_progress.

create table if not exists public.writing_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_day smallint not null check (course_day between 1 and 30),
  task1_done boolean not null default false,
  task2_done boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_day)
);

alter table public.writing_progress enable row level security;
drop policy if exists "writing_progress_select_own" on public.writing_progress;
create policy "writing_progress_select_own" on public.writing_progress
  for select to authenticated using (user_id = auth.uid());
-- All writes go through SECURITY DEFINER RPC (service role context).

create or replace function public.upsert_writing_progress(
  p_day smallint, p_task1 boolean, p_task2 boolean
) returns jsonb
language plpgsql security definer as $$
declare
  uid uuid := auth.uid();
  old_rec writing_progress%rowtype;
  done boolean;
begin
  if uid is null then return jsonb_build_object('error','auth'); end if;
  select * into old_rec from writing_progress where user_id = uid and course_day = p_day;
  if not found then
    insert into writing_progress (user_id, course_day, task1_done, task2_done)
    values (uid, p_day, coalesce(p_task1, false), coalesce(p_task2, false));
  else
    update writing_progress set
      task1_done = coalesce(p_task1, writing_progress.task1_done, false),
      task2_done = coalesce(p_task2, writing_progress.task2_done, false),
      updated_at = now()
    where user_id = uid and course_day = p_day;
  end if;
  select * into old_rec from writing_progress where user_id = uid and course_day = p_day;
  done := old_rec.task1_done and old_rec.task2_done;
  update writing_progress set completed_at = case when done then now() else null end
  where user_id = uid and course_day = p_day;
  return jsonb_build_object(
    'day', p_day,
    'task1_done', old_rec.task1_done,
    'task2_done', old_rec.task2_done,
    'completed_at', (select completed_at from writing_progress where user_id = uid and course_day = p_day)
  );
end; $$;

create or replace function public.get_ielts_streak(p_user_id uuid)
returns jsonb
language plpgsql security definer as $$
declare
  dates date[];
  cur int := 0; long int := 0; total int := 0;
  prev date := null; d date; last_mod text;
begin
  select array_agg(d order by d) into dates from (
    select distinct date(completed_at) as d from speaking_progress
      where user_id = p_user_id and completed_at is not null
    union
    select distinct date(completed_at) as d from writing_progress
      where user_id = p_user_id and completed_at is not null
  ) t(d);
  if dates is null then
    return jsonb_build_object('current_streak',0,'longest_streak',0,'total_active_days',0,'last_active_date',null,'last_module',null);
  end if;
  total := array_length(dates,1);
  foreach d in array dates loop
    if prev is null or d = prev + 1 then cur := cur + 1;
    else cur := 1;
    end if;
    if cur > long then long := cur; end if;
    prev := d;
  end loop;
  select case when sp.completed_at >= wp.completed_at then 'speaking' else 'writing' end into last_mod
  from (select max(completed_at) completed_at from speaking_progress where user_id = p_user_id) sp,
       (select max(completed_at) completed_at from writing_progress where user_id = p_user_id) wp;
  return jsonb_build_object(
    'current_streak', cur, 'longest_streak', long,
    'total_active_days', total,
    'last_active_date', to_char(prev,'YYYY-MM-DD'),
    'last_module', last_mod
  );
end; $$;
