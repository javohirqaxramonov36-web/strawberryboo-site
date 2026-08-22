/**
 * IELTS Writing Assessor — shared client-side module
 * Used by mock test HTML pages and the Writing practice page.
 *
 * Calls an AI API (OpenAI-compatible) with the IELTS Writing examiner
 * system prompt and returns structured band-scored JSON feedback.
 *
 * Default provider: OpenRouter (free models available, OpenAI-compatible API)
 * Users can also use OpenAI, Groq, or any OpenAI-compatible endpoint.
 */

(function (global) {
  'use strict';

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
  var PROVIDERS = {
    openrouter_free: {
      label: 'OpenRouter (Bepul modellar)',
      endpoint: 'https://openrouter.ai/api/v1/chat/completions',
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      freeModels: [
        { value: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (Free) — Tavsiya etiladi' },
        { value: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B (Free)' },
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

  var DEFAULT_PROVIDER = 'openrouter_free';
  var DEFAULT_CONFIG = {
    provider: DEFAULT_PROVIDER,
    endpoint: PROVIDERS[DEFAULT_PROVIDER].endpoint,
    model: PROVIDERS[DEFAULT_PROVIDER].model,
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
      if (stored) {
        var parsed = JSON.parse(stored);
        return Object.assign({}, DEFAULT_CONFIG, parsed);
      }
    } catch (e) {}
    return Object.assign({}, DEFAULT_CONFIG);
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
  function normalizeAssessment(result) {
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

  async function assessWriting(params) {
    var apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('API kaliti topilmadi. Iltimos, sozlamalarda API kalitini kiriting. OpenRouter bepul API kalitini openrouter.ai/keys saytidan olishingiz mumkin.');
    }

    var wc = countWords(params.response);
    var config = getModelConfig();

    var userMessage = 'task_type: ' + params.task_type + '\n' +
      'prompt: ' + params.prompt + '\n' +
      'response: ' + params.response + '\n' +
      'word_count: ' + wc;

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    };

    // OpenRouter recommends extra headers for analytics (optional but good practice)
    if (config.endpoint && config.endpoint.indexOf('openrouter.ai') !== -1) {
      headers['HTTP-Referer'] = window.location.origin || 'https://javohirqaxramonov36-web.github.io';
      headers['X-Title'] = 'Tayanch IELTS Assessor';
    }

    var res = await fetch(config.endpoint, {
      method: 'POST',
      headers: headers,
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
      var errText = await res.text();
      var errMsg = 'API xatosi (' + res.status + ')';
      try {
        var errJson = JSON.parse(errText);
        if (errJson.error && errJson.error.message) errMsg = errJson.error.message;
      } catch (e) {}
      // User-friendly error for common issues
      if (res.status === 401) {
        errMsg = 'API kaliti noto\'g\'ri yoki muddati tugagan. Sozlamalarda kalitni yangilang.';
      } else if (res.status === 429) {
        errMsg = 'Bepul model chegarasiga yetdingiz. Biroz kuting yoki boshqa bepul model tanlang.';
      } else if (res.status === 402) {
        errMsg = 'Bu model pullik yoki kredit tugagan. Iltimos, bepul model tanlang (masalan: google/gemini-flash-1.5:free).';
      }
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

    // Also try to find JSON object within text
    if (jsonStr.indexOf('{') !== 0) {
      var jsonStart = jsonStr.indexOf('{');
      var jsonEnd = jsonStr.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1);
      }
    }

    try {
      return normalizeAssessment(JSON.parse(jsonStr));
    } catch (e) {
      throw new Error('AI javobi JSON formatida emas. Model: ' + config.model + '. Iltimos, boshqa model sinab ko\'ring.');
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
      html += '<p>' + escapeHtml(item.feedback || '') + '</p>';
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
   * Supports multiple providers with a provider selector.
   */
  function showSettingsDialog() {
    // Remove existing dialog if any
    var existing = document.getElementById('ieltsSettingsDialog');
    if (existing) existing.remove();

    var currentKey = getApiKey() || '';
    var currentConfig = getModelConfig();
    var currentProvider = currentConfig.provider || DEFAULT_PROVIDER;
    var provider = PROVIDERS[currentProvider] || PROVIDERS[DEFAULT_PROVIDER];

    // Build model options for selected provider
    function buildModelOptions(selectedModel, models) {
      if (!models || models.length === 0) {
        return '<input type="text" id="settingsModel" value="' + escapeAttr(selectedModel) + '" placeholder="model-name" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;" />';
      }
      var opts = models.map(function (m) {
        var sel = (m.value === selectedModel) ? ' selected' : '';
        return '<option value="' + escapeAttr(m.value) + '"' + sel + '>' + escapeHtml(m.label) + '</option>';
      }).join('');
      return '<select id="settingsModel" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;background:#fff;">' + opts + '</select>';
    }

    var dialog = document.createElement('dialog');
    dialog.id = 'ieltsSettingsDialog';
    dialog.style.cssText = 'border:1px solid #ccc;border-radius:12px;padding:0;max-width:540px;width:90%;';

    dialog.innerHTML = `
      <div style="padding:24px;font-family:Inter,system-ui,sans-serif;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="margin:0;font-size:1.3rem;">AI Assessment Sozlamalari</h2>
          <button id="closeSettings" style="border:none;background:none;font-size:1.5rem;cursor:pointer;">&times;</button>
        </div>

        <div style="background:#e8f5e9;border:1px solid #4caf50;border-radius:8px;padding:12px;margin-bottom:16px;">
          <p style="margin:0;font-size:.85rem;color:#2e7d32;">
            <strong>💡 Bepul foydalanish:</strong> OpenRouter saytida bepul API kalit oling
            (kredit karta kerak emas), pastdagi "OpenRouter (Bepul)" tanlang va kalitni kiriting.
            50+ bepul AI model mavjud!
          </p>
        </div>

        <p style="color:#666;font-size:.9rem;margin-bottom:16px;">API kalitingiz faqat brauzeringizda (localStorage) saqlanadi. Hech qanday serverga yuborilmaydi.</p>

        <div style="margin-bottom:16px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">Provider</label>
          <select id="settingsProvider" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;background:#fff;">
            <option value="openrouter_free"${currentProvider === 'openrouter_free' ? ' selected' : ''}>OpenRouter (Bepul modellar) — Tavsiya etiladi</option>
            <option value="groq"${currentProvider === 'groq' ? ' selected' : ''}>Groq (Bepul, Llama — tezkor)</option>
            <option value="openai"${currentProvider === 'openai' ? ' selected' : ''}>OpenAI (Pullik)</option>
            <option value="custom"${currentProvider === 'custom' ? ' selected' : ''}>Boshqa (Custom endpoint)</option>
          </select>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">API Key</label>
          <input type="password" id="settingsApiKey" value="${currentKey.replace(/"/g, '&quot;')}" placeholder="sk-or-..." style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;box-sizing:border-box;" />
          <p id="keyHelpText" style="margin-top:6px;font-size:.8rem;color:#888;">${provider.keyHelp}</p>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">Model</label>
          <div id="modelInputContainer">${buildModelOptions(currentConfig.model, provider.freeModels)}</div>
        </div>

        <div style="margin-bottom:20px;" id="endpointContainer">
          <label style="display:block;font-weight:600;margin-bottom:6px;font-size:.9rem;">API Endpoint</label>
          <input type="text" id="settingsEndpoint" value="${currentConfig.endpoint}" placeholder="https://openrouter.ai/api/v1/chat/completions" style="width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:13px;box-sizing:border-box;" />
        </div>

        <div style="display:flex;gap:10px;justify-content:flex-end;">
          <button id="cancelSettings" style="padding:10px 20px;border:1px solid #ccc;border-radius:8px;background:none;cursor:pointer;font-size:15px;">Bekor qilish</button>
          <button id="saveSettings" style="padding:10px 24px;border:none;border-radius:8px;background:#007bff;color:#fff;cursor:pointer;font-size:15px;font-weight:600;">Saqlash</button>
        </div>

        <div id="getKeyLink" style="margin-top:16px;font-size:.8rem;color:#888;">
          ${provider.getKeyUrl ? 'Bepul kalit olish: <a href="' + provider.getKeyUrl + '" target="_blank" rel="noopener" style="color:#007bff;">' + provider.getKeyUrl + '</a>' : ''}
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    // Provider switch — update model options, endpoint, help text
    dialog.querySelector('#settingsProvider').addEventListener('change', function () {
      var newProvider = this.value;
      var p = PROVIDERS[newProvider];
      var modelContainer = dialog.querySelector('#modelInputContainer');
      var endpointInput = dialog.querySelector('#settingsEndpoint');
      var keyHelp = dialog.querySelector('#keyHelpText');
      var getKeyLink = dialog.querySelector('#getKeyLink');

      modelContainer.innerHTML = buildModelOptions(p.model, p.freeModels);
      endpointInput.value = p.endpoint;
      keyHelp.textContent = p.keyHelp;
      getKeyLink.innerHTML = p.getKeyUrl
        ? 'Bepul kalit olish: <a href="' + p.getKeyUrl + '" target="_blank" rel="noopener" style="color:#007bff;">' + p.getKeyUrl + '</a>'
        : '';
    });

    dialog.querySelector('#closeSettings').addEventListener('click', function () { dialog.close(); dialog.remove(); });
    dialog.querySelector('#cancelSettings').addEventListener('click', function () { dialog.close(); dialog.remove(); });
    dialog.querySelector('#saveSettings').addEventListener('click', function () {
      var key = dialog.querySelector('#settingsApiKey').value.trim();
      var providerVal = dialog.querySelector('#settingsProvider').value;
      var modelEl = dialog.querySelector('#settingsModel');
      var model = modelEl.value.trim();
      var endpoint = dialog.querySelector('#settingsEndpoint').value.trim();
      if (key) setApiKey(key);
      if (providerVal && model && endpoint) {
        setModelConfig({ provider: providerVal, model: model, endpoint: endpoint });
      }
      dialog.close();
      dialog.remove();
    });
  }

  function escapeAttr(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/"/g, '&quot;');
  }

  // Export to global scope
  global.IELTSAssessor = {
    SYSTEM_PROMPT: SYSTEM_PROMPT,
    PROVIDERS: PROVIDERS,
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
