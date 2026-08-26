export const tayanch10 = {
  status: 'proposed' as const,
  cycle: 'pilot-2026',
  seatsPerCycle: 10,
  ageRange: { min: 14, max: 30 },
  eligibility: [
    'O‘zbekiston hududlaridan birida yashash; Tashkent shahri tashqarisidagi arizalar pilot ustuvorligiga ega.',
    '14–30 yosh oralig‘ida bo‘lish; 18 yoshdan kichiklar uchun ota-ona yoki qonuniy vakil roziligi.',
    'Internet orqali kursni muntazam o‘qish va yakuniy portfolio natijasini tayyorlash imkoniyati.',
    'Bitta arizachi bir siklda bitta kurs uchun ariza beradi.',
    'Arizada maqsad va ehtiyojni rost yozish; pasport yoki bank ma’lumotlarini forma orqali yubormaslik.'
  ],
  rubric: [
    ['Ehtiyoj', 35],
    ['Maqsadning aniqligi', 25],
    ['Kursni yakunlash rejasi', 20],
    ['Hududiy qamrov va ta’sir', 20]
  ] as const,
  workflow: [
    '1–20-kun: arizalarni qabul qilish va dublikatlarni tekshirish.',
    '21–24-kun: eligibility filtri va rubric bo‘yicha ikki bosqichli ko‘rib chiqish.',
    '25–26-kun: short-list, zarur bo‘lsa qisqa suhbat va konflikt tekshiruvi.',
    '27-kun: tanlanganlar va kutish ro‘yxatiga alohida email yuborish.',
    'Oy oxiri: faqat consent berilgan umumiy sonlarni impact dashboardga qo‘shish.'
  ],
} as const;
