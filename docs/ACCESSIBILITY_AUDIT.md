# Accessibility audit

Date: 2026-08-23
Scope: static source inspection of the Astro site plus a production build. This is a quality pass, not a conformance claim or accessibility score.

## Checks completed

- Reviewed every source `<img>` element for an `alt` value.
  - Content screenshots use contextual descriptions or their visible caption.
  - The testimonial avatar intentionally retains `alt=""`, since the adjacent testimonial content supplies the meaningful information.
  - The empty lightbox image has `alt=""` until its source and descriptive text are assigned at runtime.
- Reviewed shared dark/light theme tokens and prominent text/background pairs. Shared muted text uses `#9a9ab2` on `#0e0f15` in dark mode and `#5b5d72` on `#f6f7fb` in light mode; both are intended as readable secondary text. Primary shared text and accent button text are higher contrast.
- Searched for pointer-only pseudo-controls (`onclick`/`role="button"` on non-interactive elements) and inspected the shared navigation and representative practice controls. Interactive controls are native links, buttons, form controls, or labels.
- Searched for focus rules that removed the outline. The source still has page-specific visual styles, but the shared layout now supplies a consistent keyboard focus treatment for normal controls.

## Fixes made

- Added a visible `:focus-visible` outline to links, buttons, inputs, selects, textareas, and summaries in the shared layout.
- Replaced outline-removing focus styles in the three Tech Lab and three Markdown-to-PDF pages with a visible keyboard focus ring.
- Improved the mobile navigation toggle with `type="button"`, an accessible name, `aria-controls`, and an `aria-expanded` value that follows the menu state.

## Limitations / follow-up

- This pass did not use a screen reader, automated accessibility scanner, keyboard-only traversal of every route, or contrast measurement for every page-specific inline color and gradient. Those checks remain necessary before claiming WCAG conformance.
- Several standalone practice pages contain their own inline styles and runtime-generated controls. Their focus, labels, error messaging, and dialog behavior should be tested interactively in each locale.
- Runtime images sourced from authentication/profile data were not treated as identifiable content images; no speculative alt text was added.
- The built `dist/ielts-mocks/_inbox/` archive contains 33 externally sourced images without `alt` attributes. Those files are not generated from `src/` image components and their content cannot be identified reliably from a static audit, so they were left unchanged rather than given invented descriptions.
- Final project validation: `CI=1 ASTRO_TELEMETRY_DISABLED=1 npm run build` completed successfully with **166 generated pages**. The telemetry environment setting is required in this sandbox because Astro otherwise attempts to write host preference files.
