#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase 2 i18n for course 9 — Financial Literacy (fl.*)."""

PAGE = "src/pages/kurslar/financial-literacy.astro"
BASE = "src/layouts/Base.astro"

with open(PAGE, encoding="utf-8") as f:
    p = f.read()

repls = [
    (r'''<p class="lead">''',
     r'''<p class="lead" data-i18n="fl.lead">'''),
    (r'''<h2>Kurs modullari</h2>''',
     r'''<h2 data-i18n="fl.modules">Kurs modullari</h2>'''),
    (r'''<li>Asosiy tushunchalar — daromad, xarajat, byudjet, jamg'arma</li>''',
     r'''<li data-i18n="fl.mod1">Asosiy tushunchalar — daromad, xarajat, byudjet, jamg'arma</li>'''),
    (r'''<li>Talaba byudjeti tuzish — stipendiya/grant pulini oy davomida taqsimlash</li>''',
     r'''<li data-i18n="fl.mod2">Talaba byudjeti tuzish — stipendiya/grant pulini oy davomida taqsimlash</li>'''),
    (r'''<li>Chet elda yashash xarajatlari — rejalashtirish va bank hisobi asoslari</li>''',
     r'''<li data-i18n="fl.mod3">Chet elda yashash xarajatlari — rejalashtirish va bank hisobi asoslari</li>'''),
    (r'''<li>Qarz va kredit tushunchasi — kredit karta, student loan (ogohlantirish bilan)</li>''',
     r'''<li data-i18n="fl.mod4">Qarz va kredit tushunchasi — kredit karta, student loan (ogohlantirish bilan)</li>'''),
    (r'''<li>Jamg'arma va kelajakka rejalashtirish — "avval jamg'ar, keyin sarfla"</li>''',
     r'''<li data-i18n="fl.mod5">Jamg'arma va kelajakka rejalashtirish — "avval jamg'ar, keyin sarfla"</li>'''),
    (r'''<li>Umumiy xatolar — talabalar ko'p qiladigan moliyaviy xatolar</li>''',
     r'''<li data-i18n="fl.mod6">Umumiy xatolar — talabalar ko'p qiladigan moliyaviy xatolar</li>'''),
    (r'''<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Kursni sotib olish →</a>''',
     r'''<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="fl.buy">Kursni sotib olish →</a>'''),
    (r'''<a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>''',
     r'''<a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="fl.all">← Barcha kurslar</a>'''),
    (r'''<Quiz title="O'z bilimingizni tekshiring" questions={questions} />''',
     r'''<Quiz titleI18n="fl.quizTitle" questions={questions} />'''),
]

for old, new in repls:
    if old not in p:
        print("WARN page not found:", repr(old[:50]))
    else:
        p = p.replace(old, new, 1)

with open(PAGE, "w", encoding="utf-8") as f:
    f.write(p)
print("PAGE edits done")

# ---------- DICT INSERTION (3 blocks, all lines end with comma) ----------
with open(BASE, encoding="utf-8") as f:
    b = f.read()

uz = r'''          "comm.join": "Telegram kanaliga qo'shilish →",
          "fl.lead": "Pulni boshqarish, byudjet tuzish va kundalik moliyaviy qarorlar — har bir talaba uchun asosiy hayotiy ko'nikma. Bu kursda mablag'ingizni qanday rejalashtirishni, xatolarga yo'l qo'ymaslikni va kelajakka tayyorgarlik ko'rishni o'rganasiz.",
          "fl.modules": "Kurs modullari",
          "fl.mod1": "Asosiy tushunchalar — daromad, xarajat, byudjet, jamg'arma",
          "fl.mod2": "Talaba byudjeti tuzish — stipendiya/grant pulini oy davomida taqsimlash",
          "fl.mod3": "Chet elda yashash xarajatlari — rejalashtirish va bank hisobi asoslari",
          "fl.mod4": "Qarz va kredit tushunchasi — kredit karta, student loan (ogohlantirish bilan)",
          "fl.mod5": "Jamg'arma va kelajakka rejalashtirish — «avval jamg'ar, keyin sarfla»",
          "fl.mod6": "Umumiy xatolar — talabalar ko'p qiladigan moliyaviy xatolar",
          "fl.buy": "Kursni sotib olish →",
          "fl.all": "← Barcha kurslar",
          "fl.quizTitle": "O'z bilimingizni tekshiring",'''

ru = r'''          "comm.join": "Присоединиться к каналу →",
          "fl.lead": "Управление деньгами, составление бюджета и ежедневные финансовые решения — базовый жизненный навык для каждого студента. На этом курсе вы узнаете, как планировать свои средства, не допускать ошибок и готовиться к будущему.",
          "fl.modules": "Модули курса",
          "fl.mod1": "Основные понятия — доход, расход, бюджет, сбережения",
          "fl.mod2": "Составление бюджета студента — распределение стипендии/гранта на месяц",
          "fl.mod3": "Расходы на жизнь за рубежом — планирование и основы банковского счёта",
          "fl.mod4": "Понятие долга и кредита — кредитная карта, student loan (с осторожностью)",
          "fl.mod5": "Сбережения и планирование будущего — «сначала копи, потом трать»",
          "fl.mod6": "Типичные ошибки — финансовые ошибки, которые часто совершают студенты",
          "fl.buy": "Купить курс →",
          "fl.all": "← Все курсы",
          "fl.quizTitle": "Проверьте свои знания",'''

en = r'''          "comm.join": "Join the channel →",
          "fl.lead": "Managing money, building a budget, and making everyday financial decisions is a core life skill for every student. In this course you'll learn how to plan your funds, avoid mistakes, and prepare for the future.",
          "fl.modules": "Course modules",
          "fl.mod1": "Core concepts — income, expenses, budget, savings",
          "fl.mod2": "Building a student budget — spreading scholarship/grant money across the month",
          "fl.mod3": "Living-abroad expenses — planning and bank account basics",
          "fl.mod4": "Debt & credit explained — credit card, student loan (with caution)",
          "fl.mod5": "Saving & planning ahead — 'save first, spend later'",
          "fl.mod6": "Common mistakes — financial errors students often make",
          "fl.buy": "Buy course →",
          "fl.all": "← All courses",
          "fl.quizTitle": "Check your knowledge",'''

anchors = [
    (r'''          "comm.join": "Telegram kanaliga qo'shilish →",''', uz),
    (r'''          "comm.join": "Присоединиться к каналу →",''', ru),
    (r'''          "comm.join": "Join the channel →",''', en),
]

for anchor, block in anchors:
    if anchor not in b:
        print("WARN base anchor not found:", repr(anchor[:40]))
    else:
        b = b.replace(anchor, block, 1)

with open(BASE, "w", encoding="utf-8") as f:
    f.write(b)
print("BASE dict inserts done")
