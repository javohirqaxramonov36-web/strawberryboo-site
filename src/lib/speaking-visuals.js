// Reusable, theme-adaptable inline-SVG visual templates for IELTS Speaking lessons.
// No real/fake stats — sample/structural only, labelled accordingly.

const STR = {
  uz: {
    waveTitle: "Shadowing — namuna tovush",
    waveLabel: "Namuna matn — original course script",
    cueTitle: "Part 2 reja (Cue Card)",
    cueCue: "Cue Card"
  },
  ru: {
    waveTitle: "Shadowing — пример звучания",
    waveLabel: "Пример текста — оригинальный сценарий курса",
    cueTitle: "План Part 2 (Cue Card)",
    cueCue: "Cue Card"
  },
  en: {
    waveTitle: "Shadowing — sample audio",
    waveLabel: "Sample text — original course script",
    cueTitle: "Part 2 plan (Cue Card)",
    cueCue: "Cue Card"
  }
};

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Deterministic bar pattern (no Math.random — stable render).
const BARS = [10, 22, 34, 18, 40, 28, 12, 30, 44, 20, 36, 14, 26, 42, 16, 32, 38, 24, 12, 28, 46, 18, 34, 22, 40, 14, 30, 20, 36, 12, 26, 44, 16, 32, 24, 38];

export function buildShadowingWave(set, lang = "uz") {
  const s = STR[lang] || STR.uz;
  const dur = set?.target_duration_sec ? `${set.target_duration_sec} s` : "";
  const bars = BARS.map((h, i) => `<rect class="sv-bar" x="${6 + i * 8}" y="${60 - h}" width="5" height="${h}" rx="2"/>`).join("");
  const svg = `<svg viewBox="0 0 300 70" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <line class="sv-axis" x1="4" y1="60" x2="296" y2="60"/>
    ${bars}
  </svg>`;
  const durPill = dur ? `<span class="sv-dur">${dur}</span>` : "";
  return `<div class="sp-visual" role="img" aria-label="${s.waveTitle}">
    <div class="sp-visual__head"><span>${s.waveTitle}</span>${durPill}</div>
    ${svg}
    <p class="sp-visual__cap">${s.waveLabel}</p>
  </div>`;
}

export function buildCuePlan(set, lang = "uz") {
  const s = STR[lang] || STR.uz;
  const bullets = (set?.part2?.bullets || []).slice(0, 4);
  const rows = bullets.map((b, i) => {
    const y = 30 + i * 34;
    return `<g><rect class="sv-box" x="70" y="${y}" width="210" height="28" rx="8"/>
      <text class="sv-num" x="40" y="${y + 19}" text-anchor="middle">${i + 1}</text>
      <text class="sv-text" x="84" y="${y + 18}">${esc(b)}</text>
      ${i < bullets.length - 1 ? `<text class="sv-arrow" x="175" y="${y + 44}" text-anchor="middle">↓</text>` : ""}</g>`;
  }).join("");
  const cueY = 0;
  const svg = `<svg viewBox="0 0 300 ${30 + bullets.length * 34 + 6}" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect class="sv-cue" x="70" y="${cueY}" width="210" height="26" rx="8"/>
    <text class="sv-cuetext" x="175" y="${cueY + 17}" text-anchor="middle">${s.cueCue}: ${esc(set?.part2?.cue_card || "")}</text>
    ${rows}
  </svg>`;
  return `<div class="sp-visual" role="img" aria-label="${s.cueTitle}">
    <p class="sp-visual__cap"><b>${s.cueTitle}</b></p>
    ${svg}
  </div>`;
}
