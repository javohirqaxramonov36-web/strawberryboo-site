export type ImpactLocale = 'uz' | 'ru' | 'en';

export interface CareerOutcome {
  slug: string;
  portfolio: string;
  canDo: string[];
  nextSteps: string[];
  bonus: string;
  earningNote?: string;
}

export const careerOutcomes: Record<string, CareerOutcome> = {
  'ai-agentlar': {
    slug: 'ai-agentlar',
    portfolio: 'CrewAI yoki LangGraph bilan ishlaydigan, vazifani rejalashtiradigan va natijani Markdown hisobotga chiqaradigan AI agent.',
    canDo: ['Tadqiqot, hisobot va kontent oqimini avtomatlashtirish', 'Agent loyihasini GitHub README va demo bilan ko‘rsatish', 'Kichik biznes yoki freelancer mijoziga avtomatlashtirish taklifini tayyorlash'],
    nextSteps: ['Agentning muammosi, kirishi va chiqishini bir sahifada yozing', 'Demo video va GitHub README tayyorlang', 'Maqsadli mijozga bitta aniq xizmat taklifini yuboring'],
    bonus: 'CV va LinkedIn’da agentning vazifasi, sizning rolingiz va o‘lchanadigan natijani yozish.',
    earningNote: 'Masalan, avtomatlashtirish yoki tadqiqot workflow’i uchun loyiha narxi qo‘yilishi mumkin; miqdor mijoz, scope va tajribaga bog‘liq.'
  },
  'data-analytics': {
    slug: 'data-analytics',
    portfolio: 'Ochiq sotuv dataset’i bo‘yicha tozalangan jadval, SQL/Python tahlili, dashboard va 3 ta biznes tavsiyasidan iborat case-study.',
    canDo: ['Excel/Sheets, SQL va pandas bilan ma’lumotni tayyorlash', 'Dashboard orqali trend va segmentlarni tushuntirish', 'Tahlil natijasini menejer yoki mijoz uchun qisqa xulosaga aylantirish'],
    nextSteps: ['Ochiq dataset va biznes savolini tanlang', 'Notebook yoki Sheets faylini izohlar bilan saqlang', 'Dashboard, xulosa va tavsiyalarni bitta portfolio sahifasiga joylang'],
    bonus: 'CV va LinkedIn’da ishlatilgan vositalar, dataset hajmi va topilmani aniq ko‘rsatish.',
    earningNote: 'Masalan, dashboard yoki dataset tahlili uchun loyiha narxi qo‘yilishi mumkin; bu bozor va portfolio sifatiga bog‘liq, kafolat emas.'
  },
  'backend-python': {
    slug: 'backend-python',
    portfolio: 'FastAPI va PostgreSQL bilan autentifikatsiyali mini-CRM yoki To-Do API, README, testlar va deploy havolasi.',
    canDo: ['REST endpoint va ma’lumotlar bazasi sxemasini yaratish', 'API hujjatini va xatolarni boshqarishni yozish', 'Kichik backend’ni test qilib, deploy jarayonini tushuntirish'],
    nextSteps: ['API uchun foydalanuvchi muammosini va 4–6 endpointni belgilang', 'README’da o‘rnatish, endpointlar va demo ma’lumotlarini ko‘rsating', 'GitHub loyihasiga test natijasi va deploy havolasini qo‘shing'],
    bonus: 'CV va LinkedIn’da stack, endpointlar soni va foydalanuvchi muammosini yozish.'
  },
  figma: {
    slug: 'figma',
    portfolio: 'Mahalliy xizmat yoki ta’lim mahsuloti uchun research, wireframe, responsive UI kit va clickable prototype’dan iborat Figma case-study.',
    canDo: ['Foydalanuvchi oqimi va mobil/desktop ekranlarini loyihalash', 'Komponent, auto layout va prototip bilan izchil UI yaratish', 'Dizayn qarorlarini case-study va handoff bilan tushuntirish'],
    nextSteps: ['Bitta foydalanuvchi muammosi va flow’ni tanlang', 'Wireframe’dan polished prototype’gacha versiyalarni saqlang', 'Case-study’da muammo, qaror va keyingi testni yozing'],
    bonus: 'CV va LinkedIn’da loyiha roli, ekranlar soni va yechilgan muammoni ko‘rsatish.'
  },
  'prompt-engineering': {
    slug: 'prompt-engineering',
    portfolio: 'Bir xil topshiriqni yomon va yaxshi prompt bilan solishtiradigan, tekshiruv mezonlari va qayta ishlash log’iga ega prompt kutubxonasi.',
    canDo: ['AI natijasini rol, kontekst, misol va format bilan boshqarish', 'Natijani tekshirish mezonlarini yozish', 'Jamoa yoki mijoz uchun qayta ishlatiladigan prompt workflow yaratish'],
    nextSteps: ['Takrorlanadigan bitta ish jarayonini tanlang', 'Prompt versiyalari va sifat mezonlarini saqlang', 'Oldin/keyin misolini portfolio sifatida joylang'],
    bonus: 'CV va LinkedIn’da prompt emas, avtomatlashtirilgan jarayon va natijani ta’riflash.',
    earningNote: 'Masalan, prompt audit yoki AI workflow sozlash xizmatini taklif qilish mumkin; daromad xizmat scope’i va mijoz talabiga bog‘liq.'
  }
};

export const financialLiteracyModules = [
  ['01', 'Kirim, xarajat va byudjet', 'Daromadni toifalarga ajratish, majburiy va ixtiyoriy xarajatlarni ko‘rish.'],
  ['02', 'Maqsad va 30 kunlik reja', 'Qisqa muddatli maqsad, minimal zaxira va haftalik tekshiruvni tuzish.'],
  ['03', 'Qarz va kredit xavfi', 'Foiz, kechikish, jami qaytariladigan summa va qarz yukini solishtirish.'],
  ['04', 'Tejash va favqulodda jamg‘arma', 'Kichik summadan boshlash, alohida zaxira va xarajat limitlarini belgilash.'],
  ['05', 'Onlayn daromad va xavfsizlik', 'Freelance daromadini kafolat deb qabul qilmaslik, komissiya, soliq va firibgarlik xavfini tekshirish.'],
  ['06', 'Shaxsiy moliya dashboardi', 'Byudjet kalkulyatori va oy yakuni xulosasi bilan o‘zgarishni kuzatish.']
] as const;

export const impactMetrics = {
  learnersSurveyed: 0,
  employmentOutcomesVerified: 0,
  freelanceStartersVerified: 0,
  salaryImprovementVerified: 0,
};
