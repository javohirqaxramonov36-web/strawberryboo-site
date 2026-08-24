# Task 5 implementation report

Scope: static Astro site; no accounts, backend, telemetry, or automatic publishing. All browser data stays on-device unless a learner deliberately uses their own AI key to call its provider.

1. **Course selection** — `CourseAdvisor.astro`, mounted on all three course-selection routes. Keyboard-native radios provide current level, goal and weekly time; recommendation is deterministic and no data is collected.
2. **My Journey** — `LearningJourneyPlan.astro`, mounted in the three My Journey locales. It reads (never overwrites) `tayanch.course.status.v1`, which existing `CourseProgress` writes. An empty state is normal, not an error; it offers daily/weekly plan language.
3. **Peer review** — `AdmissionTools.astro` opens a Telegram weekly-essay invitation only. It is explicitly not a peer-review platform. Future matching, moderation, consent and reporting require backend/community operations.
4. **Leaderboard** — an owner-only Telegram post template is in a disclosure in `AdmissionTools`; it has no ranking UI or claimed student data. A real leaderboard requires verified opt-in activity data and backend policy.
5. **Mentor/alumni** — an explicit written-consent placeholder only; no identity, school, photo or testimonial is rendered. Add profiles only after written permission and record removal handling.
6. **SOP reviewer** — `AdmissionTools` reuses `window.TayanchAI.assessWriting` from existing `public/tayanch-ai.js` (actually Gemini API, not OpenRouter). It sends a separate SOP rubric (structure, specificity, clarity/flow, impact) and forbids IELTS bands. Existing mechanism uses client-provided Google AI Studio key in localStorage, direct `generativelanguage.googleapis.com` request, and no server secret. `tayanch.sop-review.guard.v1` is a 60-second local repeat guard; it does not modify existing keys. Visible privacy/key/limit notice added. Source offers no numeric quota config; 429 comes from provider, so no artificial quota claim is made. Owner should confirm Google AI Studio terms/model quota and decide whether a server-side proxy is desired before marketing the tool.
7. **University matcher** — `src/data/universities.json`: four discovery names only, with region/field/preference tags, `last_updated`, and warning. SAT/IELTS/budget is displayed as user profile text, never matched to criteria. Update JSON only after owner verifies official sources; do not add thresholds, tuition or deadlines without dated sources.
8. **Webinar** — `community-config.ts` has `webinar: null`, so the component honestly shows no configured event. Before enabling calendar download, owner must supply confirmed title/start/end and public URL. The component safely enables browser-only `.ics` download only when all confirmed config fields are present; it remains hidden while config is null.
9. **Podcast** — same config has `podcast: null`; an accessible player is rendered only for a configured permitted audio URL. No placeholder audio is fabricated.
10. **PWA** — existing Base registration and manifest retained. `public/sw.js` now has a cautious same-origin GET runtime cache plus minimal precache; it does not claim push support. Push requires backend/third-party push service, consent, VAPID keys and unsubscribe policy. Owner should test offline behaviour and decide whether caching dynamic pages is desired.
11. **Completion feedback** — Journey detects a completed `total === 30` local course state, but feedback destination is empty in config. No email/phone/Form is collected or invented. Owner must verify a Telegram recipient/channel and set `feedbackTelegramUrl` before enabling handoff. Feedback is manual and testimonials need approval before public display.
12. **Homiylik** — `AcademyPartnership.astro` is mounted on all sponsorship locales and gives professional Engineering Academy partnership rationale/actions without amounts, tax/legal statements, recipients or impact claims.

## Data / owner maintenance
- `src/data/community-config.ts`: leave values blank unless confirmed. No credentials belong here. Confirm Telegram destination, consent records, event fields, audio licensing/permission and PWA/cache decision.
- `src/data/universities.json`: retain only verified discovery metadata; update `last_updated` when reviewed.
- Community template is the owner disclosure under “Leaderboard post”; edit only after consent/data-policy review.

## Backend-required work
Accounts, moderated peer matching, real rankings, automated feedback collection, consent management, event registration/reminders, web push and server-side AI key protection all require a backend and appropriate privacy/operations design.
