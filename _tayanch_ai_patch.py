#!/usr/bin/env python3
"""Writing mock sahifalarini Tayanch AI (Gemini) baholashga o'tkazadi.

6 ta bir xil JS strukturasidagi writing.html faylini yangilaydi:
- tayanch-ai.js ulash
- headerda auth konteyneri
- heuristik analyzeAndShowResults -> Gemini AI
- AI feedback ko'rsatish
Line ending'lar saqlanadi (CRLF/LF).
"""
import re
import sys
from pathlib import Path

FILES = [
    "public/ielts-mocks/mock-004/writing.html",
    "public/ielts-mocks/content/mock-019/writing.html",
    "public/ielts-mocks/content/mock-020/writing.html",
    "public/ielts-mocks/content/mock-021/writing.html",
    "public/ielts-mocks/content/mock-022/writing.html",
    "public/ielts-mocks/content/mock-023/writing.html",
    "public/ielts-mocks/content/mock-024/writing.html",
    "public/ielts-mocks/content/mock-028/writing.html",
]

ROOT = Path(__file__).resolve().parent

# ---- Almashtirishlar (LF normallashtirilgan matnda ishlaydi) ----

HEAD_OLD = """    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>"""

HEAD_NEW = """    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="../../tayanch-ai.js"></script>
</head>"""

PLACEHOLDER_OLD = """        <!-- Placeholder for balance -->
        <div style="width: 150px;"></div>"""

PLACEHOLDER_NEW = """        <div id="tayanchAuth" data-tayanch-auth aria-live="polite"></div>"""

ANALYZE_OLD = """        function analyzeAndShowResults() {
            // This is a simplified analysis. A real system would use a more complex algorithm or AI.
            const part1Analysis = analyzeWriting(partData[1].content, 1);
            const part2Analysis = analyzeWriting(partData[2].content, 2);

            const part1Scores = calculateBandScore(part1Analysis);
            const part2Scores = calculateBandScore(part2Analysis);

            const overallBand = calculateOverallBand(part1Scores, part2Scores);

            displayResults(part1Scores, part2Scores, overallBand);

            mainContainer.style.display = 'none';
            navigation.style.display = 'none';
            resultsContainer.style.display = 'block';
        }"""

ANALYZE_NEW = """        async function analyzeAndShowResults() {
            const submitBtn = document.getElementById('deliver-button');
            const originalBtn = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'AI baholanmoqda…'; }

            const task1Text = partData[1].content;
            const task2Text = partData[2].content;
            const promptEl1 = document.querySelector('#part-1 .task-prompt');
            const promptEl2 = document.querySelector('#part-2 .task-prompt');
            const prompt1 = promptEl1 ? promptEl1.innerText.trim() : 'Task 1';
            const prompt2 = promptEl2 ? promptEl2.innerText.trim() : 'Task 2';

            try {
                await window.TayanchAI.ensureApiKey();

                const results = [];
                if (task1Text.trim()) {
                    results[1] = await window.TayanchAI.assessWriting({ taskType: 'academic_task1', prompt: prompt1, response: task1Text });
                }
                if (task2Text.trim()) {
                    results[2] = await window.TayanchAI.assessWriting({ taskType: 'task2', prompt: prompt2, response: task2Text });
                }

                const part1Scores = results[1] ? aiAssessmentToScores(results[1]) : { task: 0, coherence: 0, lexical: 0, grammar: 0 };
                const part2Scores = results[2] ? aiAssessmentToScores(results[2]) : { task: 0, coherence: 0, lexical: 0, grammar: 0 };
                const overallBand = calculateOverallBand(part1Scores, part2Scores);

                window.__aiAssessments = results;
                displayResults(part1Scores, part2Scores, overallBand, results);

                mainContainer.style.display = 'none';
                navigation.style.display = 'none';
                resultsContainer.style.display = 'block';
            } catch (err) {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtn; }
                window.TayanchAI.showError(err);
            }
        }

        function aiAssessmentToScores(a) {
            const band = (c) => (c && typeof c.band === 'number') ? c.band : 0;
            return {
                task: (a && typeof a.task_band === 'number') ? a.task_band : band(a && a.task_achievement_or_response),
                coherence: band(a && a.coherence_cohesion),
                lexical: band(a && a.lexical_resource),
                grammar: band(a && a.grammatical_range_accuracy)
            };
        }"""

DISPLAY_OLD = """        function displayResults(scores1, scores2, overallBand) {
            const bandDescription = getBandDescription(overallBand);

            resultsContainer.innerHTML = `
                <div class="results-header">
                    <h1>Your Result</h1>
                    <div class="overall-band">${overallBand.toFixed(1)}</div>
                    <div class="band-description">${bandDescription}</div>
                </div>

                <div class="results-grid">
                    ${createScoreCardHTML('Part 1 - Task Achievement', scores1)}
                    ${createScoreCardHTML('Part 2 - Task Response', scores2)}
                </div>

                ${createFeedbackHTML(scores1, scores2)}

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="downloadReport()">Download Report</button>
                    <button class="btn btn-secondary" onclick="retakeTest()">Retake Test</button>
                </div>
            `;
        }"""

DISPLAY_NEW = """        function displayResults(scores1, scores2, overallBand, aiResults) {
            const bandDescription = getBandDescription(overallBand);

            resultsContainer.innerHTML = `
                <div class="results-header">
                    <h1>Your Result</h1>
                    <div class="overall-band">${overallBand.toFixed(1)}</div>
                    <div class="band-description">${bandDescription}</div>
                </div>

                <div class="results-grid">
                    ${createScoreCardHTML('Part 1 - Task Achievement', scores1)}
                    ${createScoreCardHTML('Part 2 - Task Response', scores2)}
                </div>

                ${aiFeedbackHTML(aiResults || window.__aiAssessments || [])}

                ${createFeedbackHTML(scores1, scores2)}

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="downloadReport()">Download Report</button>
                    <button class="btn btn-secondary" onclick="retakeTest()">Retake Test</button>
                </div>
            `;
        }

        function aiFeedbackHTML(results) {
            if (!results || !results.length) return '';
            const criteria = [
                { key: 'task_achievement_or_response', label: 'Task Achievement / Response' },
                { key: 'coherence_cohesion', label: 'Coherence & Cohesion' },
                { key: 'lexical_resource', label: 'Lexical Resource' },
                { key: 'grammatical_range_accuracy', label: 'Grammatical Range & Accuracy' }
            ];
            const parts = [1, 2].filter((i) => results[i]);
            if (!parts.length) return '';
            let html = '';
            parts.forEach((i) => {
                const a = results[i];
                html += `<div class="feedback-section"><h3>AI Tahlil — Part ${i} (${a.task_band || '—'})</h3><p style="color:#6c757d;margin:0 0 12px;font-size:14px">${(a.overall_summary || '').replace(/</g, '&lt;')}</p>`;
                criteria.forEach((c) => {
                    const item = a[c.key];
                    if (!item) return;
                    html += `<div style="padding:12px 15px;margin-bottom:8px;border-radius:8px;background:#f8f9fa;border-left:4px solid ${item.band >= 7 ? '#28a745' : item.band >= 6 ? '#ffc107' : '#dc3545'}">
                        <b>${c.label}: ${item.band}</b>
                        <p style="margin:6px 0 0;font-size:14px;color:#495057">${(item.feedback || '').replace(/</g, '&lt;')}</p>
                        ${item.example_from_text ? `<p style="margin:6px 0 0;font-size:13px;font-style:italic;color:#6c757d">"${(item.example_from_text || '').replace(/</g, '&lt;')}"</p>` : ''}
                        <p style="margin:6px 0 0;font-size:13px;color:#155724"><b>Tavsiya:</b> ${(item.improvement_tip || '').replace(/</g, '&lt;')}</p>
                    </div>`;
                });
                if (a.word_count_note) html += `<p style="font-size:13px;color:#c0392b;margin-top:6px">${(a.word_count_note || '').replace(/</g, '&lt;')}</p>`;
                html += `</div>`;
            });
            return html;
        }"""


def patch_file(path):
    data = path.read_bytes()
    nl = '\r\n' if b'\r\n' in data else '\n'
    text = data.decode('utf-8').replace('\r\n', '\n').replace('\r', '\n')

    replacements = [
        ("HEAD", HEAD_OLD, HEAD_NEW),
        ("PLACEHOLDER", PLACEHOLDER_OLD, PLACEHOLDER_NEW),
        ("ANALYZE", ANALYZE_OLD, ANALYZE_NEW),
        ("DISPLAY", DISPLAY_OLD, DISPLAY_NEW),
    ]
    ok = True
    for name, old, new in replacements:
        if old not in text:
            print(f"  [XATO] {name} topilmadi: {path.name}")
            ok = False
        else:
            text = text.replace(old, new, 1)
            print(f"  [OK] {name} almashtirildi")

    if not ok:
        return False

    # CRLF bo'lsa qayta tiklash
    if nl == '\r\n':
        text = text.replace('\n', '\r\n')
    path.write_bytes(text.encode('utf-8'))
    return True


def main():
    changed = []
    failed = []
    for f in FILES:
        p = ROOT / f
        if not p.exists():
            print(f"[MISS] {f}")
            failed.append(f)
            continue
        print(f"Patch: {f}")
        if patch_file(p):
            changed.append(f)
        else:
            failed.append(f)
        print()
    print("== Natija ==")
    print("O'zgartirildi:", len(changed))
    if failed:
        print("MUVAFFAQIYATSIZ:", failed)
        sys.exit(1)


if __name__ == "__main__":
    main()
