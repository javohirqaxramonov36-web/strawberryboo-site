# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/autocad-on-mac.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead — split into 3 spans to preserve the <b> emphasis
lead_old = """  <p class="lead">
    Mac'da AutoCAD bilan ishlash — Windows'dan farqli o'ziga xos xususiyatlarga ega.
    Bu kursda o'rnatish, interfeys, asosiy buyruqlar va Autodesk'dan
    <b>bepul talaba litsenziyasi</b> qanday olinishini o'rganasiz.
  </p>"""
lead_new = """  <p class="lead">
    <span data-i18n="ac.lead1">Mac'da AutoCAD bilan ishlash — Windows'dan farqli o'ziga xos xususiyatlarga ega. Bu kursda o'rnatish, interfeys, asosiy buyruqlar va Autodesk'dan</span> <b data-i18n="ac.leadBold">bepul talaba litsenziyasi</b> <span data-i18n="ac.lead2">qanday olinishini o'rganasiz.</span>
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="ac.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Mac'da o'rnatish — AutoCAD for Mac, tizim talablari (macOS 12+)": "ac.mod1",
    "Interfeys farqlari (Mac vs Windows) va Mac-specific shortcut'lar": "ac.mod2",
    "Asosiy chizish buyruqlari — LINE, CIRCLE, TRIM, OFFSET, LAYER": "ac.mod3",
    "8-qadamli workflow: UNITS → LIMITS → LAYER → chizish → PLOT": "ac.mod4",
    "Autodesk bepul talaba litsenziyasi (edu.autodesk.com) — 1 yilga": "ac.mod5",
    "Amaliy loyiha — birinchi chizmani Model'dan Layout'ga chiqarish": "ac.mod6",
    "Pro tips — CUI sozlamalari, OSNAP, suv belgisi (watermark) haqida": "ac.mod7",
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
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="ac.buy">Kursni sotib olish →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="ac.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="ac.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== autocad-on-mac.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
AC_UZ = """          "ac.lead1": "Mac'da AutoCAD bilan ishlash — Windows'dan farqli o'ziga xos xususiyatlarga ega. Bu kursda o'rnatish, interfeys, asosiy buyruqlar va Autodesk'dan",
          "ac.leadBold": "bepul talaba litsenziyasi",
          "ac.lead2": "qanday olinishini o'rganasiz.",
          "ac.modules": "Kurs modullari",
          "ac.mod1": "Mac'da o'rnatish — AutoCAD for Mac, tizim talablari (macOS 12+)",
          "ac.mod2": "Interfeys farqlari (Mac vs Windows) va Mac-specific shortcut'lar",
          "ac.mod3": "Asosiy chizish buyruqlari — LINE, CIRCLE, TRIM, OFFSET, LAYER",
          "ac.mod4": "8-qadamli workflow: UNITS → LIMITS → LAYER → chizish → PLOT",
          "ac.mod5": "Autodesk bepul talaba litsenziyasi (edu.autodesk.com) — 1 yilga",
          "ac.mod6": "Amaliy loyiha — birinchi chizmani Model'dan Layout'ga chiqarish",
          "ac.mod7": "Pro tips — CUI sozlamalari, OSNAP, suv belgisi (watermark) haqida",
          "ac.buy": "Kursni sotib olish →",
          "ac.all": "← Barcha kurslar",
          "ac.quizTitle": "O'z bilimingizni tekshiring","""

AC_RU = """          "ac.lead1": "Работа с AutoCAD на Mac имеет свои особенности, отличные от Windows. В этом курсе вы узнаете установку, интерфейс, основные команды и как получить от Autodesk",
          "ac.leadBold": "бесплатную студенческую лицензию",
          "ac.lead2": ".",
          "ac.modules": "Модули курса",
          "ac.mod1": "Установка на Mac — AutoCAD for Mac, системные требования (macOS 12+)",
          "ac.mod2": "Различия интерфейса (Mac vs Windows) и Mac-специфичные сочетания клавиш",
          "ac.mod3": "Основные команды рисования — LINE, CIRCLE, TRIM, OFFSET, LAYER",
          "ac.mod4": "Пошаговый workflow: UNITS → LIMITS → LAYER → рисование → PLOT",
          "ac.mod5": "Бесплатная студенческая лицензия Autodesk (edu.autodesk.com) — на 1 год",
          "ac.mod6": "Практический проект — вывод первого чертежа из Model в Layout",
          "ac.mod7": "Про-советы — настройки CUI, OSNAP, водяной знак (watermark)",
          "ac.buy": "Купить курс →",
          "ac.all": "← Все курсы",
          "ac.quizTitle": "Проверьте свои знания","""

AC_EN = """          "ac.lead1": "Working with AutoCAD on Mac has its own specifics, different from Windows. In this course you'll learn installation, interface, basic commands, and how to get from Autodesk",
          "ac.leadBold": "a free student license",
          "ac.lead2": ".",
          "ac.modules": "Course modules",
          "ac.mod1": "Installing on Mac — AutoCAD for Mac, system requirements (macOS 12+)",
          "ac.mod2": "Interface differences (Mac vs Windows) and Mac-specific shortcuts",
          "ac.mod3": "Basic drawing commands — LINE, CIRCLE, TRIM, OFFSET, LAYER",
          "ac.mod4": "8-step workflow: UNITS → LIMITS → LAYER → draw → PLOT",
          "ac.mod5": "Free Autodesk student license (edu.autodesk.com) — for 1 year",
          "ac.mod6": "Practical project — send your first drawing from Model to Layout",
          "ac.mod7": "Pro tips — CUI settings, OSNAP, watermark",
          "ac.buy": "Buy course →",
          "ac.all": "← All courses",
          "ac.quizTitle": "Check your knowledge","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + AC_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + AC_RU + "\n",
    anchor_en: anchor_en + "\n" + AC_EN + "\n",
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
