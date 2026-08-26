import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const required = [
  'index.html', '404.html', 'entertainment/index.html', 'profile/index.html',
  'ru/profile/index.html', 'en/profile/index.html',
  'qaytarish-siyosati/index.html', 'ru/politika-vozvrata/index.html', 'en/refund-policy/index.html',
  'payment-success/index.html', 'payment-failed/index.html', 'masofaviy-ish/index.html', 'viloyatlar/index.html', 'tasir/index.html', 'sitemap.xml', 'robots.txt',
];
const failures = [];
for (const path of required) { try { await access(join(dist, path)); } catch { failures.push(`missing ${path}`); } }
const home = await readFile(join(dist, 'index.html'), 'utf8');
const catalog = await readFile(join(dist, 'kurslar/index.html'), 'utf8');
if (/games-container|game-modal|static-word/.test(home)) failures.push('homepage still contains Entertainment application markup');
if (!home.includes('focus-break') || !home.includes('entertainment/')) failures.push('homepage Entertainment link missing');
if (!catalog.includes('data-waitlist-form')) failures.push('UZ catalogue waitlist form missing');
if (!home.includes('G-C8G7WRC92F')) failures.push('configured GA4 measurement ID missing from homepage');
if (home.includes('progression_go')) failures.push('stale Telegram URL progression_go remains');
const socialPages = {
  'masofaviy-ish/index.html': ['Upwork', 'Fiverr', 'Daromad'],
  'viloyatlar/index.html': ['Tayanch-10', '26 ta'],
  'tasir/index.html': ['TA’SIRNI O‘LCHAYMIZ', 'data-impact-survey'],
};
for (const [path, markers] of Object.entries(socialPages)) {
  const html = await readFile(join(dist, path), 'utf8');
  for (const marker of markers) if (!html.includes(marker)) failures.push(`${path} missing marker: ${marker}`);
}
for (const path of ['ai-agentlar/index.html', 'data-analytics/index.html', 'backend-python/index.html', 'figma/index.html']) {
  const html = await readFile(join(dist, 'kurslar', path), 'utf8');
  if (!html.includes('REAL NATIJA') || !html.includes('LinkedIn')) failures.push(`career outcome panel missing: ${path}`);
}
const financial = await readFile(join(dist, 'kurslar/financial-literacy/index.html'), 'utf8');
if (!financial.includes('Bepul') || financial.includes('Tez orada · Narx belgilanmoqda')) failures.push('Financial Literacy was not launched as free content');
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const urlCount = (sitemap.match(/<url>/g) || []).length;
if (urlCount < 190) failures.push(`sitemap unexpectedly small: ${urlCount}`);
console.log(`Startup smoke test: ${failures.length ? 'FAIL' : 'PASS'} (${urlCount} sitemap URLs)`);
for (const failure of failures) console.log(`- ${failure}`);
if (failures.length) process.exitCode = 1;
