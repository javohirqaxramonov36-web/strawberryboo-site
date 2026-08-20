# -*- coding: utf-8 -*-
import io

base = "src/layouts/Base.astro"
page = "src/pages/kurslar/figma.astro"

# ---------- PAGE EDITS ----------
with io.open(page, encoding="utf-8") as f:
    s = f.read()

edits = 0

# lead (first occurrence only)
lead_old = """  <p class="lead">
    Dizayn noldan — bepul. Figma'da interfeys chizish, komponentlar yaratish
    va prototip orqali g'oyangizni jonli ko'rsatish.
  </p>"""
lead_new = """  <p class="lead" data-i18n="fg.lead">
    Dizayn noldan — bepul. Figma'da interfeys chizish, komponentlar yaratish
    va prototip orqali g'oyangizni jonli ko'rsatish.
  </p>"""
if lead_old in s:
    s = s.replace(lead_old, lead_new, 1); edits += 1
else:
    print("!! lead not found")

# modules heading
m_old = '    <h2>Kurs modullari</h2>'
m_new = '    <h2 data-i18n="fg.modules">Kurs modullari</h2>'
if m_old in s:
    s = s.replace(m_old, m_new, 1); edits += 1
else:
    print("!! modules heading not found")

# module list items
mods = {
    "Nima uchun Figma? (brauzerda, bepul)": "fg.mod1",
    "Frame, shape, text asoslari": "fg.mod2",
    "Auto-layout: moslashuvchan dizayn": "fg.mod3",
    "Komponent va variantlar (variants)": "fg.mod4",
    "Prototype: sahifalarni bog'lash": "fg.mod5",
    "UI kit va dizayn tizimi": "fg.mod6",
    "Portfolio uchun birinchi loyiha": "fg.mod7",
}
for text, key in mods.items():
    old = "      <li>%s</li>" % text
    new = '      <li data-i18n="%s">%s</li>' % (key, text)
    if old in s:
        s = s.replace(old, new, 1); edits += 1
    else:
        print("!! module not found:", key)

# benefit section heading + items
benh_old = '    <h2>Qanday foyda olasiz?</h2>'
benh_new = '    <h2 data-i18n="fg.benefit">Qanday foyda olasiz?</h2>'
if benh_old in s:
    s = s.replace(benh_old, benh_new, 1); edits += 1
else:
    print("!! benefit heading not found")

bens = {
    "UI/UX ko'nikmasi — eng talab qilinadigan yo'nalish": "fg.ben1",
    "Mahsulot g'oyangizni jonli prototip qilish": "fg.ben2",
    "Freelance yoki ish uchun portfolio": "fg.ben3",
}
for text, key in bens.items():
    old = "      <li>%s</li>" % text
    new = '      <li data-i18n="%s">%s</li>' % (key, text)
    if old in s:
        s = s.replace(old, new, 1); edits += 1
    else:
        print("!! benefit not found:", key)

# certificate note (has <b> inside; translated as plain text -> bold dropped, noted)
hint_old = '  <p class="quiz-hint">Kursni yakunlaganingizdan so\'ng <b>sertifikat</b> olasiz.</p>'
hint_new = '  <p class="quiz-hint" data-i18n="fg.hint">Kursni yakunlaganingizdan so\'ng sertifikat olasiz.</p>'
if hint_old in s:
    s = s.replace(hint_old, hint_new, 1); edits += 1
else:
    print("!! hint not found")

# quiz title
qz_old = '  <Quiz title="O\'z bilimingizni tekshiring" questions={questions} />'
qz_new = '  <Quiz title="O\'z bilimingizni tekshiring" titleI18n="fg.quizTitle" questions={questions} />'
if qz_old in s:
    s = s.replace(qz_old, qz_new, 1); edits += 1
else:
    print("!! quiz not found")

# buy link (this course says "Bepul kursni boshlash")
buy_old = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Bepul kursni boshlash →</a>'
buy_new = '  <a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="fg.buy">Bepul kursni boshlash →</a>'
if buy_old in s:
    s = s.replace(buy_old, buy_new, 1); edits += 1
else:
    print("!! buy link not found")

# all-courses link
all_old = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>'
all_new = '  <a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="fg.all">← Barcha kurslar</a>'
if all_old in s:
    s = s.replace(all_old, all_new, 1); edits += 1
else:
    print("!! all link not found")

with io.open(page, "w", encoding="utf-8") as f:
    f.write(s)
print("== figma.astro ==", edits, "edits")

# ---------- DICTIONARY INSERTION (each line ends with a comma) ----------
FG_UZ = """          "fg.lead": "Dizayn noldan — bepul. Figma'da interfeys chizish, komponentlar yaratish va prototip orqali g'oyangizni jonli ko'rsatish.",
          "fg.modules": "Kurs modullari",
          "fg.mod1": "Nima uchun Figma? (brauzerda, bepul)",
          "fg.mod2": "Frame, shape, text asoslari",
          "fg.mod3": "Auto-layout: moslashuvchan dizayn",
          "fg.mod4": "Komponent va variantlar (variants)",
          "fg.mod5": "Prototype: sahifalarni bog'lash",
          "fg.mod6": "UI kit va dizayn tizimi",
          "fg.mod7": "Portfolio uchun birinchi loyiha",
          "fg.benefit": "Qanday foyda olasiz?",
          "fg.ben1": "UI/UX ko'nikmasi — eng talab qilinadigan yo'nalish",
          "fg.ben2": "Mahsulot g'oyangizni jonli prototip qilish",
          "fg.ben3": "Freelance yoki ish uchun portfolio",
          "fg.hint": "Kursni yakunlaganingizdan so'ng sertifikat olasiz.",
          "fg.buy": "Bepul kursni boshlash →",
          "fg.all": "← Barcha kurslar",
          "fg.quizTitle": "O'z bilimingizni tekshiring","""

FG_RU = """          "fg.lead": "Дизайн с нуля — бесплатно. Рисовать интерфейсы в Figma, создавать компоненты и показывать идею живым прототипом.",
          "fg.modules": "Модули курса",
          "fg.mod1": "Зачем нужна Figma? (в браузере, бесплатно)",
          "fg.mod2": "Основы Frame, shape, text",
          "fg.mod3": "Auto-layout: адаптивный дизайн",
          "fg.mod4": "Компоненты и варианты (variants)",
          "fg.mod5": "Prototype: связывание страниц",
          "fg.mod6": "UI-kit и дизайн-система",
          "fg.mod7": "Первый проект для портфолио",
          "fg.benefit": "Какую пользу вы получите?",
          "fg.ben1": "Навык UI/UX — самое востребованное направление",
          "fg.ben2": "Делать живой прототип вашей продуктовой идеи",
          "fg.ben3": "Портфолио для фриланса или работы",
          "fg.hint": "После завершения курса вы получите сертификат.",
          "fg.buy": "Начать бесплатный курс →",
          "fg.all": "← Все курсы",
          "fg.quizTitle": "Проверьте свои знания","""

FG_EN = """          "fg.lead": "Design from zero — for free. Draw interfaces in Figma, create components, and show your idea as a live prototype.",
          "fg.modules": "Course modules",
          "fg.mod1": "Why Figma? (in the browser, free)",
          "fg.mod2": "Frame, shape, text basics",
          "fg.mod3": "Auto-layout: responsive design",
          "fg.mod4": "Components and variants",
          "fg.mod5": "Prototype: linking pages",
          "fg.mod6": "UI kit and design system",
          "fg.mod7": "Your first project for a portfolio",
          "fg.benefit": "What benefits will you get?",
          "fg.ben1": "UI/UX skill — the most in-demand direction",
          "fg.ben2": "Turn your product idea into a live prototype",
          "fg.ben3": "A portfolio for freelance or a job",
          "fg.hint": "After completing the course you'll receive a certificate.",
          "fg.buy": "Start free course →",
          "fg.all": "← All courses",
          "fg.quizTitle": "Check your knowledge","""

with io.open(base, encoding="utf-8") as f:
    b = f.read()

anchor_uz = '          "comm.join": "Telegram kanaliga qo\'shilish →",'
anchor_ru = '          "comm.join": "Присоединиться к каналу →",'
anchor_en = '          "comm.join": "Join the channel →",'

repl = {
    anchor_uz: anchor_uz + "\n" + FG_UZ + "\n",
    anchor_ru: anchor_ru + "\n" + FG_RU + "\n",
    anchor_en: anchor_en + "\n" + FG_EN + "\n",
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
