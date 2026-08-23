export type Locale = 'uz' | 'ru' | 'en';

type PathMap = Partial<Record<Locale, string>>;

// Pages that have verified static translations. Anything absent here deliberately
// keeps its Uzbek URL rather than creating a 404 from the language navigation.
const routeMap: Record<string, PathMap> = {
  '': { uz: '', ru: '', en: '' },
  'kurslar/': { uz: 'kurslar/', ru: 'kurslar/', en: 'kurslar/' },
  'kurslar/admission-process/': { uz: 'kurslar/admission-process/', ru: 'kurslar/admission-process/', en: 'kurslar/admission-process/' },
  'kurslar/ai-agentlar/': { uz: 'kurslar/ai-agentlar/', ru: 'kurslar/ai-agentlar/', en: 'kurslar/ai-agentlar/' },
  'kurslar/autocad-on-mac/': { uz: 'kurslar/autocad-on-mac/', ru: 'kurslar/autocad-on-mac/', en: 'kurslar/autocad-on-mac/' },
  'kurslar/backend-python/': { uz: 'kurslar/backend-python/', ru: 'kurslar/backend-python/', en: 'kurslar/backend-python/' },
  'kurslar/chet-elda-oqish/': { uz: 'kurslar/chet-elda-oqish/', ru: 'kurslar/chet-elda-oqish/', en: 'kurslar/chet-elda-oqish/' },
  'kurslar/computer-literacy/': { uz: 'kurslar/computer-literacy/', ru: 'kurslar/computer-literacy/', en: 'kurslar/computer-literacy/' },
  'kurslar/data-analytics/': { uz: 'kurslar/data-analytics/', ru: 'kurslar/data-analytics/', en: 'kurslar/data-analytics/' },
  'kurslar/el-yurt-umidi/': { uz: 'kurslar/el-yurt-umidi/', ru: 'kurslar/el-yurt-umidi/', en: 'kurslar/el-yurt-umidi/' },
  'kurslar/figma/': { uz: 'kurslar/figma/', ru: 'kurslar/figma/', en: 'kurslar/figma/' },
  'kurslar/financial-literacy/': { uz: 'kurslar/financial-literacy/', ru: 'kurslar/financial-literacy/', en: 'kurslar/financial-literacy/' },
  'kurslar/mac-tezlik-sirlari/': { uz: 'kurslar/mac-tezlik-sirlari/', ru: 'kurslar/mac-tezlik-sirlari/', en: 'kurslar/mac-tezlik-sirlari/' },
  'kurslar/obsidian/': { uz: 'kurslar/obsidian/', ru: 'kurslar/obsidian/', en: 'kurslar/obsidian/' },
  'kurslar/prompt-engineering/': { uz: 'kurslar/prompt-engineering/', ru: 'kurslar/prompt-engineering/', en: 'kurslar/prompt-engineering/' },
  'kurslar/tekin-ai/': { uz: 'kurslar/tekin-ai/', ru: 'kurslar/tekin-ai/', en: 'kurslar/tekin-ai/' },
  'kurslar/vibe-coding/': { uz: 'kurslar/vibe-coding/', ru: 'kurslar/vibe-coding/', en: 'kurslar/vibe-coding/' },
  'kurslar/ielts-vocabulary/': { uz: 'kurslar/ielts-vocabulary/', ru: 'kurslar/ielts-vocabulary/', en: 'kurslar/ielts-vocabulary/' },
  'kurslar/ielts-writing/typing/': { uz: 'kurslar/ielts-writing/typing/', ru: 'kurslar/ielts-writing/typing/', en: 'kurslar/ielts-writing/typing/' },
  'kurs-tanlash/': { uz: 'kurs-tanlash/', ru: 'kurs-tanlash/', en: 'kurs-tanlash/' },
  'profile/': { uz: 'profile/', ru: 'profile/', en: 'profile/' },
  'md2pdf/': { uz: 'md2pdf/', ru: 'md2pdf/', en: 'md2pdf/' },
  'tech-lab/': { uz: 'tech-lab/', ru: 'tech-lab/', en: 'tech-lab/' },
  'ielts-mock/': { uz: 'ielts-mock/', ru: 'ielts-mock/', en: 'ielts-mock/' },
  'ielts-mock/results/': { uz: 'ielts-mock/results/', ru: 'ielts-mock/results/', en: 'ielts-mock/results/' },
  'ielts-practice/': { uz: 'ielts-practice/', ru: 'ielts-practice/', en: 'ielts-practice/' },
  'ielts-practice/listening/': { uz: 'ielts-practice/listening/', ru: 'ielts-practice/listening/', en: 'ielts-practice/listening/' },
  'ielts-practice/reading/': { uz: 'ielts-practice/reading/', ru: 'ielts-practice/reading/', en: 'ielts-practice/reading/' },
  'ielts-practice/writing/': { uz: 'ielts-practice/writing/', ru: 'ielts-practice/writing/', en: 'ielts-practice/writing/' },
  'narxlar/': { uz: 'narxlar/', ru: 'narxlar/', en: 'narxlar/' },
  'bog-lanish/': { uz: 'bog-lanish/', ru: 'bog-lanish/', en: 'bog-lanish/' },
  'homiylik/': { uz: 'homiylik/', ru: 'homiylik/', en: 'homiylik/' },
  'faq/': { uz: 'faq/', ru: 'faq/', en: 'faq/' },
  'biz-haqimizda/': { uz: 'biz-haqimizda/', ru: 'biz-haqimizda/', en: 'biz-haqimizda/' },
  'mening-yolim/': { uz: 'mening-yolim/', ru: 'moy-put/', en: 'my-journey/' },
  'maxfiylik-siyosati/': { uz: 'maxfiylik-siyosati/', ru: 'privacy-policy/', en: 'privacy-policy/' },
  'foydalanish-shartlari/': { uz: 'foydalanish-shartlari/', ru: 'terms-of-use/', en: 'terms-of-use/' },
};

export function localizedPath(locale: Locale, path = ''): string {
  const normalized = path.replace(/^\/+/, '');
  const mapped = routeMap[normalized]?.[locale];
  if (!mapped || locale === 'uz') return normalized;
  return `${locale}/${mapped}`;
}

export function localeAlternates(path = '') {
  const normalized = path.replace(/^\/+/, '');
  return (['uz', 'ru', 'en'] as const).map((lang) => ({ lang, href: `/${localizedPath(lang, normalized)}` }));
}
