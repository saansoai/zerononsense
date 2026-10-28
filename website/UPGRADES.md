# Zero Nonsense website — upgrade list

> **Status, 2026-10-28.** Sections 1, 2, 3 and 4 are **done**, and so is all of
> section 6. The homepage was rebuilt after the original audit — see
> [BRAND-AUDIT.md](BRAND-AUDIT.md) — and the engineering backlog below has since
> been worked through: framer-motion is gone (§4), `#contact` is a real form
> (§5), and the repository now has version control, CI, tests, deploy config, a
> design-system sync check, a 404 page and env-gated analytics (§5, §6).
>
> What remains open is **content and brand decisions**, not code: the
> photography, the blue SKU's name, the OBEIT print spelling, the Zero30 back
> panel and its render's net weight, and the question of whether the site should
> grow past one page. Those are listed at the end of BRAND-AUDIT §5. Section 7
> below is untouched.

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

**Done (2026-10-28).** framer-motion is removed. `Reveal` runs on an
IntersectionObserver with the transition in CSS, and the hero crossfade is a
keyed remount plus a keyframe. 374 kB → 251 kB (118 → 77 kB gzip); what is left
is React and the page's own content. The original note follows.

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

- ~~**"Enquire" is a dead end.**~~ **Done (2026-10-28).** `#contact` is a form
  on its own band: POSTs JSON to `VITE_CONTACT_ENDPOINT`, falls back to the
  visitor's mail client when none is set, honeypot, live status. **The endpoint
  still has to be chosen and set** — until it is, the form behaves like the old
  mailto. Original note:
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
- ~~No analytics, no 404 page.~~ **Done (2026-10-28).** `public/404.html` is
  standalone, so it renders even when the bundle is what failed.
  `src/analytics.js` injects Plausible only when `VITE_ANALYTICS_DOMAIN` is set;
  Plausible sets no cookies, which is why there is still no consent banner.
  Swapping in a provider that does set cookies means adding one.
- No newsletter capture, no stockist / where-to-buy, no FSSAI or nutrition-panel disclosure —
  all expected on an Indian packaged-nutrition site.

---

## 6. Engineering and infrastructure — done

All of this section was closed on 2026-10-28. Kept here as a record of what was
decided, because several of the decisions are not obvious from the files.

- **Version control.** `git init` at the repository root, covering the site and
  the design-system package together — the sync check below only means something
  if both are in the same history. `.gitattributes` normalises line endings so a
  Windows checkout does not rewrite every file.
- **Deployment.** The live host is Hostinger, at zerononsense.in, building
  from `main` with its own Node deployment (framework preset Vite, root
  directory `website`). `website/public/.htaccess` carries the platform rules
  there; `netlify.toml` at the root (`base = "website"`) and
  `website/vercel.json` cover the other two, and all three now set the same
  Content-Security-Policy — possible because the form posts to
  `/contact.php` on the same origin. Both set immutable caching on the fingerprinted
  `assets/`, a week on pack artwork and hero frames, and no-cache on HTML, plus
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
  `Permissions-Policy`. A CSP is written out as a comment rather than set,
  because `connect-src` cannot be finished until the contact endpoint is chosen.
  Vite's `base` now reads `BASE_PATH`, so a subpath deploy no longer breaks
  asset URLs.
- **CI.** `.github/workflows/ci.yml` runs lint, the design-system sync check,
  the tests and the build on every push and pull request. The four take seconds
  together.
- **Tests.** vitest + jsdom + testing-library, in `src/__tests__/`. The suite is
  aimed at the brand rules the README calls regressions rather than at
  coverage: the forbidden band adjacencies (p36), one `h1`, a resolving skip
  link, an alt on every image, every in-page anchor pointing at a real id, and
  the reveal content present with no IntersectionObserver. The contact tests
  cover all four submit paths. vitest is on 5.x because 3.x cannot drive Vite
  8's plugin pipeline.

  Note `vitest.setup.js`: jsdom has neither `matchMedia` nor
  `IntersectionObserver`. `matchMedia` is stubbed, because every real browser
  has it. `IntersectionObserver` is deliberately left missing, so the
  no-observer path in `Nav` and `Reveal` stays exercised on every run.
- **The design system is still copied, but the copy is now reproducible.**
  `npm run sync:ds` rewrites `src/styles/` and `src/ds/` from the package and
  reapplies the two documented divergences; `npm run sync:ds -- --check` fails
  CI on drift. A patch whose anchor text has disappeared from the package is a
  hard error, not a silent skip — that is the case where someone has to decide
  what the override means now. A `file:` workspace dependency was the original
  suggestion and is still the better end state, but the package ships no
  `package.json` and no entry point, so it would have to be given one first.
- **Lint.** `react`, `jsx-a11y`, `import`, `unicorn` and `oxc`, with the
  correctness category as errors. Two rules are off with the reason written
  beside them in `.oxlintrc.json`.
- **Node pinned** by `.nvmrc` (24) and an `engines` field (>=20.19). CI reads
  the `.nvmrc`.
- **Reduced motion is no longer undiscoverable.** There is no JS motion config
  left to toggle: the reduced-motion rules live in `site.css`, so previewing
  them is a matter of the browser's own emulation rather than editing `App.jsx`.

## 7. Design polish

Minor, from looking at the rendered page:

- The nav logo is a 38px PNG on a blue chip and reads as pixelated at that size — another
  casualty of having no SVG wordmarks.
- There is a large empty band between the promise cards and the footer's airmail stripe.
- The footer's four columns leave the right third of a wide viewport empty; the Contact column
  holds one email address.
- `StampFrame` has a vestigial `border: color === 'paper' ? 'none' : 'none'`
  ([StampFrame.jsx:8](src/ds/StampFrame.jsx#L8)) — a ternary with identical branches.
  It is a design-system copy, so the fix belongs in the package: editing the
  copy here would fail `npm run sync:ds -- --check`. The component is unused on
  the site either way (p58).
- ~~`Reveal` accepts an `id` prop that no caller passes.~~ Gone with the
  framer-motion rewrite.
- `Badge` is exported from the design system and never used on the site.

---

## Suggested order

The engineering half of this list is done. What is left needs someone who can
speak for the brand, in this order:

1. ~~Choose the contact endpoint.~~ **Done** — `public/contact.php` mails
   `info@zerononsense.in`, and `VITE_CONTACT_ENDPOINT=/contact.php` is set in
   Hostinger. Send one real enquiry through the live site to confirm the mail
   arrives and is not filtered.
2. **Confirm the blue SKU's name**, and correct OBEIT → OBEAT in the print
   files before they go to press.
3. **Take the contrast table in §2 to the brand owner** — the darkened tints are
   on the site already, but the decision should be theirs on the record.
4. **Commission the photography** (§3 of BRAND-AUDIT). The brief is already
   written on guidelines p43–p50.
5. **Supply Zero30's back panel**, and a pack render whose face reads the real
   500 g rather than 360 GMS.
6. **Decide whether the site grows past one page** (§5). It is a structural
   decision, and the copy for About / Product detail does not exist yet.
