export interface Env {
  INPAY_API_BASE_URL?: string;
  INPAY_CREATE_PAYMENT_PATH?: string;
  INPAY_API_KEY?: string;
  INPAY_API_KEY_HEADER?: string;
  INPAY_API_KEY_PREFIX?: string;
  INPAY_WEBHOOK_SECRET?: string;
  INPAY_SIGNATURE_HEADER?: string;
  PUBLIC_SITE_URL?: string;
  COURSE_PRICES_JSON?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  RECEIPT_FROM_EMAIL?: string;
  RECEIPT_REPLY_TO?: string;
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
const cors = (headers: Headers) => { headers.set('access-control-allow-origin', '*'); headers.set('access-control-allow-headers', 'content-type, authorization'); headers.set('access-control-allow-methods', 'POST, OPTIONS, GET'); };
const response = (body: unknown, status = 200) => { const out = json(body, status); cors(out.headers); return out; };
const id = () => crypto.randomUUID();
const parsePrices = (env: Env): Record<string, number> => { try { const value = JSON.parse(env.COURSE_PRICES_JSON || '{}'); return value && typeof value === 'object' ? value : {}; } catch { return {}; } };
const safeJson = async (request: Request) => { try { const value = await request.json(); return value && typeof value === 'object' ? value as Record<string, unknown> : null; } catch { return null; } };
const hmac = async (secret: string, value: string) => { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']); return key; };
const verifyWebhook = async (request: Request, raw: string, env: Env) => { if (!env.INPAY_WEBHOOK_SECRET) return false; const header = request.headers.get(env.INPAY_SIGNATURE_HEADER || 'x-inpay-signature'); if (!header) return false; const signature = header.replace(/^sha256=/i, '').trim(); const bytes = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0)); const key = await hmac(env.INPAY_WEBHOOK_SECRET, raw); return crypto.subtle.verify('HMAC', key, bytes, new TextEncoder().encode(raw)); };
const supabaseFetch = async (env: Env, table: string, init: RequestInit) => { if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return null; return fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, { ...init, headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json', ...init.headers } }); };
const sendReceipt = async (env: Env, email: string | undefined, payload: Record<string, unknown>) => { if (!email || !env.RESEND_API_KEY || !env.RECEIPT_FROM_EMAIL) return; await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ from: env.RECEIPT_FROM_EMAIL, to: [email], reply_to: env.RECEIPT_REPLY_TO, subject: `Tayanch payment confirmation: ${payload.course_id || 'course'}`, text: `Payment received. Reference: ${payload.payment_reference || 'pending'}. Keep this email for your records.` }) }); };

export default { async fetch(request: Request, env: Env): Promise<Response> {
  if (request.method === 'OPTIONS') { const out = new Response(null, { status: 204 }); cors(out.headers); return out; }
  const url = new URL(request.url);
  if (request.method === 'GET' && url.pathname === '/health') return response({ ok: true, provider: 'inpay', configured: Boolean(env.INPAY_API_BASE_URL && env.INPAY_API_KEY && env.COURSE_PRICES_JSON) });
  if (request.method === 'POST' && url.pathname === '/create-payment') {
    const body = await safeJson(request); const courseId = String(body?.course_id || '').trim(); const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : undefined; const prices = parsePrices(env); const amount = prices[courseId];
    if (!/^[a-z0-9][a-z0-9-]{1,80}$/.test(courseId) || !Number.isSafeInteger(amount) || amount <= 0) return response({ error: 'course_not_configured' }, 400);
    if (!env.INPAY_API_BASE_URL || !env.INPAY_API_KEY || !env.PUBLIC_SITE_URL) return response({ error: 'payment_not_configured' }, 503);
    const reference = `tayanch-${courseId}-${id()}`; const payload = { merchant_reference: reference, amount, currency: 'UZS', description: `Tayanch course: ${courseId}`, callback_url: `${env.PUBLIC_SITE_URL.replace(/\/$/, '')}/webhook/inpay`, return_url: `${env.PUBLIC_SITE_URL.replace(/\/$/, '')}/payment-success/`, metadata: { course_id: courseId, customer_email: email || null } };
    const endpoint = `${env.INPAY_API_BASE_URL.replace(/\/$/, '')}/${(env.INPAY_CREATE_PAYMENT_PATH || 'payments').replace(/^\//, '')}`; const headerName = env.INPAY_API_KEY_HEADER || 'authorization'; const prefix = env.INPAY_API_KEY_PREFIX === undefined ? 'Bearer ' : env.INPAY_API_KEY_PREFIX; const providerResponse = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', [headerName]: `${prefix}${env.INPAY_API_KEY}` }, body: JSON.stringify(payload) });
    const providerBody = await providerResponse.text(); if (!providerResponse.ok) return response({ error: 'provider_error', reference }, 502);
    let parsed: any; try { parsed = JSON.parse(providerBody); } catch { parsed = null; }
    const checkoutUrl = parsed?.checkout_url || parsed?.payment_url || parsed?.url || null;
    if (typeof checkoutUrl !== 'string' || !/^https:\/\//i.test(checkoutUrl)) return response({ error: 'provider_response_invalid', reference }, 502);
    // Return only the redirect URL and our reference; do not expose the provider payload.
    return response({ checkout_url: checkoutUrl, payment_reference: reference });
  }
  if (request.method === 'POST' && url.pathname === '/webhook/inpay') {
    const raw = await request.text(); if (!(await verifyWebhook(request, raw, env))) return response({ error: 'invalid_signature' }, 401); let body: any; try { body = JSON.parse(raw); } catch { return response({ error: 'invalid_json' }, 400); }
    const eventId = String(body.id || body.event_id || body.transaction_id || body.payment_id || ''); const status = String(body.status || body.payment_status || '').toLowerCase(); const metadata = body.metadata || body.meta || {}; const courseId = String(metadata.course_id || body.course_id || ''); const email = String(metadata.customer_email || body.customer_email || body.email || '') || undefined; const reference = String(body.merchant_reference || body.reference || body.order_id || '');
    if (!eventId || !['paid', 'success', 'succeeded', 'completed'].includes(status)) return response({ ok: true, ignored: true });
    const insert = await supabaseFetch(env, 'payment_events', { method: 'POST', headers: { prefer: 'resolution=ignore-duplicates,return=representation' }, body: JSON.stringify({ provider: 'inpay', provider_event_id: eventId, payment_reference: reference, status: 'paid', course_id: courseId || null, customer_email: email || null, raw_payload: body, processed_at: new Date().toISOString() }) });
    if (insert && !insert.ok && insert.status !== 409) return response({ error: 'event_store_failed' }, 502);
    if (insert) { const insertedRows = await insert.json().catch(() => []); if (Array.isArray(insertedRows) && insertedRows.length === 0) return response({ ok: true, received: eventId, duplicate: true }); }
    let entitlement: unknown = null;
    if (courseId && email) {
      const entitlementResponse = await supabaseFetch(env, 'rpc/grant_course_entitlement', { method: 'POST', body: JSON.stringify({ p_email: email, p_course_id: courseId, p_payment_reference: reference, p_source: 'inpay' }) });
      if (entitlementResponse) entitlement = await entitlementResponse.json().catch(() => null);
    }
    await sendReceipt(env, email, { course_id: courseId, payment_reference: reference });
    return response({ ok: true, received: eventId, entitlement });
  }
  return response({ error: 'not_found' }, 404);
} };
