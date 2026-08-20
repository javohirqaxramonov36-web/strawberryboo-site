-- Atomically charge one Qadam for a Speaking feedback attempt and refund on provider failure.
create or replace function public.consume_speaking_qadam(p_attempt_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare v_user_id uuid; v_balance integer;
begin
  select user_id into v_user_id from public.attempts where id = p_attempt_id and product_type = 'speaking' for update;
  if v_user_id is null then raise exception 'Speaking attempt not found'; end if;
  update public.wallets set qadam_balance = qadam_balance - 1, updated_at = now()
    where user_id = v_user_id and qadam_balance >= 1
    returning qadam_balance into v_balance;
  if v_balance is null then return false; end if;
  insert into public.wallet_transactions (user_id, delta_qadam, reason, product_type, attempt_id, idempotency_key, metadata)
    values (v_user_id, -1, 'usage', 'speaking', p_attempt_id, 'speaking-charge:' || p_attempt_id::text, jsonb_build_object('module', 'ielts-speaking'));
  return true;
end;
$$;

create or replace function public.refund_speaking_qadam(p_attempt_id uuid, p_reason text default 'provider_failure')
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_user_id uuid;
begin
  select user_id into v_user_id from public.attempts where id = p_attempt_id and product_type = 'speaking';
  if v_user_id is null then return; end if;
  insert into public.wallet_transactions (user_id, delta_qadam, reason, product_type, attempt_id, idempotency_key, metadata)
    values (v_user_id, 1, 'refund', 'speaking', p_attempt_id, 'speaking-refund:' || p_attempt_id::text, jsonb_build_object('reason', p_reason))
    on conflict (idempotency_key) do nothing;
  if found then update public.wallets set qadam_balance = qadam_balance + 1, updated_at = now() where user_id = v_user_id; end if;
end;
$$;
revoke all on function public.consume_speaking_qadam(uuid) from public;
revoke all on function public.refund_speaking_qadam(uuid, text) from public;
