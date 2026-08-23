# Analytics setup

Analytics is deliberately **disabled by default**. A build does not load a Google Analytics or Plausible script, and it sends no analytics data, unless a supported provider and a real identifier are configured.

## Choose one provider

Set these variables in the environment used by the production build/deploy. Do not commit a real identifier to this repository.

### Google Analytics 4

1. Create or select a web data stream in Google Analytics and copy its **Measurement ID** (normally `G-...`).
2. Configure:

```dotenv
PUBLIC_ANALYTICS_PROVIDER=google
PUBLIC_GA_MEASUREMENT_ID=YOUR_TRACKING_ID_HERE
```

3. Replace `YOUR_TRACKING_ID_HERE` with the real Measurement ID in the deployment environment, then rebuild and deploy.

### Plausible

1. Add and verify the production site domain in Plausible.
2. Configure:

```dotenv
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_PLAUSIBLE_DOMAIN=YOUR_TRACKING_ID_HERE
```

3. Replace `YOUR_TRACKING_ID_HERE` with the exact verified site domain (for example, `example.com`) in the deployment environment, then rebuild and deploy.

## Safety checks

- Both `PUBLIC_ANALYTICS_PROVIDER` and the corresponding identifier must be present. Unknown providers, missing values, and the literal `YOUR_TRACKING_ID_HERE` all keep analytics disabled.
- Configure **one** provider only. The application loads only the provider named by `PUBLIC_ANALYTICS_PROVIDER`.
- These are public build-time variables, so never put a secret, API key, or service-account credential in them.
- This integration does not implement a consent banner or assert that consent is unnecessary. Confirm the applicable consent, privacy-notice, and regional legal requirements before enabling a provider. Update the published privacy policy to identify the provider and its current data practices before enabling it.

## Verify after deployment

1. Open a production page with browser developer tools.
2. For Google Analytics, confirm a request to `googletagmanager.com/gtag/js` and use GA Realtime/DebugView to verify a test page view.
3. For Plausible, confirm a request to `plausible.io/js/script.js` and check the Plausible dashboard.
4. With the variables removed or left as `YOUR_TRACKING_ID_HERE`, confirm neither request is present.
