export type AnalyticsProvider = 'google' | 'plausible' | null;

const PLACEHOLDER_ID = 'YOUR_TRACKING_ID_HERE';

/**
 * GA4 Measurement IDs are public client-side identifiers: they are included in
 * the Google tag URL delivered to every visitor. This is intentionally kept in
 * versioned source so the static GitHub Pages build activates the approved
 * Tayanch web stream without requiring a deployment secret.
 */
const DEFAULT_GOOGLE_MEASUREMENT_ID = 'G-C8G7WRC92F';
const DEFAULT_PROVIDER: Exclude<AnalyticsProvider, null> = 'google';

const configuredProvider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER?.trim().toLowerCase();
const provider = configuredProvider === undefined ? DEFAULT_PROVIDER : configuredProvider;
const configuredGoogleMeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim();
const googleMeasurementId = configuredGoogleMeasurementId === undefined
  ? DEFAULT_GOOGLE_MEASUREMENT_ID
  : configuredGoogleMeasurementId;
const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN?.trim();

const isConfigured = (value: string | undefined) => Boolean(value && value !== PLACEHOLDER_ID);
const isGoogleMeasurementId = (value: string | undefined) => Boolean(
  isConfigured(value) && /^G-[A-Z0-9]+$/.test(value!)
);

/**
 * Environment variables can override the repository defaults for another
 * deployment. Unsupported providers, empty IDs, and placeholder IDs remain a
 * no-op, so no third-party script or events are emitted for invalid future
 * configuration changes.
 */
export const analytics: { provider: AnalyticsProvider; id: string | null } =
  provider === 'google' && isGoogleMeasurementId(googleMeasurementId)
    ? { provider: 'google', id: googleMeasurementId }
    : provider === 'plausible' && isConfigured(plausibleDomain)
      ? { provider: 'plausible', id: plausibleDomain }
      : { provider: null, id: null };
