# Yangi kurs qo‘shish — qadam-baqadam yo‘riqnoma

Barcha kurslar **`src/data/courses.json`** faylida bitta joyda saqlanadi. Bosh sahifa
(`index.astro`), Kurslar sahifasi (`kurslar/index.astro`), RU/EN tarjimalar
(`LocalizedCatalog.astro`, `LocalizedHome.astro`) va karta komponenti
(`CourseCard.astro`) shu fayldan avtomatik generatsiyalanadi. Yangi kurs qo‘shish
uchun kodga tegishingiz shart emas — faqat JSON ga yozasiz.

## 1. courses.json ichiga yangi obyekt qo‘shing

`courses.json` tuzilmasi:

```json
{
  "courses": [
    {
      "slug": "mening-kursim",
      "type": "standard",
      "title": { "uz": "Mening kursim", "ru": "Мой курс", "en": "My course" },
      "description": { "uz": "…", "ru": "…", "en": "…" },
      "price": "$29",
      "icon": "sparkles",
      "cats": ["ai"],
      "gumroadSlug": "mening-gumroad-slug",
      "progress": 100,
      "badge": { "uz": "Yangi", "ru": "Новый", "en": "New" },
      "href": "kurslar/mening-kursim",
      "cefr": null,
      "accent": "#7d7df5"
    }
  ]
}
```

## 2. Maydonlarni to‘ldiring

| Maydon | Nima uchun | Qachon |
|--------|-----------|--------|
| `slug` | Sahifa va JSON ichidagi noyob kalit. Boshqa kurslar bilan takrorlanmasin. | Majburiy |
| `type` | `standard` (odatiy), `ielts-mini` (IELTS modullari), `coming-soon` (tez orada), `mock` (IELTS mock), `bundle` (paket). | Majburiy |
| `title` / `description` | UZ/RU/EN tarjimalar. Uch tilda ham to‘ldiring. | Majburiy |
| `price` | Karta narxi, masalan `$29` yoki `49 000 so'mdan` yoki `Tez orada`. | Majburiy |
| `icon` | `src/components/CourseCard.astro` ichidagi `icons` lug‘atidagi kalit. Yo‘q bo‘lsa `sparkles` ishlatiladi. | Ixtiyoriy |
| `cats` | Filtr tugmalari uchun kategoriya(lar). `ai`, `ielts`, `general-english`, `admission`, `sat`, `dizayn`, `hayotiy`, `bepul`, `data`, `dasturlash`. | Majburiy (filter uchun) |
| `gumroadSlug` | Gumroad mahsulot slug'i. Bepul/yoki Telegram orqali bo‘lsa `null` qo‘ying. | Shartli |
| `progress` | 0–100. 100 dan kichik bo‘lsa karta "X% tayyor" ko‘rsatadi. | Ixtiyoriy |
| `badge` | Karta burchagidagi yorliq. Yo‘q bo‘lsa chiqmaydi. | Ixtiyoriy |
| `href` | Kurs sahifasiga nisbiy yo‘l. `kurslar/<slug>`. | Majburiy |
| `cefr` | Faqat General English uchun (A1–C2). Aks holda `null`. | Ixtiyoriy |
| `accent` | Karta rangigi (hex). | Ixtiyoriy |

## 3. Qoida-lar

- **Bepul kurs** (`figma`, `chet-elda-oqish`, `ielts-vocabulary`): `gumroadSlug` = `null`,
  `cats` ichida `bepul` bo‘lsin.
- **Tez orada** (`vibe-coding`, `data-analytics`, `backend-python`, va `coming-soon` turi):
  `gumroadSlug` = `null`, CTA "Kursni ko‘rish →" ichki sahifaga olib boradi.
- **Admission (3 qism)**: `admission-process` kursi maxsus — CTA Telegram (`bog-lanish`)
  sahifasiga, `gumroadSlug` = `null`.
- **IELTS modullari**: `type: "ielts-mini"` va o‘z `gumroadSlug` (listening/reading/writing/
  speaking). `ielts-vocabulary` bepul → `gumroadSlug: null`.
- **Bundle**: `type: "bundle"`, `gumroadSlug: "ielts-full-bundle"`, CTA Telegramga.

## 4. Tekshirish

1. `python3 -m json.tool src/data/courses.json` — JSON xato bo‘lmasin.
2. Loyihani build qiling: `npm run build` (GitHub Actions ham avtomatik tekshiradi).
3. Sahifada karta chiqishini, filtr ishlashini va (pullik bo‘lsa) Gumroad havolasining
   yangi tabda ochilishini tekshiring.

## 5. Yangi icon qo‘shish (ixtiyoriy)

`src/components/CourseCard.astro` dagi `icons` obyektiga yangi kalit qo‘shing:

```ts
const icons: Record<string, string> = {
  sparkles: '<svg …>…</svg>',
  // yangi: rocket: '<svg …>…</svg>'
};
```

Keyin kursda `"icon": "rocket"` deb ko‘rsating.
