# Zero Nonsense — Website Build Brief (for Claude Code)

Read `SKILL.md` and `readme.md` first. All colors, fonts, spacing and effects live in `styles.css` → `tokens/*.css`. Logos and sky imagery are in `assets/`. `ui_kits/website/index.html` is a **reference mock only** — the owner found it too generic. Use it for structure, not final look.

## Goal
A premium, almost fully transparent brand website. Cloudy, bluish sky everywhere; content floats on frosted glass. Feels light, calm, honest ("zero nonsense"), with tactile postage-stamp details.

## Owner feedback that MUST be fixed
1. **Background must fade seamlessly.** No visible photo edges, no hard color bands. The sky photos (`assets/sky-clouds-wide.jpg`, `sky-clouds-tall.jpg`) must dissolve into a CSS gradient built from the exact sky tones (`--sky-gradient`: `#7FAEE8 → #5E97DF → #4E86CF`). Use `mask-image: linear-gradient(...)` on photo layers so they fade to transparent at every edge.
2. **Background colors must match.** One fixed, full-page sky layer (`position: fixed; inset: 0; z-index: -1`) behind every section. Sections are transparent — never a solid blue/paper fill that clashes with the sky. Sample the photo's edge color and end the gradient on it.
3. **3D animation throughout:**
   - Hero: floating product boxes/stamps with slow bob + mouse-parallax 3D tilt (`perspective(1000px) rotateX/rotateY`), or a three.js scene with drifting volumetric clouds.
   - Multiple cloud layers drifting at different speeds on scroll (parallax depth).
   - Cards tilt toward the cursor on hover with a glass highlight sweep.
   - Scroll reveals: rise + fade + slight rotateX (IntersectionObserver or GSAP ScrollTrigger).
   - Stamps "press" in (scale 1.15 → 1, small rotation) on entering view.
   - Respect `prefers-reduced-motion`.
4. **Not generic.** Big Averia Serif Libre headlines, asymmetric layouts, perforated postage-stamp frames, rubber-stamp marks, airmail stripes, dashed rules, the asterisk `*` motif. Avoid stock SaaS layouts.

## Brand tokens
- Archival Paper `#F3F1E4` · Verification Stamp `#E9461E` · Blueprint Ink `#5E97DF`
- Asterisk Maroon `#7E2E1B` · Ink Black `#1E1C18`
- Glass: bg `rgba(243,241,228,0.14)`, strong `0.55`, border `rgba(243,241,228,0.45)`, blur 14px / 24px
- Type: Averia Serif Libre (headings), Geist Mono (everything else) — Google Fonts

## Suggested stack
Next.js or Vite + React; plain CSS via `styles.css` or Tailwind mapped to tokens; Framer Motion or GSAP; optional react-three-fiber for the 3D hero.

## Suggested pages
Home · Products (Adult / Kids) · Product detail · About · Contact. Confirm sitemap and copy with the owner.

## Ignore in this package
`uploads/`, `extract/`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, `thumbnail.html` — tooling/source files.

## Assets still needed from owner
- Transparent PNG/3D renders of each product box
- Final product names, prices, copy
- SVG logo files
