#!/usr/bin/env python3
"""content/mock-025 va mock-026 writing.html ni Tayanch AI (Gemini) baholashga o'tkazadi."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FILES = [
    ROOT / "public/ielts-mocks/content/mock-025/writing.html",
    ROOT / "public/ielts-mocks/content/mock-026/writing.html",
]

HEAD_OLD = """    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js"></script>
</head>"""

HEAD_NEW = """    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js"></script>
    <script src="../../../../tayanch-ai.js"></script>
</head>"""

AUTH_OLD = """                <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>"""

AUTH_NEW = """                <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div id="tayanchAuth" data-tayanch-auth style="margin-left:10px" aria-live="polite"></div>
        </div>
    </div>"""

SUCCESS_OLD = """    <div class="success-message" id="successMessage">
        <h3>✅ Test Completed Successfully!</h3>
        <p>Your IELTS Writing Test PDF file has been downloaded to your computer.</p>
        <p style="color: #e74c3c; font-weight: bold; margin-top: 15px;">The test has ended. You can close this window.</p>
        <button class="btn" onclick="closeSuccessMessage()">Close</button>
    </div>"""

SUCCESS_NEW = """    <div class="success-message" id="successMessage">
        <h3>✅ Test Completed Successfully!</h3>
        <p>Your IELTS Writing Test PDF file has been downloaded to your computer.</p>
        <div id="aiResults" class="ai-results"></div>
        <p style="color: #e74c3c; font-weight: bold; margin-top: 15px;">The test has ended. You can close this window.</p>
        <button class="btn" onclick="closeSuccessMessage()">Close</button>
    </div>"""

SUBMIT_OLD = """            if (confirm(`Are you sure you want to submit your writing?\\n\\nPart 1: ${part1WordCount} words\\nPart 2: ${part2WordCount} words`)) {
                clearInterval(timerInterval);
                showProcessingMessage();
                setTimeout(() => {
                    downloadBothTasksPDF();
                    setTimeout(() => {
                        showSuccessMessage();
                    }, 1000);
                }, 2000);
            }
        }"""

SUBMIT_NEW = """            if (confirm(`Are you sure you want to submit your writing?\\n\\nPart 1: ${part1WordCount} words\\nPart 2: ${part2WordCount} words`)) {
                clearInterval(timerInterval);
                showProcessingMessage();
                runAiAssessment(part1Content, part2Content);
            }
        }

        async function runAiAssessment(part1Content, part2Content) {
            const promptEl1 = document.querySelector('#part-1 .task-prompt');
            const promptEl2 = document.querySelector('#part-2 .task-prompt');
            const prompt1 = promptEl1 ? promptEl1.innerText.trim() : 'Task 1';
            const prompt2 = promptEl2 ? promptEl2.innerText.trim() : 'Task 2';
            const results = [];
            try {
                await window.TayanchAI.ensureApiKey();
                if (part1Content.trim()) {
                    results[1] = await window.TayanchAI.assessWriting({ taskType: 'academic_task1', prompt: prompt1, response: part1Content });
                }
                if (part2Content.trim()) {
                    results[2] = await window.TayanchAI.assessWriting({ taskType: 'task2', prompt: prompt2, response: part2Content });
                }
            } catch (err) {
                window.TayanchAI.showError(err);
            }
            renderAiResults(results);
            downloadBothTasksPDF();
            setTimeout(() => {
                showSuccessMessage();
            }, 400);
        }

        function renderAiResults(results) {
            const host = document.getElementById('aiResults');
            if (!host) return;
            const criteria = [
                { key: 'task_achievement_or_response', label: 'Task Achievement / Response' },
                { key: 'coherence_cohesion', label: 'Coherence & Cohesion' },
                { key: 'lexical_resource', label: 'Lexical Resource' },
                { key: 'grammatical_range_accuracy', label: 'Grammatical Range & Accuracy' }
            ];
            let html = '';
            [1, 2].forEach((i) => {
                const a = results[i];
                if (!a) return;
                html += `<div class="feedback-section" style="margin:14px 0 0;padding:16px;background:#f8f9fa;border-radius:8px;text-align:left">
                    <h3 style="margin:0 0 10px;font-size:16px;color:#343a40">AI Tahlil — Part ${i} (Overall: ${a.task_band || '—'})</h3>
                    <p style="color:#6c757d;margin:0 0 12px;font-size:14px">${(a.overall_summary || '').replace(/</g, '&lt;')}</p>`;
                criteria.forEach((c) => {
                    const item = a[c.key];
                    if (!item) return;
                    html += `<div style="padding:10px 12px;margin-bottom:8px;border-radius:6px;background:#fff;border-left:4px solid ${item.band >= 7 ? '#28a745' : item.band >= 6 ? '#ffc107' : '#dc3545'}">
                        <b style="color:#343a40">${c.label}: ${item.band}</b>
                        <p style="margin:4px 0 0;font-size:13px;color:#495057">${(item.feedback || '').replace(/</g, '&lt;')}</p>
                        <p style="margin:4px 0 0;font-size:12px;color:#155724"><b>Tavsiya:</b> ${(item.improvement_tip || '').replace(/</g, '&lt;')}</p>
                    </div>`;
                });
                html += `</div>`;
            });
            host.innerHTML = html;
        }"""


def patch_file(path):
    data = path.read_bytes()
    nl = '\r\n' if b'\r\n' in data else '\n'
    text = data.decode('utf-8').replace('\r\n', '\n').replace('\r', '\n')

    replacements = [
        ("HEAD", HEAD_OLD, HEAD_NEW),
        ("AUTH", AUTH_OLD, AUTH_NEW),
        ("SUCCESS", SUCCESS_OLD, SUCCESS_NEW),
        ("SUBMIT", SUBMIT_OLD, SUBMIT_NEW),
    ]
    ok = True
    for name, old, new in replacements:
        if old not in text:
            print(f"  [XATO] {name} topilmadi")
            ok = False
        else:
            text = text.replace(old, new, 1)
            print(f"  [OK] {name} almashtirildi")

    if not ok:
        return False

    if nl == '\r\n':
        text = text.replace('\n', '\r\n')
    path.write_bytes(text.encode('utf-8'))
    return True


def main():
    failed = []
    for p in FILES:
        print(f"Patch: {p}")
        if not patch_file(p):
            failed.append(str(p))
        print()
    if failed:
        raise SystemExit(1)
    print("Barcha fayllar yangilandi.")


if __name__ == "__main__":
    main()