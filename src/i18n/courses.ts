export type Lang = 'uz' | 'ru' | 'en';

type ListeningContent = {
  pageTitle: string;
  pageDescription: string;
  title: string;
  eyebrow: string;
  description: string;
  priceUzs: string;
  available: { title: string; text: string }[];
  fillNeeded: string[];
  practiceLabel: string;
  sourceNote: string;
};

export const ieltsListening: Record<Lang, ListeningContent> = {
  uz: {
    pageTitle: "IELTS Listening mashqlari va tayyorgarlik | Tayanch",
    pageDescription: "IELTS Listening (tinglash) tayyorgarlik: raqam, birlik-ko‘plik va distractor xatolarini bartaraf etish uchun original mashqlar va transcript.",
    title: "IELTS Listening",
    eyebrow: "01 — IELTS SKILL",
    description: "Tinglashdagi birlik-ko‘plik, raqam va distractor xatolarini aniqroq boshqarish uchun original mashqlar.",
    priceUzs: "93 750 so‘m",
    available: [
      { title: "Original mini-practice", text: "Riverside Community Day mashqi: birlik-ko‘plik, raqam va distractor signallariga e’tibor." },
      { title: "Transcript bilan tekshirish", text: "Javobdan keyin transcriptni ochib, eshitilgan signal va xatoni solishtirish." },
      { title: "Error-log va tracker", text: "Xato turi hamda Cambridge natijalarini qurilmada qayd etish uchun mavjud vositalar." }
    ],
    fillNeeded: ["30 kunlik mustaqil Listening darslar ketma-ketligi.", "Qo‘shimcha original audio mashqlar va mavzuli transcriptlar."],
    practiceLabel: "Original Listening mini-practice’ni ochish",
    sourceNote: "01.IELTS prep/7.7.7 unnes/Listening/ va mavjud IELTS Prep original mashqlari."
  },
  ru: {
    pageTitle: "IELTS Listening: упражнения и подготовка | Tayanch",
    pageDescription: "Подготовка к IELTS Listening (аудирование): оригинальные упражнения и транскрипты, чтобы устранить ошибки с числами, ед./мн. и distractors.",
    title: "IELTS Listening",
    eyebrow: "01 — IELTS SKILL",
    description: "Оригинальные упражнения, чтобы точнее контролировать ошибки с ед./мн., числами и distractors при аудировании.",
    priceUzs: "93 750 сум",
    available: [
      { title: "Original mini-practice", text: "Упражнение Riverside Community Day: внимание к ед./мн., числам и сигналам-отвлечениям (distractors)." },
      { title: "Проверка по транскрипту", text: "После ответа открыть транскрипт и сравнить услышанный сигнал с ошибкой." },
      { title: "Error-log и трекер", text: "Доступные инструменты для записи типа ошибки и результатов Cambridge на устройстве." }
    ],
    fillNeeded: ["30-дневная последовательность самостоятельных занятий Listening.", "Дополнительные оригинальные аудиоупражнения и тематические транскрипты."],
    practiceLabel: "Открыть оригинальный Listening mini-practice",
    sourceNote: "01.IELTS prep/7.7.7 unnes/Listening/ и имеющиеся оригинальные упражнения IELTS Prep."
  },
  en: {
    pageTitle: "IELTS Listening practice and preparation | Tayanch",
    pageDescription: "IELTS Listening preparation: original exercises and transcripts to fix number, singular/plural and distractor errors.",
    title: "IELTS Listening",
    eyebrow: "01 — IELTS SKILL",
    description: "Original exercises to manage singular/plural, number and distractor errors in listening more accurately.",
    priceUzs: "93 750 soum",
    available: [
      { title: "Original mini-practice", text: "Riverside Community Day exercise: attention to singular/plural, numbers and distractor signals." },
      { title: "Check with transcript", text: "After answering, open the transcript and compare the heard signal with the mistake." },
      { title: "Error-log and tracker", text: "Available tools to record the error type and Cambridge results on your device." }
    ],
    fillNeeded: ["A 30-day sequence of independent Listening lessons.", "Extra original audio exercises and topical transcripts."],
    practiceLabel: "Open the original Listening mini-practice",
    sourceNote: "01.IELTS prep/7.7.7 unnes/Listening/ and the existing IELTS Prep original exercises."
  }
};

export function getIeltsListening(lang: Lang): ListeningContent {
  return ieltsListening[lang] || ieltsListening.uz;
}
