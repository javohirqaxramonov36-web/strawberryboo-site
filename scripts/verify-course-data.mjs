import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('src/data/courses.json', 'utf8'));
const courses = data.courses;
const languages = ['uz', 'ru', 'en'];
const validTypes = new Set(['standard', 'ielts-mini', 'coming-soon', 'bundle', 'mock']);
const validStatuses = new Set(['available', 'upcoming']);
const errors = [];

if (!Array.isArray(courses) || courses.length === 0) errors.push('courses must be a non-empty array');
const seen = new Set();
for (const [index, course] of courses.entries()) {
  const label = `courses[${index}]`;
  if (!course.slug || !/^[a-z0-9-]+$/.test(course.slug)) errors.push(`${label}: invalid slug`);
  if (seen.has(course.slug)) errors.push(`${label}: duplicate slug "${course.slug}"`);
  seen.add(course.slug);
  if (!validTypes.has(course.type)) errors.push(`${course.slug}: invalid type "${course.type}"`);
  if (!validStatuses.has(course.status)) errors.push(`${course.slug}: invalid status "${course.status}"`);
  if (course.status !== (course.comingSoon ? 'upcoming' : 'available')) errors.push(`${course.slug}: status must match comingSoon`);
  if (!Array.isArray(course.cats) || course.cats.length === 0) errors.push(`${course.slug}: needs at least one category`);
  if (!course.href || /^(https?:)?\/\//.test(course.href)) errors.push(`${course.slug}: href must be a relative route`);
  if (typeof course.free !== 'boolean' || typeof course.paid !== 'boolean' || typeof course.comingSoon !== 'boolean') errors.push(`${course.slug}: free, paid and comingSoon must be booleans`);
  if (typeof course.countInPublicTotal !== 'boolean') errors.push(`${course.slug}: countInPublicTotal must be boolean`);
  for (const field of ['title', 'description', 'audience']) {
    if (!course[field] || typeof course[field] !== 'object') { errors.push(`${course.slug}: missing ${field}`); continue; }
    for (const lang of languages) if (!String(course[field][lang] ?? '').trim()) errors.push(`${course.slug}: ${field}.${lang} is required`);
  }
  if (!course.price || typeof course.price !== 'object') errors.push(`${course.slug}: missing localized price`);
  else for (const lang of languages) if (!String(course.price[lang] ?? '').trim()) errors.push(`${course.slug}: price.${lang} is required`);
}

const publicTotal = courses.filter((course) => course.countInPublicTotal);
console.log(`Course data validation: ${courses.length} catalog records, ${publicTotal.length} in public total, ${courses.filter((course) => course.status === 'available').length} available, ${courses.filter((course) => course.status === 'upcoming').length} upcoming.`);
if (errors.length) {
  console.error(`\n${errors.length} validation error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('All course records have unique slugs, localized core content, audience, status, and a relative route.');
}
