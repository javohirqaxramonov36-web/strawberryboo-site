// Reusable, theme-adaptable SVG visuals for course/lesson infographics.
// No fake metrics: only illustrative sample sentences and structural schemas.

const GRAMMAR_I18N = {
  uz: {
    title: 'Zamonlarga bir qarash',
    past: "O‘tgan zamon",
    present: 'Hozirgi zamon',
    future: 'Kelasi zamon',
    p: 'Kecha kitob o‘qidim.',
    pr: 'Har kuni o‘qiyman.',
    f: 'Ertaga o‘qiyman.',
    note: 'Namuna — haqiqiy darslarda kengroq',
  },
  ru: {
    title: 'Взгляд на времена',
    past: 'Прошедшее',
    present: 'Настоящее',
    future: 'Будущее',
    p: 'Вчера читал.',
    pr: 'Читаю каждый день.',
    f: 'Завтра прочитаю.',
    note: 'Пример — в реальных уроках больше',
  },
  en: {
    title: 'Tenses at a glance',
    past: 'Past',
    present: 'Present',
    future: 'Future',
    p: 'Read yesterday.',
    pr: 'Read daily.',
    f: 'Will read.',
    note: 'Sample — real lessons go deeper',
  },
};

// A horizontal Past → Present → Future timeline with one illustrative sample sentence each.
export function buildGrammarTimeline(lang = 'uz') {
  const t = GRAMMAR_I18N[lang] || GRAMMAR_I18N.uz;
  const cols = [
    { x: 60, label: t.past, ex: t.p },
    { x: 180, label: t.present, ex: t.pr },
    { x: 300, label: t.future, ex: t.f },
  ];
  const nodes = cols
    .map(
      (c) => `
    <text class="gt-lbl" x="${c.x}" y="52" text-anchor="middle" style="fill:var(--muted);font:700 12px system-ui">${c.label}</text>
    <circle cx="${c.x}" cy="90" r="9" style="fill:var(--accent)"/>
    <text x="${c.x}" y="122" text-anchor="middle" style="fill:var(--text);font:600 11px system-ui">${c.ex}</text>`
    )
    .join('');
  return `<svg viewBox="0 0 360 175" width="100%" role="img" aria-label="${t.title}" style="display:block">
  <text x="180" y="22" text-anchor="middle" style="fill:var(--text);font:800 14px system-ui">${t.title}</text>
  <line x1="40" y1="90" x2="320" y2="90" style="stroke:var(--accent);stroke-width:2;opacity:.5"/>
  <line x1="320" y1="90" x2="310" y2="85" style="stroke:var(--accent);stroke-width:2;opacity:.5"/>
  <line x1="320" y1="90" x2="310" y2="95" style="stroke:var(--accent);stroke-width:2;opacity:.5"/>
  ${nodes}
  <text x="180" y="160" text-anchor="middle" style="fill:var(--muted);font:600 10px system-ui">${t.note}</text>
</svg>`;
}
