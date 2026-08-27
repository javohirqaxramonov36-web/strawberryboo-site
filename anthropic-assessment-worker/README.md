# Tayanch Anthropic Assessment Worker

Bu Worker GitHub Pages’dan alohida ishlaydi. GitHub Pages faqat statik fayllarni joylashtiradi; Anthropic API chaqiruvi shu serverless Worker’da bajariladi.

## Platforma

Repo’dagi mavjud `payment-worker/wrangler.toml`, `ielts-grader/wrangler.toml` va `.github/workflows/deploy-worker.yml` Cloudflare Workers + Wrangler ishlatilayotganini ko‘rsatadi. Anthropic Worker uchun alohida konfiguratsiya `anthropic-assessment-worker/wrangler.toml` faylida berilgan.

## Birinchi marta deploy qilish

Bu buyruqlarni loyiha ildizida, oddiy Terminal’da bajaring:

```bash
cd /Users/javohir/strawberryboo-site
npx wrangler login
```

Brauzer oynasida Cloudflare hisobingizni tanlab ruxsat bering. So‘ng Worker papkasiga o‘ting:

```bash
cd /Users/javohir/strawberryboo-site/anthropic-assessment-worker
```

Anthropic kalitini faqat Cloudflare secret sifatida qo‘shing. Kalitni chatga, GitHub’ga yoki kod fayliga yozmang:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

Terminal kalitni so‘raganda uni kiriting. Kiritish vaqtida belgilar ko‘rinmasligi normal.

Keyin Worker’ni deploy qiling:

```bash
npx wrangler deploy
```

Javobda `https://tayanch-anthropic-assessment.<account-subdomain>.workers.dev` ko‘rinishidagi URL chiqadi. Shu URL’ni saqlang; uni chatga yuborish shart emas.

## Deploydan keyingi xavfsiz test

Health endpoint alohida yozilmagan. Noto‘g‘ri method bilan xavfsiz test:

```bash
curl -i -X GET "https://WORKER_URL.workers.dev/"
```

Kutilgan natija: `405` va `Faqat POST ruxsat etiladi.`

Haqiqiy API chaqirig‘i qiladigan testni faqat test javobi va sarf-xarajatni tushungan holda bajaring:

```bash
curl -i -X POST "https://WORKER_URL.workers.dev/" \
  -H 'content-type: application/json' \
  -H 'origin: https://javohirqaxramonov36-web.github.io' \
  --data '{"course":"prompt-engineering","rubric":"aniqlik; rol va kontekst; format","answer":"Men foydalanuvchi maqsadi, kontekst va kutilgan formatni aniq yozgan prompt tuzaman."}'
```

Worker Anthropic API’ga haqiqiy so‘rov yuboradi. `ANTHROPIC_API_KEY` hech qachon javobda qaytarilmaydi.

## Kalit kiritilmagan holat

Worker kalitsiz deploy qilinsa, POST so‘rov `503` bilan quyidagi xabarni qaytaradi:

```json
{"error":"Baholash xizmati hozircha sozlanmoqda."}
```

Frontend endpoint sozlanmagan bo‘lsa, foydalanuvchiga shu mazmundagi xabarni ko‘rsatadi. Bu holatda baholash ishlamaydi, lekin sahifa xatolik bilan buzilmaydi.

## Sayt frontend’ini ulash

Worker URL’ni Git repository’ga yoki frontend kodiga secret sifatida yozmang; URL maxfiy kalit emas, lekin production endpoint sifatida ongli ravishda sozlanadi. GitHub Pages build vaqtida public endpoint sifatida berish uchun GitHub repository Variables’dan foydalaning:

```text
PUBLIC_PRACTICAL_ASSESSMENT_ENDPOINT=https://WORKER_URL.workers.dev/
```

Keyin yangi commit bilan GitHub Pages build’ini ishga tushiring. Anthropic key GitHub Pages’ga berilmaydi; u faqat Cloudflare Worker secret store’da qoladi.

## Lokal smoke-test

Test real Anthropic API’ga murojaat qilmaydi va haqiqiy kalit talab qilmaydi:

```bash
cd /Users/javohir/strawberryboo-site
node --experimental-strip-types examples/test-anthropic-assessment-worker.mjs
```

Kutilgan natija:

```text
Anthropic assessment worker smoke test: PASS (no real API call, no secret used)
```

## Chegaralar

- Bu Worker baholash natijasini rasmiy imtihon bali sifatida ko‘rsatmaydi.
- InPay yoki checkout jarayoniga tegilmaydi.
- Anthropic kaliti repository, frontend yoki GitHub Pages build artefaktiga kiritilmaydi.
- Uchinchi tomon foydalanuvchi ma’lumotlari faqat foydalanuvchi topshirgan javob doirasida Anthropic’ga yuboriladi; privacy notice va retention siyosatini production’dan oldin ko‘rib chiqing.
