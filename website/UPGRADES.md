# Zero Nonsense website — upgrade list

> **Status, 2026-10-18.** The homepage was rebuilt after this audit — see
> [BRAND-AUDIT.md](BRAND-AUDIT.md). Sections 1, 2, 3 and most of 4 and 5 are now
> **done**: the `h1`, anchor offsets, focus styles, mobile menu and skip link;
> every contrast pairing; all SEO and sharing metadata; the dead assets; the
> product framing and the real label data. What remains open is listed at the end
> of BRAND-AUDIT §5 — chiefly the framer-motion bundle weight (§4), the contact
> form and remaining pages (§5), and all of §6 below, which is untouched.

Audit done against a running `npm run dev` (Vite 8.3.2, http://localhost:5173) plus a
production `vite build`, on 2026-10-18. Lint is clean, the build succeeds in ~260ms, and
there are no console errors. Everything below is an improvement, not a breakage —
ordered by how much it costs to leave in.

| Check | Result |
| --- | --- |
| `npm run dev` | starts, serves 200 on `/` and `/src/main.jsx` |
| `npm run lint` | clean |
| `vite build` | ok — 366.70 kB JS (116.18 kB gzip), 10.21 kB CSS |
| Console at runtime | no errors or warnings |

---

## 1. Blockers — small fixes, visible effect

**No `<h1>` on the page.** The hero wordmark is a `motion.div` with
`role="img" aria-label="Zero Nonsense"` ([Hero.jsx:57](src/components/Hero.jsx#L57)), so the
first heading in the document is the `<h2>` in Products. Search engines and screen-reader
heading navigation both see a page with no title-level heading. Wrap the wordmark in an
`<h1>` (visually unchanged — the mask does the drawing) or add a visually-hidden `<h1>`.

**Anchor links land underneath the fixed nav.** The nav is `position: fixed` at `top: 16px`
with a height of about 60px ([site.css:118](src/site.css#L118)), and nothing in the stylesheet
sets `scroll-margin-top`. Clicking *Products* or *The Promise* — or the hero's two buttons,
which call `scrollIntoView` — parks the section heading behind the nav pill. Confirmed in the
browser: the "Everything we make, printed in full." heading is half-covered after the jump.
Fix is one rule:

```css
#products, #promise, #contact { scroll-margin-top: 96px; }
```

**The promise rubber stamp collides with the nav.** `.promise` is a two-column grid whose
first cell is the 190px `RubberStamp` ([Promise.jsx:15](src/components/Promise.jsx#L15)). When
that section is at the top of the viewport the stamp sits directly under the nav pill and is
clipped by it. Give the section top padding, or drop the stamp lower in its column.

**Mobile stamp tiles look broken below 560px.** At that breakpoint `.tile-inner` is given
`width: 132px; height: 168px` ([site.css:366](src/site.css#L366)) but `.tile-hole` — which is
what actually sizes the `StampFrame` behind it — stays at `158px x 196px`
([site.css:224](src/site.css#L224)). The paper plate ends up smaller than the scalloped frame,
so the perforation shows through around the text. Both numbers need to move together; better
still, drive the tile size from one custom property.

**No focus styles anywhere.** `--focus-ring` is defined in
[colors.css:29](src/styles/colors.css#L29) and never used. `Button` tracks hover and press
with `onMouseEnter`/`onMouseDown` ([Button.jsx:18](src/ds/Button.jsx#L18)) — all mouse-only, so
a keyboard user gets no state feedback at all beyond the browser default outline, which the
pill border makes hard to see. Add `:focus-visible` to `Button`, `.nav-links a` and
`.footer-col a`.

---

## 2. Accessibility — contrast

The muted ink tints fail WCAG AA at the sizes they are used. Measured against Archival Paper
`#F3F1E4`:

| Token | Resolved | Ratio | Used on | Verdict |
| --- | --- | --- | --- | --- |
| `--ink-40` | approx `#9E9C92` | **2.43:1** | footer fine print, `.status`, `.hero-note` — 10–11px | fails AA (4.5 needed) |
| `--ink-60` | approx `#737169` | **4.30:1** | `.lede`, `.product-claim`, promise body, nav links | fails AA, just |
| `#E9461E` on paper | — | **3.43:1** | every `.eyebrow`, `.promise-card h3` — 10–12px | fails AA |
| paper on `#E9461E` | — | **3.43:1** | the primary CTA button label | fails AA |
| paper on `#5E97DF` | — | **2.69:1** | `--text-on-blue`, secondary button | fails AA |

The brand colours themselves are fine as *surfaces* — it is only text sitting on them that
fails. The cheapest route that keeps the palette intact: darken `--ink-40` / `--ink-60` to about
`0.55` / `0.72` alpha, and add text-only darkened variants of the red and blue (`--zn-red-deep`
and `--zn-blue-deep` already exist in the package and are currently used only for hover).
Worth raising with the brand before launch rather than after.

Also in this bucket:

- **No mobile navigation.** `.nav-links { display: none }` below 920px
  ([site.css:359](src/site.css#L359)) with nothing replacing it. On a phone the nav is a logo
  and one button; Products / The Promise / Contact are unreachable except by scrolling. Needs a
  disclosure menu.
- **No skip link** to `<main>`.
- `html { scroll-behavior: smooth }` is global, which can be unpleasant for motion-sensitive
  users — it is correctly disabled under `prefers-reduced-motion`
  ([site.css:375](src/site.css#L375)), so this one is already handled.
- The cloud images are `pointer-events: none` with `alt=""` inside an `aria-hidden` wrapper —
  correct as-is.

---

## 3. SEO and sharing — currently absent

[index.html](index.html) has a title, a description and a favicon, and nothing else:

- No `og:title` / `og:description` / `og:image` / `og:url`, no Twitter card. Any link to this
  site pasted into WhatsApp, Slack or LinkedIn renders as a bare URL. For a consumer nutrition
  brand this is the single highest-leverage missing item.
- No `<link rel="canonical">`.
- No `robots.txt`, no `sitemap.xml`.
- No JSON-LD. An `Organization` block (Saanso Nutri Sciences, Hyderabad, the email) plus a
  `Product` block per SKU is maybe 40 lines and directly feeds rich results.
- Title is just `Zero Nonsense` — no category words. Something like
  `Zero Nonsense — millet-based daily nutrition | Saanso Nutri Sciences` ranks for more.
- The favicon link points at `/assets/logo-stamp.png`, while `public/favicon.svg` sits unused.
  Pick one; also add `apple-touch-icon` and a web manifest.

---

## 4. Performance

**366 kB of JS (116 kB gzip) for a static one-page marketing site** is the headline number, and
nearly all of it is framer-motion. Options, cheapest first:

1. Import the `m` component plus `LazyMotion` with `domAnimation` — that alone typically cuts
   the animation runtime by over half, and every effect used here (fade, translate, rotate,
   spring tilt, scroll parallax) is inside `domAnimation`.
2. The scroll reveals (`Reveal`, `StampPress`) are pure enter-once transitions and could be
   `IntersectionObserver` plus a CSS class, removing them from the JS path entirely.
3. The cloud parallax and the hero bob are both expressible as CSS `animation` /
   `animation-timeline: scroll()`. Only `useTilt` genuinely benefits from a spring.

**~400 kB of dead assets ship in `dist/`.** Confirmed by grepping `src/` and `index.html`:

- `public/extract/packaging-p03|p05|p07.jpg` — 368 kB, referenced nowhere
- `public/assets/wordmark-kids.png` — 18.5 kB, referenced nowhere
- `public/icons.svg`, `public/favicon.svg` — referenced nowhere

Delete them or move them out of `public/`. That is more bytes than the entire CSS file, shipped
to every visitor for nothing.

**Images.** The two sky JPEGs (74 kB together) and three wordmark PNGs (52 kB) are all raster.
The wordmarks are flat two-colour lettering and should be SVG — which the README already lists
as outstanding from the brand, and which would also remove the CSS-mask workaround in
[site.css:198](src/site.css#L198). The clouds want AVIF/WebP with a JPEG fallback and
`decoding="async"`, and no `width`/`height` is set on either `<img>` in
[Sky.jsx](src/components/Sky.jsx).

**Fonts.** Google Fonts is preconnected and `display=swap` is set — good. The request pulls
four cuts of Averia Serif Libre (including an italic I could not find used) and five weights of
Geist Mono. Trimming to the weights the tokens actually reference, or self-hosting the subset,
removes a third-party round trip from the critical path.

---

## 5. Content and functionality gaps

Product decisions rather than code, but they are what stands between this and a launchable site:

- **"Enquire" is a dead end.** Every product card's CTA and the nav's *Contact* link scroll to
  the footer, where the only contact mechanism is a `mailto:`. There is no form, no backend, no
  confirmation. For a brand running paid traffic this is the conversion leak.
- **It is one page.** The brief in the design-system package lists Products, Product detail,
  About and Contact. There is no router — adding `react-router`, or moving to a file-routed
  framework, is the structural decision to make before the page count grows.
- **All three product cards show the same artwork.** Each pack face is the identical
  `wordmark-adult.png` on a different colour ([Products.jsx:19](src/components/Products.jsx#L19)).
  Visually the three products are indistinguishable apart from hue. Needs real pack renders, or
  at minimum per-product typographic faces.
- **"Copy to confirm" is visible to users.** All three products carry that status chip
  ([products.js](src/components/products.js)) and Saansure's claim literally reads *"Positioning
  and claims to be confirmed with the brand."* Fine for a review build, must not reach
  production — consider gating it behind an env flag so it cannot ship by accident.
- No analytics, no cookie/consent handling, no 404 page.
- No newsletter capture, no stockist / where-to-buy, no FSSAI or nutrition-panel disclosure —
  all expected on an Indian packaged-nutrition site.

---

## 6. Engineering and infrastructure

- **This is not a git repository.** No version control at all, on either the website or the
  design-system package. `git init` is the first thing to do; the `.gitignore` is already
  written and correct.
- **No deployment config.** No `netlify.toml` / `vercel.json` / workflow file, and
  `vite.config.js` sets no `base`, so a subpath deploy will break asset URLs.
- **No CI.** `lint` and `build` both pass and both take under a second — cheap to gate on.
- **No tests of any kind.** For a site this size a single smoke test (renders, no console
  errors, headings present) plus an axe-core assertion would cover most of sections 1 and 2
  permanently.
- **The design system is copied, not depended on.** `src/styles/*` and `src/ds/*` are manual
  copies of `../Zero Nonsense Design System/`, with the README asking future editors to re-copy
  by hand. That will drift. Make the package a local workspace dependency
  (`"@zn/design-system": "file:../Zero Nonsense Design System"`) so updates flow in and the
  "don't edit these" rule is enforced by the module boundary rather than by a note.
- **Near-empty lint config, no formatter.** `.oxlintrc.json` enables two rules. Turning on the
  full `react` and a `jsx-a11y` rule set would have caught the missing `h1` and the mouse-only
  handlers.
- **`reducedMotion="user"` is correct but undiscoverable.** This machine has Windows Reduced
  Motion on, so the site renders its static fallback and the 3D work is invisible until someone
  reads the README. Worth a dev-only toggle rather than editing `App.jsx` to preview.
- No `.nvmrc` or `engines` field pinning the Node version.

---

## 7. Design polish

Minor, from looking at the rendered page:

- The nav logo is a 38px PNG on a blue chip and reads as pixelated at that size — another
  casualty of having no SVG wordmarks.
- There is a large empty band between the promise cards and the footer's airmail stripe.
- The footer's four columns leave the right third of a wide viewport empty; the Contact column
  holds one email address.
- `StampFrame` has a vestigial `border: color === 'paper' ? 'none' : 'none'`
  ([StampFrame.jsx:8](src/ds/StampFrame.jsx#L8)) — a ternary with identical branches.
- `Reveal` accepts an `id` prop ([motion.jsx:5](src/components/motion.jsx#L5)) that no caller
  passes.
- `Badge` is exported from the design system and never used on the site.

---

## Suggested order

1. Section 1 in full — half a day, and it is the difference between "demo" and "correct".
2. Open-graph tags plus JSON-LD (section 3) — an hour, biggest visible return.
3. `git init`, then CI on lint + build (section 6).
4. Delete the dead assets and move framer-motion to `LazyMotion` (section 4).
5. Take the contrast table to the brand owner before anything launches (section 2).
6. Contact form and the remaining pages (section 5) — the actual next milestone.
