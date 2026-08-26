# Tayanch payment worker

This Cloudflare Worker is the server-side boundary for the future InPay checkout. GitHub Pages must not receive or store an InPay API key.

## Important activation gate

The public inPAY Uzbekistan API contract must be confirmed from the merchant account before deployment. The public API page was not retrievable during implementation, so endpoint names, auth, request fields, and signature headers below are configurable placeholders—not a claim about the provider’s actual contract. The worker deliberately returns `payment_not_configured` until `INPAY_API_BASE_URL`, `INPAY_API_KEY`, `PUBLIC_SITE_URL`, and a server-side `COURSE_PRICES_JSON` are set.

Do not guess the provider endpoint, auth scheme, webhook signature header, receipt API, or checkout payload. The adapter currently uses configurable names and a minimal payload; map them to the verified InPay documentation before enabling production payments.

## Endpoints

- `GET /health` — configuration status without secrets.
- `POST /create-payment` — accepts `{ "course_id": "...", "email": "..." }`; price is taken only from `COURSE_PRICES_JSON`, never from the browser.
- `POST /webhook/inpay` — requires an HMAC-SHA256 signature and stores an idempotent `payment_events` record in Supabase.

## Secrets / variables

Set non-secret variables with `wrangler.toml` or `wrangler secret put` as appropriate. Put `INPAY_API_KEY`, `INPAY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY` only into the Worker secret store. Apply `supabase/migrations/202608260001_courses_payments_waitlist.sql` first.

The receipt email is optional and uses Resend only when explicitly configured. A payment event alone does not grant course access: after the provider payload and customer identity mapping are verified, add the service-role entitlement transaction and test it in sandbox.

## Test order

1. Apply the Supabase migration in a non-production project.
2. Confirm InPay sandbox endpoint, payload, auth, webhook signature, and receipt behavior in writing.
3. Configure Worker secrets; run `/health` and a sandbox checkout.
4. Verify duplicate webhook delivery is idempotent and that no access is granted on failed payments.
5. Configure `PUBLIC_PAYMENT_API_URL` in the site build only after sandbox tests pass.
