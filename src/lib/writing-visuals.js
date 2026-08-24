// Reusable, theme-adaptable inline-SVG visual templates for IELTS Writing lessons.
// All charts use NEUTRAL SAMPLE data only and are labelled as such (no real/fake stats).
// Visuals are schematic; inner labels are localized via `lang`.

const STR = {
  uz: {
    sampleLabel: "Namuna ma’lumot — o’quv maqsadida",
    essayTitle: "Insho tuzilmasi (Task 2)",
    essay: ["Kirish", "Asosiy qism 1", "Asosiy qism 2", "Xulosa"],
    letterTitle: "Xat tuzilmasi (Task 1 — General)",
    letter: ["Salomlashing", "Maqsad", "Tafsilotlar", "Xulosa va imzo"],
    chart: "Grafik namunasi",
    legend2010: "2010",
    legend2020: "2020"
  },
  ru: {
    sampleLabel: "Пример данных — учебная цель",
    essayTitle: "Структура эссе (Task 2)",
    essay: ["Введение", "Основная часть 1", "Основная часть 2", "Заключение"],
    letterTitle: "Структура письма (Task 1 — General)",
    letter: ["Приветствие", "Цель", "Подробности", "Заключение и подпись"],
    chart: "Пример графика",
    legend2010: "2010",
    legend2020: "2020"
  },
  en: {
    sampleLabel: "Sample data — for learning",
    essayTitle: "Essay structure (Task 2)",
    essay: ["Introduction", "Body 1", "Body 2", "Conclusion"],
    letterTitle: "Letter structure (Task 1 — General)",
    letter: ["Salutation", "Purpose", "Details", "Closing & sign-off"],
    chart: "Sample chart",
    legend2010: "2010",
    legend2020: "2020"
  }
};

function blockDiagram(title, items) {
  const w = 320, rowH = 38, gap = 10, top = 30;
  const h = top + items.length * (rowH + gap) + 8;
  const rows = items.map((it, i) => {
    const y = top + i * (rowH + gap);
    return `<g><rect class="wv-box" x="10" y="${y}" width="${w - 20}" height="${rowH}" rx="9"/><text class="wv-text" x="${w / 2}" y="${y + rowH / 2 + 5}" text-anchor="middle">${it}</text>${i < items.length - 1 ? `<text class="wv-arrow" x="${w / 2}" y="${y + rowH + gap - 2}" text-anchor="middle">↓</text>` : ''}</g>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${rows}</svg><p class="wp-visual__cap">${title}</p>`;
}

function chartFrame(inner, caption) {
  return `${inner}<p class="wp-visual__cap">${caption}</p>`;
}

function barChart(s) {
  // neutral sample: 3 categories, 2010 vs 2020
  const cats = ["A", "B", "C"];
  const v10 = [40, 65, 30], v20 = [55, 80, 50];
  const x0 = 45, base = 150, max = 100, bw = 22, gap = 14;
  let bars = "";
  cats.forEach((c, i) => {
    const gx = x0 + i * (bw * 2 + gap + 18);
    const h1 = (v10[i] / max) * 110, h2 = (v20[i] / max) * 110;
    bars += `<rect class="wv-a" x="${gx}" y="${base - h1}" width="${bw}" height="${h1}" rx="3"/>`;
    bars += `<rect class="wv-b" x="${gx + bw + 6}" y="${base - h2}" width="${bw}" height="${h2}" rx="3"/>`;
    bars += `<text class="wv-text" x="${gx + bw + 3}" y="${base + 16}" text-anchor="middle">${c}</text>`;
  });
  const svg = `<svg viewBox="0 0 320 185" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <line class="wv-axis" x1="${x0 - 12}" y1="${base}" x2="300" y2="${base}"/>
    <line class="wv-axis" x1="${x0 - 12}" y1="20" x2="${x0 - 12}" y2="${base}"/>
    ${bars}
    <text class="wv-text" x="14" y="16">${s.legend2010}</text>
    <rect class="wv-a" x="64" y="10" width="10" height="10" rx="2"/>
    <text class="wv-text" x="80" y="16">${s.legend2020}</text>
    <rect class="wv-b" x="130" y="10" width="10" height="10" rx="2"/>
  </svg>`;
  return chartFrame(svg, `${s.chart} · ${s.sampleLabel}`);
}

function lineChart(s) {
  const pts = {
    a: [[45, 120], [110, 100], [175, 70], [240, 55], [295, 40]],
    b: [[45, 130], [110, 125], [175, 110], [240, 95], [295, 80]],
    c: [[45, 110], [110, 105], [175, 95], [240, 90], [295, 85]]
  };
  const toPath = (p) => p.map((q, i) => (i ? "L" : "M") + q[0] + " " + q[1]).join(" ");
  const svg = `<svg viewBox="0 0 320 170" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <line class="wv-axis" x1="35" y1="140" x2="305" y2="140"/>
    <line class="wv-axis" x1="35" y1="20" x2="35" y2="140"/>
    <path class="wv-line wv-a" d="${toPath(pts.a)}"/>
    <path class="wv-line wv-b" d="${toPath(pts.b)}"/>
    <path class="wv-line wv-c" d="${toPath(pts.c)}"/>
    <text class="wv-text" x="14" y="16">${s.legend2010}</text>
    <rect class="wv-a" x="64" y="10" width="10" height="10" rx="2"/>
    <text class="wv-text" x="80" y="16">${s.legend2020}</text>
    <rect class="wv-b" x="130" y="10" width="10" height="10" rx="2"/>
  </svg>`;
  return chartFrame(svg, `${s.chart} · ${s.sampleLabel}`);
}

function pieChart(s) {
  // 3 equal-ish slices (neutral sample)
  const slices = [
    { p: 50, c: "wv-a" },
    { p: 30, c: "wv-b" },
    { p: 20, c: "wv-c" }
  ];
  let acc = 0, paths = "";
  const cx = 80, cy = 80, r = 60;
  slices.forEach((sl) => {
    const a0 = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    acc += sl.p;
    const a1 = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = sl.p > 50 ? 1 : 0;
    paths += `<path class="${sl.c}" d="M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1} Z"/>`;
  });
  const svg = `<svg viewBox="0 0 220 160" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${paths}
    <text class="wv-text" x="160" y="50">A · 50%</text>
    <text class="wv-text" x="160" y="80">B · 30%</text>
    <text class="wv-text" x="160" y="110">C · 20%</text>
  </svg>`;
  return chartFrame(svg, `${s.chart} · ${s.sampleLabel}`);
}

function tableChart(s) {
  const svg = `<svg viewBox="0 0 320 160" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect class="wv-box" x="20" y="20" width="280" height="120" rx="8" fill="none"/>
    <line class="wv-axis" x1="20" y1="58" x2="300" y2="58"/>
    <line class="wv-axis" x1="20" y1="98" x2="300" y2="98"/>
    <line class="wv-axis" x1="130" y1="20" x2="130" y2="140"/>
    <line class="wv-axis" x1="215" y1="20" x2="215" y2="140"/>
    <text class="wv-text" x="28" y="46">X</text><text class="wv-text" x="138" y="46">Y</text><text class="wv-text" x="223" y="46">Z</text>
    <text class="wv-text" x="28" y="84">·</text><text class="wv-text" x="138" y="84">·</text><text class="wv-text" x="223" y="84">·</text>
    <text class="wv-text" x="28" y="124">·</text><text class="wv-text" x="138" y="124">·</text><text class="wv-text" x="223" y="124">·</text>
  </svg>`;
  return chartFrame(svg, `${s.chart} · ${s.sampleLabel}`);
}

function processDiagram(s) {
  const steps = ["Xom\nshosh", "Ishlov\nberish", "Quritish", "Qayta\nfoydalanish"];
  const w = 320, h = 120, bw = 64, bh = 48, y = 36, gap = (w - 2 * 10 - steps.length * bw) / (steps.length - 1);
  let g = "";
  steps.forEach((t, i) => {
    const x = 10 + i * (bw + gap);
    const [l1, l2] = t.split("\n");
    g += `<rect class="wv-box" x="${x}" y="${y}" width="${bw}" height="${bh}" rx="9"/>`;
    g += `<text class="wv-text" x="${x + bw / 2}" y="${y + 20}" text-anchor="middle">${l1}</text>`;
    if (l2) g += `<text class="wv-text" x="${x + bw / 2}" y="${y + 36}" text-anchor="middle">${l2}</text>`;
    if (i < steps.length - 1) g += `<text class="wv-arrow" x="${x + bw + gap / 2}" y="${y + bh / 2 + 6}" text-anchor="middle">→</text>`;
  });
  const svg = `<svg viewBox="0 0 ${w} ${h + 20}" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${g}</svg>`;
  return chartFrame(svg, `${s.sampleLabel}`);
}

function mapDiagram(s) {
  const svg = `<svg viewBox="0 0 320 150" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <rect class="wv-box" x="12" y="20" width="130" height="110" rx="8"/>
    <text class="wv-text" x="77" y="14" text-anchor="middle">Oldin</text>
    <rect class="wv-a" x="24" y="40" width="40" height="30" rx="4"/>
    <rect class="wv-b" x="90" y="70" width="40" height="40" rx="4"/>
    <rect class="wv-box" x="178" y="20" width="130" height="110" rx="8"/>
    <text class="wv-text" x="243" y="14" text-anchor="middle">Keyin</text>
    <rect class="wv-c" x="190" y="40" width="40" height="30" rx="4"/>
    <rect class="wv-a" x="246" y="70" width="40" height="40" rx="4"/>
    <rect class="wv-b" x="210" y="100" width="40" height="20" rx="4"/>
  </svg>`;
  return chartFrame(svg, `${s.sampleLabel}`);
}

function comboChart(s) {
  const svg = `<svg viewBox="0 0 320 170" width="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <line class="wv-axis" x1="35" y1="140" x2="305" y2="140"/>
    <rect class="wv-a" x="60" y="80" width="26" height="60" rx="3"/>
    <rect class="wv-a" x="120" y="60" width="26" height="80" rx="3"/>
    <rect class="wv-a" x="180" y="95" width="26" height="45" rx="3"/>
    <rect class="wv-a" x="240" y="70" width="26" height="70" rx="3"/>
    <path class="wv-line wv-b" d="M73 70 L133 50 L193 85 L253 60"/>
  </svg>`;
  return chartFrame(svg, `${s.chart} · ${s.sampleLabel}`);
}

export function buildWritingVisual(meta, lang = "uz") {
  const s = STR[lang] || STR.uz;
  if (meta.type === "task2") {
    return `<div class="wp-visual" role="img" aria-label="${s.essayTitle}">${blockDiagram(s.essayTitle, s.essay)}</div>`;
  }
  if (meta.task1_type === "general") {
    return `<div class="wp-visual" role="img" aria-label="${s.letterTitle}">${blockDiagram(s.letterTitle, s.letter)}</div>`;
  }
  const t = (meta.topic || "").toLowerCase();
  let inner;
  if (t.includes("bar chart")) inner = barChart(s);
  else if (t.includes("line graph")) inner = lineChart(s);
  else if (t.includes("pie chart")) inner = pieChart(s);
  else if (t.includes("table")) inner = tableChart(s);
  else if (t.includes("process")) inner = processDiagram(s);
  else if (t.includes("map")) inner = mapDiagram(s);
  else if (t.includes("bir nechta grafik") || t.includes("multiple")) inner = comboChart(s);
  else inner = barChart(s);
  const aria = `${s.chart}: ${meta.topic}`;
  return `<div class="wp-visual" role="img" aria-label="${aria}">${inner}</div>`;
}
