# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/obsidian.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead (first occurrence only)
lead_old = """  <p class="lead">
    Shaxsiy bilim bazasi qurish. Strawberryboo bilan Telegram'dan
    forward qilsangiz — AI xulosalab, Obsidian'ga saqlaydi.
  </p>"""
lead_new = """  <p class="lead" data-i18n="op.lead">
    Shaxsiy bilim bazasi qurish. Strawberryboo bilan Telegram'dan
    forward qilsangiz — AI xulosalab, Obsidian'ga saqlaydi.
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="op.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Nima uchun Obsidian? (Tashqi xotira)": "op.mod1",
    "Vault tuzilmasi: MOC, papkalar, link'lar": "op.mod2",
    "AutoConnect plugin: yangi note'larni avtomatik ulash": "op.mod3",
    "Strawberryboo: Telegram → Obsidian capture": "op.mod4",
    "Graph view: bilimlar bog'lanishi": "op.mod5",
    "Qayerda qo'llash: o'qish, ish, tadqiqot": "op.mod6",
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
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="op.buy">Kursni sotib olish →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="op.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="op.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== obsidian.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
OP_UZ = """          "op.lead": "Shaxsiy bilim bazasi qurish. Strawberryboo bilan Telegram'dan forward qilsangiz — AI xulosalab, Obsidian'ga saqlaydi.",
          "op.modules": "Kurs modullari",
          "op.mod1": "Nima uchun Obsidian? (Tashqi xotira)",
          "op.mod2": "Vault tuzilmasi: MOC, papkalar, link'lar",
          "op.mod3": "AutoConnect plugin: yangi note'larni avtomatik ulash",
          "op.mod4": "Strawberryboo: Telegram → Obsidian capture",
          "op.mod5": "Graph view: bilimlar bog'lanishi",
          "op.mod6": "Qayerda qo'llash: o'qish, ish, tadqiqot",
          "op.buy": "Kursni sotib olish →",
          "op.all": "← Barcha kurslar",
          "op.quizTitle": "O'z bilimingizni tekshiring","""

OP_RU = """          "op.lead": "Построение личной базы знаний. Если переслать из Telegram через Strawberryboo — ИИ подытожит и сохранит в Obsidian.",
          "op.modules": "Модули курса",
          "op.mod1": "Зачем нужен Obsidian? (внешняя память)",
          "op.mod2": "Структура Vault: MOC, папки, ссылки",
          "op.mod3": "Плагин AutoConnect: автоматическое связывание новых заметок",
          "op.mod4": "Strawberryboo: захват Telegram → Obsidian",
          "op.mod5": "Graph view: связи знаний",
          "op.mod6": "Где применять: учёба, работа, исследования",
          "op.buy": "Купить курс →",
          "op.all": "← Все курсы",
          "op.quizTitle": "Проверьте свои знания","""

OP_EN = """          "op.lead": "Building a personal knowledge base. Forward from Telegram via Strawberryboo — AI summarizes and saves it to Obsidian.",
          "op.modules": "Course modules",
          "op.mod1": "Why Obsidian? (external memory)",
          "op.mod2": "Vault structure: MOC, folders, links",
          "op.mod3": "AutoConnect plugin: auto-link new notes",
          "op.mod4": "Strawberryboo: Telegram → Obsidian capture",
          "op.mod5": "Graph view: how knowledge connects",
          "op.mod6": "Where to apply: study, work, research",
          "op.buy": "Buy course →",
          "op.all": "← All courses",
          "op.quizTitle": "Check your knowledge","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + OP_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + OP_RU + "\n",
    anchor_en: anchor_en + "\n" + OP_EN + "\n",
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
