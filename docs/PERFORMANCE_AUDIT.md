# Performance Audit — Phase 3.1

**Audited:** 2026-08-23 19:00 Asia/Tashkent
**Scope:** Astro source and the generated local site assets, with emphasis on image transfer and render/decode behavior.

## Method and limits

- Inspected all local raster assets under `public/` using Pillow (dimensions, format, and byte size), and inspected every Astro source `<img>` reference.
- Inspected the existing `dist/` output for asset sizes.
- Lighthouse was not installed or available in this checkout. It was deliberately not added because it is a heavyweight audit dependency; therefore this document does **not** claim Core Web Vitals or a Lighthouse score.
- The existing `dist/` folder was 933 MB / 588 files. Its largest files are archived IELTS mock audio and inbox copies (up to 20.2 MB each), not the primary course images optimized here. Those files remain a separate deployment-payload concern.

## Findings before changes

| Asset group | Format | Bytes | Notes |
| --- | --- | ---: | --- |
| Obsidian course screenshots (3) | PNG | 3,148,247 | 3360×2100 each; rendered as content/hero imagery on `/kurslar/obsidian/`. |
| Journey proof cards (11) | WebP | 178,850 | Already efficient and already lazy-loaded. |
| PWA/splash/OG images | PNG | 458,386 | Platform/share metadata assets; not converted because their required formats/uses differ. |
| Mock 001 chart images | JPEG | 64,994 | Small local static assets. |

The Obsidian route’s off-screen content images already used `loading="lazy"`, but several did not specify asynchronous decoding. The hero screenshot was eager-loaded and was a 1.07 MB PNG.

## Implemented changes

1. Converted the three referenced Obsidian screenshots to **lossless WebP** using the installed `cwebp -lossless` tool, updated the Astro references, and removed the now-unreferenced PNG originals.
   - Pixel verification with Pillow `ImageChops.difference`: same dimensions and no changed pixels for all three conversions.
   - Transfer bytes: **3,148,247 → 924,632** (**2,223,615 bytes / 70.6% smaller**).
   - The eager hero is now 304,652 bytes instead of 1,070,255 bytes (**71.5% smaller**).
2. Added `decoding="async"` to non-hero lazy content images in reusable Astro components (`JourneyPage`, `Testimonials`, `VocabularyMethodCard`, and `ObsidianScreenshotSlots`) and to the below-the-fold Obsidian screenshots.
3. Retained eager loading for the Obsidian hero, added `fetchpriority="high"`, and added asynchronous decoding so its substantially smaller image is requested promptly without blocking decode work unnecessarily.

## Verification

- Targeted local server verification passed: `astro dev` served `/strawberryboo-site/kurslar/obsidian/` with only the three new `.webp` screenshot URLs. The hero markup includes `loading="eager" fetchpriority="high" decoding="async"`.
- Final full validation after the blog-route fix: `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run build` completed successfully with **166 generated pages**. The initial build attempt without the telemetry environment variable was blocked by sandbox write permissions for `~/Library/Preferences/astro/config.json`; disabling telemetry is required in this environment.
- Confirmed no source or public references remain to the three retired Obsidian screenshot PNG paths.

## Deferred / not changed

- Static public IELTS mock archives contain third-party remote images and duplicated media/inbox material. They need a separately scoped content/deployment cleanup; changing them here could alter archived mock behavior.
- No analytics or accessibility files were modified by this phase.
- No lossy image encoding or new package was introduced.
