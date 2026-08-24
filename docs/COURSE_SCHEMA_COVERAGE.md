# Course Schema coverage

The site renders one `Course` JSON-LD object on every current public course detail page under `/kurslar/`, `/ru/kurslar/`, and `/en/kurslar/`. It is emitted by `CourseSchema.astro`, which serializes the JSON with `JSON.stringify` and derives the canonical page URL from Astro's built URL.

## Covered course templates

- `LocalizedStandardCourse`: localized standard courses, including Figma, Prompt Engineering, AI Agents, AutoCAD on Mac, Backend Python, data analytics, study-abroad topics, financial/computer literacy, Obsidian, Vibe Coding, and IELTS Vocabulary in RU/EN.
- `GeneralEnglishCourse`: all six CEFR General English levels in UZ, RU, and EN.
- `IeltsSkillCourse`: IELTS Listening, Reading, Speaking, and Writing in UZ, RU, and EN.
- `SatCourse`: SAT English, SAT Math, and Desmos Applications in UZ, RU, and EN.
- Bespoke Uzbek course pages: IELTS Vocabulary, Obsidian, and Vibe Coding. Existing bespoke-course coverage remains in place for the other Uzbek detail pages.

Each object uses only the visible course name, visible course description, `inLanguage` (`uz`, `ru`, or `en`), the page URL, and the Tayanch organization/provider URL. It deliberately does not assert instructors, ratings, review totals, offers, prices/currencies, durations, start dates, availability, or results.

## Intentionally excluded routes

- The three course catalogue index pages (`/kurslar/`, `/ru/kurslar/`, `/en/kurslar/`) are category listings, not one course.
- `/kurslar/ielts-prep/` and `/kurslar/ielts-prep/speaking/` are `noindex` redirect pages.
- The localized `/kurslar/ielts-writing/typing/` pages are interactive typing-practice tools rather than standalone courses.

## Validation

Run `npm run build`, then `node scripts/verify-course-schema.mjs`. The verification script scans built course-route HTML, parses every JSON-LD script, requires exactly one `Course` object on each covered detail page, requires none on the exclusions above, and summarizes language coverage. This confirms valid JSON and page-level coverage; it does not promise eligibility for Google rich results.
