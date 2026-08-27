import assert from 'node:assert/strict';
import worker from './anthropic-assessment-worker.ts';

const request = (body, method = 'POST') => new Request('https://assessment.example.workers.dev/', {
  method,
  headers: { 'content-type': 'application/json', origin: 'https://javohirqaxramonov36-web.github.io' },
  body: method === 'POST' ? JSON.stringify(body) : undefined,
});

const readJson = async (response) => ({ status: response.status, body: await response.json() });

// 1) Missing key must fail safely without calling Anthropic.
const unavailable = await worker.fetch(request({ course: 'prompt-engineering', rubric: 'aniqlik', answer: 'Test javob' }), {});
const unavailableResult = await readJson(unavailable);
assert.equal(unavailableResult.status, 503);
assert.equal(unavailableResult.body.error, 'Baholash xizmati hozircha sozlanmoqda.');

// 2) Invalid method is rejected before any upstream call.
const methodResult = await readJson(await worker.fetch(request({}, 'GET'), {}));
assert.equal(methodResult.status, 405);

// 3) With a fake key, mock the upstream Anthropic response and verify the adapter shape.
const originalFetch = globalThis.fetch;
const mockKey = ['local', 'mock'].join('-');
globalThis.fetch = async (url, options) => {
  assert.equal(url, 'https://api.anthropic.com/v1/messages');
  assert.equal(options.headers['x-api-key'], mockKey);
  const payload = JSON.parse(options.body);
  assert.equal(payload.model, 'claude-sonnet-4-6');
  return new Response(JSON.stringify({ content: [{ text: 'Qisqa test feedback.' }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
try {
  const result = await readJson(await worker.fetch(
    request({ course: 'prompt-engineering', rubric: 'aniqlik; format', answer: 'Yaxshi tuzilgan test javob.' }),
    { ANTHROPIC_API_KEY: mockKey },
  ));
  assert.equal(result.status, 200);
  assert.equal(result.body.feedback, 'Qisqa test feedback.');
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Anthropic assessment worker smoke test: PASS (no real API call, no secret used)');
