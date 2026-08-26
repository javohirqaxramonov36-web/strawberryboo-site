export type NavigationItem = {
  href: string;
  label: string;
  i18nKey?: string;
};

// Shared by the sidebar, desktop header, and footer to prevent navigation drift.
export const primaryNavigation: readonly NavigationItem[] = [
  { href: '', label: 'Bosh sahifa', i18nKey: 'nav.home' },
  { href: 'kurslar/', label: 'Kurslar', i18nKey: 'nav.courses' },
  { href: 'xizmatlar/', label: 'Xizmatlar' },
  { href: 'ielts-mock/', label: 'IELTS Mock', i18nKey: 'nav.ieltsMock' },
  { href: 'narxlar/', label: 'Narxlar', i18nKey: 'nav.prices' },
  { href: 'kurs-tanlash/', label: 'Kurs tanlash', i18nKey: 'nav.reco' },
  { href: 'mening-yolim/', label: "Mening yo'lim", i18nKey: 'nav.journey' },
  { href: 'profile/', label: 'Mening profilim', i18nKey: 'nav.profile' },
  { href: 'bog-lanish/', label: "Bog'lanish", i18nKey: 'nav.contact' },
  { href: 'homiylik/', label: 'Homiylik', i18nKey: 'nav.donate' },
  { href: 'md2pdf/', label: 'Markdown → PDF', i18nKey: 'nav.md2pdf' },
  { href: 'tech-lab/', label: 'Tech Lab', i18nKey: 'nav.techLab' },
  { href: 'entertainment/', label: 'Entertainment' },
];

export const footerNavigation: readonly NavigationItem[] = [
  ...primaryNavigation,
  { href: 'faq/', label: 'FAQ' },
  { href: 'biz-haqimizda/', label: 'Biz haqimizda', i18nKey: 'nav.about' },
  { href: 'maxfiylik-siyosati/', label: 'Maxfiylik siyosati', i18nKey: 'nav.privacy' },
  { href: 'foydalanish-shartlari/', label: 'Foydalanish shartlari', i18nKey: 'nav.terms' },
  { href: 'qaytarish-siyosati/', label: 'Qaytarish siyosati' },
  { href: 'tasir/', label: 'Tayanch ta’siri' },
];
