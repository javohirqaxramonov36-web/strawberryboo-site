# Talaba natijalarini yig‘ish va nashrga tayyorlash

## Maqsad

`/tasir/` sahifasidagi forma kursdan keyingi natijalarni yig‘adi. Yuborilgan javoblar public sahifaga avtomatik chiqmaydi. Avval qo‘lda tekshiriladi, keyin faqat kerakli va rozilik berilgan ma’lumot `src/data/student-outcomes.json` fayliga kiritiladi.

## Formadagi maydonlar

| Forma maydoni | Vazifasi | Publicga chiqadimi? |
|---|---|---|
| `form_type` | Javob turini ajratish | Yo‘q |
| `consent_version` | Rozilik matni versiyasi | Yo‘q |
| `name` | Aloqa uchun ism yoki taxallus, ixtiyoriy | Faqat alohida rozilik bo‘lsa |
| `display_name` | Saytda ko‘rsatiladigan ism/taxallus, ixtiyoriy | Faqat `testimonial_consent=yes` bo‘lsa |
| `course` | O‘tilgan kurs | Agregat statistikada ishlatilishi mumkin |
| `outcome` | Natija kategoriyasi | Agregat statistikada ishlatilishi mumkin |
| `region` | Hudud, ixtiyoriy | Faqat umumlashtirilgan ko‘rinishda |
| `public_consent` | Shaxssiz umumiy statistikaga qo‘shish roziligi | Ha, faqat agregat shaklda |
| `testimonial_consent` | Ism/taxallus va natijani sayt/reklamada ko‘rsatish roziligi | Ha, faqat tekshiruvdan keyin |

## Rozilik qoidasi

Forma ikki xil rozilikni alohida so‘raydi:

1. **Public statistika roziligi** — javobni ism va email’siz, umumiy raqamlarga qo‘shish.
2. **Testimonial roziligi** — ko‘rsatiladigan ism/taxallus va natijani sayt yoki reklama materialida ishlatish. Bu ixtiyoriy.

Ikkinchi rozilik belgilanmagan bo‘lsa, ism/taxallus yoki individual hikoya publicga chiqarilmaydi.

## Tekshirish tartibi

1. Formspree’dan javobni oling.
2. Javobdagi kurs va natijani kurs yozuvlari bilan solishtiring.
3. Natijani tasdiqlovchi minimal dalilni, masalan portfolio havolasi yoki foydalanuvchining o‘zi bergan izohni tekshiring. Maxfiy hujjatlarni repository’ga saqlamang.
4. `public_consent` belgilanmagan bo‘lsa, javobni public statistikaga qo‘shmang.
5. `testimonial_consent` belgilanmagan bo‘lsa, ism/taxallus va individual natijani publicga chiqarmang.
6. Faqat tasdiqlangan minimal qiymatlarni JSON’ga qo‘shing.
7. Rozilik bekor qilinsa, tegishli yozuvni olib tashlang va dashboard raqamlarini qayta hisoblang.

## JSON yozuv formati

`src/data/student-outcomes.json` ichidagi `outcomes` massiviga faqat verified va permissioned yozuvlar kiritiladi:

```json
{
  "courseSlug": "prompt-engineering",
  "name": "J.*",
  "outcome": "Portfolio uchun 3 ta amaliy prompt workflow tayyorladi",
  "status": "verified",
  "publicConsent": true,
  "testimonialConsent": true,
  "verifiedAt": "2026-09-01"
}
```

Agar testimonial roziligi bo‘lmasa, `name` va individual hikoya kiritilmaydi; faqat anonim agregat hisoblash uchun ichki moderation qaydi ishlatiladi.

## Hozirgi holat

`src/data/student-outcomes.json` hozircha bo‘sh. Bu ataylab qilingan: soxta natija, soxta testimonial yoki roziliksiz shaxsiy ma’lumot qo‘shilmaydi.
