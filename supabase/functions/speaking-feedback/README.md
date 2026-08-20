# speaking-feedback Edge Function

## Required Supabase secrets
Set these in the Supabase Dashboard or with the CLI; never commit them to this repository:

- `ANTHROPIC_API_KEY` — Anthropic server API key
- `SUPABASE_URL` — normally supplied by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — normally supplied by Supabase

Example:
```bash
supabase secrets set ANTHROPIC_API_KEY=... --project-ref uwgqlnvneqzcgzeroabm
supabase functions deploy speaking-feedback --project-ref uwgqlnvneqzcgzeroabm
```

## Database and storage
1. Apply `supabase/migrations/20260821_002_speaking_mvp.sql va 202608210001_speaking_wallet_guard.sql` in the Supabase SQL Editor.
2. The existing private `attempt-audio` bucket is used. Browser uploads are permitted only under the authenticated user’s own folder.
3. Do not deploy until the privacy policy and Terms changes in this same release are live.

## Contract
Authenticated callers submit `{ day, part, question, transcript, audioPath?, completed }`.
The function validates the JWT, stores the attempt/progress server-side, calls Claude with a fixed rubric, and returns structured feedback. It returns a practice estimate, never an official IELTS score.
