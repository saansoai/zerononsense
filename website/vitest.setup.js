/* jsdom implements neither matchMedia nor IntersectionObserver.

   matchMedia is stubbed because every browser has it and the components are
   right to call it unguarded — the gap is the test environment's, not theirs.

   IntersectionObserver is deliberately left missing. Both components that use
   one have to cope without it (an old browser, a prerender), and leaving it
   undefined here is what keeps that path exercised. */

window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
});
