# -*- coding: utf-8 -*-
import os

ROOT = "/Users/javohir/strawberryboo-site"
qz_path = os.path.join(ROOT, "src/components/Quiz.astro")
pe_path = os.path.join(ROOT, "src/pages/kurslar/prompt-engineering.astro")
base_path = os.path.join(ROOT, "src/layouts/Base.astro")


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)


def apply(s, pairs, label):
    n = 0
    for old, new in pairs:
        if old in s:
            c = s.count(old)
            s = s.replace(old, new)
            n += c
        else:
            print("  !! MISS in %s: %r" % (label, old[:70]))
    print("  %s: %d replacements" % (label, n))
    return s


# ---------- Quiz.astro ----------
qz_pairs = [
    ('const { title = "O\'z bilimingizni tekshiring", questions = [] } = Astro.props;',
     'const { title = "O\'z bilimingizni tekshiring", questions = [], titleI18n = "" } = Astro.props;'),
    ('      {title}\n    </h2>',
     '      {titleI18n ? <span data-i18n={titleI18n}>{title}</span> : title}\n    </h2>'),
    ('<button type="button" class="start-btn" data-check>Tekshirish</button>',
     '<button type="button" class="start-btn" data-check data-i18n="quiz.check">Tekshirish</button>'),
    ('<p class="quiz-hint" data-hint hidden>Har bir savolga javob bering.</p>',
     '<p class="quiz-hint" data-hint hidden data-i18n="quiz.hint">Har bir savolga javob bering.</p>'),
]

# ---------- prompt-engineering.astro ----------
pe_pairs = [
    ('<p class="lead">', '<p class="lead" data-i18n="pe.lead">'),
    ('<h2>Kurs modullari</h2>', '<h2 data-i18n="pe.modules">Kurs modullari</h2>'),
    ('<li>Nima uchun Prompt Engineering kerak? (AI telepatiya qila olmaydi)</li>',
     '<li data-i18n="pe.mod1">Nima uchun Prompt Engineering kerak? (AI telepatiya qila olmaydi)</li>'),
    ('<li>Prompt tuzilmasi: roll, kontekst, misollar, format</li>',
     '<li data-i18n="pe.mod2">Prompt tuzilmasi: roll, kontekst, misollar, format</li>'),
    ('<li>Amaliy mashq: IELTS essay yozish prompt\'i</li>',
     '<li data-i18n="pe.mod3">Amaliy mashq: IELTS essay yozish prompt\'i</li>'),
    ('<li>Chain-of-thought: murakkab vazifalarni bo\'lish</li>',
     '<li data-i18n="pe.mod4">Chain-of-thought: murakkab vazifalni bo\'lish</li>'),
    ('<li>Few-shot: misollar orqali o\'rgatish</li>',
     '<li data-i18n="pe.mod5">Few-shot: misollar orqali o\'rgatish</li>'),
    ('<li>Qayerda qo\'llash: yozish, kod, tadqiqot, biznes</li>',
     '<li data-i18n="pe.mod6">Qayerda qo\'llash: yozish, kod, tadqiqot, biznes</li>'),
    ('<li>Strawberryboo orqali avtomatik capture</li>',
     '<li data-i18n="pe.mod7">Strawberryboo orqali avtomatik capture</li>'),
    ('<h2>Qanday foyda olasiz?</h2>', '<h2 data-i18n="pe.benefit">Qanday foyda olasiz?</h2>'),
    ('<li>Vaqt tejash — 1 soatlik ishni 5 daqiqaga</li>',
     '<li data-i18n="pe.ben1">Vaqt tejash — 1 soatlik ishni 5 daqiqaga</li>'),
    ('<li>Sifatli natija — aniq, strukturaviy</li>',
     '<li data-i18n="pe.ben2">Sifatli natija — aniq, strukturaviy</li>'),
    ('<li>Pul ishlash — kontent, kod tezroq</li>',
     '<li data-i18n="pe.ben3">Pul ishlash — kontent, kod tezroq</li>'),
    ('<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;">Kursni sotib olish →</a>',
     '<a href="/bog-lanish" class="start-btn" style="margin-top:2rem;" data-i18n="pe.buy">Kursni sotib olish →</a>'),
    ('<a href="/kurslar" class="enroll" style="margin-left:1rem;">← Barcha kurslar</a>',
     '<a href="/kurslar" class="enroll" style="margin-left:1rem;" data-i18n="pe.all">← Barcha kurslar</a>'),
    ('<Quiz title="O\'z bilimingizni tekshiring" questions={questions} />',
     '<Quiz title="O\'z bilimingizni tekshiring" titleI18n="pe.quizTitle" questions={questions} />'),
]

PE_UZ = '''          "quiz.check": "Tekshirish",
          "quiz.hint": "Har bir savolga javob bering.",
          "pe.lead": "AI bilan to'g'ri muloqot qilish san'ati. Nima uchun kerak, qanday foyda olish, qayerda qo'llash — barchasi amaliy misollar bilan.",
          "pe.modules": "Kurs modullari",
          "pe.mod1": "Nima uchun Prompt Engineering kerak? (AI telepatiya qila olmaydi)",
          "pe.mod2": "Prompt tuzilmasi: roll, kontekst, misollar, format",
          "pe.mod3": "Amaliy mashq: IELTS essay yozish prompt'i",
          "pe.mod4": "Chain-of-thought: murakkab vazifalni bo'lish",
          "pe.mod5": "Few-shot: misollar orqali o'rgatish",
          "pe.mod6": "Qayerda qo'llash: yozish, kod, tadqiqot, biznes",
          "pe.mod7": "Strawberryboo orqali avtomatik capture",
          "pe.benefit": "Qanday foyda olasiz?",
          "pe.ben1": "Vaqt tejash — 1 soatlik ishni 5 daqiqaga",
          "pe.ben2": "Sifatli natija — aniq, strukturaviy",
          "pe.ben3": "Pul ishlash — kontent, kod tezroq",
          "pe.buy": "Kursni sotib olish →",
          "pe.all": "← Barcha kurslar",
          "pe.quizTitle": "O'z bilimingizni tekshiring"'''

PE_RU = '''          "quiz.check": "Проверить",
          "quiz.hint": "Ответьте на каждый вопрос.",
          "pe.lead": "Искусство правильного общения с ИИ. Зачем нужно, как извлекать пользу, где применять — всё на практических примерах.",
          "pe.modules": "Модули курса",
          "pe.mod1": "Зачем нужен Prompt Engineering? (ИИ не телепат)",
          "pe.mod2": "Структура промпта: роль, контекст, примеры, формат",
          "pe.mod3": "Практика: промпт для написания IELTS эссе",
          "pe.mod4": "Chain-of-thought: разбиение сложных задач",
          "pe.mod5": "Few-shot: обучение на примерах",
          "pe.mod6": "Где применять: письмо, код, исследования, бизнес",
          "pe.mod7": "Автоматический capture через Strawberryboo",
          "pe.benefit": "Какую пользу вы получите?",
          "pe.ben1": "Экономия времени — часовую работу за 5 минут",
          "pe.ben2": "Качественный результат — точный, структурированный",
          "pe.ben3": "Заработок — контент и код быстрее",
          "pe.buy": "Купить курс →",
          "pe.all": "← Все курсы",
          "pe.quizTitle": "Проверьте свои знания"'''

PE_EN = '''          "quiz.check": "Check",
          "quiz.hint": "Answer each question.",
          "pe.lead": "The art of communicating correctly with AI. Why you need it, how to benefit, where to apply — all with practical examples.",
          "pe.modules": "Course modules",
          "pe.mod1": "Why Prompt Engineering is needed? (AI is not a mind reader)",
          "pe.mod2": "Prompt structure: role, context, examples, format",
          "pe.mod3": "Hands-on: IELTS essay writing prompt",
          "pe.mod4": "Chain-of-thought: breaking down complex tasks",
          "pe.mod5": "Few-shot: teaching through examples",
          "pe.mod6": "Where to apply: writing, code, research, business",
          "pe.mod7": "Automatic capture via Strawberryboo",
          "pe.benefit": "What benefit will you get?",
          "pe.ben1": "Save time — an hour of work in 5 minutes",
          "pe.ben2": "Quality result — precise, structured",
          "pe.ben3": "Earn money — content and code faster",
          "pe.buy": "Buy course →",
          "pe.all": "← All courses",
          "pe.quizTitle": "Test your knowledge"'''

base_ins = [
    ('          "comm.join": "Telegram kanaliga qo\'shilish →"\n        },',
     '          "comm.join": "Telegram kanaliga qo\'shilish →",\n' + PE_UZ + '\n        },'),
    ('          "comm.join": "Присоединиться к каналу →"\n        },',
     '          "comm.join": "Присоединиться к каналу →",\n' + PE_RU + '\n        },'),
    ('          "comm.join": "Join the channel →"\n        },',
     '          "comm.join": "Join the channel →",\n' + PE_EN + '\n        },'),
]

print("== Quiz.astro ==")
s = read(qz_path)
s = apply(s, qz_pairs, "qz")
write(qz_path, s)

print("== prompt-engineering.astro ==")
s = read(pe_path)
s = apply(s, pe_pairs, "pe")
write(pe_path, s)

print("== Base.astro dictionary ==")
s = read(base_path)
s = apply(s, base_ins, "base")
write(base_path, s)

print("DONE")
