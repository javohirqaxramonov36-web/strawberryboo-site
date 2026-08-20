#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix lead split for Chet elda o'qish (correct spelling chetga)."""

PAGE = "src/pages/kurslar/chet-elda-oqish.astro"
BASE = "src/layouts/Base.astro"

with open(PAGE, encoding="utf-8") as f:
    p = f.read()

old = (
    '  <p class="lead">\n'
    '    Chet elda o\'qish — bu faqat "chetga chiqish" emas, balki hayotingizni\n'
    '    sifat jihatdan o\'zgartiradigan qaror. Bu bepul kursda 5 ta asosiy sababni\n'
    '    batafsil yoritamiz: nima uchun diplomning qadri, karyera va shaxsiy o\'sish\n'
    '    bunga bog\'liq va qanday qilib <b>arzon yoki bepul</b> o\'qish mumkin.\n'
    '  </p>'
)
new = (
    '  <p class="lead">\n'
    '    <span data-i18n="ce.lead1">Chet elda o\'qish — bu faqat "chetga chiqish" emas, balki hayotingizni sifat jihatdan o\'zgartiradigan qaror. Bu bepul kursda 5 ta asosiy sababni batafsil yoritamiz: nima uchun diplomning qadri, karyera va shaxsiy o\'sish bunga bog\'liq va qanday qilib </span> <b data-i18n="ce.leadBold">arzon yoki bepul</b> <span data-i18n="ce.lead2">o\'qish mumkin.</span>\n'
    '  </p>'
)

if old not in p:
    print("WARN lead block not found")
else:
    p = p.replace(old, new, 1)
    print("lead split done")

with open(PAGE, "w", encoding="utf-8") as f:
    f.write(p)

# Fix UZ dict value spelling too
with open(BASE, encoding="utf-8") as f:
    b = f.read()
bad = r'''"ce.lead1": "Chet elda o'qish — bu faqat \"chetge chiqish\" emas'''
good = r'''"ce.lead1": "Chet elda o'qish — bu faqat \"chetga chiqish\" emas'''
if bad in b:
    b = b.replace(bad, good, 1)
    print("UZ dict spelling fixed")
else:
    print("WARN UZ dict spelling token not found (maybe already correct)")

with open(BASE, "w", encoding="utf-8") as f:
    f.write(b)
print("done")
