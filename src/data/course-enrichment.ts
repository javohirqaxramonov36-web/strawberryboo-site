export type DownloadResource = {
  slug: string;
  label: string;
  path: string;
  kind: 'markdown' | 'template' | 'checklist' | 'cheatsheet' | 'json';
};

export type Bundle = {
  slug: string;
  title: string;
  description: string;
  courses: string[];
  price: string;
  saving: string;
  priceStatus?: 'placeholder';
};

export type StudentOutcome = {
  courseSlug: string;
  name: string;
  outcome: string;
  status: 'placeholder' | 'verified';
};

export const courseFocus: Record<string, { modules: string[]; focus: string }> = {
  'prompt-engineering': { focus: 'rol, kontekst, misol va format bilan aniq prompt tuzish', modules: ['Prompt nima va qachon kerak?', 'Rol, kontekst, misol va format', 'Amaliy promptni yaxshilash', 'Murakkab vazifani bosqichlash', 'Few-shot bilan namuna berish', 'Yozish, kod va tadqiqotda qo‘llash', 'Xavfsiz va tekshiriladigan workflow'] },
  obsidian: { focus: 'o‘qigan narsani qayta topiladigan shaxsiy bilim bazasiga aylantirish', modules: ['Vault va kundalik note', 'Atomic note va sarlavha', 'Link va backlink', 'Tag, qidiruv va papkalar', 'Flashcard va spaced repetition', 'AI yordamida capture', 'Xavfsiz backup va plugin tanlovi'] },
  'ai-agentlar': { focus: 'vazifani rejalashtiradigan va natijani tekshiradigan agent workflow qurish', modules: ['Chat va agent farqi', 'Rollar bilan CrewAI', 'LangGraph oqimi', 'Mahalliy model tajribasi', 'Agent xotirasi', 'Tool va ruxsat chegarasi', 'Ko‘p bosqichli workflow'] },
  'tekin-ai': { focus: 'bepul yoki mahalliy AI vositalarini xavfsiz tanlash', modules: ['Mahalliy va bulutli model', 'Ollama asoslari', 'Agent frameworklar', 'Xotira va capture', 'Kredit va API kalit xavfsizligi'] },
  'ielts-listening': { focus: 'signal so‘zlar, distractorlar va tekshiruv bilan listeningni mashq qilish', modules: ['Savolni oldindan o‘qish', 'Signal so‘zlar', 'Raqam va spelling', 'Distractorni ajratish', 'Xato jurnalini yuritish'] },
  'ielts-reading': { focus: 'savol turini tez aniqlash va vaqtni boshqarish', modules: ['Skim va scan', 'True/False/Not Given', 'Matching va headings', 'Vocabulary kontekstda', 'Xato patternlari'] },
  'ielts-writing': { focus: 'Task 1/2 javobini rejalash, yozish va rubrika bo‘yicha tekshirish', modules: ['Taskni tushunish', 'Outline va thesis', 'Body paragraph', 'Task 1 overview', 'Paraphrase va cohesion', 'Band descriptor bilan tahrir', 'AI feedbackni tanqidiy o‘qish'] },
  'ielts-speaking': { focus: '30 kunlik cue-card va javobni kengaytirish mashqi', modules: ['Fluency va pause', 'Part 1 javoblari', 'Part 2 cue-card', 'Part 3 fikrni asoslash', 'Talaffuz va shadowing', '30 kunlik streak'] },
  'ielts-vocabulary': { focus: 'so‘zlarni kontekst, qayta uchratish va faol ishlatish bilan yodlash', modules: ['So‘zni tanlash', 'Context sentence', 'Collocation', 'Flashcard', 'Spaced repetition'] },
  'admission-process': { focus: 'hujjat, essay va deadline’larni bitta tekshiriladigan tizimda boshqarish', modules: ['Master profile', 'Activities va CV', 'Personal statement', 'Why major', 'Platforma va deadline', 'Final review'] },
  'chet-elda-oqish': { focus: 'xorijda o‘qish motivi va rasmiy grant manbalarini baholash', modules: ['Maqsadni aniqlash', 'Universitetni tekshirish', 'Grant manbalari', 'Talablar ro‘yxati', 'Birinchi harakat rejasi'] },
  'mac-tezlik-sirlari': { focus: 'Mac’dagi takroriy ishlarni shortcut va tizim vositalari bilan qisqartirish', modules: ['Keyboard shortcutlar', 'Raycast', 'Window va file workflow', 'Clipboard', 'Takroriy ishlar'] },
  figma: { focus: 'Figma’da sodda, tushunarli va tekshiriladigan UI maket yaratish', modules: ['Frame va layer', 'Typography', 'Color va grid', 'Component', 'Auto layout', 'Prototype'] },
  'autocad-on-mac': { focus: 'Mac’da AutoCAD bilan tartibli chizma va PDF workflow yaratish', modules: ['O‘rnatish va student access', 'Interface va units', 'Line va polyline', 'Layer', 'Block', 'Dimension va layout'] },
  'financial-literacy': { focus: 'daromad, xarajat va maqsadlarni sodda byudjetga aylantirish', modules: ['Daromad va xarajat', 'Talaba byudjeti', 'Jamg‘arma maqsadi', 'Qarz va risk', 'Oylik tekshiruv'] },
  'computer-literacy': { focus: 'fayl, hujjat va bulutli ishlarni kundalik xavfsiz bajarish', modules: ['Fayl va papka', 'Word yoki Docs', 'Excel yoki Sheets', 'Taqdimot', 'Backup va xavfsizlik'] },
  'data-analytics': { focus: 'jadval, SQL va Python orqali savolga javob beradigan tahlil qilish', modules: ['Excel interfeysi', 'SQL SELECT', 'Tozalash', 'Dashboard', 'Python va pandas', 'Korrelyatsiya'] },
  'backend-python': { focus: 'Python, FastAPI va PostgreSQL bilan kichik backend qurish', modules: ['Python asoslari', 'API tushunchasi', 'FastAPI endpoint', 'PostgreSQL', 'Auth asoslari', 'Mini-loyiha'] },
  'vibe-coding': { focus: 'AI yordamida g‘oyani kichik, tekshiriladigan web-loyihaga aylantirish', modules: ['G‘oyani scope qilish', 'Agentga brief berish', 'Diff va test', 'MCP va xavfsizlik', 'Deploy checklist'] },
  'general-english-beginner': { focus: 'A1 darajada sodda gap, kundalik lug‘at va tinglash poydevorini qurish', modules: ['Salomlashish va tanishtirish', 'Be fe’li', 'Kundalik so‘zlar', 'Sodda savollar', 'Qisqa listening'] },
  'general-english-elementary': { focus: 'A2 darajada kundalik vaziyatlarda ishonchliroq muloqot qilish', modules: ['Present va past', 'Kundalik vaziyat', 'Savol berish', 'Lug‘atni bog‘lash', 'Qisqa suhbat'] },
  'general-english-pre-intermediate': { focus: 'A2–B1 darajada fikrlarni bog‘lash va mustaqil gapirish', modules: ['Linking words', 'Tense review', 'Modal fe’llar', 'Uzunroq listening', 'Fikr bildirish'] },
  'general-english-intermediate': { focus: 'B1 darajada ravonlik, aniqlik va faol lug‘atni oshirish', modules: ['Narrative tenses', 'Opinion va sabab', 'Work/study vocabulary', 'Authentic listening', 'Conversation repair'] },
  'general-english-upper-intermediate': { focus: 'B2 darajada murakkab fikr va argumentni aniq ifodalash', modules: ['Complex grammar', 'Argument structure', 'Collocation', 'Presentation language', 'Advanced listening'] },
  'general-english-advanced': { focus: 'C1 darajada nozik ma’no, akademik va professional muloqot', modules: ['Nuance va register', 'Advanced vocabulary', 'Presentation', 'Critical response', 'High-level listening'] },
  'sat-math': { focus: 'SAT Math savollarida algebra, geometriya va statistikani strategiya bilan qo‘llash', modules: ['Linear equations', 'Functions', 'Quadratics', 'Data and percentages', 'Geometry', 'Timed practice'] },
  'sat-english': { focus: 'SAT Reading & Writing savol turini aniqlab, dalil bilan tez javob berish', modules: ['Central idea', 'Evidence', 'Transitions', 'Grammar boundaries', 'Rhetorical purpose', 'Timed practice'] },
  'desmos-applications': { focus: 'Desmos’dan ruxsat etilgan SAT Math masalalarida tekshiruvchi vosita sifatida foydalanish', modules: ['Interface', 'Graphing', 'Intersection', 'Table', 'Regression', 'When not to use it'] },
  'el-yurt-umidi': { focus: 'rasmiy talablarni tekshirib, grant suhbatiga dalil asosida tayyorlanish', modules: ['Official criteria', 'Document map', 'Motivation', 'Interview practice', 'Evidence and follow-up'] },
};

export const downloads: DownloadResource[] = [
  { slug: 'prompt-engineering', label: 'Prompt kutubxonasi shabloni', path: 'downloads/prompt-engineering/prompt-kutubxonasi.md', kind: 'template' },
  { slug: 'obsidian', label: 'Obsidian vault shabloni', path: 'downloads/obsidian/obsidian-vault-shabloni.md', kind: 'template' },
  { slug: 'ielts-speaking', label: '30 kunlik cue-card bank', path: 'downloads/ielts-speaking/30-kunlik-cue-card-bank.md', kind: 'markdown' },
  { slug: 'ielts-writing', label: 'IELTS Writing rubric checklist', path: 'downloads/ielts-writing/writing-rubric-checklist.md', kind: 'checklist' },
  ...['general-english-beginner','general-english-elementary','general-english-pre-intermediate','general-english-intermediate','general-english-upper-intermediate','general-english-advanced'].map((slug) => ({ slug, label: 'Vocabulary va kunlik mashq jadvali', path: `downloads/${slug}/vocabulary-va-jadval.md`, kind: 'markdown' as const })),
  { slug: 'sat-math', label: 'SAT Math formula cheat-sheet', path: 'downloads/sat-math/formula-cheat-sheet.md', kind: 'cheatsheet' },
  { slug: 'sat-english', label: 'SAT English rule cheat-sheet', path: 'downloads/sat-english/rule-cheat-sheet.md', kind: 'cheatsheet' },
  { slug: 'desmos-applications', label: 'Desmos quick reference', path: 'downloads/desmos-applications/desmos-quick-reference.md', kind: 'cheatsheet' },
];

const genericDownloads: DownloadResource[] = Object.keys(courseFocus)
  .filter((slug) => !downloads.some((item) => item.slug === slug))
  .map((slug) => ({ slug, label: 'Kurs amaliy checklisti', path: `downloads/${slug}/amaliy-checklist.md`, kind: 'checklist' }));
export const allDownloads = [...downloads, ...genericDownloads];

export const bundles: Bundle[] = [
  { slug: 'ai-starter', title: 'AI Starter Bundle', description: 'Prompt Engineering + AI Agentlar + Tekin AI. Boshlash uchun uchta alohida, amaliy yo‘l.', courses: ['prompt-engineering','ai-agentlar','tekin-ai'], price: '$70', saving: 'Alohida narxlardan $17 tejash · taxminan 20%' },
  { slug: 'admission-writing', title: 'Admission + IELTS Writing', description: 'Essay va ariza jarayonini IELTS Writing mashqi bilan bog‘lang.', courses: ['admission-process','ielts-writing'], price: 'Narx belgilanmoqda', saving: 'Paket narxi keyin belgilanadi', priceStatus: 'placeholder' },
  { slug: 'sat-bundle', title: 'SAT Bundle', description: 'SAT Math + SAT English + Desmos Applications. Uchta yo‘nalish uchun tasdiqlangan muvozanatli bundle narxi.', courses: ['sat-math','sat-english','desmos-applications'], price: '$67', saving: 'Alohida narxlardan $12 tejash · taxminan 15%' },
];

export const generalEnglishPath = ['general-english-beginner','general-english-elementary','general-english-pre-intermediate','general-english-intermediate','general-english-upper-intermediate','general-english-advanced'];

export const studentOutcomes: StudentOutcome[] = [
  { courseSlug: 'prompt-engineering', name: 'Keyinroq qo‘shiladi', outcome: 'Faqat ruxsat berilgan, tekshirilgan talaba natijalari kiritiladi.', status: 'placeholder' },
];

export function getDownload(slug: string) { return allDownloads.find((item) => item.slug === slug); }
export function getCourseFocus(slug: string) { return courseFocus[slug] ?? { focus: 'mavzuni amaliy qadamlar bilan o‘rganish', modules: [] }; }
