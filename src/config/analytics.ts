export type AnalyticsProvider = 'google' | 'plausible' | null;

const PLACEHOLDER_ID = 'YOUR_TRACKING_ID_HERE';
const provider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER?.trim().toLowerCase();
const googleMeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim();
const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN?.trim();

const isConfigured = (value: string | undefined) => Boolean(value && value !== PLACEHOLDER_ID);

/**
 * Analytics is off unless a supported provider and its non-placeholder public
 * environment variable are both configured at build time. This avoids loading
 * a third-party script or sending page-view data in unconfigured deployments.
 */
export const analytics: { provider: AnalyticsProvider; id: string | null } =
  provider === 'google' && isConfigured(googleMeasurementId)
    ? { provider: 'google', id: googleMeasurementId! }
    : provider === 'plausible' && isConfigured(plausibleDomain)
      ? { provider: 'plausible', id: plausibleDomain! }
      : { provider: null, id: null };
