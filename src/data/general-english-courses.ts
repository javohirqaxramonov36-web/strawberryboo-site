export type CourseLang = 'uz' | 'ru' | 'en';

type LocalizedCourseContent = {
  title: string;
  category: string;
  tags: readonly string[];
  description: string;
  targetAudience: string;
  price: string;
  badge: string;
};

export type GeneralEnglishCourse = LocalizedCourseContent & {
  slug: string;
  cefr: string;
  certificate: boolean;
  accent: string;
  previousSlug?: string;
  nextSlug?: string;
  translations: Record<CourseLang, LocalizedCourseContent>;
};

export type LocalizedGeneralEnglishCourse = Omit<GeneralEnglishCourse, 'translations'>;

const localized = (uz: LocalizedCourseContent, ru: LocalizedCourseContent, en: LocalizedCourseContent) => ({ ...uz, translations: { uz, ru, en } });

// UZ remains the default public catalog; each course carries explicit RU and EN content.
export const generalEnglishCourses: readonly GeneralEnglishCourse[] = [
  {
    slug: 'general-english-beginner', cefr: 'A1', certificate: true, accent: '#22c55e', nextSlug: 'general-english-elementary',
    ...localized(
      { title: 'General English — Beginner (A1)', category: 'General English', tags: ['Til', 'General English'], description: 'Ingliz tilini noldan boshlang: asosiy grammatika, kundalik lug‘at, sodda gapirish va tinglash mashqlari bilan mustahkam poydevor yarating.', targetAudience: 'Ingliz tilini noldan boshlaydiganlarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Beginner (A1)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Начните английский с нуля: заложите прочную основу с базовой грамматикой, повседневной лексикой, простыми упражнениями на говорение и аудирование.', targetAudience: 'Тем, кто начинает изучать английский с нуля.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Beginner (A1)', category: 'General English', tags: ['Language', 'General English'], description: 'Start English from zero and build a strong foundation through core grammar, everyday vocabulary, simple speaking and listening practice.', targetAudience: 'Learners starting English from zero.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  },
  {
    slug: 'general-english-elementary', cefr: 'A2', certificate: true, accent: '#16a34a', previousSlug: 'general-english-beginner', nextSlug: 'general-english-pre-intermediate',
    ...localized(
      { title: 'General English — Elementary (A2)', category: 'General English', tags: ['Til', 'General English'], description: 'Kundalik vaziyatlarda erkinroq muloqot qilish uchun asosiy zamonlar, ko‘p ishlatiladigan lug‘at, gapirish va tinglash ko‘nikmalarini rivojlantiring.', targetAudience: 'Asosiy so‘z va iboralarni biladigan, kundalik suhbatni ishonchliroq olib borishni istaydiganlarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Elementary (A2)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Развивайте базовые времена, частотную лексику, навыки говорения и аудирования, чтобы увереннее общаться в повседневных ситуациях.', targetAudience: 'Тем, кто знает основные слова и выражения и хочет увереннее поддерживать повседневный разговор.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Elementary (A2)', category: 'General English', tags: ['Language', 'General English'], description: 'Build core tenses, common vocabulary, speaking and listening skills to communicate more confidently in everyday situations.', targetAudience: 'Learners who know basic words and phrases and want more confidence in everyday conversation.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  },
  {
    slug: 'general-english-pre-intermediate', cefr: 'A2–B1', certificate: true, accent: '#0ea5e9', previousSlug: 'general-english-elementary', nextSlug: 'general-english-intermediate',
    ...localized(
      { title: 'General English — Pre-Intermediate (A2–B1)', category: 'General English', tags: ['Til', 'General English'], description: 'Gaplarni bog‘lash, zamonlar va modal fe’llarni to‘g‘ri ishlatish, kengroq lug‘at hamda uzunroq tinglash materiallari bilan keyingi bosqichga o‘ting.', targetAudience: 'Elementary asoslarini biladigan va mustaqilroq fikr bildirishga tayyor o‘quvchilarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Pre-Intermediate (A2–B1)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Переходите на следующий уровень: связывайте предложения, точнее используйте времена и модальные глаголы, расширяйте словарный запас и работайте с более длинными аудио.', targetAudience: 'Учащимся, знающим основы Elementary и готовым выражать мысли самостоятельнее.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Pre-Intermediate (A2–B1)', category: 'General English', tags: ['Language', 'General English'], description: 'Move to the next level by linking ideas, using tenses and modal verbs accurately, expanding vocabulary, and working with longer listening materials.', targetAudience: 'Learners with Elementary foundations who are ready to express ideas more independently.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  },
  {
    slug: 'general-english-intermediate', cefr: 'B1', certificate: true, accent: '#3b82f6', previousSlug: 'general-english-pre-intermediate', nextSlug: 'general-english-upper-intermediate',
    ...localized(
      { title: 'General English — Intermediate (B1)', category: 'General English', tags: ['Til', 'General English'], description: 'Kundalik va o‘qishdagi mavzularda aniqroq fikr bildiring: grammatika aniqligi, faol lug‘at, suhbat va haqiqiy audio materiallar ustida ishlang.', targetAudience: 'Oddiy suhbatni tushunadigan, ammo ravonlik va aniqlikni oshirmoqchi bo‘lganlarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Intermediate (B1)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Точнее выражайте мысли в повседневных и учебных темах: работайте над грамматической точностью, активной лексикой, разговором и аутентичными аудиоматериалами.', targetAudience: 'Тем, кто понимает обычную беседу, но хочет повысить беглость и точность речи.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Intermediate (B1)', category: 'General English', tags: ['Language', 'General English'], description: 'Express yourself more clearly in everyday and study topics through grammar accuracy, active vocabulary, conversation, and authentic audio.', targetAudience: 'Learners who understand ordinary conversation but want greater fluency and accuracy.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  },
  {
    slug: 'general-english-upper-intermediate', cefr: 'B2', certificate: true, accent: '#8b5cf6', previousSlug: 'general-english-intermediate', nextSlug: 'general-english-advanced',
    ...localized(
      { title: 'General English — Upper-Intermediate (B2)', category: 'General English', tags: ['Til', 'General English'], description: 'Murakkab grammatika, argumentlarni tuzish, ish va o‘qishdagi muloqot, kengroq lug‘at hamda ilg‘or tinglash mashqlari bilan nutqingizni kuchaytiring.', targetAudience: 'O‘qish yoki ishdagi murakkabroq muloqotga tayyorlanayotgan B1 darajadagi o‘quvchilarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Upper-Intermediate (B2)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Усильте речь с помощью сложной грамматики, построения аргументов, общения для работы и учёбы, более широкого словаря и продвинутого аудирования.', targetAudience: 'Учащимся уровня B1, готовящимся к более сложному общению в учёбе или работе.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Upper-Intermediate (B2)', category: 'General English', tags: ['Language', 'General English'], description: 'Strengthen your English with complex grammar, argument building, communication for work and study, broader vocabulary, and advanced listening practice.', targetAudience: 'B1 learners preparing for more demanding communication in study or work.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  },
  {
    slug: 'general-english-advanced', cefr: 'C1', certificate: true, accent: '#a855f7', previousSlug: 'general-english-upper-intermediate',
    ...localized(
      { title: 'General English — Advanced (C1)', category: 'General English', tags: ['Til', 'General English'], description: 'Professional va akademik vaziyatlarda nozik ma’nolarni yetkazing: murakkab nutq, taqdimot, ilg‘or lug‘at va yuqori darajadagi tinglash ustida ishlang.', targetAudience: 'Murakkab akademik yoki professional muloqotda aniq va ishonchli gapirishni maqsad qilganlarga.', price: 'Narx belgilanmoqda', badge: 'Yangi' },
      { title: 'General English — Advanced (C1)', category: 'Общий английский', tags: ['Язык', 'Общий английский'], description: 'Передавайте тонкие смыслы в профессиональных и академических ситуациях: работайте со сложной речью, презентациями, продвинутой лексикой и аудированием высокого уровня.', targetAudience: 'Тем, кто стремится говорить точно и уверенно в сложном академическом или профессиональном общении.', price: 'Narx belgilanmoqda', badge: 'Новый' },
      { title: 'General English — Advanced (C1)', category: 'General English', tags: ['Language', 'General English'], description: 'Convey nuance in professional and academic settings through complex speaking, presentations, advanced vocabulary, and high-level listening practice.', targetAudience: 'Learners aiming to communicate precisely and confidently in demanding academic or professional contexts.', price: 'Narx belgilanmoqda', badge: 'New' }
    )
  }
];

export function getGeneralEnglishCourse(slug: string, lang: CourseLang = 'uz'): LocalizedGeneralEnglishCourse | undefined {
  const course = generalEnglishCourses.find((item) => item.slug === slug);
  if (!course) return undefined;
  const { translations, ...shared } = course;
  return { ...shared, ...translations[lang] };
}
