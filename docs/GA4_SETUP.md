# Google Analytics 4 (GA4) setup

## Active static-site configuration

The production static build uses the approved Tayanch GA4 Measurement ID:

```text
G-C8G7WRC92F
```

It is configured in `src/config/analytics.ts` as `DEFAULT_GOOGLE_MEASUREMENT_ID`, with `DEFAULT_PROVIDER` set to `google`. A GA4 Measurement ID is a public client-side identifier: it appears in the Google tag URL that every visitor receives. It is not an API key, service-account credential, or other secret, so it is deliberately versioned rather than placed in a secret `.env` file.

`PUBLIC_ANALYTICS_PROVIDER` and `PUBLIC_GA_MEASUREMENT_ID` can override those defaults for another build. A blank, placeholder (`YOUR_TRACKING_ID_HERE`), or unsupported configuration resolves to the existing no-op behavior: no analytics provider script is emitted and no click events are sent.

## Tracking currently emitted

The shared `Analytics.astro` component is rendered in `Base.astro`, so every built page emits one GA4 Google tag and one `gtag('config', measurementId)` call with `measurementId` set to `G-C8G7WRC92F` under the default configuration. GA4 records its normal page views. The existing safe click handler also sends only these interaction events when applicable:

- `begin_checkout` for elements with `data-payment-open`
- `telegram_cta_click` for links to `t.me/...`
- an explicit event name from `data-analytics-event`

Each click event includes a shortened visible link label (`link_text`) and `page_path`. The handler does not send an event for ordinary links or buttons.

## Build, deploy, and test

1. Run `ASTRO_TELEMETRY_DISABLED=1 npm run build`.
2. Inspect representative generated pages (for example UZ, EN, and RU pages) and confirm each has one `https://www.googletagmanager.com/gtag/js?id=G-C8G7WRC92F` tag and one matching `gtag('config', ...)` call.
3. Push through the normal GitHub Pages workflow. The workflow builds static `dist/` output; no analytics secret is required.
4. On the deployed site, use browser developer tools to confirm the Google tag request, then use GA4 Realtime or DebugView to verify a test page view and an intentional CTA click.

## Privacy and future changes

The UZ, RU, and EN privacy pages state that Google Analytics collects pseudonymous usage and interaction data such as pages viewed and CTA clicks, and that visitors can use browser controls or content blockers to limit it. This project does **not** include a consent manager or cookie banner. Confirm applicable regional consent and disclosure obligations before deployment or when changing analytics behavior.

To change the default GA4 stream, update only `DEFAULT_GOOGLE_MEASUREMENT_ID` in `src/config/analytics.ts`, retain the public-ID comment, update the privacy disclosure if practices change, then rebuild and repeat the verification steps. Do not place secrets in a public configuration file.
