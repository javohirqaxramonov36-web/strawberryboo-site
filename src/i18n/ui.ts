// Markaziy UI tarjima lug'ati (i18n).
// Hozircha asosiy interfeys matnlari tarjima qilindi. Sahifa kontenti (kurslar)
// bosqichma-bosqich, tasdiqlash bilan tarjima qilinadi (qarang: i18n-log.txt).
// Mahsulot/texnologiya nomlari (CrewAI, Figma, IELTS, Band Score va h.k.) tarjima qilinmaydi.

export const languages = ['uz', 'ru', 'en'] as const;
export type Lang = (typeof languages)[number];

type Dict = Record<string, string>;

export const ui: Record<Lang, Dict> = {
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.courses': 'Kurslar',
    'nav.prices': 'Narxlar',
    'nav.reco': 'Kurs tanlash',
    'nav.journey': 'Mening yo\'lim',
    'nav.contact': 'Bog\'lanish',
    'nav.donate': 'Homiylik',
    'nav.profile': 'Mening profilim',
    'skip': 'Asosiyga o\'tish',
    'sec.courses': 'Kurslarimiz',
    'sec.all': 'Barchasini ko\'rish',
    'why.title': 'Nega biz?',
    'pay.title': 'To\'lov',
    'cta.more': 'Batafsil →',
    'common.soon': 'Tez orada',
    'common.free': 'Bepul',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.courses': 'Курсы',
    'nav.prices': 'Цены',
    'nav.reco': 'Подобрать курс',
    'nav.journey': 'Мой путь',
    'nav.contact': 'Контакты',
    'nav.donate': 'Поддержать',
    'nav.profile': 'Мой профиль',
    'skip': 'Перейти к основному',
    'sec.courses': 'Наши курсы',
    'sec.all': 'Смотреть все',
    'why.title': 'Почему мы?',
    'pay.title': 'Оплата',
    'cta.more': 'Подробнее →',
    'common.soon': 'Скоро',
    'common.free': 'Бесплатно',
  },
  en: {
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.prices': 'Pricing',
    'nav.reco': 'Find your course',
    'nav.journey': 'My journey',
    'nav.contact': 'Contact',
    'nav.donate': 'Support',
    'nav.profile': 'My profile',
    'skip': 'Skip to content',
    'sec.courses': 'Our courses',
    'sec.all': 'See all',
    'why.title': 'Why us?',
    'pay.title': 'Payment',
    'cta.more': 'Details →',
    'common.soon': 'Soon',
    'common.free': 'Free',
  },
};

export function getUi(lang: Lang): Dict {
  return ui[lang] ?? ui.uz;
}
