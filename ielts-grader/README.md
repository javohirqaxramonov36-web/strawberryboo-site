# IELTS Writing — AI baholash

Bu papka GitHub Pages’dagi statik `/ielts-mock/writing/` forma va Google Gemini orasidagi Cloudflare Worker’ni saqlaydi.

```
Brauzer → Cloudflare Worker → Google Gemini
         └─ API kaliti faqat Worker secretida
```

Worker Writing Task 1 yoki 2 inshosini IELTS practice mezonlari bo‘yicha baholaydi: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy. Natija **rasmiy IELTS bali emas**, faqat mashq uchun AI bahosi.

## Xavfsizlik va limitlar

- `GEMINI_API_KEY` faqat Cloudflare secretida bo‘ladi; frontend va Git reposida kalit yo‘q.
- Worker requestning `Origin` headerini tekshiradi. Faqat `https://javohirqaxramonov36-web.github.io` qabul qilinadi; boshqa sayt Worker orqali Gemini limitini sarflay olmaydi.
- Bir Worker instance ichida bitta IP uchun limit: 1 daqiqada 3 so‘rov. Bu bepul boshlang‘ich himoya; katta trafikda Durable Object/KV kerak bo‘ladi.
- Maksimal insho hajmi: 20 000 belgi.
- Gemini 429 quota xatosi foydalanuvchiga tushunarli xabar sifatida qaytariladi.

## Birinchi deploy

1. Cloudflare hisobiga kiring va Wrangler bilan tasdiqlang:

   ```bash
   npm install -g wrangler
   cd ~/strawberryboo-site/ielts-grader
   wrangler login
   ```

2. Google AI Studio’dan Gemini API key oling, so‘ng uni **faqat secret** sifatida qo‘shing. Kalitni chatga yoki kodga yozmang:

   ```bash
   wrangler secret put GEMINI_API_KEY
   ```

3. Workerni deploy qiling:

   ```bash
   wrangler deploy
   ```

4. Deploy javobida berilgan Worker URL’ni `src/config/grader.ts` ichidagi `GRADER_WORKER_URL` qiymatiga yozing. Keyin sayt branchini push qiling; `main`ga merge bo‘lgach GitHub Pages avtomatik deploy qiladi.

5. Live saytda `/ielts-mock/writing/` sahifasini tekshiring. UZ, RU va EN sahifalari bitta `GRADER_WORKER_URL` konfiguratsiyasidan foydalanadi.

## Lokal tekshiruv

```bash
# loyiha ildizidan
npm run test:ielts-grader
npm run build
```

Local Astro sahifasi browserdan Worker’ga yuborilsa, faqat production GitHub Pages originiga ruxsat berilgani uchun CORS tomonidan bloklanadi. Bu kutilgan xavfsizlik xususiyati; Worker endpointini deploydan keyin live saytda sinang.
