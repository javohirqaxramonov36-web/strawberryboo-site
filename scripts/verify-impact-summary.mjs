import { readFile } from 'node:fs/promises';

const summary = JSON.parse(await readFile('src/data/impact-summary.json', 'utf8'));
const failures = [];
const integer = (value) => Number.isInteger(value) && value >= 0;
if (summary.schemaVersion !== 1) failures.push('schemaVersion must be 1');
if (!/^\d{4}-\d{2}-\d{2}$/.test(summary.asOf || '')) failures.push('asOf must use YYYY-MM-DD');
if (!integer(summary.verifiedResponses)) failures.push('verifiedResponses must be a non-negative integer');
const metricKeys = ['employmentOutcomesVerified', 'freelanceStartersVerified', 'portfolioCompleted', 'salaryImprovementVerified'];
for (const key of metricKeys) if (!integer(summary.metrics?.[key])) failures.push(`metrics.${key} must be a non-negative integer`);
if (!Array.isArray(summary.monthly) || !summary.monthly.length) failures.push('monthly must contain at least one row');
for (const row of summary.monthly || []) {
  if (!/^\d{4}-\d{2}$/.test(row.month || '')) failures.push(`invalid month: ${row.month}`);
  for (const key of ['responses', 'employmentOutcomes', 'freelanceStarters', 'portfolioCompleted']) if (!integer(row[key])) failures.push(`${row.month}.${key} must be a non-negative integer`);
  for (const key of Object.keys(row)) if (!['month', 'responses', 'employmentOutcomes', 'freelanceStarters', 'portfolioCompleted'].includes(key)) failures.push(`${row.month} contains unsupported field: ${key}`);
}
for (const key of Object.keys(summary)) if (!['schemaVersion', 'asOf', 'verifiedResponses', 'metrics', 'monthly', 'notes'].includes(key)) failures.push(`unsupported top-level field: ${key}`);
if (summary.notes && (!Array.isArray(summary.notes) || summary.notes.some((item) => typeof item !== 'string'))) failures.push('notes must be an array of strings');
console.log(`Impact summary validation: ${failures.length ? 'FAIL' : 'PASS'}`);
for (const failure of failures) console.log(`- ${failure}`);
if (failures.length) process.exit(1);
