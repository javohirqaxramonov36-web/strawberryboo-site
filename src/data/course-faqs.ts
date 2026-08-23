export type FaqLocale = 'uz' | 'ru' | 'en';
export type CourseFaqFacts = {
  title: string;
  lang: FaqLocale;
  overview: string;
  topics: string[];
  whoFor: string;
  whoNotFor: string;
  price: string;
  status?: string;
  certificate?: boolean;
  accessPayment: string;
};

const labels = {
  uz: { cover: 'Kurs nimalarni qamrab oladi?', price: 'Narxi va holati qanday?', certificate: 'Sertifikat beriladimi?', access: 'To‘lov va foydalanish haqida nima ma’lum?', yes: 'Ha. Kurs sahifasida sertifikat ko‘rsatilgan.', no: 'Bu kurs sahifasida sertifikat haqida ma’lumot ko‘rsatilmagan.', topics: 'Mavzular:' },
  ru: { cover: 'Что охватывает курс?', price: 'Какова цена и статус?', certificate: 'Есть ли сертификат?', access: 'Что известно об оплате и доступе?', yes: 'Да. На странице курса указан сертификат.', no: 'На странице этого курса нет информации о сертификате.', topics: 'Темы:' },
  en: { cover: 'What does the course cover?', price: 'What are the price and status?', certificate: 'Is a certificate included?', access: 'What is known about payment and access?', yes: 'Yes. A certificate is listed on the course page.', no: 'This course page does not list a certificate.', topics: 'Topics:' }
} as const;

export function makeCourseFaqFacts(facts: CourseFaqFacts) {
  const l = labels[facts.lang];
  const priceStatus = [facts.price, facts.status].filter(Boolean).join(' · ');
  return {
    ...facts,
    items: [
      { question: l.cover, answer: `${facts.overview}${facts.topics.length ? ` ${l.topics} ${facts.topics.join(', ')}.` : ''}` },
      { question: l.price, answer: priceStatus },
      { question: l.certificate, answer: facts.certificate ? l.yes : l.no },
      { question: l.access, answer: facts.accessPayment }
    ]
  };
}

export const bespokeCourseFaqFacts: Record<'prompt-engineering' | 'ai-agentlar' | 'obsidian', CourseFaqFacts> = {
  'prompt-engineering': {
    lang: 'uz', title: 'Prompt Engineering',
    overview: 'Kurs AI uchun aniq ko‘rsatma yozish: rol, kontekst, misol va javob formatini belgilashga bag‘ishlangan.',
    topics: ['prompt tuzilmasi', 'few-shot misollar', 'murakkab vazifani bosqichlarga ajratish', 'yozish, kod, tadqiqot va biznesdagi qo‘llash'],
    whoFor: 'ChatGPT, Gemini yoki boshqa AI vositalaridan aniqroq natija olishni istaydiganlar uchun.',
    whoNotFor: 'Tayyor natija yoki AI javoblarining xatosizligi kafolatini izlaydiganlar uchun emas; kurs ko‘rsatma tuzish amaliyotiga qaratilgan.',
    price: '$29 · ≈ 360 000 so‘m', certificate: true,
    accessPayment: 'Sahifada kurs narxi va sotib olish yo‘li ko‘rsatilgan. To‘lov bo‘yicha amaldagi ko‘rsatmalar kurs sahifasidagi Payment Instructions bo‘limida beriladi.'
  },
  'ai-agentlar': {
    lang: 'uz', title: 'AI Agentlar',
    overview: 'Kurs CrewAI va LangGraph yordamida vazifa, reja, qidiruv va natija oqimiga ega AI agentlarni tushuntiradi.',
    topics: ['CrewAI agent jamoalari', 'LangGraph oqimlari', 'agent xotirasi', 'MacBook’da amaliy agent yaratish'],
    whoFor: 'AI bilan tanish bo‘lib, uni tadqiqot, hisobot yoki avtomatlashtirish kabi haqiqiy ishlarga qo‘llamoqchi bo‘lganlar uchun.',
    whoNotFor: 'Kod yoki sozlashsiz darhol tayyor biznes natijasini kafolatlaydigan yechim izlaydiganlar uchun emas; kurs agent workflowlarini tushunish va sinashga qaratilgan.',
    price: '$39 · ≈ 490 000 so‘m', certificate: true,
    accessPayment: 'Sahifada kurs narxi va sotib olish yo‘li ko‘rsatilgan. To‘lov bo‘yicha amaldagi ko‘rsatmalar kurs sahifasidagi Payment Instructions bo‘limida beriladi.'
  },
  obsidian: {
    lang: 'uz', title: 'Obsidian: shaxsiy bilim bazasi',
    overview: 'Kurs Obsidian’da qaydlar, havolalar va shaxsiy bilim bazasini tashkil qilishga bag‘ishlangan.',
    topics: ['vault tuzilmasi', 'Markdown', 'ichki havolalar', 'Graph view', 'pluginlar va xavfsiz ishlash'],
    whoFor: 'Kundalik yuritadigan, o‘qigan yoki o‘rgangan narsalarini tartibga solmoqchi bo‘lgan talabalar va tadqiqotchilar uchun.',
    whoNotFor: 'Parol yoki maxfiy ma’lumotlarni oddiy note’larda saqlashni rejalashtiradiganlar uchun emas; kurs bunday ma’lumotlarni shifrlanmagan note’da saqlamaslikni tavsiya qiladi.',
    price: '$19 · ≈ 240 000 so‘m', certificate: true,
    accessPayment: 'Sahifada kurs narxi va sotib olish yo‘li ko‘rsatilgan. To‘lov bo‘yicha amaldagi ko‘rsatmalar kurs sahifasidagi Payment Instructions bo‘limida beriladi.'
  }
};
