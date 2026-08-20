/**
 * IELTS Writing Assessor — client-side AI module
 *
 * Calls an AI API (OpenAI-compatible) with the IELTS Writing examiner
 * system prompt and returns structured band-scored JSON feedback.
 *
 * API key is stored in localStorage under 'ielts_api_key'.
 * Model and endpoint are configurable but default to OpenAI.
 */

const SYSTEM_PROMPT = `You are an experienced, certified IELTS Writing examiner. You mark strictly according to the four official criteria below, exactly as a real examiner would: based only on what is written on the page, not on what the candidate probably meant to say.

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

OVERALL WRITING BAND:
overall = (task1_band * 1 + task2_band * 2) / 3
Round: .25 rounds up to .5; .75 rounds up to next whole band.

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

/**
 * Default AI API configuration — OpenAI-compatible.
 * Users can override endpoint/model in settings if using a different provider.
 */
const DEFAULT_CONFIG = {
  endpoint: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-4o',
};

/**
 * Get the stored API key from localStorage.
 * @returns {string|null}
 */
export function getApiKey() {
  try {
    return localStorage.getItem('ielts_api_key');
  } catch (e) {
    return null;
  }
}

/**
 * Save the API key to localStorage.
 * @param {string} key
 */
export function setApiKey(key) {
  try {
    localStorage.setItem('ielts_api_key', key);
  } catch (e) {
    console.error('Failed to save API key:', e);
  }
}

/**
 * Get the stored model configuration.
 * @returns {{endpoint: string, model: string}}
 */
export function getModelConfig() {
  try {
    const stored = localStorage.getItem('ielts_model_config');
    if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch (e) {}
  return DEFAULT_CONFIG;
}

/**
 * Save model configuration.
 * @param {{endpoint: string, model: string}} config
 */
export function setModelConfig(config) {
  try {
    localStorage.setItem('ielts_model_config', JSON.stringify(config));
  } catch (e) {}
}

/**
 * Count words in a text.
 * @param {string} text
 * @returns {number}
 */
export function countWords(text) {
  const trimmed = (text || '').trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/**
 * Assess an IELTS Writing response using AI.
 *
 * @param {Object} params
 * @param {string} params.task_type - 'academic_task1', 'general_task1', or 'task2'
 * @param {string} params.prompt - The IELTS task question/instructions
 * @param {string} params.response - The candidate's written answer
 * @returns {Promise<Object>} Parsed JSON assessment result
 */
export async function assessWriting({ task_type, prompt, response }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API kaliti topilmadi. Iltimos, sozlamalarda OpenAI API kalitini kiriting.');
  }

  const word_count = countWords(response);
  const config = getModelConfig();

  const userMessage = `task_type: ${task_type}
prompt: ${prompt}
response: ${response}
word_count: ${word_count}`;

  const res = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    let errMsg = `API xatosi (${res.status})`;
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error?.message) errMsg = errJson.error.message;
    } catch (e) {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('AI javob qaytarmadi. Qayta urinib ko\'ring.');
  }

  // Extract JSON from the response (handles code-fenced JSON too)
  let jsonStr = content.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error('AI javobi JSON formatida emas. Model: ' + config.model);
  }
}

/**
 * Render assessment results into HTML.
 * @param {Object} result - The parsed JSON from assessWriting()
 * @returns {string} HTML string
 */
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
          <p class="criterion-feedback">${item.feedback || ''}</p>
          ${item.example_from_text ? `<div class="criterion-example"><strong>Quote:</strong> <em>"${item.example_from_text}"</em></div>` : ''}
          ${item.improvement_tip ? `<div class="criterion-tip"><strong>💡 Tip:</strong> ${item.improvement_tip}</div>` : ''}
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
