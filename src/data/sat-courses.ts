export type SatCourse = {
  slug: string;
  title: string;
  category: string;
  tags: readonly string[];
  description: string;
  targetAudience: string;
  price: string;
  certificate: boolean;
  badge: string;
  accent: string;
  relatedCourseSlug?: string;
  relatedCourseText?: string;
};

// Additive SAT catalog. Existing General English data remains unchanged.
export const satCourses: readonly SatCourse[] = [
  {
    slug: 'sat-math',
    title: 'SAT Math',
    category: 'SAT',
    tags: ['SAT', 'Admission', 'Matematika'],
    description: 'SAT Math uchun algebra, geometriya va statistika bo‘yicha kerakli ko‘nikmalarni tizimli o‘rganing. Savol turlari va yechish strategiyalari ustida amaliy ishlaysiz.',
    targetAudience: "SAT topshirmoqchi bo'lgan, matematikadan yaxshi ball olishni istagan talabalarga.",
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#f97316',
    relatedCourseSlug: 'desmos-applications',
    relatedCourseText: 'Desmos Applications bilan birga o‘rganing — SAT Math savollarini tezroq tahlil qilish uchun.',
  },
  {
    slug: 'sat-english',
    title: 'SAT English (Reading & Writing)',
    category: 'SAT',
    tags: ['SAT', 'Admission', 'Til'],
    description: 'SAT Reading & Writing uchun o‘qib tushunish, grammatika va yozma javob strategiyalarini o‘rganing. Savol turini aniqlash va vaqtni boshqarish bo‘yicha amaliy yo‘lga ega bo‘lasiz.',
    targetAudience: "SAT Reading & Writing bo'limida ball oshirmoqchi bo'lgan talabalarga.",
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#38bdf8',
  },
  {
    slug: 'desmos-applications',
    title: 'Desmos Applications',
    category: 'SAT',
    tags: ['SAT', 'Admission', 'Matematika', 'Vosita'],
    description: 'SAT imtihonida ruxsat etilgan Desmos grafik kalkulyatoridan funksiyalar, grafiklar va tezkor yechimlar uchun samarali foydalanishni o‘rganing. Bu SAT Math’ga yordam beradigan amaliy vosita kursidir.',
    targetAudience: "SAT Math kursi bilan birga yoki undan keyin, Desmos'dan tezroq va samaraliroq foydalanishni o'rganmoqchi bo'lganlarga.",
    price: 'Narx belgilanmoqda',
    certificate: true,
    badge: 'Yangi',
    accent: '#a855f7',
    relatedCourseSlug: 'sat-math',
    relatedCourseText: 'SAT Math kursi bilan birga o‘rganing — Desmos’dan qaysi masalada va qachon foydalanishni mustahkamlang.',
  },
];

export const getSatCourse = (slug: string) => satCourses.find((course) => course.slug === slug);
