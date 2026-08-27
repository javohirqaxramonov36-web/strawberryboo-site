# Yangi kurs qo‘shish — qadam-baqadam yo‘riqnoma

Kurs katalogining yagona manbasi **`src/data/courses.json`**. Bosh sahifa, Kurslar katalogi, RU/EN kataloglari, kurs kartalari va sarlavhadagi kurs soni shu ma’lumotdan olinadi. Sayt Astro’da statik build qilinadi: bu tez yuklanish va SEO uchun ma’lumotni brauzerda keyin `fetch` qilishdan ko‘ra xavfsizroq. Shuning uchun yangi kurs qo‘shganda odatda faqat JSON ma’lumotini hamda kursning alohida sahifasini qo‘shasiz.

## 1. `courses.json` ga yozuv qo‘shing

`courses` massiviga quyidagi andozani joylang. Har bir ko‘rsatilgan `uz`, `ru`, `en` qiymatni to‘ldiring.

```json
{
  "slug": "mening-kursim",
  "type": "standard",
  "status": "available",
  "countInPublicTotal": true,
  "cats": ["ai"],
  "accent": "#7d7df5",
  "icon": "sparkle",
  "badge": { "uz": "Yangi", "ru": "Новый", "en": "New" },
  "title": { "uz": "Mening kursim", "ru": "Мой курс", "en": "My course" },
  "description": { "uz": "Qisqa tavsif", "ru": "Краткое описание", "en": "Short description" },
  "audience": { "uz": "Kimga mo‘ljallangan", "ru": "Для кого", "en": "Who it is for" },
  "price": { "uz": "$29", "ru": "$29", "en": "$29" },
  "priceUzs": { "uz": "≈ 360 000 so‘m", "ru": "≈ 360 000 сум", "en": "≈ 360,000 UZS" },
  "free": false,
  "paid": true,
  "comingSoon": false,
  "certificate": true,
  "gumroadSlug": null,
  "progressCourseId": null,
  "progressTotal": null,
  "href": "kurslar/mening-kursim"
}
```

## 2. Majburiy maydonlar

| Maydon | Ma’nosi |
|---|---|
| `slug` | Noyob, kichik harfli URL kalit (`mening-kursim`). |
| `type` | `standard`, `ielts-mini`, `coming-soon`, `bundle` yoki `mock`. |
| `status` | `available` yoki `upcoming`. `comingSoon: true` bo‘lsa doim `upcoming`. |
| `title`, `description`, `audience`, `price` | UZ/RU/EN ko‘rinishida to‘liq matnlar. |
| `cats` | Filtr kategoriyalari: `ai`, `ielts`, `general-english`, `admission`, `sat`, `dizayn`, `hayotiy`, `bepul`, `data`, `dasturlash`. |
| `href` | Nisbiy sahifa yo‘li: `kurslar/<slug>`. |
| `free`, `paid`, `comingSoon` | Kurs holatini ifodalovchi boolean qiymatlar. |
| `countInPublicTotal` | Tarixiy metadata maydoni. Bosh sahifadagi kurs soni endi `src/data/courses.json`dagi barcha 31 ta katalog yozuvidan avtomatik hisoblanadi. |

## 3. To‘lov va holat qoidalari

- Hozircha **inPAY saqlanadi**; Gumroad avtomatlashtirishiga o‘tilmagan. `gumroadSlug` yangi kurslarda `null` qolsin, agar keyin alohida qaror qilinmasa.
- Bepul kurs: `free: true`, `paid: false`, `cats` ichida `bepul`.
- Tez orada: `comingSoon: true`, `paid: false`, `status: "upcoming"`, narxga `Tez orada` / `Скоро` / `Coming soon` yozing.
- Mavjud karta uslublari saqlanishi uchun `icon` sifatida `CourseCard.astro` ichidagi ikonkalardan foydalaning: `sparkle`, `book`, `agent`, `document`, `code`, `doccheck`, `chip`, `lightning`, `figma`, `cad`, `cap`, `chart`, `trophy`, `box`, `monitor`.

## 4. Yangi kurs sahifasini yarating

JSON kartasi kursga olib boradi, ammo kurs sahifasini o‘zi yaratmaydi. `src/pages/kurslar/<slug>.astro` sahifasini mavjud o‘xshash kursdan nusxa olib, sarlavha, tavsif, dastur va metadata’ni moslang. RU/EN sahifalar ham rejangizga kirsa, tegishli localized template yoki route’ni qo‘shing.

## 5. Tekshirish

Loyiha papkasida quyidagilarni bajaring:

```bash
npm run verify:courses
npm run build
node scripts/verify-course-schema.mjs
```

So‘ng `npm run dev -- --host 127.0.0.1` orqali bosh sahifa va `/kurslar/` sahifasini ochib, karta, filter, mobile ko‘rinish va yangi kurs sahifasini tekshiring.

## Nimalar avtomatik, nimalar qo‘lda?

Avtomatik: kurs kartalari, UZ/RU/EN kataloglardagi kartalar, katalog filtrlari va public kurs soni.

Qo‘lda: kursning mazmunli alohida sahifasi, dars materiallari, rasmlar va kelajakda to‘lov provayderi mahsulot havolasi.
