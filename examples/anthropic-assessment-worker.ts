/**
 * Tayanch practical-assessment backend example.
 * Deploy separately (for example as a Cloudflare Worker) and set ANTHROPIC_API_KEY
 * as a secret. Never put this file's secret in Astro/public frontend code.
 */
export interface Env { ANTHROPIC_API_KEY: string; }

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': 'https://javohirqaxramonov36-web.github.io', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST, OPTIONS' } });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return json({}, 204);
    if (request.method !== 'POST') return json({ error: 'Faqat POST ruxsat etiladi.' }, 405);
    if (!env?.ANTHROPIC_API_KEY?.trim()) return json({ error: 'Baholash xizmati hozircha sozlanmoqda.' }, 503);
    const input = await request.json().catch(() => null) as { course?: string; rubric?: string; answer?: string } | null;
    if (!input?.course || !input.rubric || !input.answer || input.answer.length > 12000) return json({ error: 'course, rubric va 12 000 belgigacha answer kerak.' }, 400);
    const prompt = `Kurs: ${input.course}\nRubrika: ${input.rubric}\nTalaba javobi:\n${input.answer}`;
    const upstream = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 700, system: 'Sen Tayanch kursi uchun xolis, qisqa va amaliy o‘qituvchi feedback yozasan. Rubrikadagi har bir mezon uchun kuchli tomon, bitta yaxshilash qadami va keyingi mashqni ber. Yakuniy bahoni qat’iy hukm sifatida emas, yo‘nalish sifatida yoz. Uzbek tilida javob ber.', messages: [{ role: 'user', content: prompt }] }) });
    if (!upstream.ok) return json({ error: 'Baholash provayderi javob bermadi.' }, 502);
    const data = await upstream.json() as { content?: Array<{ text?: string }> };
    return json({ feedback: data.content?.map((item) => item.text || '').join('\n').trim() || 'Feedback qaytmadi.' });
  },
};
