# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/admission-process.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead (first occurrence only)
lead_old = """  <p class="lead">
    Chet el universitetlariga hujjat topshirish — murakkab jarayon.
    Noto'g'ri qadam stipendiyani o'tkazib yuborishi mumkin.
  </p>"""
lead_new = """  <p class="lead" data-i18n="ap.lead">
    Chet el universitetlariga hujjat topshirish — murakkab jarayon.
    Noto'g'ri qadam stipendiyani o'tkazib yuborishi mumkin.
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="ap.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Universitet tanlash: reyting, mutaxassislik, xarajat": "ap.mod1",
    "Hujjatlar: diplom, transcript, pasport": "ap.mod2",
    "Motivation Letter / Essay qanday yozish": "ap.mod3",
    "Interview: tayyorgarlik savollari": "ap.mod4",
    "Stipendiya: El-Yurt Umidi, Stipendium Hungaricum, KAU": "ap.mod5",
    "Obsidian'da kuzatuv: muddatlar, eslatmalar": "ap.mod6",
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
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="ap.buy">Kursni sotib olish →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="ap.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="ap.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

# tracker section: title, desc, button, note
tr_title_old = '      <h2>Universitet va Stipendiya Tracker Shabloni</h2>'
tr_title_new = '      <h2 data-i18n="ap.trackerTitle">Universitet va Stipendiya Tracker Shabloni</h2>'
if tr_title_old in s:
    s = s.replace(tr_title_old, tr_title_new, 1); edits += 1
else:
    print("!! tracker title not found")

tr_desc_old = """      <p class="tracker-desc">
        UK, AQSH, Koreya, Ispaniya, Kanada universitetlarini kuzatish uchun tayyor shablon.
        Ariza muddatlari, hujjatlar holati va stipendiya bosqichlarini bitta jadvalda ushlab turing —
        nima topshirilgani, nima kutayotganingiz va qachon eslatma kerakligini unutmay gensiz.
      </p>"""
tr_desc_new = """      <p class="tracker-desc" data-i18n="ap.trackerDesc">
        UK, AQSH, Koreya, Ispaniya, Kanada universitetlarini kuzatish uchun tayyor shablon.
        Ariza muddatlari, hujjatlar holati va stipendiya bosqichlarini bitta jadvalda ushlab turing —
        nima topshirilgani, nima kutayotganingiz va qachon eslatma kerakligini unutmay gensiz.
      </p>"""
if tr_desc_old in s:
    s = s.replace(tr_desc_old, tr_desc_new, 1); edits += 1
else:
    print("!! tracker desc not found")

tr_btn_old = '      <a href="#" class="dl-btn" onclick="return false;" aria-disabled="true">⬇ Yuklab olish</a>'
tr_btn_new = '      <a href="#" class="dl-btn" onclick="return false;" aria-disabled="true" data-i18n="ap.trackerBtn">⬇ Yuklab olish</a>'
if tr_btn_old in s:
    s = s.replace(tr_btn_old, tr_btn_new, 1); edits += 1
else:
    print("!! tracker btn not found")

tr_note_old = '      <p class="dl-note">Fayl tez orada yuklanadi — havola hozircha placeholder.</p>'
tr_note_new = '      <p class="dl-note" data-i18n="ap.trackerNote">Fayl tez orada yuklanadi — havola hozircha placeholder.</p>'
if tr_note_old in s:
    s = s.replace(tr_note_old, tr_note_new, 1); edits += 1
else:
    print("!! tracker note not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== admission-process.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
AP_UZ = """          "ap.lead": "Chet el universitetlariga hujjat topshirish — murakkab jarayon. Noto'g'ri qadam stipendiyani o'tkazib yuborishi mumkin.",
          "ap.modules": "Kurs modullari",
          "ap.mod1": "Universitet tanlash: reyting, mutaxassislik, xarajat",
          "ap.mod2": "Hujjatlar: diplom, transcript, pasport",
          "ap.mod3": "Motivation Letter / Essay qanday yozish",
          "ap.mod4": "Interview: tayyorgarlik savollari",
          "ap.mod5": "Stipendiya: El-Yurt Umidi, Stipendium Hungaricum, KAU",
          "ap.mod6": "Obsidian'da kuzatuv: muddatlar, eslatmalar",
          "ap.buy": "Kursni sotib olish →",
          "ap.all": "← Barcha kurslar",
          "ap.quizTitle": "O'z bilimingizni tekshiring",
          "ap.trackerTitle": "Universitet va Stipendiya Tracker Shabloni",
          "ap.trackerDesc": "UK, AQSH, Koreya, Ispaniya, Kanada universitetlarini kuzatish uchun tayyor shablon. Ariza muddatlari, hujjatlar holati va stipendiya bosqichlarini bitta jadvalda ushlab turing — nima topshirilgani, nima kutayotganingiz va qachon eslatma kerakligini unutmay gensiz.",
          "ap.trackerBtn": "⬇ Yuklab olish",
          "ap.trackerNote": "Fayl tez orada yuklanadi — havola hozircha placeholder.","""

AP_RU = """          "ap.lead": "Подача документов в зарубежные университеты — сложный процесс. Неверный шаг может стоить стипендии.",
          "ap.modules": "Модули курса",
          "ap.mod1": "Выбор университета: рейтинг, специальность, расходы",
          "ap.mod2": "Документы: диплом, transcript, паспорт",
          "ap.mod3": "Как написать Motivation Letter / Essay",
          "ap.mod4": "Interview: подготовительные вопросы",
          "ap.mod5": "Стипендия: El-Yurt Umidi, Stipendium Hungaricum, KAU",
          "ap.mod6": "Отслеживание в Obsidian: сроки, напоминания",
          "ap.buy": "Купить курс →",
          "ap.all": "← Все курсы",
          "ap.quizTitle": "Проверьте свои знания",
          "ap.trackerTitle": "Шаблон трекера университетов и стипендий",
          "ap.trackerDesc": "Готовый шаблон для отслеживания университетов UK, США, Кореи, Испании, Канады. Ведите в одной таблице сроки подачи, статус документов и этапы стипендии — не забудьте, что подано, что ожидается и когда нужно напоминание.",
          "ap.trackerBtn": "⬇ Скачать",
          "ap.trackerNote": "Файл скоро загрузим — ссылка пока placeholder.","""

AP_EN = """          "ap.lead": "Applying to foreign universities is a complex process. One wrong step can cost you the scholarship.",
          "ap.modules": "Course modules",
          "ap.mod1": "Choosing a university: ranking, major, cost",
          "ap.mod2": "Documents: diploma, transcript, passport",
          "ap.mod3": "How to write a Motivation Letter / Essay",
          "ap.mod4": "Interview: preparation questions",
          "ap.mod5": "Scholarships: El-Yurt Umidi, Stipendium Hungaricum, KAU",
          "ap.mod6": "Tracking in Obsidian: deadlines, reminders",
          "ap.buy": "Buy course →",
          "ap.all": "← All courses",
          "ap.quizTitle": "Check your knowledge",
          "ap.trackerTitle": "University & Scholarship Tracker Template",
          "ap.trackerDesc": "A ready-made template to track universities in the UK, USA, Korea, Spain, and Canada. Keep application deadlines, document status, and scholarship stages in one table — never lose track of what's submitted, what's pending, and when a reminder is due.",
          "ap.trackerBtn": "⬇ Download",
          "ap.trackerNote": "File coming soon — link is a placeholder for now.","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + AP_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + AP_RU + "\n",
    anchor_en: anchor_en + "\n" + AP_EN + "\n",
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
