// Tayanch — IELTS Writing AI baholash Worker (Cloudflare Workers, bepul tier).
// Vazifa: GitHub Pages (static) sahifasidan kelgan inshoni Google Gemini orqali
// IELTS rasmiy mezonlari bo‘yicha 0–9 ball bilan baholash va JSON qaytarish.
//
// Nima uchun Worker kerak: Google Gemini REST API CORS bilan cheklangan, shuning
// uchun brauzer to‘g‘ridan-to‘g‘ri chaqa olmaydi. Worker proxy vazifasini bajaradi,
// CORSni faqat rasmiy saytga ochadi va sodiq foydalanuvchi chegarasini qo‘yadi.

const ALLOWED_ORIGIN = 'https://javohirqaxramonov36-web.github.io';
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3; // bir IP dan 1 daqiqada maks 3 so‘rov

// Eslatma: Workers davomiy xotira emas — chegaralar worker ishga tushganda
// tozalanadi. Bepul tier uchun yetarli; kerak bo‘lsa KV/Durable Object ga o‘tkazing.
const hits = new Map();

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin');
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: "Faqat POST so'rovi qabul qilinadi." }, 405, cors);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
      return json({ error: "Juda ko'p so'rov. 1 daqiqadan keyin urinib ko'ring." }, 429, cors);
    }
    recent.push(now);
    hits.set(ip, recent);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Noto'g'ri so'rov formati (JSON kerak)." }, 400, cors);
    }

    const essay = String(body?.essay || '').trim();
    const task = body?.task === 2 ? 2 : 1;
    if (essay.length < 20) {
      return json({ error: "Insho juda qisqa. Kamida bir necha jumla yozing." }, 400, cors);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "Server sozlanmagan (API kaliti yo'q)." }, 500, cors);
    }

    let graded;
    try {
      graded = await gradeWithGemini(env.GEMINI_API_KEY, essay, task);
    } catch {
      return json({ error: "AI baholash vaqtincha ishlamayapti. Keyinroq urinib ko'ring." }, 502, cors);
    }
    return json(graded, 200, cors);
  },
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

function clampScore(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(9, Math.round(n * 2) / 2));
}

async function gradeWithGemini(key, essay, task) {
  const prompt = buildPrompt(essay, task);
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
    key;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            taskAchievement: { type: 'NUMBER' },
            coherenceCohesion: { type: 'NUMBER' },
            lexicalResource: { type: 'NUMBER' },
            grammaticalRange: { type: 'NUMBER' },
            overall: { type: 'NUMBER' },
            feedback: { type: 'STRING' },
          },
          required: [
            'taskAchievement',
            'coherenceCohesion',
            'lexicalResource',
            'grammaticalRange',
            'overall',
            'feedback',
          ],
        },
      },
    }),
  });

  if (!res.ok) throw new Error('gemini_status_' + res.status);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('invalid_json');
  }

  return {
    taskAchievement: clampScore(parsed.taskAchievement),
    coherenceCohesion: clampScore(parsed.coherenceCohesion),
    lexicalResource: clampScore(parsed.lexicalResource),
    grammaticalRange: clampScore(parsed.grammaticalRange),
    overall: clampScore(parsed.overall),
    feedback: String(parsed.feedback || '').slice(0, 600),
  };
}

function buildPrompt(essay, task) {
  const taskName = task === 2 ? 'Task 2' : 'Task 1';
  return `Siz IELTS rasmiy baholash mezonlari bo'yicha tajribali IELTS Writing tekshiruvchisisiz. Quyidagi IELTS Writing ${taskName} inshosini baholang.

Har bir mezon 0–9 oralig'ida bo'lsin (0.5 qadam bilan, ya'ni 5.0, 5.5, 6.0 ... 9.0).
Mezonlar:
- taskAchievement: ${task === 2 ? "Task Response — mavzuni tushunish, fikrni rivojlantirish, dalil/noqo'llab-quvvatlash." : "Task Achievement — ma'lumotni aniq, to'liq va aniq formatda yetkazish (grafika/xat ga asoslangan)."}
- coherenceCohesion: matnning bog'liqligi, abzats va bog'lovchi vositalar.
- lexicalResource: so'z boyligi, aniqlik, qoidalarga rioya.
- grammaticalRange: grammatika xilma-xilligi va to'g'riligi.
- overall: to'rt mezonning o'rtacha qiymati (0.5 gacha yaxlitlangan).
- feedback: 2–4 jumla, faqat O'ZBEK tilida. Asosiy xato(lar) va aniq yaxshilash maslahati.

Insho:
"""
${essay}
"""

Faqat JSON obyekt qaytaring, boshqa hech narsa yozmang:
{"taskAchievement": <son>, "coherenceCohesion": <son>, "lexicalResource": <son>, "grammaticalRange": <son>, "overall": <son>, "feedback": "<matn>"}`;
}
