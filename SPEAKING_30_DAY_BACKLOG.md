# IELTS Speaking — 30 kunlik AI kursi: engineering delivery backlog

Canonical product backlog va qarorlar:

`/Users/javohir/Documents/Obsidian Vault/17.G'oya sot/sayt/ielts-speaking-30-day-delivery-backlog-2026-08-21.md`

## 2026-08-21 current status

- Route: `src/pages/kurslar/ielts-prep/speaking.astro`
- UI: `src/components/SpeakingPractice.astro`
- Content: `src/data/ielts-speaking-week-1.json` (days 1–7 only)
- Secure backend: `supabase/functions/speaking-feedback/index.ts`
- DB migrations: `supabase/migrations/20260821_002_speaking_mvp.sql`, `202608210001_speaking_wallet_guard.sql`
- Production function protects Anthropic key, creates attempts, atomically consumes 1 Qadam, and refunds provider/JSON failures.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed on 2026-08-21 (32 pages).

## Do not regress

- Never expose `ANTHROPIC_API_KEY` or service-role credentials to client code.
- Keep feedback labelled **AI practice estimate**, never an official IELTS score.
- Transcript-only MVP must leave pronunciation band `null` and state its limitation.
- Speaking, Shadowing, and Mock use the same Qadam wallet.
- User audio and transcript must remain private to that user.

## Priority execution

### P0 — complete the course core

1. **SPK-01:** Create one validated 30-day content data source. Every day needs 8–12 pronunciation items, one daily shadowing item, and unique IELTS-style Part 1/2/3 set.
2. **SPK-03:** Replace the 7-day grid with 30-day progress/day navigation.
3. **SPK-04:** Make completion state server-authoritative for signed-in users. Current `completeDay` updates only localStorage because feedback invokes the function with `completed:false`.
4. **SPK-05:** Add Part 1, Part 2, Part 3, and Full simulation attempt payloads. Current feedback always posts one Part 2 cue card.
5. **SPK-06:** Build the sequential full simulation recorder/timer flow.
6. **SPK-07:** Keep the result UI based on 4 criteria, confidence, 2–3 actionable next steps, and explicit retry reason.
7. **SPK-08:** Verify keyboard, aria-live status, permission failure, reduced motion, and mobile layout.

### P1 — make shadowing real

1. **SHD-01:** Introduce an original/licensed source-audio + transcript metadata pipeline.
2. **SHD-02:** Replace TTS-only shadowing playback with player controls, chunk replay, and speeds.
3. **SHD-03:** Add a pre-charge audio quality gate and a clear refund/error state.
4. **SHD-04:** Safari/iOS: recording plus manual transcript must remain usable; server-STT requires a separately approved provider.
5. **SHD-05/06:** Research/approve a privacy-compatible STT provider before adding word alignment or acoustic metrics. Do not call acoustic output an IELTS band.

### P2 — progress and completion

1. **PRG-01:** Secure per-user attempt history query.
2. **PRG-02:** Weekly trend/dashboard using completed attempts only; explain insufficient data.
3. **PRG-03:** Next-step CTA derived from actual feedback.
4. **PRG-04/05:** Certificate eligibility after all 30 days and print/PDF certificate generation.

### P3 — release reliability

1. **REL-01:** Idempotency for double click/network retries; no double Qadam charge.
2. **REL-02:** Audio retention/deletion policy.
3. **REL-03:** Privacy-safe analytics.
4. **REL-04:** Closed beta across Chrome desktop/Android and Safari macOS/iOS.
5. **REL-05:** Deploy checklist: migrations, RLS/storage policies, Edge Function secrets, build, test account, rollback.

## Product decision to preserve

The 30-day course uses **one daily shadowing clip**. If paid Shadowing is later offered as a separate product, the approved strategy is **three clips per 1 Qadam session**. Keep these data models and user-facing promises separate.

## Definition of done

Do not describe this as a production 30-day Speaking course until all 30 days are reviewed, three-part completion persists for signed-in users, feedback supports Part 1/2/3/full flows, Qadam charges are retry-safe, Safari has a usable fallback, trend data comes from completed attempts, certificate eligibility is real, and release QA passes.
