import { buildGrammarTimeline } from './src/lib/course-visuals.js';

let pass = 0;
let fail = 0;
function check(name, cond) {
  if (cond) { pass++; } else { fail++; console.error('FAIL:', name); }
}

const uz = buildGrammarTimeline('uz');
const ru = buildGrammarTimeline('ru');
const en = buildGrammarTimeline('en');
const def = buildGrammarTimeline();

check('uz returns svg', uz.startsWith('<svg') && uz.includes('</svg>'));
check('uz has past label', uz.includes('O‘tgan zamon'));
check('uz has sample sentence', uz.includes('Kecha kitob o‘qidim.'));
check('ru localized', ru.includes('Прошедшее') && ru.includes('Вчера читал.'));
check('en localized', en.includes('Past') && en.includes('Read yesterday.'));
check('default is uz', def.includes('O‘tgan zamon'));
check('uses theme var (accent)', uz.includes('var(--accent)'));
check('aria label present', uz.includes('aria-label='));
check('exactly one svg', (uz.match(/<svg/g) || []).length === 1);
check('future label en', en.includes('Future'));

console.log(`\ncourse-visuals: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
