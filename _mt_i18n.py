# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/mac-tezlik-sirlari.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead — split into 3 spans to preserve the <b> emphasis
lead_old = """  <p class="lead">
    MacBook'dan faqat "foydalanish" yetarli emas — uni <b>tez va samarali</b> ishlatish
    ko'nikmasi kunlik vaqtingizning soatlarini tejashi mumkin. Bu bepul amaliy kursta
    Raycast, klaviatura shortcut'lari va boshqa Mac vositalari orqali kundalik ishlarni
    qanday tezlashtirishni o'rganasiz.
  </p>"""
lead_new = """  <p class="lead">
    <span data-i18n="mt.lead1">MacBook'dan faqat "foydalanish" yetarli emas — uni</span> <b data-i18n="mt.leadBold">tez va samarali</b> <span data-i18n="mt.lead2">ishlatish ko'nikmasi kunlik vaqtingizning soatlarini tejashi mumkin. Bu bepul amaliy kursta Raycast, klaviatura shortcut'lari va boshqa Mac vositalari orqali kundalik ishlarni qanday tezlashtirishni o'rganasiz.</span>
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="mt.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Raycast asoslari — nima, Spotlight'dan farqi, o'rnatish va sozlash": "mt.mod1",
    "Foydali Raycast extension'lari — vaqtdan tejaydiganlar ro'yxati": "mt.mod2",
    "Shaxsiy workflow misollari — ilovalarni ochish, fayl qidirish, shablonlar": "mt.mod3",
    "Boshqa Mac tezlik vositalari — shortcut'lar, Spotlight, Automator/Shortcuts": "mt.mod4",
    "Natija: nima uchun bu muhim — real vaqt tejash misoli": "mt.mod5",
}
for text, key in mods.items():
    old = "      <li>%s</li>" % text
    new = '      <li data-i18n="%s">%s</li>' % (key, text)
    if old in s:
        s = s.replace(old, new, 1); edits += 1
    else:
        print("!! module not found:", key)

# buy link (this course says "Kursni boshlash")
buy_old = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Kursni boshlash →</a>'
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="mt.buy">Kursni boshlash →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="mt.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="mt.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== mac-tezlik-sirlari.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
MT_UZ = """          "mt.lead1": "MacBook'dan faqat \\"foydalanish\\" yetarli emas — uni",
          "mt.leadBold": "tez va samarali",
          "mt.lead2": "ishlatish ko'nikmasi kunlik vaqtingizning soatlarini tejashi mumkin. Bu bepul amaliy kursta Raycast, klaviatura shortcut'lari va boshqa Mac vositalari orqali kundalik ishlarni qanday tezlashtirishni o'rganasiz.",
          "mt.modules": "Kurs modullari",
          "mt.mod1": "Raycast asoslari — nima, Spotlight'dan farqi, o'rnatish va sozlash",
          "mt.mod2": "Foydali Raycast extension'lari — vaqtdan tejaydiganlar ro'yxati",
          "mt.mod3": "Shaxsiy workflow misollari — ilovalarni ochish, fayl qidirish, shablonlar",
          "mt.mod4": "Boshqa Mac tezlik vositalari — shortcut'lar, Spotlight, Automator/Shortcuts",
          "mt.mod5": "Natija: nima uchun bu muhim — real vaqt tejash misoli",
          "mt.buy": "Kursni boshlash →",
          "mt.all": "← Barcha kurslar",
          "mt.quizTitle": "O'z bilimingizni tekshiring","""

MT_RU = """          "mt.lead1": "Просто «пользоваться» MacBook недостаточно — умение",
          "mt.leadBold": "быстро и эффективно",
          "mt.lead2": "им работать может экономить часы вашего времени каждый день. В этом бесплатном практическом курсе вы узнаете, как ускорить повседневные задачи с помощью Raycast, сочетаний клавиш и других инструментов Mac.",
          "mt.modules": "Модули курса",
          "mt.mod1": "Основы Raycast — что это, отличие от Spotlight, установка и настройка",
          "mt.mod2": "Полезные расширения Raycast — список экономящих время",
          "mt.mod3": "Примеры личного workflow — запуск приложений, поиск файлов, шаблоны",
          "mt.mod4": "Другие инструменты скорости Mac — сочетания клавиш, Spotlight, Automator/Shortcuts",
          "mt.mod5": "Результат: почему это важно — пример реальной экономии времени",
          "mt.buy": "Начать курс →",
          "mt.all": "← Все курсы",
          "mt.quizTitle": "Проверьте свои знания","""

MT_EN = """          "mt.lead1": "Just \\"using\\" a MacBook isn't enough — the skill of using it",
          "mt.leadBold": "fast and efficiently",
          "mt.lead2": "can save hours of your daily time. In this free practical course you'll learn how to speed up everyday tasks with Raycast, keyboard shortcuts, and other Mac tools.",
          "mt.modules": "Course modules",
          "mt.mod1": "Raycast basics — what it is, how it differs from Spotlight, install & setup",
          "mt.mod2": "Useful Raycast extensions — a time-saving list",
          "mt.mod3": "Personal workflow examples — opening apps, finding files, templates",
          "mt.mod4": "Other Mac speed tools — shortcuts, Spotlight, Automator/Shortcuts",
          "mt.mod5": "Result: why this matters — a real time-saving example",
          "mt.buy": "Start course →",
          "mt.all": "← All courses",
          "mt.quizTitle": "Check your knowledge","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + MT_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + MT_RU + "\n",
    anchor_en: anchor_en + "\n" + MT_EN + "\n",
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
