-- Server-side retry safety for Speaking feedback and progress.
alter table public.attempts add column if not exists client_request_id text;
create unique index if not exists attempts_speaking_user_request_unique
  on public.attempts(user_id, client_request_id)
  where product_type = 'speaking' and client_request_id is not null;

-- Existing select-only RLS remains intentional: the Edge Function performs validated writes.
create index if not exists idx_attempts_speaking_completed
  on public.attempts(user_id, completed_at desc)
  where product_type = 'speaking' and status = 'completed';
