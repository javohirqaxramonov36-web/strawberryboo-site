export type Lang = 'uz' | 'ru' | 'en';

export type SkillContent = {
  pageTitle: string;
  pageDescription: string;
  title: string;
  eyebrow: string;
  description: string;
  price: string;
  priceUzs: string;
  priceUzsNum: number;
  available: { title: string; text: string }[];
  fillNeeded: string[];
  practiceLabel: string;
  sourceNote: string;
  whyUseful?: string;
  contentTodo?: string;
  bonusLabel?: string;
  bonusHref?: string;
  mockBonus?: boolean;
  speakingApp?: boolean;
};

export const ieltsWriting: Record<Lang, SkillContent> = {
  uz: {
    pageTitle: "IELTS Writing: Task 1 va Task 2 | Tayanch",
    pageDescription: "IELTS Writing tayyorgarlik: Task 1 va Task 2 javobini rejalash, mantiqiy tuzilma qurish va AI bilan yozma javobni baholash uchun 30 kunlik tizim.",
    title: "IELTS Writing",
    eyebrow: "03 — IELTS SKILL",
    description: "Task 1 va Task 2 javobini rejalash, mantiqiy tuzilma qurish va AI bilan yozma javobni baholash uchun 30 kunlik tizim.",
    price: "$14.99",
    priceUzs: "187 500 so‘m",
    priceUzsNum: 187500,
    available: [
      { title: "30 kunlik AI Writing", text: "Har kuni Task 1 va Task 2. AI bepul OpenRouter kaliti bilan 4 IELTS mezoni bo‘yicha baholaydi." },
      { title: "Task 2 va outline builder", text: "Pozitsiya, body paragraph va misolni ajratib rejalash uchun Writing workspace." },
      { title: "Original Writing practice", text: "To‘liq ekran Writing practice shabloni hamda AI practice assessor yo‘nalishi." }
    ],
    fillNeeded: ["30 kunlik tasdiqlangan Writing topshiriqlari tayyor."],
    practiceLabel: "Original Writing practice’ni ochish",
    sourceNote: "01.IELTS prep/2.1 writing task 2/ va 2.2 writing task 1/ Obsidian notalari.",
    whyUseful: "IELTS Writing mantiqiy fikrni aniq tuzish, akademik va professional uslubda yozish ko‘nikmasini rivojlantiradi. Bu esa xorijda o‘qish, ariza va ish jarayonidagi yozma muloqotda ham foyda beradi.",
    contentTodo: "Struktura, paraphrase va lug‘at boyitish bo‘yicha qo‘shimcha materiallar tayyorlanmoqda. Hozircha har kuni AI bilan yozma javobni baholash orqali Task 1 va Task 2 ko‘nikmangizni rivojlantiring.",
    bonusLabel: "Typing bonusini ochish →",
    bonusHref: "kurslar/ielts-writing/typing/"
  },
  ru: {
    pageTitle: "IELTS Writing: Task 1 и Task 2 | Tayanch",
    pageDescription: "Подготовка к IELTS Writing: 30-дневная система планирования ответов Task 1 и Task 2, логичной структуры и оценки письма ИИ.",
    title: "IELTS Writing",
    eyebrow: "03 — IELTS SKILL",
    description: "30-дневная система для планирования ответов Task 1 и Task 2, построения логичной структуры и оценки письма с помощью ИИ.",
    price: "$14.99",
    priceUzs: "187 500 сум",
    priceUzsNum: 187500,
    available: [
      { title: "30-дневный AI Writing", text: "Каждый день Task 1 и Task 2. ИИ оценивает по 4 критериям IELTS с бесплатным ключом OpenRouter." },
      { title: "Task 2 и outline builder", text: "Writing workspace для планирования позиции, абзацев и примера." },
      { title: "Original Writing practice", text: "Полноэкранный шаблон Writing practice и направление AI practice assessor." }
    ],
    fillNeeded: ["Готовые подтверждённые задания Writing на 30 дней."],
    practiceLabel: "Открыть оригинальный Writing practice",
    sourceNote: "01.IELTS prep/2.1 writing task 2/ и 2.2 writing task 1/ заметки Obsidian.",
    whyUseful: "IELTS Writing развивает навык чётко выстраивать логичную мысль и писать в академическом и профессиональном стиле. Это пригодится при учёбе за рубежом, подаче заявок и деловой переписке.",
    contentTodo: "Дополнительные материалы по структуре, paraphrase и обогащению словаря готовятся. Пока развивайте навык Task 1 и Task 2, ежедневно оценивая письмо с ИИ.",
    bonusLabel: "Открыть бонус Typing →",
    bonusHref: "kurslar/ielts-writing/typing/"
  },
  en: {
    pageTitle: "IELTS Writing: Task 1 and Task 2 | Tayanch",
    pageDescription: "IELTS Writing prep: a 30-day system to plan Task 1 and Task 2 answers, build a logical structure and grade your writing with AI.",
    title: "IELTS Writing",
    eyebrow: "03 — IELTS SKILL",
    description: "A 30-day system to plan Task 1 and Task 2 answers, build a logical structure and grade your writing with AI.",
    price: "$14.99",
    priceUzs: "187 500 soum",
    priceUzsNum: 187500,
    available: [
      { title: "30-day AI Writing", text: "Task 1 and Task 2 every day. AI grades by the 4 IELTS criteria with a free OpenRouter key." },
      { title: "Task 2 and outline builder", text: "A Writing workspace to plan your position, body paragraphs and examples." },
      { title: "Original Writing practice", text: "A full-screen Writing practice template plus an AI practice assessor track." }
    ],
    fillNeeded: ["Confirmed 30-day Writing assignments ready."],
    practiceLabel: "Open the original Writing practice",
    sourceNote: "01.IELTS prep/2.1 writing task 2/ and 2.2 writing task 1/ Obsidian notes.",
    whyUseful: "IELTS Writing develops the skill of structuring a clear logical argument and writing in an academic and professional style. This also helps with studying abroad, applications and workplace writing.",
    contentTodo: "Extra materials on structure, paraphrase and vocabulary enrichment are being prepared. For now, develop your Task 1 and Task 2 skill by grading your writing with AI every day.",
    bonusLabel: "Open the Typing bonus →",
    bonusHref: "kurslar/ielts-writing/typing/"
  }
};

export function getIeltsWriting(lang: Lang): SkillContent {
  return ieltsWriting[lang] || ieltsWriting.uz;
}

export const ieltsReading: Record<Lang, SkillContent> = {
  uz: {
    pageTitle: "IELTS Reading: savol turlari va vaqt | Tayanch",
    pageDescription: "IELTS Reading (o‘qish) tayyorgarlik: savol turini ajratish, vaqtni boshqarish va xato patternlarini aniqlash uchun amaliy yo‘nalish.",
    title: "IELTS Reading",
    eyebrow: "02 — IELTS SKILL",
    description: "Reading’da savol turini ajratish, vaqtni boshqarish va xato patternlarini aniqlash uchun amaliy yo‘nalish.",
    price: "$7.50",
    priceUzs: "93 750 so‘m",
    priceUzsNum: 93750,
    available: [
      { title: "Original Reading mini-practice", text: "Mavjud original practice formatida savolni o‘qish, javobni tekshirish va xatoni qayd qilish." },
      { title: "Vaqt va xato nazorati", text: "Error-log orqali e’tiborsizlik, word limit va vaqt boshqaruvi xatolarini qayd etish." },
      { title: "Cambridge tracker", text: "Qonuniy egalikdagi Cambridge kitoblari natijasini shaxsiy tracker’da saqlash." }
    ],
    fillNeeded: ["30 kunlik Reading darslarining to‘liq ketma-ketligi.", "Qo‘shimcha original passage va savol banki."],
    practiceLabel: "Original Reading mini-practice’ni ochish",
    sourceNote: "Mavjud IELTS Prep Reading bo‘limi va original practice kutubxonasi.",
    mockBonus: true
  },
  ru: {
    pageTitle: "IELTS Reading: типы вопросов и время | Tayanch",
    pageDescription: "Подготовка к IELTS Reading (чтение): практический подход, чтобы различать типы вопросов, управлять временем и находить паттерны ошибок.",
    title: "IELTS Reading",
    eyebrow: "02 — IELTS SKILL",
    description: "Практический подход, чтобы различать типы вопросов, управлять временем и находить паттерны ошибок в чтении.",
    price: "$7.50",
    priceUzs: "93 750 сум",
    priceUzsNum: 93750,
    available: [
      { title: "Original Reading mini-practice", text: "Чтение вопроса, проверка ответа и запись ошибки в формате существующей оригинальной практики." },
      { title: "Контроль времени и ошибок", text: "Через error-log отмечать ошибки невнимательности, word limit и управления временем." },
      { title: "Cambridge tracker", text: "Хранить результаты законно принадлежащих книг Cambridge в личном трекере." }
    ],
    fillNeeded: ["Полная 30-дневная последовательность занятий Reading.", "Дополнительные оригинальные тексты и банк вопросов."],
    practiceLabel: "Открыть оригинальный Reading mini-practice",
    sourceNote: "Существующий раздел IELTS Prep Reading и библиотека оригинальной практики.",
    mockBonus: true
  },
  en: {
    pageTitle: "IELTS Reading: question types and time | Tayanch",
    pageDescription: "IELTS Reading prep: a practical path to tell question types apart, manage time and spot error patterns.",
    title: "IELTS Reading",
    eyebrow: "02 — IELTS SKILL",
    description: "A practical path to tell question types apart, manage time and spot error patterns in reading.",
    price: "$7.50",
    priceUzs: "93 750 soum",
    priceUzsNum: 93750,
    available: [
      { title: "Original Reading mini-practice", text: "Read the question, check the answer and log the mistake in the existing original practice format." },
      { title: "Time and error control", text: "Use an error-log to record carelessness, word-limit and time-management mistakes." },
      { title: "Cambridge tracker", text: "Store results from legally owned Cambridge books in your personal tracker." }
    ],
    fillNeeded: ["A full 30-day sequence of Reading lessons.", "Extra original passages and a question bank."],
    practiceLabel: "Open the original Reading mini-practice",
    sourceNote: "The existing IELTS Prep Reading section and original practice library.",
    mockBonus: true
  }
};

export function getIeltsReading(lang: Lang): SkillContent {
  return ieltsReading[lang] || ieltsReading.uz;
}

export const ieltsSpeaking: Record<Lang, SkillContent> = {
  uz: {
    pageTitle: "IELTS Speaking: 30 kunlik amaliy kurs | Tayanch",
    pageDescription: "IELTS Speaking tayyorgarlik: talaffuz, shadowing va Part 1/2/3 bo‘yicha 30 kunlik amaliy kurs. Har kuni aniqroq gapirish.",
    title: "IELTS Speaking",
    eyebrow: "04 — IELTS SKILL",
    description: "IELTS Speaking tayyorgarlik: talaffuz, shadowing va Part 1/2/3 bo‘yicha 30 kunlik amaliy kurs. Har kuni aniqroq gapirish.",
    price: "$7.50",
    priceUzs: "93 750 so‘m",
    priceUzsNum: 93750,
    available: [
      { title: "30 kunlik AI modul", text: "30 xil mavzu, daily pronunciation, original shadowing va IELTS uslubidagi Speaking Set." },
      { title: "Timer va feedback", text: "Part 2 uchun 1 daqiqa tayyorlanish + 2 daqiqa gapirish taymeri, transcript-asosidagi AI practice feedback." },
      { title: "Progress va sertifikat", text: "Mahalliy/server progress, trend va 30 kun yakunlanganda qatnashuv sertifikati oqimi." }
    ],
    fillNeeded: ["Licensed human shadowing audio.", "Server-STT va acoustic pronunciation scoring."],
    practiceLabel: "Original Speaking practice’ni ochish",
    sourceNote: "Mavjud Tayanch IELTS Speaking 30 kunlik AI moduli va 01.IELTS prep Speaking strategiyasi.",
    speakingApp: false
  },
  ru: {
    pageTitle: "IELTS Speaking: 30-дневный практический курс | Tayanch",
    pageDescription: "Подготовка к IELTS Speaking: произношение, shadowing и 30-дневный практический курс по Part 1/2/3. Говорите чётче каждый день.",
    title: "IELTS Speaking",
    eyebrow: "04 — IELTS SKILL",
    description: "Подготовка к IELTS Speaking: произношение, shadowing и 30-дневный практический курс по Part 1/2/3. Говорите чётче каждый день.",
    price: "$7.50",
    priceUzs: "93 750 сум",
    priceUzsNum: 93750,
    available: [
      { title: "30-дневный AI модуль", text: "30 тем, ежедневное произношение, оригинальный shadowing и Speaking Set в стиле IELTS." },
      { title: "Таймер и фидбэк", text: "Таймер для Part 2: 1 минута подготовки + 2 минуты речи, AI-фидбэк по транскрипту." },
      { title: "Прогресс и сертификат", text: "Локальный/серверный прогресс, тренд и сертификат участия по итогам 30 дней." }
    ],
    fillNeeded: ["Лицензированное аудио shadowing от людей.", "Серверный STT и оценка произношения по акустике."],
    practiceLabel: "Открыть оригинальный Speaking practice",
    sourceNote: "Существующий 30-дневный AI-модуль Tayanch IELTS Speaking и стратегия 01.IELTS prep Speaking.",
    speakingApp: false
  },
  en: {
    pageTitle: "IELTS Speaking: 30-day practical course | Tayanch",
    pageDescription: "IELTS Speaking prep: pronunciation, shadowing and a 30-day practical course for Part 1/2/3. Speak more clearly every day.",
    title: "IELTS Speaking",
    eyebrow: "04 — IELTS SKILL",
    description: "IELTS Speaking prep: pronunciation, shadowing and a 30-day practical course for Part 1/2/3. Speak more clearly every day.",
    price: "$7.50",
    priceUzs: "93 750 soum",
    priceUzsNum: 93750,
    available: [
      { title: "30-day AI module", text: "30 topics, daily pronunciation, original shadowing and an IELTS-style Speaking Set." },
      { title: "Timer and feedback", text: "Part 2 timer: 1 minute prep + 2 minutes speaking, transcript-based AI practice feedback." },
      { title: "Progress and certificate", text: "Local/server progress, trend and a participation certificate after 30 days." }
    ],
    fillNeeded: ["Licensed human shadowing audio.", "Server STT and acoustic pronunciation scoring."],
    practiceLabel: "Open the original Speaking practice",
    sourceNote: "The existing 30-day AI module Tayanch IELTS Speaking and 01.IELTS prep Speaking strategy.",
    speakingApp: false
  }
};

export function getIeltsSpeaking(lang: Lang): SkillContent {
  return ieltsSpeaking[lang] || ieltsSpeaking.uz;
}
