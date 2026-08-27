# Tayanch — Social-impact implementation

Branch: `feature/tayanch-social-impact`

## Delivered

- Career outcome panels for AI Agentlar, Data Analytics, Backend Python and Figma with portfolio deliverables, concrete next steps, CV/LinkedIn guidance and outcome-survey link.
- Cautious income examples for AI workflow, analytics and prompt services; no income or employment guarantees.
- New Uzbek remote-work guide at `/masofaviy-ish/` covering Upwork, Fiverr and Toptal onboarding, portfolio, proposals, fees, payout caveats and a Telegram/Instagram post series.
- Homepage banner linking to remote work and regional access pages.
- Regional access landing at `/viloyatlar/` with the active “Tayanch-10” pilot mechanism and a consented interest form.
- 26-institution regional outreach shortlist in `/docs/regional-outreach-shortlist.md` and a public table on the regional page. Partnership interest is not claimed; provisional/blocked official domains are labeled for recheck.
- Free Financial Literacy mini-course launch with budget tool, six practical modules, debt/saving/online-income safety, progress tracking and no product-specific financial advice.
- Admission funnel from the free study-abroad course to Admission Process, plus an El-Yurt Umidi audit page showing completed structure and remaining content gaps.
- Impact measurement page at `/tasir/` with transparent zero baseline, consented outcome survey, and shaxssiz statistical categories for work, freelance, portfolio and income outcomes.
- Startup smoke tests extended to cover all new routes and content markers.

## Research evidence used

- Upwork eligibility, identity verification, proposals, Connects, freelancer fee and payout guidance: official Upwork support pages.
- Fiverr seller profile/Gig, identity verification, payment terms and Payoneer guidance: official Fiverr help/legal pages.
- Toptal screening and requirements: official Toptal pages.
- Aggregate online-gig context and risks: World Bank press release and ILO microtask research. The ILO figure is not used as a skilled-freelancing rate benchmark.
- Regional institution list: official university homepages/about/contact pages where readable; domains requiring manual recheck are explicitly labeled.
- El-Yurt Umidi links point to the official foundation/application domains; requirements remain subject to the active competition notice.

## Honest boundaries

- No real testimonial, student count, employment result, salary increase or grant winner case study was invented. The impact baseline stays at zero until verified, consented responses exist.
- “Tayanch-10” is active from 2026-08-26: five monthly places provide full access to one existing course only. It provides no cash, internet/device reimbursement, or other financial aid. First review is 2026-09-30.
- Form submissions use the existing Formspree endpoint already used by the site. The endpoint owner must review retention/privacy settings before collecting sensitive outcome information.
- Regional outreach is a research shortlist, not a contact campaign or partnership claim.
- The remote-work guide tells learners to verify current platform eligibility, payout availability, taxes, fees and local legal obligations.

## Tayanch-10 admin routine

1. Review Formspree submissions and remove duplicates or incomplete applications.
2. Check age/region/course eligibility; request guardian confirmation for applicants under 18.
3. Score the four-part rubric shown on `/viloyatlar/`: need (35%), goal clarity (25%), completion plan (20%), and regional impact (20%).
4. Have a second reviewer check the short-list and conflicts before contacting applicants.
5. Contact selected applicants and the waiting list separately. Never publish raw applications, identity documents, or private contact details.
6. Keep the active status, cycle dates and five-seat limit in `src/data/tayanch10.ts`; change them only through an explicit policy decision.

## Impact dashboard update routine

- Export the survey results from Formspree only for authorized admin review.
- Verify each claimed result, remove personal data, and aggregate counts into `src/data/impact-summary.json`.
- Keep the file to aggregate counts and month labels; do not add names, emails, phone numbers, or individual stories.
- Run `npm run verify:impact`, the complete build, and the existing smoke/schema tests before committing an update.
- A dashboard change is not evidence by itself: every count must have an auditable internal review note kept outside the public repository.
