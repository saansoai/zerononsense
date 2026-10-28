/* Analytics, loaded only when a domain is configured.

   Plausible: no cookies, no cross-site identifiers, no personal data, so the
   site needs no consent banner. That is the reason for this provider rather
   than a preference — swapping in one that sets cookies means adding a
   banner and gating this call behind it.

   The script is injected at runtime rather than written into index.html so a
   build without VITE_ANALYTICS_DOMAIN ships no third-party request at all,
   which is what local and preview builds want. */

const DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN ?? '';

export function startAnalytics() {
  if (!DOMAIN || typeof document === 'undefined') return;
  if (document.querySelector('script[data-domain]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = DOMAIN;
  script.src = 'https://plausible.io/js/script.js';
  document.head.append(script);
}
