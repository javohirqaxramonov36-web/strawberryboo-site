# Sertifikat tekshirish tizimi — texnik reja

## Maqsad

Sertifikat raqami va QR orqali sertifikatning Tayanch ro‘yxatida bor-yo‘qligini statik GitHub Pages saytida tekshirish. Hozircha bu hujjat reja sifatida beriladi; mavjud `/sertifikat/` sahifasidagi shaffoflik matni o‘zgartirilmaydi va soxta sertifikat ID’lar qo‘shilmaydi.

## Taklif qilinadigan tuzilma

```text
src/data/certificates.json
src/pages/tekshirish.astro
public/qr/
```

`certificates.json` har bir haqiqiy berilgan sertifikat uchun quyidagi maydonlarni saqlaydi:

```json
{
  "id": "TAY-2026-XXXXX",
  "status": "valid",
  "course": "Course name",
  "holderDisplayName": "Permissioned display name",
  "issuedAt": "2026-09-30"
}
```

## Ishlash oqimi

1. Sertifikat berilganda noyob `TAY-YYYY-XXXXX` ID serverdan tashqari, nazorat ostidagi generator bilan yaratiladi.
2. Faqat egasining roziligi bor ma’lumot `certificates.json`ga kiritiladi; maxfiy ma’lumot kiritilmaydi.
3. `/tekshirish/?id=TAY-2026-XXXXX` sahifasi statik JSON’ni `fetch` qiladi va `topildi` yoki `topilmadi` holatini ko‘rsatadi.
4. QR kodi shu tekshirish URL’iga olib boradi.
5. O‘chirilgan yoki bekor qilingan sertifikat `status: revoked` bilan alohida ko‘rsatiladi.

## Cheklov

Static JSON backend o‘rnini to‘liq bosa olmaydi: fayl ochiq bo‘ladi va yangilanish deploy talab qiladi. Ko‘p sertifikat, maxfiy ma’lumot yoki tezkor bekor qilish kerak bo‘lsa, keyinchalik server-side verification endpoint kerak bo‘ladi.
