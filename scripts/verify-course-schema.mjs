import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const siteBasePath = '/strawberryboo-site/';
const excluded = new Map([
  ['kurslar/index.html', 'course catalogue index'],
  ['en/kurslar/index.html', 'course catalogue index'],
  ['ru/kurslar/index.html', 'course catalogue index'],
  ['kurslar/ielts-prep/index.html', 'noindex redirect to IELTS catalogue'],
  ['kurslar/ielts-prep/speaking/index.html', 'noindex redirect to IELTS Speaking course'],
  ['kurslar/ielts-writing/typing/index.html', 'typing practice tool, not a standalone course'],
  ['en/kurslar/ielts-writing/typing/index.html', 'typing practice tool, not a standalone course'],
  ['ru/kurslar/ielts-writing/typing/index.html', 'typing practice tool, not a standalone course']
]);

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = (await walk(dist)).filter(file => /(?:^|[/\\])kurslar(?:[/\\]|$)/.test(file) && file.endsWith('.html'));
const rows = [];
for (const file of files) {
  const route = relative(dist, file).split(sep).join('/');
  const html = await readFile(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const courses = [];
  const errors = [];
  for (const content of scripts) {
    try {
      const value = JSON.parse(content);
      const entries = Array.isArray(value) ? value : [value];
      courses.push(...entries.filter(entry => entry?.['@type'] === 'Course'));
    } catch { errors.push('invalid JSON-LD'); }
  }
  const expectedExcluded = excluded.has(route);
  if (!expectedExcluded && courses.length === 1) {
    const course = courses[0];
    const expectedPath = `${siteBasePath}${route.replace(/index\.html$/, '')}`;
    try {
      if (new URL(course.url).pathname !== expectedPath) errors.push(`Course URL does not match ${expectedPath}`);
    } catch { errors.push('invalid Course URL'); }
    if (!['uz', 'ru', 'en'].includes(course.inLanguage)) errors.push('invalid Course inLanguage');
    if (!course.name || !course.description) errors.push('missing Course name or description');
    if (course.provider?.['@type'] !== 'Organization' || course.provider?.name !== 'Tayanch') errors.push('invalid Course provider');
  }
  const valid = expectedExcluded ? courses.length === 0 && errors.length === 0 : courses.length === 1 && errors.length === 0;
  rows.push({ route, excluded: expectedExcluded, count: courses.length, errors, valid, course: courses[0] });
}
const failures = rows.filter(row => !row.valid);
const languageCounts = Object.fromEntries(['uz', 'ru', 'en'].map(lang => [lang, rows.filter(row => !row.excluded && row.course?.inLanguage === lang).length]));
console.log(`Course route schema verification: ${rows.length - excluded.size} covered, ${excluded.size} intentionally excluded, ${failures.length} failures`);
console.log(`By inLanguage: uz=${languageCounts.uz}, ru=${languageCounts.ru}, en=${languageCounts.en}`);
for (const row of rows) console.log(`${row.valid ? 'OK' : 'FAIL'} ${row.route} — Course=${row.count}${row.excluded ? ` (excluded: ${excluded.get(row.route)})` : ''}${row.errors.length ? ` (${row.errors.join(', ')})` : ''}`);
if (failures.length) process.exitCode = 1;
