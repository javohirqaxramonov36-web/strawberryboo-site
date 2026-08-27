/** Minimal server-side sketch. Adapt to the chosen runtime before deployment. */
import { createHash, createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

export function verifyTelegramLogin(payload: Record<string, string>, botToken: string, maxAgeSeconds = 86400) {
  const received = payload.hash;
  const authDate = Number(payload.auth_date);
  if (!received || !authDate || Date.now() / 1000 - authDate > maxAgeSeconds) return false;
  const dataCheck = Object.entries(payload).filter(([key]) => key !== 'hash').sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join('\n');
  const secret = createHash('sha256').update(botToken).digest();
  const expected = createHmac('sha256', secret).update(dataCheck).digest('hex');
  return received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export function createSessionToken() {
  const raw = randomBytes(32).toString('base64url');
  return { raw, hash: createHash('sha256').update(raw).digest('hex') };
}

// POST /auth/telegram: verifyTelegramLogin -> users upsert -> store hash + expiry ->
// Set-Cookie: tayanch_session=<raw>; HttpOnly; Secure; SameSite=Lax; Path=/
// GET/PUT /api/progress/:slug must look up the user by the hashed session cookie.
// Never log raw tokens, bot tokens, Telegram payloads, or student answer text.
