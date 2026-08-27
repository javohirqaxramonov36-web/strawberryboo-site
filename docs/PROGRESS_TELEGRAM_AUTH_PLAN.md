# Progress va Telegram Login — texnik reja

## Maqsad

Hozirgi `localStorage` progressi bitta brauzerga bog‘langan. Keyingi bosqichda Telegram Login Widget orqali yengil, server-side sessiya qo‘shiladi. Bu reja hozircha ishlab chiqarish auth’ini o‘zgartirmaydi.

## Arxitektura

1. Foydalanuvchi Telegram Login Widget orqali backendga qaytadi.
2. Backend Telegram hash/signature’ni serverdagi `TELEGRAM_BOT_TOKEN` bilan tekshiradi. Token hech qachon frontendga berilmaydi.
3. Backend qisqa muddatli, `HttpOnly; Secure; SameSite=Lax` sessiya cookie yaratadi.
4. Progress endpoint’lari faqat shu sessiya egasiga tegishli yozuvlarni o‘qiydi yoki yangilaydi.
5. Frontend localStorage’ni offline fallback sifatida vaqtincha saqlaydi; login bo‘lganda conflict-resolution oynasi orqali serverdagi va lokal natija birlashtiriladi.

## Endpoint skeleti

- `GET /auth/telegram` — Widget callback; hashni tekshirish, user upsert, sessiya yaratish.
- `POST /auth/logout` — sessiyani bekor qilish.
- `GET /api/me` — minimal Telegram user profili.
- `GET /api/progress/:courseSlug` — kurs progressini olish.
- `PUT /api/progress/:courseSlug` — faqat ruxsat etilgan progress maydonlarini yangilash.
- `POST /api/attempts` — amaliy topshiriq urinishini saqlash; matnni saqlash muddati oldindan belgilanadi.
- `DELETE /api/progress/:courseSlug` — faqat foydalanuvchi so‘roviga ko‘ra, audit log bilan.

## Minimal ma’lumotlar sxemasi

```sql
users(id uuid primary key, telegram_id bigint unique not null, username text,
      first_name text, created_at timestamptz not null, updated_at timestamptz not null)

sessions(id uuid primary key, user_id uuid references users(id), token_hash text unique,
         expires_at timestamptz not null, created_at timestamptz not null)

course_progress(user_id uuid references users(id), course_slug text not null,
                completed_items jsonb not null default '{}', last_seen_at timestamptz,
                updated_at timestamptz not null, primary key(user_id, course_slug))

assessment_attempts(id uuid primary key, user_id uuid references users(id), course_slug text,
                    rubric_version text not null, word_count int, feedback text,
                    created_at timestamptz not null)
```

## Xavfsizlik va maxfiylik

- Telegram hash verification, rate limit, CSRF himoyasi va input length limit majburiy.
- Telegram ID’ni public URL yoki frontmatter’ga qo‘ymang.
- Talaba javoblarini faqat zarur muddat saqlang; o‘chirish yo‘lini bering.
- API kalitlar (`TELEGRAM_BOT_TOKEN`, `ANTHROPIC_API_KEY`) faqat hosting secret’larida.
- Rasmiy Telegram Login Widget hujjati va bot domen sozlamasi deploydan oldin tekshiriladi.

## Bosqichma-bosqich migratsiya

1. Backend staging va test bot yaratish; production botga tegmaslik.
2. `GET /api/me` va read-only progress endpoint’ini chiqarish.
3. Bir nechta sintetik account bilan localStorage → server sync va conflict test.
4. `PUT` va assessment attempt’larini qo‘shish; audit log va rate limitni tekshirish.
5. Frontend’da opt-in login banner; logout va data deletion UX’ini qo‘shish.
6. Error monitoring, backup va rollback rejasi tasdiqlangachgina production endpoint’ni `PUBLIC_PROGRESS_API_URL` orqali ulash.

## Hozirgi holat

Bu hujjat, `examples/telegram-auth-skeleton.ts` va `examples/anthropic-assessment-worker.ts` boshlang‘ich skeletdir. GitHub Pages statik bo‘lgani uchun auth va Anthropic baholash serveri alohida hosting’da deploy qilinishi kerak; bu commit ularni avtomatik productionga chiqarmaydi.
