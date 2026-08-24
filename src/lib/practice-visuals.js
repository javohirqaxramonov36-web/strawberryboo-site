// Reusable, theme-adaptable inline-SVG infographics for IELTS Reading/Listening
// mini-practice pages. Structural only — no real/fake stats.

const READING = {
  uz: { title: "Reading yondashuvi", steps: ["Passage", "Kalit so‘zlar", "Savol turi", "Tekshirish"], c1: "T/F/NG · 1–4", c2: "Word limit · 5–6" },
  ru: { title: "Подход к Reading", steps: ["Passage", "Ключевые слова", "Тип вопроса", "Проверка"], c1: "T/F/NG · 1–4", c2: "Лимит слов · 5–6" },
  en: { title: "Reading approach", steps: ["Passage", "Keywords", "Question type", "Check"], c1: "T/F/NG · 1–4", c2: "Word limit · 5–6" }
};

const LISTENING = {
  uz: { title: "Listening tuzilmasi", sec: "Section", q: "10 savol", once: "Audio bir marta eshitiladi" },
  ru: { title: "Структура Listening", sec: "Раздел", q: "10 вопросов", once: "Аудио слушают один раз" },
  en: { title: "Listening structure", sec: "Section", q: "10 questions", once: "Audio is played once" }
};

const BARS = [8, 18, 28, 14, 32, 20, 10, 24, 30, 16, 26, 12, 22, 34, 14, 28, 18, 10, 24, 30];

export function buildReadingApproach(lang = "uz") {
  const s = READING[lang] || READING.uz;
  const bw = 130, bh = 42, gap = 18, x0 = 10, y = 18;
  let boxes = "";
  s.steps.forEach((t, i) => {
    const x = x0 + i * (bw + gap);
    boxes += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="9" style="fill:var(--surface);stroke:var(--accent);stroke-width:1.5"/>`;
    boxes += `<text x="${x + bw / 2}" y="${y + bh / 2 + 5}" text-anchor="middle" style="fill:var(--text);font:600 13px system-ui">${t}</text>`;
    if (i < s.steps.length - 1) boxes += `<text x="${x + bw + gap / 2}" y="${y + bh / 2 + 5}" text-anchor="middle" style="fill:var(--muted);font:700 16px system-ui">→</text>`;
  });
  const w = x0 + s.steps.length * (bw + gap);
  const cards = `<g><rect x="10" y="76" width="210" height="34" rx="8" style="fill:var(--accent);opacity:.14;stroke:var(--accent);stroke-width:1.5"/><text x="115" y="97" text-anchor="middle" style="fill:var(--text);font:700 12px system-ui">${s.c1}</text></g><g><rect x="240" y="76" width="210" height="34" rx="8" style="fill:var(--accent);opacity:.14;stroke:var(--accent);stroke-width:1.5"/><text x="345" y="97" text-anchor="middle" style="fill:var(--text);font:700 12px system-ui">${s.c2}</text></g>`;
  return `<div class="rpv" role="img" aria-label="${s.title}" style="margin:18px 0;padding:14px;border:1px solid var(--border);border-radius:14px;background:var(--surface)"><p class="rpv-cap" style="margin:0 0 8px;font-size:.85rem;color:var(--muted)"><b>${s.title}</b></p><svg viewBox="0 0 ${w} 118" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${boxes}${cards}</svg></div>`;
}

export function buildListeningStructure(lang = "uz") {
  const s = LISTENING[lang] || LISTENING.uz;
  const bw = 120, bh = 46, gap = 14, x0 = 10, y = 16;
  let boxes = "";
  for (let i = 0; i < 4; i++) {
    const x = x0 + i * (bw + gap);
    const active = i === 1;
    boxes += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" style="fill:${active ? "var(--accent)" : "var(--surface)"};stroke:var(--accent);stroke-width:1.5"/>`;
    boxes += `<text x="${x + bw / 2}" y="${y + 20}" text-anchor="middle" style="fill:${active ? "#fff" : "var(--text)"};font:800 13px system-ui">${s.sec} ${i + 1}</text>`;
    boxes += `<text x="${x + bw / 2}" y="${y + 38}" text-anchor="middle" style="fill:${active ? "#fff" : "var(--muted)"};font:600 11px system-ui">${s.q}</text>`;
  }
  const w = x0 + 4 * (bw + gap);
  const wy = 80;
  const bars = BARS.map((h, i) => `<rect x="${x0 + i * 13}" y="${wy + 20 - h}" width="7" height="${h}" rx="2" style="fill:var(--accent)"/>`).join("");
  return `<div class="lpv" role="img" aria-label="${s.title}" style="margin:18px 0;padding:14px;border:1px solid var(--border);border-radius:14px;background:var(--surface)"><p class="lpv-cap" style="margin:0 0 8px;font-size:.85rem;color:var(--muted)"><b>${s.title}</b> · ${s.once}</p><svg viewBox="0 0 ${w} 110" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${boxes}${bars}</svg></div>`;
}
