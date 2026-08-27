# Tayanch kurs materiallari — audit va amalga oshirish qaydi

## Source of truth

- Generator: Astro 4 (`astro.config.mjs`), GitHub Pages base `/strawberryboo-site/`.
- Kurs kartalari va katalog metama’lumotlari: `src/data/courses.json`.
- General English: `src/data/general-english-courses.ts`.
- SAT: `src/data/sat-courses.ts`.
- Kurs sahifalari: `src/pages/kurslar/*.astro`, umumiy shell’lar esa `src/components/GeneralEnglishCourse.astro`, `SatCourse.astro`, `IeltsSkillCourse.astro` va `LocalizedStandardCourse.astro`.

## Reconciled catalog

`src/config/course-catalog.ts` endi `courses.json`dan hosil bo‘ladi; qo‘lda ikkilamchi ro‘yxat yo‘q.

- Jami public record: **31** (kurslar, 1 IELTS bundle va 1 mock mahsulot record sifatida hisoblangan).
- Hozir mavjud: **16**.
- Kelayotgan: **15** — Vibe Coding, Data Analytics, Backend Python, 6 ta General English darajasi, 3 ta SAT komponenti, Financial Literacy, El-Yurt Umidi va Computer Literacy.
- General English: 6 bosqich, A1–C1.
- SAT: SAT Math, SAT English, Desmos Applications — narxlar “Narx belgilanmoqda”.
- Financial Literacy bosh sahifa va `/kurslar/`da bir xil “Kelayotgan” statusida.
- `/kurslar/` filteridagi `Hayotiy ko'nikka` imlosi `Hayotiy ko'nikma`ga tuzatildi.

Bosh sahifada General English va SAT yo‘nalishlari ham ko‘rinadigan preview blok qo‘shildi. Count badge endi `totalCourseCount`dan keladi.

## Material coverage

- `content/video-scripts/<slug>/` — barcha 31 record uchun 195 ta Uzbek Markdown skript. Har modulda davomiylik, ekran, hook, tushuntirish, misol va xulosa bor.
- `content/downloads/<slug>/` — barcha record uchun 31 ta download material; maxsuslari Prompt kutubxonasi, Obsidian vault shabloni, IELTS Speaking 30 kunlik banki, IELTS Writing rubrici, 6 ta CEFR vocabulary/jadval, SAT Math/English va Desmos cheat-sheet’laridir.
- `public/downloads/` — GitHub Pages’dan yuklanadigan nusxalar. Mavjud `Tayanch-app.apk` saqlab qolindi.

## Baholash va auth chegarasi

Prompt Engineering va IELTS Writing sahifalarida amaliy topshiriq frontend bloki bor. U faqat `PUBLIC_PRACTICAL_ASSESSMENT_ENDPOINT` berilgandagina so‘rov yuboradi. Anthropic kalitini saqlaydigan alohida Cloudflare Worker skeleti `examples/anthropic-assessment-worker.ts`da; production secret yoki deployment bu commitga kiritilmagan.

Telegram Login + server-side progress migratsiyasi `docs/PROGRESS_TELEGRAM_AUTH_PLAN.md`da. Hozirgi localStorage progressi ataylab buzilmadi.

## Chegaralar

Mavjud kurs matnlari o‘chirilmagan yoki qayta yozilmagan. To‘lov, InPay, checkout va mavjud manual Telegram payment behavior o‘zgartirilmagan. Haqiqiy talaba natijasi kiritilmagan; `src/data/student-outcomes.json` rozilik asosidagi bo‘sh format sifatida turibdi.
