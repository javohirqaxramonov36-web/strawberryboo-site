# Blog content workflow

Approved blog posts belong in `src/content/blog/<locale>/<slug>.md` (or `.mdx`). The locale directories are `uz`, `ru`, and `en`. Do **not** add draft ideas as posts: this directory is for reviewed, publishable material only.

Each language version is its own file and needs this frontmatter:

```yaml
---
title: "Approved article title"
description: "A factual article summary for search results, 170 characters or fewer."
locale: "uz"
translationKey: "same-key-for-each-translation"
publishedAt: 2026-08-23
updatedAt: 2026-08-23 # optional
categories: ["IELTS", "Study skills"]
draft: false
relatedCourses:
  - title: "Course title shown to readers"
    href: "kurslar/course-slug/"
---
```

`translationKey` links translations of the same approved article. Use `draft: true` while a reviewed article must remain off the public blog. Course links are intentionally explicit so an editor can verify that each related-course recommendation is accurate for the article and its language.

The index pages are `/blog/`, `/ru/blog/`, and `/en/blog/`. A post is published at `/blog/<slug>/`, `/ru/blog/<slug>/`, or `/en/blog/<slug>/` according to `locale` and its folder. The reusable post template renders the title, description, publication/update dates, categories, body, and a clearly labeled related-course block.
