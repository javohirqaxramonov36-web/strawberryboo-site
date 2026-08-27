# Lesson-linked dictionary data

`lesson-vocabulary.json` — General English darslariga bog‘langan, 0-bosqich review’dan o‘tgan vocabulary nomzodlari.

- `lesson_id` repo’dagi amaldagi modul slug’i bilan bog‘langan.
- `source: "auto"` — so‘z joriy dars/modul manbasidan konservativ avtomatik ajratilganini bildiradi.
- Bu fayl umumiy dictionary source-of-truth sifatida ishlatiladigan hozirgi birinchi dataset; tekshiruv paytida alohida `src/data/dictionary/` bazasi topilmadi.
- `saved` so‘zlar keyingi integratsiya bosqichida alohida oqim orqali qo‘shiladi; bu bosqichda UI yoki localStorage yozilmagan.
- SRS/interval algoritmi bu faylda yo‘q.
