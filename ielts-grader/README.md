# IELTS Writing — AI baholash (Cloudflare Worker + Google Gemini)

`/ielts-mock/writing/` sahifasi inshongizni Google Gemini orqali IELTS rasmiy mezonlari
bo‘yicha 0–9 ball bilan baholaydi. Frontend (GitHub Pages, static) to‘g‘ridan-to‘g‘ri
Gemini’ga murojaat qila olmaydi (CORS cheklangan), shuning uchun oraliq sifatida
Cloudflare Worker ishlatiladi.

## Arxitektura

```
Brauzer (ielts-mock/writing/)
   │  POST { essay, task }  (CORS faqat rasmiy saytga ruxsat)
   ▼
Cloudflare Worker (bepul tier)
   │  - IP bo‘yicha limit: 1 daqiqada 3 so‘rov
   │  - Gemini generateContent (responseMimeType: application/json)
   ▼
Google Gemini  ──►  { taskAchievement, coherenceCohesion, lexicalResource,
                       grammaticalRange, overall, feedback }
```

## Deploy qilish (bir martalik)

1. Wrangler o‘rnating va tizimga kiring:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
2. Gemini API kalitini secret sifatida bering
   (https://aistudio.google.com/apikey dan olingan kalit):
   ```bash
   cd ielts-grader
   wrangler secret put GEMINI_API_KEY
   # kalitni so‘ralganda joylang
   ```
3. Workerni deploy qiling:
   ```bash
   wrangler deploy
   ```
   Natijada `https://ielts-grader.<sizning-subdomain>.workers.dev` manzili beriladi.
4. **Frontendda manzilni yangilang.** Barcha tillarda bitta joyda:
   `src/config/grader.ts` dagi:
   ```ts
   export const GRADER_WORKER_URL = 'https://ielts-grader.<subdomain>.workers.dev';
   ```
   ni 3-bosqichdagi haqiqiy manzilga o‘zgartiring.
5. Saytni qayta deploy qiling (`git push` → GitHub Actions).

## GitHub Actions orqali avtomatik deploy (tavsiya etiladi)

Qo‘lda deploy o‘rniga, worker repoga qo‘shilgan workflow orqali avtomatik deploy
bo‘ladi. Buning uchun repo **Settings → Secrets and variables → Actions** bo‘limida
quyidagi secretlarni qo‘shing:

- `CLOUDFLARE_API_TOKEN` — Cloudflare API Token (Workers deploy huquqi bilan).
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Account ID (ixtiyoriy; token account-ga
  scoped bo‘lsa shart emas).
- `GEMINI_API_KEY` — Google Gemini API kaliti (worker secret sifatida o‘rnatiladi).

Secretlar qo‘shilgandan so‘ng, `main` ga push qilinganda
`.github/workflows/deploy-worker.yml` avtomatik ishga tushib workerni sizning
haqiqiy Cloudflare account’ingizga deploy qiladi. Keyin `src/config/grader.ts`
dagi `GRADER_WORKER_URL` ni yangi manzilga o‘zgartiring va saytni qayta deploy
qiling.

> Eslatma: secretlar yo‘q bo‘lsa workflow o‘tkazib yuboriladi (main buzulmaydi).

## Muhim nuqtalar

- **CORS**: Worker faqat `https://javohirqaxramonov36-web.github.io` dan kelgan
  so‘rovlarga javob beradi. Localhost’dan test qilsangiz brauzer bloklaydi — faqat
  saytning o‘zida ishlaydi. Boshqa domen kerak bo‘lsa, `src/index.js` dagi
  `ALLOWED_ORIGIN` ni o‘zgartiring.
- **Limit**: bir IP 1 da‘qiqada 3 baholash. Bepul tier uchun yetarli; bosim oshsa
  `hits` xotirasini Cloudflare KV yoki Durable Object ga o‘tkazing.
- **Xavfsizlik**: `GEMINI_API_KEY` secret sifatida saqlanadi, kodga yozilmaydi.
  Frontendda kalit yo‘q.
- **Xatolalar**: Gemini band bo‘lsa yoki javob noto‘g‘ri bo‘lsa, frontendga
  "keyinroq urinib ko‘ring" kabi do‘stona xabar boradi — sahifa singmaydi.
- **Bepul**: Cloudflare Workers free tier (100k so‘rov/kun) va Gemini free quota
  yetarli. To‘lov talab qilinmaydi.

## Sinov

Saytda `/ielts-mock/writing/` → insho yozing → "Baholash". Natija `profile/`
sahifasidagi "Mock natijalari" jadvaliga saqlanadi (faqat shu brauzerda).
