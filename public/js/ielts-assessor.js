/**
 * IELTS Writing Assessor — shared client-side module
 * Used by mock test HTML pages and the Writing practice page.
 *
 * Calls an AI API (OpenAI-compatible) with the IELTS Writing examiner
 * system prompt and returns structured band-scored JSON feedback.
 */

(function (global) {
  'use strict';

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

  var DEFAULT_CONFIG = {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
  };

  function getApiKey() {
    try { return localStorage.getItem('ielts_api_key'); } catch (e) { return null; }
  }

  function setApiKey(key) {
    try { localStorage.setItem('ielts_api_key', key); } catch (e) {}
  }

  function hasApiKey() {
    return !!getApiKey();
  }

  function getModelConfig() {
    try {
      var stored = localStorage.getItem('ielts_model_config');
      if (stored) return Object.assign({}, DEFAULT_CONFIG, JSON.parse(stored));
    } catch (e) {}
    return DEFAULT_CONFIG;
  }

  function setModelConfig(config) {
    try { localStorage.setItem('ielts_model_config', JSON.stringify(config)); } catch (e) {}
  }

  function countWords(text) {
    var trimmed = (text || '').trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  /**
   * Assess an IELTS Writing response using AI.
   * @param {Object} params - { task_type, prompt, response }
   * @returns {Promise<Object>}
   */
  async function assessWriting(params) {
    var apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('API kaliti topilmadi. Iltimos, sozlamalarda OpenAI API kalitini kiriting.');
    }

    var wc = countWords(params.response);
    var config = getModelConfig();

    var userMessage = 'task_type: ' + params.task_type + '\n' +
      'prompt: ' + params.prompt + '\n' +
      'response: ' + params.response + '\n' +
      'word_count: ' + wc;

    var res = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
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
      var errText = await res.text();
      var errMsg = 'API xatosi (' + res.status + ')';
      try {
        var errJson = JSON.parse(errText);
        if (errJson.error && errJson.error.message) errMsg = errJson.error.message;
      } catch (e) {}
      throw new Error(errMsg);
    }

    var data = await res.json();
    var content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || null;

    if (!content) {
      throw new Error('AI javob qaytarmadi. Qayta urinib ko\'ring.');
    }

    var jsonStr = content.trim();
    var jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1].trim();

    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('AI javobi JSON formatida emas. Model: ' + config.model);
    }
  }

  /**
   * Render assessment results into HTML for mock test results page.
   * @param {Object} result
   * @returns {string}
   */
  function renderAssessmentHTML(result) {
    var criteria = [
      { key: 'task_achievement_or_response', label: 'Task Achievement / Response' },
      { key: 'coherence_cohesion', label: 'Coherence & Cohesion' },
      { key: 'lexical_resource', label: 'Lexical Resource' },
      { key: 'grammatical_range_accuracy', label: 'Grammatical Range & Accuracy' },
    ];

    function bandColor(band) {
      if (band >= 7) return '#22c55e';
      if (band >= 5.5) return '#f59e0b';
      return '#ef4444';
    }

    var cards = criteria.map(function (c) {
      var item = result[c.key];
      if (!item) return '';
      var html = '<div class="score-card" style="border-left-color:' + bandColor(item.band) + '">';
      html += '<h3>' + c.label + ' — <span style="color:' + bandColor(item.band) + '">' + item.band + '</span></h3>';
      html += '<p>' + (item.feedback || '') + '</p>';
      if (item.example_from_text) {
        html += '<div class="criterion-example"><strong>Quote:</strong> <em>"' + escapeHtml(item.example_from_text) + '"</em></div>';
      }
      if (item.improvement_tip) {
        html += '<div class="criterion-tip"><strong>💡 Tip:</strong> ' + escapeHtml(item.improvement_tip) + '</div>';
      }
      html += '</div>';
      return html;
    }).join('');

    var overallHTML = '';
    if (result.task_band) {
      overallHTML = '<div class="results-header">' +
        '<h1>AI Assessment Result</h1>' +
        '<div class="overall-band" style="color:' + bandColor(result.task_band) + '">' + result.task_band + '</div>' +
        '<div class="band-description">' + getBandDescription(result.task_band) + '</div>' +
        '</div>';
    }

    var summaryHTML = '';
    if (result.overall_summary) {
      summaryHTML = '<div class="feedback-section"><h3>📋 Holistic Summary</h3><p>' + escapeHtml(result.overall_summary) + '</p></div>';
    }

    return overallHTML + '<div class="results-grid">' + cards + '</div>' + summaryHTML;
  }

  function getBandDescription(band) {
    if (band >= 9) return 'Expert User';
    if (band >= 8) return 'Very Good User';
    if (band >= 7) return 'Good User';
    if (band >= 6) return 'Competent User';
    if (band >= 5) return 'Modest User';
    return 'Limited User';
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show API key settings dialog.
   * Creates and shows a modal for entering/editing API key and model config.
   */
  function showSettingsDialog() {
    // Remove existing dialog if any
    var existing = document.getElementById('ieltsSettingsDialog');
    if (existing) existing.remove();

    var currentKey = getApiKey() || '';
    var currentConfig = getModelConfig();

    var dialog = document.createElement('dialog');
    dialog.id = 'ieltsSettingsDialog';
    dialog.style.cssText = 'border:1px solid #ccc;border-radius:12px;padding:0;max-width:500px;width:90%;';

    dialog.innerHTML = `
      <div style="padding:24px;font-family:Inter,system-ui,sans-serif;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="margin:0;font-size:1.3rem;">AI Assessment Sozlamalari</h2>
          <button id="closeSettings" style="border:none;background:none;font-size:1.5rem;cursor:pointer;">&times;</button>
        </div>
        <p style="color:#666;font-size:.9rem;margin-bottom:16px;">OpenAI API kalitingiz faqat brauzeringizda (localStorage) saqlanadi. Hech qanday serverga yuborilmaydi.</p>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">API Key</label>
          <input type="password" id="settingsApiKey" value="${currentKey.replace(/"/g, '&quot;')}" placeholder="sk-..." style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;" />
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">Model</label>
          <input type="text" id="settingsModel" value="${currentConfig.model}" placeholder="gpt-4o" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;" />
        </div>
        <div style="margin-bottom:20px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">API Endpoint</label>
          <input type="text" id="settingsEndpoint" value="${currentConfig.endpoint}" placeholder="https://api.openai.com/v1/chat/completions" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:13px;box-sizing:border-box;" />
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button id="cancelSettings" style="padding:10px 20px;border:1px solid #ccc;border-radius:8px;background:none;cursor:pointer;font-size:15px;">Bekor qilish</button>
          <button id="saveSettings" style="padding:10px 24px;border:none;border-radius:8px;background:#007bff;color:#fff;cursor:pointer;font-size:15px;font-weight:600;">Saqlash</button>
        </div>
        <p style="margin-top:16px;font-size:.8rem;color:#888;">Kalitni olish: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" style="color:#007bff;">OpenAI API Keys</a></p>
      </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelector('#closeSettings').addEventListener('click', function () { dialog.close(); dialog.remove(); });
    dialog.querySelector('#cancelSettings').addEventListener('click', function () { dialog.close(); dialog.remove(); });
    dialog.querySelector('#saveSettings').addEventListener('click', function () {
      var key = dialog.querySelector('#settingsApiKey').value.trim();
      var model = dialog.querySelector('#settingsModel').value.trim();
      var endpoint = dialog.querySelector('#settingsEndpoint').value.trim();
      if (key) setApiKey(key);
      if (model && endpoint) setModelConfig({ model: model, endpoint: endpoint });
      dialog.close();
      dialog.remove();
    });
  }

  // Export to global scope
  global.IELTSAssessor = {
    SYSTEM_PROMPT: SYSTEM_PROMPT,
    getApiKey: getApiKey,
    setApiKey: setApiKey,
    hasApiKey: hasApiKey,
    getModelConfig: getModelConfig,
    setModelConfig: setModelConfig,
    countWords: countWords,
    assessWriting: assessWriting,
    renderAssessmentHTML: renderAssessmentHTML,
    showSettingsDialog: showSettingsDialog,
    getBandDescription: getBandDescription,
  };
})(window);
