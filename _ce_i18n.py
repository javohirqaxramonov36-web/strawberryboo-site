#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase 2 i18n for course 10 — Chet elda o'qish (ce.*)."""

PAGE = "src/pages/kurslar/chet-elda-oqish.astro"
BASE = "src/layouts/Base.astro"

with open(PAGE, encoding="utf-8") as f:
    p = f.read()

repls = [
    (r'''  <p class="lead">
    Chet elda o'qish — bu faqat "chetge chiqish" emas, balki hayotingizni
    sifat jihatdan o'zgartiradigan qaror. Bu bepul kursda 5 ta asosiy sababni
    batafsil yoritamiz: nima uchun diplomning qadri, karyera va shaxsiy o'sish
    bunga bog'liq va qanday qilib <b>arzon yoki bepul</b> o'qish mumkin.
  </p>''',
     r'''  <p class="lead">
    <span data-i18n="ce.lead1">Chet elda o'qish — bu faqat "chetge chiqish" emas, balki hayotingizni sifat jihatdan o'zgartiradigan qaror. Bu bepul kursda 5 ta asosiy sababni batafsil yoritamiz: nima uchun diplomning qadri, karyera va shaxsiy o'sish bunga bog'liq va qanday qilib </span> <b data-i18n="ce.leadBold">arzon yoki bepul</b> <span data-i18n="ce.lead2">o'qish mumkin.</span>
  </p>'''),
    (r'''<h2>Kurs modullari</h2>''',
     r'''<h2 data-i18n="ce.modules">Kurs modullari</h2>'''),
    (r'''<li>Ta'lim sifati va xalqaro tan olinish (QS reyting, diplom qadri)</li>''',
     r'''<li data-i18n="ce.mod1">Ta'lim sifati va xalqaro tan olinish (QS reyting, diplom qadri)</li>'''),
    (r'''<li>Karyera imkoniyatlari — xalqaro tajriba, networking, til</li>''',
     r'''<li data-i18n="ce.mod2">Karyera imkoniyatlari — xalqaro tajriba, networking, til</li>'''),
    (r'''<li>Shaxsiy rivojlanish — mustaqillik, madaniyatlararo tajriba</li>''',
     r'''<li data-i18n="ce.mod3">Shaxsiy rivojlanish — mustaqillik, madaniyatlararo tajriba</li>'''),
    (r'''<li>Moliyaviy imkoniyatlar — grant va stipendiyalar (El-Yurt Umidi, Chevening, DAAD)</li>''',
     r'''<li data-i18n="ce.mod4">Moliyaviy imkoniyatlar — grant va stipendiyalar (El-Yurt Umidi, Chevening, DAAD)</li>'''),
    (r'''<li>Real misollar va statistika (taxminiy/umumiy tendensiya)</li>''',
     r'''<li data-i18n="ce.mod5">Real misollar va statistika (taxminiy/umumiy tendensiya)</li>'''),
    (r'''<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Bepul kursni boshlash →</a>''',
     r'''<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="ce.buy">Bepul kursni boshlash →</a>'''),
    (r'''<a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>''',
     r'''<a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="ce.all">← Barcha kurslar</a>'''),
    (r'''<Quiz title="O'z bilimingizni tekshiring" questions={questions} />''',
     r'''<Quiz titleI18n="ce.quizTitle" questions={questions} />'''),
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
          "ce.lead1": "Chet elda o'qish — bu faqat \"chetge chiqish\" emas, balki hayotingizni sifat jihatdan o'zgartiradigan qaror. Bu bepul kursda 5 ta asosiy sababni batafsil yoritamiz: nima uchun diplomning qadri, karyera va shaxsiy o'sish bunga bog'liq va qanday qilib ",
          "ce.leadBold": "arzon yoki bepul",
          "ce.lead2": " o'qish mumkin.",
          "ce.modules": "Kurs modullari",
          "ce.mod1": "Ta'lim sifati va xalqaro tan olinish (QS reyting, diplom qadri)",
          "ce.mod2": "Karyera imkoniyatlari — xalqaro tajriba, networking, til",
          "ce.mod3": "Shaxsiy rivojlanish — mustaqillik, madaniyatlararo tajriba",
          "ce.mod4": "Moliyaviy imkoniyatlar — grant va stipendiyalar (El-Yurt Umidi, Chevening, DAAD)",
          "ce.mod5": "Real misollar va statistika (taxminiy/umumiy tendensiya)",
          "ce.buy": "Bepul kursni boshlash →",
          "ce.all": "← Barcha kurslar",
          "ce.quizTitle": "O'z bilimingizni tekshiring",'''

ru = r'''          "comm.join": "Присоединиться к каналу →",
          "ce.lead1": "Учёба за рубежом — это не просто «выбраться за границу», а решение, качественно меняющее вашу жизнь. В этом бесплатном курсе мы подробно разберём 5 главных причин: почему ценится диплом, как это связано с карьерой и личным ростом, и как учиться ",
          "ce.leadBold": "дёшево или бесплатно",
          "ce.lead2": ".",
          "ce.modules": "Модули курса",
          "ce.mod1": "Качество образования и международное признание (QS-рейтинг, ценность диплома)",
          "ce.mod2": "Карьерные возможности — международный опыт, нетворкинг, язык",
          "ce.mod3": "Личное развитие — независимость, межкультурный опыт",
          "ce.mod4": "Финансовые возможности — гранты и стипендии (El-Yurt Umidi, Chevening, DAAD)",
          "ce.mod5": "Реальные примеры и статистика (ориентировочно/общая тенденция)",
          "ce.buy": "Начать бесплатный курс →",
          "ce.all": "← Все курсы",
          "ce.quizTitle": "Проверьте свои знания",'''

en = r'''          "comm.join": "Join the channel →",
          "ce.lead1": "Studying abroad isn't just about \"getting out of the country\" — it's a decision that can fundamentally change your life. In this free course we break down 5 key reasons: why a diploma carries weight, how it ties to your career and personal growth, and how to study ",
          "ce.leadBold": "cheaply or for free",
          "ce.lead2": ".",
          "ce.modules": "Course modules",
          "ce.mod1": "Education quality & international recognition (QS ranking, diploma value)",
          "ce.mod2": "Career opportunities — international experience, networking, language",
          "ce.mod3": "Personal development — independence, cross-cultural experience",
          "ce.mod4": "Funding opportunities — grants & scholarships (El-Yurt Umidi, Chevening, DAAD)",
          "ce.mod5": "Real examples & statistics (estimated/general trend)",
          "ce.buy": "Start free course →",
          "ce.all": "← All courses",
          "ce.quizTitle": "Check your knowledge",'''

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
