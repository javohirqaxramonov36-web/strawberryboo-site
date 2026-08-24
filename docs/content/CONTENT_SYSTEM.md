# Tayanch content system

## Pillars and cluster plan

| Pillar | Planned article topics (publish after review) | Internal links |
|---|---|---|
| AI & digital skills | AI tools for study; prompt structure; verifying AI output; AI agents basics; Obsidian study notes; Figma first project; data-analysis starter map; Python practice plan; computer hygiene; choosing a digital-skill course | Relevant `/kurslar/.../`, `/kurs-tanlash/`, related blog guide |
| IELTS practice | Speaking self-review; Writing Task 2 routine; vocabulary review; reading time plan; listening error log; mock-test preparation; score-feedback limits; study-week planner; pronunciation practice; choosing IELTS practice | `/ielts-practice/`, `/ielts-mock/`, relevant IELTS course |
| Study abroad | Admission timeline; university list criteria; activity list; essay revision; document checklist; recommendation preparation; scholarship research method; English-test planning; offer-letter checklist; family planning conversation | `/kurslar/admission-process/`, `/tayanch-portfoliosi/`, related guide |

## Publishing workflow
1. Draft in all three locales using `translationKey`; preserve equivalent meaning.
2. Give a useful title, ≤170-character description, categories, date, and course links.
3. Add two contextual internal links: one relevant course and one related article.
4. Fact-check claims; do not invent outcomes, student stories, prices, or Telegram URLs.
5. Publish only reviewed articles (`draft: false`). The Astro collection and sitemap include them automatically.

## Lead magnet
Use only the existing `https://t.me/tayanch_go` channel CTA. Do not claim a pinned post or collect contacts. A future bot flow is documented in `docs/operations/OPTIONAL_TELEGRAM_BOT_UPGRADE.md`.
