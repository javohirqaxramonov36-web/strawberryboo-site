# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/ielts-prep.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead (first occurrence only)
lead_old = """  <p class="lead">
    IELTS Writing, Reading, Speaking — 30 kunlik reja bilan.
    AI bilan essay yozishni mashq qiling.
  </p>"""
lead_new = """  <p class="lead" data-i18n="ie.lead">
    IELTS Writing, Reading, Speaking — 30 kunlik reja bilan.
    AI bilan essay yozishni mashq qiling.
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="ie.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Nima uchun IELTS kerak? (6.0-7.0 band)": "ie.mod1",
    "Writing Task 1 & 2 — essay strukturasi": "ie.mod2",
    "Reading — tez o'qish, keyword topish": "ie.mod3",
    "Speaking — Part 1/2/3 javoblar": "ie.mod4",
    "Listening — note-taking texnikasi": "ie.mod5",
    "30 kunlik reja (hafta bo'yicha)": "ie.mod6",
    "Prompt Engineering bilan AI'dan yaxshiroq javob": "ie.mod7",
}
for text, key in mods.items():
    old = "      <li>%s</li>" % text
    new = '      <li data-i18n="%s">%s</li>' % (key, text)
    if old in s:
        s = s.replace(old, new, 1); edits += 1
    else:
        print("!! module not found:", key)

# buy link
buy_old = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Kursni sotib olish →</a>'
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="ie.buy">Kursni sotib olish →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="ie.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="ie.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== ielts-prep.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
IE_UZ = """          "ie.lead": "IELTS Writing, Reading, Speaking — 30 kunlik reja bilan. AI bilan essay yozishni mashq qiling.",
          "ie.modules": "Kurs modullari",
          "ie.mod1": "Nima uchun IELTS kerak? (6.0-7.0 band)",
          "ie.mod2": "Writing Task 1 & 2 — essay strukturasi",
          "ie.mod3": "Reading — tez o'qish, keyword topish",
          "ie.mod4": "Speaking — Part 1/2/3 javoblar",
          "ie.mod5": "Listening — note-taking texnikasi",
          "ie.mod6": "30 kunlik reja (hafta bo'yicha)",
          "ie.mod7": "Prompt Engineering bilan AI'dan yaxshiroq javob",
          "ie.buy": "Kursni sotib olish →",
          "ie.all": "← Barcha kurslar",
          "ie.quizTitle": "O'z bilimingizni tekshiring","""

IE_RU = """          "ie.lead": "IELTS Writing, Reading, Speaking — план на 30 дней. Практикуйте написание эссе с ИИ.",
          "ie.modules": "Модули курса",
          "ie.mod1": "Зачем нужен IELTS? (6.0-7.0 band)",
          "ie.mod2": "Writing Task 1 и 2 — структура эссе",
          "ie.mod3": "Reading — быстрое чтение, поиск ключевых слов",
          "ie.mod4": "Speaking — ответы Part 1/2/3",
          "ie.mod5": "Listening — техника ведения заметок",
          "ie.mod6": "План на 30 дней (по неделям)",
          "ie.mod7": "Лучшие ответы от ИИ с Prompt Engineering",
          "ie.buy": "Купить курс →",
          "ie.all": "← Все курсы",
          "ie.quizTitle": "Проверьте свои знания","""

IE_EN = """          "ie.lead": "IELTS Writing, Reading, Speaking — a 30-day plan. Practice essay writing with AI.",
          "ie.modules": "Course modules",
          "ie.mod1": "Why do you need IELTS? (6.0-7.0 band)",
          "ie.mod2": "Writing Task 1 & 2 — essay structure",
          "ie.mod3": "Reading — read fast, find keywords",
          "ie.mod4": "Speaking — Part 1/2/3 responses",
          "ie.mod5": "Listening — note-taking technique",
          "ie.mod6": "30-day plan (week by week)",
          "ie.mod7": "Better answers from AI with Prompt Engineering",
          "ie.buy": "Buy course →",
          "ie.all": "← All courses",
          "ie.quizTitle": "Check your knowledge","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + IE_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + IE_RU + "\n",
    anchor_en: anchor_en + "\n" + IE_EN + "\n",
}

cnt = 0
for a, r in repl.items():
    if a in b:
        b = b.replace(a, r, 1); cnt += 1
    else:
        print("!! anchor miss:", a[:50])

with io.open(base, "w", encoding="utf-8") as f:
    f.write(b)
print("== Base.astro ==", cnt, "blocks inserted")
print("DONE")
