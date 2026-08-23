import type { CourseLang } from './general-english-courses';

type LocalizedCourseContent = { title: string; category: string; tags: readonly string[]; description: string; targetAudience: string; price: string; badge: string; relatedCourseText?: string };
export type SatCourse = LocalizedCourseContent & { slug: string; certificate: boolean; accent: string; relatedCourseSlug?: string; translations: Record<CourseLang, LocalizedCourseContent> };
export type LocalizedSatCourse = Omit<SatCourse, 'translations'>;
const localized = (uz: LocalizedCourseContent, ru: LocalizedCourseContent, en: LocalizedCourseContent) => ({ ...uz, translations: { uz, ru, en } });

export const satCourses: readonly SatCourse[] = [
  { slug: 'sat-math', certificate: true, accent: '#f97316', relatedCourseSlug: 'desmos-applications', ...localized(
    { title: 'SAT Math', category: 'SAT', tags: ['SAT', 'Admission', 'Matematika'], description: 'SAT Math uchun algebra, geometriya va statistika bo‘yicha kerakli ko‘nikmalarni tizimli o‘rganing. Savol turlari va yechish strategiyalari ustida amaliy ishlaysiz.', targetAudience: "SAT topshirmoqchi bo'lgan, matematikadan yaxshi ball olishni istagan talabalarga.", price: 'Narx belgilanmoqda', badge: 'Yangi', relatedCourseText: 'Desmos Applications bilan birga o‘rganing — SAT Math savollarini tezroq tahlil qilish uchun.' },
    { title: 'SAT Math', category: 'SAT', tags: ['SAT', 'Поступление', 'Математика'], description: 'Системно изучайте алгебру, геометрию и статистику для SAT Math. На практике разберёте типы заданий и стратегии решения.', targetAudience: 'Учащимся, которые планируют сдавать SAT и хотят получить высокий балл по математике.', price: 'Narx belgilanmoqda', badge: 'Новый', relatedCourseText: 'Изучайте вместе с Desmos Applications, чтобы быстрее анализировать задания SAT Math.' },
    { title: 'SAT Math', category: 'SAT', tags: ['SAT', 'Admissions', 'Mathematics'], description: 'Study the algebra, geometry, and statistics needed for SAT Math in a structured way. Practise question types and solving strategies.', targetAudience: 'Students planning to take the SAT who want a strong Math score.', price: 'Narx belgilanmoqda', badge: 'New', relatedCourseText: 'Study alongside Desmos Applications to analyse SAT Math questions more quickly.' }
  ) },
  { slug: 'sat-english', certificate: true, accent: '#38bdf8', ...localized(
    { title: 'SAT English (Reading & Writing)', category: 'SAT', tags: ['SAT', 'Admission', 'Til'], description: 'SAT Reading & Writing uchun o‘qib tushunish, grammatika va yozma javob strategiyalarini o‘rganing. Savol turini aniqlash va vaqtni boshqarish bo‘yicha amaliy yo‘lga ega bo‘lasiz.', targetAudience: "SAT Reading & Writing bo'limida ball oshirmoqchi bo'lgan talabalarga.", price: 'Narx belgilanmoqda', badge: 'Yangi' },
    { title: 'SAT English (Reading & Writing)', category: 'SAT', tags: ['SAT', 'Поступление', 'Язык'], description: 'Изучайте стратегии чтения, грамматики и письменных ответов для SAT Reading & Writing. Освойте определение типа вопроса и управление временем.', targetAudience: 'Учащимся, которые хотят повысить балл в разделе SAT Reading & Writing.', price: 'Narx belgilanmoqda', badge: 'Новый' },
    { title: 'SAT English (Reading & Writing)', category: 'SAT', tags: ['SAT', 'Admissions', 'Language'], description: 'Learn reading comprehension, grammar, and written-response strategies for SAT Reading & Writing, including question identification and time management.', targetAudience: 'Students who want to raise their SAT Reading & Writing score.', price: 'Narx belgilanmoqda', badge: 'New' }
  ) },
  { slug: 'desmos-applications', certificate: true, accent: '#a855f7', relatedCourseSlug: 'sat-math', ...localized(
    { title: 'Desmos Applications', category: 'SAT', tags: ['SAT', 'Admission', 'Matematika', 'Vosita'], description: 'SAT imtihonida ruxsat etilgan Desmos grafik kalkulyatoridan funksiyalar, grafiklar va tezkor yechimlar uchun samarali foydalanishni o‘rganing. Bu SAT Math’ga yordam beradigan amaliy vosita kursidir.', targetAudience: "SAT Math kursi bilan birga yoki undan keyin, Desmos'dan tezroq va samaraliroq foydalanishni o'rganmoqchi bo'lganlarga.", price: 'Narx belgilanmoqda', badge: 'Yangi', relatedCourseText: 'SAT Math kursi bilan birga o‘rganing — Desmos’dan qaysi masalada va qachon foydalanishni mustahkamlang.' },
    { title: 'Desmos Applications', category: 'SAT', tags: ['SAT', 'Поступление', 'Математика', 'Инструмент'], description: 'Научитесь эффективно использовать разрешённый на SAT графический калькулятор Desmos для функций, графиков и быстрых решений. Это практический курс-инструмент для SAT Math.', targetAudience: 'Тем, кто хочет быстрее и эффективнее пользоваться Desmos вместе с курсом SAT Math или после него.', price: 'Narx belgilanmoqda', badge: 'Новый', relatedCourseText: 'Изучайте вместе с SAT Math, чтобы закрепить, когда и для каких задач использовать Desmos.' },
    { title: 'Desmos Applications', category: 'SAT', tags: ['SAT', 'Admissions', 'Mathematics', 'Tool'], description: 'Learn to use the Desmos graphing calculator allowed on the SAT effectively for functions, graphs, and faster solutions. This is a practical supporting tool course for SAT Math.', targetAudience: 'Learners who want to use Desmos faster and more effectively alongside or after SAT Math.', price: 'Narx belgilanmoqda', badge: 'New', relatedCourseText: 'Study alongside SAT Math to learn when and for which problems to use Desmos.' }
  ) }
];

export function getSatCourse(slug: string, lang: CourseLang = 'uz'): LocalizedSatCourse | undefined {
  const course = satCourses.find((item) => item.slug === slug);
  if (!course) return undefined;
  const { translations, ...shared } = course;
  return { ...shared, ...translations[lang] };
}
