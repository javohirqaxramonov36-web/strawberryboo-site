# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/ai-agentlar.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead (first occurrence only)
lead_old = """  <p class="lead">
    Oddiy AI (ChatGPT) — bitta savol. Agent esa vazifani o'zi bajarib chiqadi:
    reja tuzadi, qidiruv qiladi, natijani yozadi.
  </p>"""
lead_new = """  <p class="lead" data-i18n="aa.lead">
    Oddiy AI (ChatGPT) — bitta savol. Agent esa vazifani o'zi bajarib chiqadi:
    reja tuzadi, qidiruv qiladi, natijani yozadi.
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="aa.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Oddiy AI vs Agent — farqi nima?": "aa.mod1",
    "CrewAI: jamoa agent'lari (Planner, Researcher, Writer)": "aa.mod2",
    "LangGraph: agent'lar oqimini boshqarish": "aa.mod3",
    "Letta: agent'ga uzoq muddatli xotira": "aa.mod4",
    "O'z agent'ingizni yarating (MacBook'da)": "aa.mod5",
    "Qayerda qo'llash: tadqiqot, kontent, biznes": "aa.mod6",
    "AI va agentlar nimani tezlashtiradi? (yangi dars)": "aa.mod7",
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
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="aa.buy">Kursni sotib olish →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="aa.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="aa.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== ai-agentlar.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION ----------
AA_UZ = """          "aa.lead": "Oddiy AI (ChatGPT) — bitta savol. Agent esa vazifani o'zi bajarib chiqadi: reja tuzadi, qidiruv qiladi, natijani yozadi.",
          "aa.modules": "Kurs modullari",
          "aa.mod1": "Oddiy AI vs Agent — farqi nima?",
          "aa.mod2": "CrewAI: jamoa agent'lari (Planner, Researcher, Writer)",
          "aa.mod3": "LangGraph: agent'lar oqimini boshqarish",
          "aa.mod4": "Letta: agent'ga uzoq muddatli xotira",
          "aa.mod5": "O'z agent'ingizni yarating (MacBook'da)",
          "aa.mod6": "Qayerda qo'llash: tadqiqot, kontent, biznes",
          "aa.mod7": "AI va agentlar nimani tezlashtiradi? (yangi dars)",
          "aa.buy": "Kursni sotib olish →",
          "aa.all": "← Barcha kurslar",
          "aa.quizTitle": "O'z bilimingizni tekshiring" """

AA_RU = """          "aa.lead": "Обычный ИИ (ChatGPT) — один вопрос. А агент выполняет задачу сам: строит план, ищет, записывает результат.",
          "aa.modules": "Модули курса",
          "aa.mod1": "Обычный ИИ vs Агент — в чём разница?",
          "aa.mod2": "CrewAI: командные агенты (Planner, Researcher, Writer)",
          "aa.mod3": "LangGraph: управление потоком агентов",
          "aa.mod4": "Letta: долговременная память агента",
          "aa.mod5": "Создайте своего агента (на MacBook)",
          "aa.mod6": "Где применять: исследования, контент, бизнес",
          "aa.mod7": "Что ускоряют ИИ и агенты? (новый урок)",
          "aa.buy": "Купить курс →",
          "aa.all": "← Все курсы",
          "aa.quizTitle": "Проверьте свои знания" """

AA_EN = """          "aa.lead": "Plain AI (ChatGPT) — a single question. An agent completes the task itself: it plans, searches, and writes the result.",
          "aa.modules": "Course modules",
          "aa.mod1": "Plain AI vs Agent — what's the difference?",
          "aa.mod2": "CrewAI: team agents (Planner, Researcher, Writer)",
          "aa.mod3": "LangGraph: managing agent flows",
          "aa.mod4": "Letta: long-term memory for agents",
          "aa.mod5": "Build your own agent (on MacBook)",
          "aa.mod6": "Where to apply: research, content, business",
          "aa.mod7": "What do AI and agents speed up? (new lesson)",
          "aa.buy": "Buy course →",
          "aa.all": "← All courses",
          "aa.quizTitle": "Check your knowledge" """

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + AA_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + AA_RU + "\n",
    anchor_en: anchor_en + "\n" + AA_EN + "\n",
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
