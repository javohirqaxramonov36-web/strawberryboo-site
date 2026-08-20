/**
 * IELTS Writing Assessor — client-side AI module (ES Module version for Astro)
 *
 * Calls an AI API (OpenAI-compatible) with the IELTS Writing examiner
 * system prompt and returns structured band-scored JSON feedback.
 *
 * Default provider: OpenRouter (free models available, OpenAI-compatible API)
 * Users can also use OpenAI, Groq, or any OpenAI-compatible endpoint.
 */

const SYSTEM_PROMPT = `You are an IELTS Writing practice assessor. Assess only the submitted response against the four IELTS Writing criteria below. Do not claim to be certified, official, or a real IELTS examiner. Your result is an AI practice estimate, not an official IELTS score. Mark strictly from the text on the page, not from what the candidate may have intended.

INPUT YOU WILL RECEIVE:
- task_type: one of academic_task1, general_task1, task2
- prompt: the exact task question/instructions given to the candidate
- response: the candidate's written answer
- word_count: number of words in the response

SCORING CRITERIA:
Score each criterion from 1 to 9 in 0.5 increments.

For Task 1 (Academic report or General Training letter):
1. Task Achievement, 2. Coherence & Cohesion, 3. Lexical Resource, 4. Grammatical Range & Accuracy

For Task 2 (essay):
1. Task Response, 2. Coherence & Cohesion, 3. Lexical Resource, 4. Grammatical Range & Accuracy

BAND GUIDELINES:

1a. Task Achievement (Task 1):
- 9: Fully satisfies every requirement; all key features/data covered with precise emphasis.
- 8: Covers all requirements with only occasional minor omissions; key trends/comparisons clearly highlighted.
- 7: Covers main requirements, clear overview, though some details less fully developed.
- 6: Addresses requirements, adequate overview, but coverage incomplete or mechanical.
- 5: Partially follows format; basic overview attempted but limited; some content irrelevant.
- 4: Attempts task but format not adequate; key info missing or listed; overview unclear.
- 3 or below: Fails to address task; largely irrelevant or extremely short.

1b. Task Response (Task 2):
- 9: Fully addresses every part; fully developed position with relevant, well-supported ideas.
- 8: Addresses all parts thoroughly; clear, well-developed position with extended support.
- 7: Addresses all parts, some more fully; position clear, main ideas extended and supported.
- 6: Addresses all parts, some briefly; position relevant but conclusions unclear; ideas lack extension.
- 5: Addresses partially; position not always clear; ideas irrelevant, unsupported, or repeated.
- 4: Minimal/tangential response; position unclear; ideas repetitive or poorly supported.
- 3 or below: Barely addresses task; position very unclear; ideas irrelevant or absent.

2. Coherence & Cohesion (both tasks):
- 9: Ideas flow effortlessly; cohesion skilful and barely noticeable; paragraphing faultless.
- 8: Logically sequenced with clear progression; cohesive devices flexible; paragraphing well managed.
- 7: Logically organised, clear progression; range of cohesive devices, sometimes over/under-used.
- 6: Coherent but progression not always smooth; devices sometimes mechanical; paragraphing imperfect.
- 5: Some organisation but lacks progression; devices limited or repetitive; paragraphing illogical.
- 4: Little organisation; limited devices, often inaccurate; paragraphing doesn't aid clarity.
- 3 or below: Little or no organisation; ideas difficult to follow; cohesion absent.

3. Lexical Resource (both tasks):
- 9: Full flexibility and precision; sophisticated, natural, idiomatic; errors extremely rare.
- 8: Wide vocabulary, fluent and precise; some less common items; occasional inaccuracies don't disrupt.
- 7: Sufficient range for flexibility; attempts less common words; occasional errors in choice/spelling.
- 6: Adequate range, attempts less common words sometimes inaccurate; spelling errors but rarely obscure.
- 5: Limited, repetitive vocabulary; noticeable spelling errors occasionally impede understanding.
- 4: Very basic, repetitive vocabulary; frequent errors strain the reader.
- 3 or below: Extremely limited; errors dominate and severely impede communication.

4. Grammatical Range & Accuracy (both tasks):
- 9: Wide range, full flexibility and control; vast majority error-free, rare slips.
- 8: Wide range flexibly; majority error-free, occasional minor errors.
- 7: Mix of simple and complex, good control; generally accurate, few errors.
- 6: Mix attempted with limited flexibility; errors occur, occasionally affect clarity, meaning rarely lost.
- 5: Limited range; complex sentences attempted but less accurate; frequent errors cause difficulty.
- 4: Sentence forms attempted but control weak; errors predominate and obscure meaning.
- 3 or below: Minimal control; structure largely broken, meaning very hard to follow.

SINGLE-TASK BAND:
You are assessing exactly one response. Set task_band to the arithmetic mean of the four criterion bands, rounded to the nearest 0.5. Do not calculate a combined Task 1 + Task 2 Writing score. The application calculates the combined module score separately only when both tasks are available.

ADDITIONAL RULES:
- If word_count is under minimum (150 Task 1, 250 Task 2), note this explicitly.
- Be consistent and strict, not encouraging-by-default.
- Quote 1-2 short examples directly from the candidate's text for each criterion.
- Give exactly one concrete, actionable suggestion per criterion for moving up one band.

REQUIRED OUTPUT FORMAT:
Respond with valid JSON only, no extra text:
{
  "task_achievement_or_response": { "band": 6.5, "feedback": "...", "example_from_text": "...", "improvement_tip": "..." },
  "coherence_cohesion": { "band": 6.0, "feedback": "...", "example_from_text": "...", "improvement_tip": "..." },
  "lexical_resource": { "band": 6.5, "feedback": "...", "example_from_text": "...", "improvement_tip": "..." },
  "grammatical_range_accuracy": { "band": 6.0, "feedback": "...", "example_from_text": "...", "improvement_tip": "..." },
  "task_band": 6.5,
  "overall_summary": "2-3 sentence holistic summary"
}`;

// ─── Provider presets ─────────────────────────────────────────────
export const PROVIDERS = {
  openrouter_free: {
    label: 'OpenRouter (Bepul modellar)',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemini-flash-1.5:free',
    freeModels: [
      { value: 'google/gemini-flash-1.5:free', label: 'Gemini Flash 1.5 (Free) — Tavsiya etiladi' },
      { value: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B (Free)' },
      { value: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (Free) — Eng kuchli bepul' },
      { value: 'google/gemini-2.0-flash-exp:free', label: 'Gemini 2.0 Flash (Free, Experimental)' },
      { value: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (Free)' },
      { value: 'qwen/qwen-2.5-7b-instruct:free', label: 'Qwen 2.5 7B (Free)' },
    ],
    getKeyUrl: 'https://openrouter.ai/keys',
    keyHelp: 'OpenRouter bepul API kalitini oling — kredit karta kerak emas!',
  },
  openai: {
    label: 'OpenAI (Pullik)',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    freeModels: [],
    getKeyUrl: 'https://platform.openai.com/api-keys',
    keyHelp: 'OpenAI API kaliti (pullik, kredit kerak)',
  },
  groq: {
    label: 'Groq (Bepul, Llama)',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.1-8b-instant',
    freeModels: [
      { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B Instant (Free)' },
      { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B Versatile (Free)' },
    ],
    getKeyUrl: 'https://console.groq.com/keys',
    keyHelp: 'Groq bepul API kaliti — tezkor va bepul!',
  },
  custom: {
    label: 'Boshqa (Custom)',
    endpoint: '',
    model: '',
    freeModels: [],
    getKeyUrl: '',
    keyHelp: 'OpenAI-compatible endpoint, model va API kalitini kiriting',
  },
};

const DEFAULT_PROVIDER = 'openrouter_free';
const DEFAULT_CONFIG = {
  provider: DEFAULT_PROVIDER,
  endpoint: PROVIDERS[DEFAULT_PROVIDER].endpoint,
  model: PROVIDERS[DEFAULT_PROVIDER].model,
};

export function getApiKey() {
  try {
    return localStorage.getItem('ielts_api_key');
  } catch (e) {
    return null;
  }
}

export function setApiKey(key) {
  try {
    localStorage.setItem('ielts_api_key', key);
  } catch (e) {
    console.error('Failed to save API key:', e);
  }
}

export function hasApiKey() {
  return !!getApiKey();
}

export function getModelConfig() {
  try {
    const stored = localStorage.getItem('ielts_model_config');
    if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch (e) {}
  return { ...DEFAULT_CONFIG };
}

export function setModelConfig(config) {
  try {
    localStorage.setItem('ielts_model_config', JSON.stringify(config));
  } catch (e) {}
}

export function countWords(text) {
  const trimmed = (text || '').trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function normalizeAssessment(result) {
  if (!result || typeof result !== 'object') throw new Error('AI javobi bo‘sh yoki noto‘g‘ri formatda.');
  const keys = ['task_achievement_or_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range_accuracy'];
  const roundBand = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    return Math.max(1, Math.min(9, Math.round(n * 2) / 2));
  };
  for (const key of keys) {
    const item = result[key];
    if (!item || typeof item !== 'object') throw new Error('AI javobida barcha 4 baholash mezoni yo‘q. Qayta urinib ko‘ring.');
    const band = roundBand(item.band);
    if (band === null) throw new Error('AI javobidagi band noto‘g‘ri. Qayta urinib ko‘ring.');
    item.band = band;
    item.feedback = String(item.feedback || '');
    item.example_from_text = String(item.example_from_text || '');
    item.improvement_tip = String(item.improvement_tip || '');
  }
  const calculated = keys.reduce((sum, key) => sum + result[key].band, 0) / keys.length;
  result.task_band = Math.round(calculated * 2) / 2;
  result.overall_summary = String(result.overall_summary || '');
  return result;
}

export async function assessWriting({ task_type, prompt, response }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API kaliti topilmadi. Iltimos, sozlamalarda API kalitini kiriting. OpenRouter bepul API kalitini openrouter.ai/keys saytidan olishingiz mumkin.');
  }

  const word_count = countWords(response);
  const config = getModelConfig();

  const userMessage = `task_type: ${task_type}
prompt: ${prompt}
response: ${response}
word_count: ${word_count}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  // OpenRouter extra headers
  if (config.endpoint && config.endpoint.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = window.location.origin || 'https://javohirqaxramonov36-web.github.io';
    headers['X-Title'] = 'Tayanch IELTS Assessor';
  }

  const res = await fetch(config.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    let errMsg = `API xatosi (${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error?.message) errMsg = errJson.error.message;
    } catch (e) {}
    if (res.status === 401) {
      errMsg = 'API kaliti noto\'g\'ri yoki muddati tugagan. Sozlamalarda kalitni yangilang.';
    } else if (res.status === 429) {
      errMsg = 'Bepul model chegarasiga yetdingiz. Biroz kuting yoki boshqa bepul model tanlang.';
    } else if (res.status === 402) {
      errMsg = 'Bu model pullik yoki kredit tugagan. Iltimos, bepul model tanlang (masalan: google/gemini-flash-1.5:free).';
    }
    throw new Error(errMsg);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('AI javob qaytarmadi. Qayta urinib ko\'ring.');
  }

  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Try to find JSON object within text
  if (!jsonStr.startsWith('{')) {
    const start = jsonStr.indexOf('{');
    const end = jsonStr.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      jsonStr = jsonStr.substring(start, end + 1);
    }
  }

  try {
    return normalizeAssessment(JSON.parse(jsonStr));
  } catch (e) {
    throw new Error('AI javobi JSON formatida emas. Model: ' + config.model + '. Iltimos, boshqa model sinab ko\'ring.');
  }
}

export function renderAssessmentHTML(result) {
  const criteria = [
    { key: 'task_achievement_or_response', label: 'Task Achievement / Response', icon: '📋' },
    { key: 'coherence_cohesion', label: 'Coherence & Cohesion', icon: '🔗' },
    { key: 'lexical_resource', label: 'Lexical Resource', icon: '📚' },
    { key: 'grammatical_range_accuracy', label: 'Grammatical Range & Accuracy', icon: '✍️' },
  ];

  const bandColor = (band) => {
    if (band >= 7) return '#22c55e';
    if (band >= 5.5) return '#f59e0b';
    return '#ef4444';
  };

  const cards = criteria
    .map((c) => {
      const item = result[c.key];
      if (!item) return '';
      return `
      <div class="criterion-card">
        <div class="criterion-header">
          <span class="criterion-icon">${c.icon}</span>
          <span class="criterion-label">${c.label}</span>
          <span class="criterion-band" style="background:${bandColor(item.band)}">${item.band}</span>
        </div>
        <div class="criterion-body">
          <p class="criterion-feedback">${escapeHtml(item.feedback || '')}</p>
          ${item.example_from_text ? `<div class="criterion-example"><strong>Quote:</strong> <em>"${escapeHtml(item.example_from_text)}"</em></div>` : ''}
          ${item.improvement_tip ? `<div class="criterion-tip"><strong>💡 Tip:</strong> ${escapeHtml(item.improvement_tip)}</div>` : ''}
        </div>
      </div>`;
    })
    .join('');

  return `
    <div class="assessment-result">
      <div class="assessment-overall">
        <div class="overall-band-display" style="border-color:${bandColor(result.task_band || 0)}">
          <span class="band-number">${result.task_band || '—'}</span>
          <span class="band-label">Task Band</span>
        </div>
        <p class="overall-summary">${result.overall_summary || ''}</p>
      </div>
      <div class="criteria-grid">${cards}</div>
    </div>`;
}
