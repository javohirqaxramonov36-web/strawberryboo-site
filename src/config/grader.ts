// IELTS Writing baholash uchun Cloudflare Worker manzili.
// Vazifa 3 ni ishga tushirganda shu yergagina haqiqiy Worker URL ni qo‘ying:
//   wrangler deploy → berilgan https://ielts-grader.<sub>.workers.dev manzilini shu yerga yozing.
// Eslatma: quyidagi manzil vaqtinchalik (temporary) deploy; GEMINI_API_KEY secret
// o‘rnatilgandan va haqiqiy account’ga o‘tkazilgandan keyin almashtiring.
export const GRADER_WORKER_URL = 'https://ielts-grader.darkened-save.workers.dev';
