# Tayanch — yakuniy texnik audit (2026-08-20)

## Bajarilgan
- `.env.*` fayllari `.gitignore` bilan ignore qilinadi (`.env.example` istisno).
- `robots.txt`, `sitemap.xml`, foydali 404 sahifa yaratildi.
- 13 kurs sahifasiga schema.org `Course` JSON-LD qo‘shildi.
- Listening va Reading practice sahifalariga meta description qo‘shildi.
- Build: 28 sahifa, muvaffaqiyatli.

## Xavfsizlik eslatmasi
- Hardcoded provider key topilmadi.
- IELTS AI baholash foydalanuchining OpenAI API kalitini browser localStorage’ida saqlaydi va browserdan bevosita provider API’ga yuboradi. Server-side proxy yoki backend bo‘lmaguncha bu production uchun ehtiyot talab qiladigan oqim.

## Accessibility va tezlik
- Asosiy matn kontrasti: `#9a9ab2` / `#0e0f15` = 6.96:1 (WCAG AA normal text uchun yetarli).
- Asosiy interactive elementlar native `button`, `a`, `input`, `select` bilan qurilgan; Tab/Enter ishlashi uchun klaviatura-native.
- `public/` rasmlarining ko‘pchiligi WebP (11 WebP, 2 JPG). Source’dagi kontent rasmlari lazy-load bilan; lightbox ichidagi bo‘sh `img` lazy-load bo‘lishi shart emas, u foydalanuvchi ochganda dinamik yuklanadi.

## Aniqlangan buzilgan ichki havolalar
Quyidagi eski mock katalog sahifalari mavjud bo‘lmagan nisbiy fayllarga bog‘lanadi:
- `../content/mock-019/{listening,reading,writing}.html`
- `../content/mock-020/{listening,reading,writing}.html`
- `../content/mock-021/{listening,reading,writing}.html`
- `../content/mock-022/{listening,reading,writing}.html`
- `../content/mock-023/{listening,reading,writing}.html`
- `../content/mock-024/{listening,reading,writing}.html`
- `../content/mock-025/{listening,reading,writing}.html`
- `../content/mock-026/{listening,reading,writing}.html`
- `../content/mock-028/{listening,reading,writing}.html`
- `@ieltsmaterials_full`
- `Reading.html`

Bu linklar `public/ielts-mocks/catalog/` va eski/kelgan mock kontentining aralash strukturasiga tegishli. Ularni avtomatik o‘zgartirmadim: to‘g‘ri yangi manzilni tasdiqlash kerak.

## Qaror talab qiladigan masalalar
- Privacy Policy va Refund Policy draftini tasdiqlash.
- Avtomatik payment gateway kerakmi?
- Google Analytics yoki privacy-first analytics (masalan Plausible) qo‘shilsinmi?
