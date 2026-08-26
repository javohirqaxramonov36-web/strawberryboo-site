export const tayanch10 = {
  status: 'active' as const,
  cycle: '2026-09',
  applicationOpenFrom: '2026-08-26',
  firstReviewDate: '2026-09-30',
  seatsPerCycle: 5,
  benefit: 'Bitta mavjud kursga to‘liq bepul kirish huquqi. Naqd pul, internet/qurilma xarajati yoki boshqa moliyaviy yordam berilmaydi.',
  ageRange: { min: 14, max: 30 },
  eligibility: [
    'Toshkent shahri tashqarisidagi viloyat, Qoraqalpog‘iston Respublikasi yoki hududiy markazlardan birida yashash.',
    '14–30 yosh oralig‘ida bo‘lish; 18 yoshdan kichiklar uchun ota-ona yoki qonuniy vakil roziligi.',
    'Internet va mos qurilmaga ega bo‘lish; kursni muntazam o‘qish va yakuniy natijani tayyorlash imkoniyati.',
    'Bitta arizachi bir siklda bitta mavjud kurs uchun ariza beradi.',
    'Arizada maqsadni rost yozish; pasport, bank yoki boshqa maxsus ma’lumotlarni forma orqali yubormaslik.'
  ],
  rubric: [
    ['Ehtiyoj', 35],
    ['Maqsadning aniqligi', 25],
    ['Kursni yakunlash rejasi', 20],
    ['Hududiy qamrov va ta’sir', 20]
  ] as const,
  workflow: [
    'Arizalar 2026-08-26 dan boshlab doimiy qabul qilinadi.',
    'Har oyning oxirida eligibility filtri, dublikat tekshiruvi va ikki bosqichli rubric ko‘rigi o‘tkaziladi.',
    'Birinchi ko‘rib chiqish: 2026-09-30; keyingi sikllar har oy oxirida.',
    'Tanlanganlar va kutish ro‘yxatiga alohida email yuboriladi; kirish huquqi admin tomonidan beriladi.',
    'Oy oxiri: faqat consent berilgan umumiy sonlarni impact dashboardga qo‘shish.'
  ],
} as const;
