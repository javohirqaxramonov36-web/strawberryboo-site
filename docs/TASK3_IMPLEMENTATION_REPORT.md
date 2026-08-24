# Tayanch Astro — task 3 implementation report

Date: 2026-08-24. This implementation is static-site safe: no deployment, credentials, tokens, external IDs, fabricated outcomes, or payment automation were added.

| Task | Status and files | Static site / owner dependency |
|---|---|---|
| 1. Technical SEO | Existing canonical, base-aware paths and hreflang retained in `src/layouts/Base.astro`; sitemap generated from static routes by `scripts/generate-sitemap.mjs`; `public/robots.txt` points to it. | Static. Canonical host/base must remain aligned with actual deploy host. |
| 2. Metadata | Existing natural titles/descriptions and social metadata retained in Base. | Static; review page-specific copy as content evolves. |
| 3. Structured data | `src/components/CourseSchema.astro` now derives `inLanguage` from route and uses a base-aware provider URL. | Static; templates that do not currently import this component still need deliberate schema decisions. |
| 4. Performance | No large audio/assets were removed. New iframe is lazy-loaded and only allows a validated embed host. | Audit/resize legacy image and audio assets separately; use dimensions/lazy decoding when editing them. |
| 5. Analytics | `Analytics.astro` sends click events for checkout/modal and Telegram CTAs only if configured; `analytics.ts` keeps analytics off by default. | Owner must set `PUBLIC_ANALYTICS_PROVIDER=google` and real `PUBLIC_GA_MEASUREMENT_ID`, then update privacy copy before deployment. No event is sent without configured analytics. |
| 6. Trust | `PaymentInstructions.astro`/`PaymentJourney.astro` keep manual Telegram confirmation and card-data-not-entered-on-site language. | No response SLA is claimed. |
| 7. Certificate | `CertificateTrustPage.astro` adds a guarded local PDF: only 30/30 speaking state stored in this browser can enable it. It includes no ID, QR, external verification, or credential claim. | Owner needs official certificate policy and any later verification system before changing claims. |
| 8. Storytelling | Existing Journey substantiated claims retained; no new personal/university claims added. | Content owner may expand only with evidence. |
| 9. Telegram reminders | `external-services/telegram-reminder-bot/` has Node source, `.env.example`, and consent/hosting README. | Bot token, consented chat storage, opt-out policy, scheduler/time zone, durable storage, and hosting are required. Static site cannot subscribe/store chats. |
| 10–11. Retention | `CourseProgress.astro` preserves `progress:<courseId>` and speaking keys while adding 7/14/30 milestones, next incomplete lesson, and remaining-to-30-day guidance. | Local-only state, no cross-device/account sync. |
| 12. Premium review | `PremiumReviewCard.astro` is clearly unavailable/not purchasable. | Owner must provide real Telegram message path, price, scope and SLA before enabling purchase. |
| 13. Cross-sell | `CourseCrossSell.astro` is shown on IELTS Writing via `IeltsSkillCourse.astro`; no discount claimed. | Static. |
| 14. Video | `VideoEmbed.astro` is an accessible reusable placeholder/validated embed component. | Add an actual permitted video URL to render an embed. |
| 15. Referral | `Base.astro` validates/persists only safe `ref` values without altering existing Telegram destinations; `ReferralCard.astro` copies a link and creates a separate `t.me/share/url` prefilled Telegram share URL. | Basic/manual capture only: no backend, attribution guarantee, reward or discount. Owner must define referral rules before any rewards. |

## Validation

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` completed successfully: **168 pages built**.
- The first plain build attempt could not run because dependencies were absent; `npm ci` installed the lockfile dependencies. The next build initially hit sandbox Astro telemetry preferences (`EPERM`); disabling telemetry resolved it.
- Sitemap prebuild generated 165 sitemap URLs.

## External constraints and explicit TODOs

1. Add a real GA4 measurement ID only as a build environment variable; revise privacy notice before enablement.
2. Define/approve official certificate and verification policy before representing certificates as externally verifiable.
3. Secure/host the reminder bot, obtain bot token privately, retain consent/opt-out records, and configure scheduler.
4. Provide a human-review Telegram route, price, scope, and response policy before changing the unavailable card.
5. Define referral terms, attribution storage and rewards before promising incentives.
6. Review existing legacy images/audio separately; no aggressive asset deletion was done.
