#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase 2 i18n for course 11 — El-Yurt Umidi (ey.*) — skeleton only."""

PAGE = "src/pages/kurslar/el-yurt-umidi.astro"
BASE = "src/layouts/Base.astro"

with open(PAGE, encoding="utf-8") as f:
    p = f.read()

repls = [
    (r'''<p class="lead">''',
     r'''<p class="lead" data-i18n="ey.lead">'''),
    (r'''<h2>Kurs bo'limlari (struktura tayyor)</h2>''',
     r'''<h2 data-i18n="ey.modules">Kurs bo'limlari (struktura tayyor)</h2>'''),
    (r'''<li>Suhbatga tayyorgarlik</li>''',
     r'''<li data-i18n="ey.mod1">Suhbatga tayyorgarlik</li>'''),
    (r'''<li>Bridge texnikasi</li>''',
     r'''<li data-i18n="ey.mod2">Bridge texnikasi</li>'''),
    (r'''<li>Tez-tez so'raladigan savollar</li>''',
     r'''<li data-i18n="ey.mod3">Tez-tez so'raladigan savollar</li>'''),
    (r'''<li>Muvaffaqiyatli case'lar</li>''',
     r'''<li data-i18n="ey.mod4">Muvaffaqiyatli case'lar</li>'''),
    (r'''<a href="/kurslar" class="enroll" style="margin-top:2rem;">← Barcha kurslar</a>''',
     r'''<a href="/kurslar" class="enroll" style="margin-top:2rem;" data-i18n="ey.all">← Barcha kurslar</a>'''),
]

for old, new in repls:
    if old not in p:
        print("WARN page not found:", repr(old[:60]))
    else:
        p = p.replace(old, new, 1)

with open(PAGE, "w", encoding="utf-8") as f:
    f.write(p)
print("PAGE edits done")

with open(BASE, encoding="utf-8") as f:
    b = f.read()

uz = r'''          "comm.join": "Telegram kanaliga qo'shilish →",
          "ey.lead": "El-Yurt Umidi davlat granti bo'yicha suhbatga tayyorgarlik kursi — tez orada to'liq material qo'shiladi. Hozircha kursning bo'limlar strukturasi tayyor. To'liq darslar keyingi yangilanishda yuklanadi.",
          "ey.modules": "Kurs bo'limlari (struktura tayyor)",
          "ey.mod1": "Suhbatga tayyorgarlik",
          "ey.mod2": "Bridge texnikasi",
          "ey.mod3": "Tez-tez so'raladigan savollar",
          "ey.mod4": "Muvaffaqiyatli case'lar",
          "ey.all": "← Barcha kurslar",'''

ru = r'''          "comm.join": "Присоединиться к каналу →",
          "ey.lead": "Курс подготовки к собеседованию по государственному гранту El-Yurt Umidi — полный материал будет добавлен в ближайшее время. Пока готова структура разделов курса. Полные уроки загрузятся в следующем обновлении.",
          "ey.modules": "Разделы курса (структура готова)",
          "ey.mod1": "Подготовка к собеседованию",
          "ey.mod2": "Техника Bridge",
          "ey.mod3": "Часто задаваемые вопросы",
          "ey.mod4": "Успешные кейсы",
          "ey.all": "← Все курсы",'''

en = r'''          "comm.join": "Join the channel →",
          "ey.lead": "Interview-prep course for the El-Yurt Umidi state grant — full material will be added soon. The course section structure is ready for now. Complete lessons will be uploaded in the next update.",
          "ey.modules": "Course sections (structure ready)",
          "ey.mod1": "Interview preparation",
          "ey.mod2": "Bridge technique",
          "ey.mod3": "Frequently asked questions",
          "ey.mod4": "Success cases",
          "ey.all": "← All courses",'''

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
