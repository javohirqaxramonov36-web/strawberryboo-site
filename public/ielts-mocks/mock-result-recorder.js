/* Tayanch browser-local mock result history. No network requests are made. */
(function () {
  'use strict';

  var STORAGE_KEY = 'tayanch.mock.results.v1';
  var script = document.currentScript;
  var config = {
    mockCode: script && script.dataset.mockCode ? script.dataset.mockCode : 'MOCK',
    module: script && script.dataset.module ? script.dataset.module : 'auto'
  };
  var recorded = Object.create(null);

  function readHistory() {
    try {
      var value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-120)));
      return true;
    } catch (error) {
      return false;
    }
  }

  function number(value) {
    var parsed = Number(String(value == null ? '' : value).replace(',', '.').trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function inferModule() {
    if (config.module !== 'auto') return config.module;
    if (typeof window.mode === 'string' && /^(listening|reading)$/i.test(window.mode)) return window.mode.toLowerCase();
    var title = document.title.toLowerCase();
    if (title.indexOf('listening') !== -1) return 'listening';
    if (title.indexOf('reading') !== -1) return 'reading';
    if (title.indexOf('writing') !== -1) return 'writing';
    return 'mock';
  }

  function validModule(value) {
    return ['listening', 'reading', 'writing', 'speaking', 'mock'].indexOf(value) !== -1 ? value : 'mock';
  }

  function record(result) {
    if (!result || !Number.isFinite(result.band) || result.band < 0 || result.band > 9) return false;
    var module = validModule(result.module || inferModule());
    var raw = Number.isFinite(result.rawScore) ? result.rawScore : null;
    var total = Number.isFinite(result.totalQuestions) ? result.totalQuestions : null;
    var fingerprint = [config.mockCode, module, result.source || 'result', raw, result.band].join('|');
    if (recorded[fingerprint]) return false;
    recorded[fingerprint] = true;

    var history = readHistory();
    history.push({
      id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'result-' + Date.now() + '-' + Math.random().toString(16).slice(2),
      mockCode: config.mockCode,
      module: module,
      band: Math.round(result.band * 2) / 2,
      rawScore: raw,
      totalQuestions: total,
      completedAt: new Date().toISOString()
    });
    if (!writeHistory(history)) return false;
    window.dispatchEvent(new CustomEvent('tayanch:mock-result', { detail: history[history.length - 1] }));
    return true;
  }

  function scoreFromSummary() {
    var summary = document.getElementById('score-summary');
    if (!summary) return null;
    var match = summary.textContent.match(/scored\s+(\d+)\s+out\s+of\s+(\d+)\s*\(\s*Band\s+([\d.]+)\s*\)/i);
    if (!match) return null;
    return { band: number(match[3]), rawScore: number(match[1]), totalQuestions: number(match[2]), source: 'score-summary' };
  }

  function scoreFromBandElement() {
    var bandElement = document.getElementById('results-band');
    if (!bandElement) return null;
    var band = number(bandElement.textContent);
    if (band === null) return null;
    var rawElement = document.getElementById('results-score');
    var raw = rawElement ? number(rawElement.textContent) : null;
    return { band: band, rawScore: raw, totalQuestions: raw === null ? null : 40, source: 'results-band' };
  }

  function scoreFromWritingResult() {
    var bandElement = document.querySelector('.overall-band');
    if (!bandElement) return null;
    var band = number(bandElement.textContent);
    if (band === null) return null;
    return { band: band, rawScore: null, totalQuestions: null, source: 'writing-result', module: 'writing' };
  }

  function scoreFromAlternateModal() {
    var bandElement = document.getElementById('rband');
    if (!bandElement) return null;
    var band = number(bandElement.textContent);
    if (band === null) return null;
    var rawElement = document.getElementById('rscr');
    var raw = rawElement ? number(rawElement.textContent) : null;
    return { band: band, rawScore: raw, totalQuestions: raw === null ? null : 40, source: 'alternate-modal' };
  }

  function capture() {
    var result = scoreFromSummary() || scoreFromWritingResult() || scoreFromBandElement() || scoreFromAlternateModal();
    if (result) record(result);
  }

  window.TayanchMockResults = window.TayanchMockResults || {};
  window.TayanchMockResults.record = function (result) {
    var normalized = result || {};
    normalized.band = number(normalized.band);
    normalized.rawScore = number(normalized.rawScore);
    normalized.totalQuestions = number(normalized.totalQuestions);
    return record(normalized);
  };
  window.TayanchMockResults.storageKey = STORAGE_KEY;

  function patchReadingPdfResult() {
    if (typeof window.checkAnswersAndGetResults !== 'function' || window.checkAnswersAndGetResults.__tayanchPatched) return;
    var original = window.checkAnswersAndGetResults;
    function wrapped() {
      var result = original.apply(this, arguments);
      if (result && Number.isFinite(Number(result.score))) {
        var band = typeof window.calculateBandScore === 'function' ? number(window.calculateBandScore(result.score)) : null;
        if (band !== null) record({ band: band, rawScore: Number(result.score), totalQuestions: Number(result.totalQuestions) || 40, source: 'reading-pdf' });
      }
      return result;
    }
    wrapped.__tayanchPatched = true;
    window.checkAnswersAndGetResults = wrapped;
  }
  patchReadingPdfResult();

  var observer = new MutationObserver(capture);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  window.addEventListener('load', capture);
  capture();
}());
