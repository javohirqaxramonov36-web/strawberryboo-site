# InPay va LMS — keyingi texnik reja

## Hozirgi holat

Tayanch GitHub Pages’da statik Astro sayt sifatida ishlaydi. InPay integratsiyasi hali provider tomonidan tasdiqlanish jarayonida, shuning uchun production payment flow o‘zgartirilmaydi va repo’ga API key yoki maxfiy qiymatlar kiritilmaydi.

## InPay uchun tavsiya etiladigan oqim

1. Provider’dan sandbox API hujjati, API key turi, checkout endpointi, webhook imzo tekshirish qoidasi, success/failure URL’lari va invoice imkoniyatlarini tasdiqlash.
2. Alohida serverless backend yaratish (Cloudflare Worker yoki Vercel Function):
   - `POST /create-payment` — faqat ruxsat etilgan kurs sluglarini qabul qiladi, narxni server tomonda catalog’dan oladi va checkout session yaratadi.
   - `POST /webhook/inpay` — imzoni tekshiradi, event ID bo‘yicha idempotent ishlaydi va muvaffaqiyatli to‘lovni qayd etadi.
3. Foydalanuvchi emaili yoki Telegram identifikatorini checkout metadata’siga faqat rozilik va minimal ma’lumot tamoyili asosida qo‘shish.
4. Sandbox’da success, failure, duplicate webhook, noto‘g‘ri summa va bekor qilingan to‘lov holatlarini sinash.
5. Faqat provider hujjati va sandbox tasdig‘idan keyin checkout tugmalarini production endpointiga ulash.

## LMS uchun minimal arxitektura

- Auth: Supabase Auth yoki Firebase Auth.
- Database: foydalanuvchi, kurs access’i, modul progressi, certificate status.
- Access: webhook tasdiqlagan `purchase` yozuvi asosida RLS/middleware.
- Video: private Vimeo/Bunny/Cloudflare Stream; ochiq GitHub Pages ichiga premium video joylanmaydi.
- Profile: sotib olingan kurslar, progress, kursga kirish va mavjud bo‘lsa sertifikat.
- Audit: purchase ID, provider event ID, vaqt va status; karta raqami yoki maxfiy payment ma’lumoti saqlanmaydi.

## Ishga tushirish mezonlari

- API key faqat hosting secret sifatida saqlanadi.
- Webhook imzosi tekshiriladi va duplicate event ikki marta access bermaydi.
- Narx client’dan kelgan qiymatga ishonmasdan server catalog’dan olinadi.
- Sandbox testlari o‘tadi va rollback rejasi mavjud bo‘ladi.
- Payment flow alohida branch’da, mustaqil review bilan chiqariladi.

## Hozir bajarilgan xavfsiz tayyorgarlik

- Kurs va narx ma’lumotlari `src/data/courses.json`da mavjud.
- Success/failure route’lari mavjud yoki route map’da ajratilgan.
- Statik saytga InPay endpointi ulangan emas.
- Hozircha payment flow o‘zgartirilmagan; keyingi qadam faqat provider sandbox hujjatlari kelgach boshlanadi.
