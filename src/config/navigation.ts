export type NavigationItem = {
  href: string;
  label: string;
  i18nKey?: string;
};

// Shared by the sidebar, desktop header, and footer to prevent navigation drift.
export const primaryNavigation: readonly NavigationItem[] = [
  { href: '', label: 'Bosh sahifa', i18nKey: 'nav.home' },
  { href: 'kurslar/', label: 'Kurslar', i18nKey: 'nav.courses' },
  { href: 'ielts-mock/', label: 'IELTS Mock' },
  { href: 'narxlar/', label: 'Narxlar', i18nKey: 'nav.prices' },
  { href: 'kurs-tanlash/', label: 'Kurs tanlash', i18nKey: 'nav.reco' },
  { href: 'mening-yolim/', label: "Mening yo'lim", i18nKey: 'nav.journey' },
  { href: 'profile/', label: 'Mening profilim' },
  { href: 'bog-lanish/', label: "Bog'lanish", i18nKey: 'nav.contact' },
  { href: 'homiylik/', label: 'Homiylik', i18nKey: 'nav.donate' },
  { href: 'md2pdf/', label: 'Markdown → PDF' },
  { href: 'tech-lab/', label: 'Tech Lab' },
];

export const footerNavigation: readonly NavigationItem[] = [
  ...primaryNavigation,
  { href: 'faq/', label: 'FAQ' },
  { href: 'biz-haqimizda/', label: 'Biz haqimizda' },
  { href: 'maxfiylik-siyosati/', label: 'Maxfiylik siyosati' },
  { href: 'foydalanish-shartlari/', label: 'Foydalanish shartlari' },
];
