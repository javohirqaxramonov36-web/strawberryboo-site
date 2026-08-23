export type GeneralEnglishCourse = {
  slug: string;
  title: string;
  cefr: string;
  category: string;
  tags: readonly string[];
  description: string;
  targetAudience: string;
  price: string;
  certificate: boolean;
  badge: string;
  accent: string;
  previousSlug?: string;
  nextSlug?: string;
};

// New courses are kept as an additive list so later categories (for example SAT)
// can use the same source without changing the existing catalog records.
export const generalEnglishCourses: readonly GeneralEnglishCourse[] = [
  {
    slug: 'general-english-beginner',
    title: 'General English — Beginner (A1)',
    cefr: 'A1',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Ingliz tilini noldan boshlang: asosiy grammatika, kundalik lug‘at, sodda gapirish va tinglash mashqlari bilan mustahkam poydevor yarating.',
    targetAudience: 'Ingliz tilini noldan boshlaydiganlarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#22c55e',
    nextSlug: 'general-english-elementary',
  },
  {
    slug: 'general-english-elementary',
    title: 'General English — Elementary (A2)',
    cefr: 'A2',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Kundalik vaziyatlarda erkinroq muloqot qilish uchun asosiy zamonlar, ko‘p ishlatiladigan lug‘at, gapirish va tinglash ko‘nikmalarini rivojlantiring.',
    targetAudience: 'Asosiy so‘z va iboralarni biladigan, kundalik suhbatni ishonchliroq olib borishni istaydiganlarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#16a34a',
    previousSlug: 'general-english-beginner',
    nextSlug: 'general-english-pre-intermediate',
  },
  {
    slug: 'general-english-pre-intermediate',
    title: 'General English — Pre-Intermediate (A2–B1)',
    cefr: 'A2–B1',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Gaplarni bog‘lash, zamonlar va modal fe’llarni to‘g‘ri ishlatish, kengroq lug‘at hamda uzunroq tinglash materiallari bilan keyingi bosqichga o‘ting.',
    targetAudience: 'Elementary asoslarini biladigan va mustaqilroq fikr bildirishga tayyor o‘quvchilarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#0ea5e9',
    previousSlug: 'general-english-elementary',
    nextSlug: 'general-english-intermediate',
  },
  {
    slug: 'general-english-intermediate',
    title: 'General English — Intermediate (B1)',
    cefr: 'B1',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Kundalik va o‘qishdagi mavzularda aniqroq fikr bildiring: grammatika aniqligi, faol lug‘at, suhbat va haqiqiy audio materiallar ustida ishlang.',
    targetAudience: 'Oddiy suhbatni tushunadigan, ammo ravonlik va aniqlikni oshirmoqchi bo‘lganlarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#3b82f6',
    previousSlug: 'general-english-pre-intermediate',
    nextSlug: 'general-english-upper-intermediate',
  },
  {
    slug: 'general-english-upper-intermediate',
    title: 'General English — Upper-Intermediate (B2)',
    cefr: 'B2',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Murakkab grammatika, argumentlarni tuzish, ish va o‘qishdagi muloqot, kengroq lug‘at hamda ilg‘or tinglash mashqlari bilan nutqingizni kuchaytiring.',
    targetAudience: 'O‘qish yoki ishdagi murakkabroq muloqotga tayyorlanayotgan B1 darajadagi o‘quvchilarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#8b5cf6',
    previousSlug: 'general-english-intermediate',
    nextSlug: 'general-english-advanced',
  },
  {
    slug: 'general-english-advanced',
    title: 'General English — Advanced (C1)',
    cefr: 'C1',
    category: 'General English',
    tags: ['Til', 'General English'],
    description: 'Professional va akademik vaziyatlarda nozik ma’nolarni yetkazing: murakkab nutq, taqdimot, ilg‘or lug‘at va yuqori darajadagi tinglash ustida ishlang.',
    targetAudience: 'Ish yoki o‘qish uchun professional darajaga yetmoqchi bo‘lgan yuqori bosqichdagi o‘quvchilarga.',
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#a855f7',
    previousSlug: 'general-english-upper-intermediate',
  },
];

export const getGeneralEnglishCourse = (slug: string) =>
  generalEnglishCourses.find((course) => course.slug === slug);
