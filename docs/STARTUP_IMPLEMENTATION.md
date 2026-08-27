# Tayanch startup checklist implementation

Branch: `feature/tayanch-startup-implementation`

## Implemented in this branch

- Static site checkout boundary with fail-closed behavior. The site does not invent an InPay URL and keeps `PAYMENT_URL = '#'` until a verified public checkout URL exists.
- Cloudflare Worker adapter in `payment-worker/` with `/create-payment`, `/webhook/inpay`, and `/health`; prices are server-side, webhook delivery is HMAC-verified and idempotent, and optional receipt email uses a server secret.
- Supabase migration for `course_entitlements`, `course_progress`, `payment_events`, and consented `waitlist_signups`, with RLS and service-role-only payment processing.
- Email magic-link LMS account panel on UZ/RU/EN profile pages. It shows purchased entitlements and saved lesson progress when the migration and data are available.
- Upcoming-course waitlist forms with explicit consent, a honeypot, duplicate handling, and no public read access.
- Localized refund policy routes and links from the terms page/footer. Wording does not promise an unapproved deadline or automatic refund.
- Payment success/failure return pages.
- Entertainment removed from the homepage’s long interactive block and retained as a separate page, with a clear homepage link.
- Existing GA4, Course JSON-LD, sitemap/robots, responsive UI, and 404 implementation retained and verified by the existing build scripts.

## Not honestly activatable without owner/provider input

1. InPay’s official Uzbekistan merchant API endpoint, auth header, request body, webhook signature scheme, sandbox credentials, and receipt behavior must be confirmed from the merchant account. Search found the official product/API lead, but the API page returned 403, so no provider contract was guessed.
2. Apply the migration in the intended Supabase project and configure the Worker secrets. The Worker is not deployed by the GitHub Pages workflow.
3. Verify the actual InPay sandbox flow before setting `PUBLIC_PAYMENT_API_URL` in a production build.
4. Confirm legal entity details, refund timing, and post-access digital-content rule before replacing the cautious refund wording.
5. Add only real, consented testimonials and any verified student counts; the public testimonials dataset remains empty by design.

## Deployment boundary

The GitHub Pages workflow deploys only after `main` receives a change. This branch can be pushed for review and CI, but production deployment should happen after manual merge review. No production payment behavior is enabled by this branch alone.
