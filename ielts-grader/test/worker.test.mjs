import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const origin = 'https://javohirqaxramonov36-web.github.io';
const env = { GEMINI_API_KEY: 'test-key' };
const request = (url, init = {}) => new Request(url, { ...init, headers: { Origin: origin, 'CF-Connecting-IP': '203.0.113.42', ...(init.headers || {}) } });

test('rejects requests outside the official site origin', async () => {
  const response = await worker.fetch(new Request('https://example.workers.dev', { method: 'POST', headers: { Origin: 'https://attacker.example' } }), env);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
});

test('allows only the official origin on preflight', async () => {
  const response = await worker.fetch(request('https://example.workers.dev', { method: 'OPTIONS' }), env);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
});

test('validates task and essay before calling Gemini', async () => {
  const response = await worker.fetch(request('https://example.workers.dev', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task: 3, essay: 'This is a sufficiently long essay for validation.' }) }), env);
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Task 1/);
});

test('normalizes Gemini scores and calculates the overall band from the four criteria', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({
    candidates: [{ content: { parts: [{ text: JSON.stringify({
      taskAchievement: 6.1,
      coherenceCohesion: 6.6,
      lexicalResource: 7.8,
      grammaticalRange: 10,
      overall: 1,
      feedback: 'Avval gaplarni aniqroq bog‘lang, keyin so‘z tanlovini misollar bilan tekshiring.'
    }) }] } }]
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  try {
    const response = await worker.fetch(request('https://example.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.99' },
      body: JSON.stringify({ task: 2, essay: 'This essay has enough content to reach the mocked Gemini assessment endpoint safely for a test.' })
    }), env);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(
      { taskAchievement: body.taskAchievement, coherenceCohesion: body.coherenceCohesion, lexicalResource: body.lexicalResource, grammaticalRange: body.grammaticalRange, overall: body.overall },
      { taskAchievement: 6, coherenceCohesion: 6.5, lexicalResource: 8, grammaticalRange: 9, overall: 7.5 }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
