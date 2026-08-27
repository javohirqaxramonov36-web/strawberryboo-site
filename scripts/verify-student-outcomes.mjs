import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('src/data/student-outcomes.json', 'utf8'));
const errors = [];
const outcomes = data.outcomes;

if (!Array.isArray(outcomes)) errors.push('outcomes must be an array');
if (data.version !== 1) errors.push('version must be 1');

for (const [index, item] of (outcomes || []).entries()) {
  const label = `outcomes[${index}]`;
  if (!item.courseSlug || !/^[a-z0-9-]+$/.test(item.courseSlug)) errors.push(`${label}: valid courseSlug is required`);
  if (!String(item.outcome || '').trim()) errors.push(`${label}: outcome is required`);
  if (item.status !== 'verified') errors.push(`${label}: status must be verified before publication`);
  if (item.publicConsent !== true) errors.push(`${label}: publicConsent must be true before public statistics`);
  if (item.testimonialConsent === true && !String(item.name || '').trim()) errors.push(`${label}: name is required when testimonialConsent is true`);
  if (item.verifiedAt && !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt)) errors.push(`${label}: verifiedAt must use YYYY-MM-DD`);
  if ('email' in item || 'phone' in item) errors.push(`${label}: raw contact fields must not be stored in public JSON`);
}

if (errors.length) {
  console.error(`Student outcomes validation: FAIL (${errors.length} issue(s))`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Student outcomes validation: PASS (${outcomes.length} public outcome record(s)); empty is valid until consented, verified data exists.`);
}
