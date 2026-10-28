# Zero Nonsense Design System

Zero Nonsense (ZN) is an Indian nutrition brand (Saanso Nutri Sciences Pvt. Ltd., Hyderabad) making millet-and-pulse based food products sold as cook-at-home sachets.Also extent to zero secrets zero hidden ingredients and clean protien powders, and many other unique products relating to nutrition. Ranges seen in source material: **Adult** (blood-sugar / metabolic wellness, blueprint-blue packaging; protein), **OBEIT** (calorie-conscious living, verification-red packaging), and **Kids** ("Zero Secrets", rounded bubbly wordmark). Brand identity by Design Asylum (May 2026). Contact seen on pack: info@saansonutri.com.

The brand promise is literal: zero nonsense — full ingredient transparency, no artificial sweeteners/colours/preservatives. The visual language is "postal / archival": postage stamps, rubber stamps, airmail stripes, typewriter mono, archival paper — like a verified document you can trust, floated over open blue sky.

## Sources

- `uploads/Packaging - Zero Nonsense.pdf` — 9-page packaging presentation (dielines + mockups). Page renders extracted to `extract/packaging-p02..p08.jpg`.
- `uploads/pasted-*.png` + `uploads/Screenshot 2026-07-19 *.png` — key pages screenshotted from *Brand Guidelines - Zero Nonsense.pdf* (21MB original could not be uploaded; a Google Drive link exists but was not machine-readable): primary palette, both typeface specimens, type hierarchy, suggested color pairs, kids + adult wordmarks, secondary ZN\* stamp logo.
- User direction: "cloudy bluish colour designs", "premium purely transparent brand website".

## CONTENT FUNDAMENTALS

- **Voice:** direct, benefit-led, zero fluff. Claims are concrete and verifiable: "Helps Manage HbA1c Levels", "100% Natural Ingredients", "No Artificial Sweeteners", "No Added Colours", "No Preservatives".
- **Headlines:** Title Case serif, functional not poetic — "Daily Support for Blood Sugar & Metabolic Wellness", "Daily Nutrition Support For Calorie Conscious Living".
- **Labels/annotations:** ALL-CAPS mono with wide letterspacing — "14 SACHETS", "PRIMARY COLOR PALETTE", "OPEN / MIX / COOK / ENJOY".
- **Body:** sentence case mono, second person, warm but factual: "Create a more nourishing bowl by adding vegetables of your choice."
- **Structure:** bullets prefixed with `·` or `-`; step verbs in caps (OPEN, MIX, COOK, ENJOY); benefit lists under "Why You'll Love It:".
- **No emoji.** The asterisk `*` is the brand's only glyph-mark — it replaces the O in "n\*nsense" and appears as a standalone stamp motif (footnote symbol = "read the fine print, we have nothing to hide").

## VISUAL FOUNDATIONS

- **Colors (named in guidelines):** Archival Paper `#F3F1E4` (ground), Blueprint Ink `#5E97DF` (blue), Verification Stamp `#E9461E` (red). Support: asterisk maroon `#7E2E1B`, near-black ink `#1E1C18`. Suggested pairs: blue-on-paper, red-on-paper, paper-on-blue, paper-on-red. Max 2 background colors per composition.
- **Type:** Primary **Averia Serif Libre** (headings; Bold/Regular; leading 90–165%, kerning −2%). Secondary **Geist Mono** (sub-headings kerning 10%, body leading 120%, annotations, CTAs Medium kerning 2%). Both loaded from Google Fonts (no font binaries were provided — see caveat). Logo wordmarks are custom hand-lettering, used only as image assets.
- **Motifs:** postage-stamp scalloped frames; circular rubber stamps (rotated 10–20°, red, distressed); dashed rule borders; airmail blue/red diagonal edge stripes; thin hairline layout grids; the asterisk.
- **Backgrounds:** archival paper flat fills; full-bleed cloudy-sky photography (cool blue, sunny) with cream wordmark floated over; flat blueprint-blue or verification-red panels.
- **Imagery:** real photography — blue skies, happy people eating, warm-neutral studio product shots. Cool color grade for sky, warm for people/food.
- **Transparency & blur (web):** the "premium purely transparent" website layers frosted-glass panels (`--glass-bg` + `backdrop-filter: blur(var(--glass-blur))`, 1px `--glass-border`) over the sky. Glass is for chrome (nav, cards, dialogs); ink panels stay opaque.
- **Corners:** print surfaces are square/sharp with occasional soft tabs; web glass uses `--radius-md`/`--radius-lg`. Pills for tags/CTAs.
- **Borders:** 2px solid ink, or 1.5px dashed (sachet "cut here" language).
- **Shadows:** essentially flat. `--shadow-pop` (hard 4px offset) for print-like emphasis; `--shadow-glass` only under floating glass.
- **Hover:** color swap within the palette (blue→red or darken), underline for links; press: translate down 1–2px (stamp press). Motion minimal: fades/slides 150–300ms `--ease-brand`; no bounces.
- **Cards:** paper card with 2px ink or dashed border (print), or glass card (web). Nutrition-table look (hairline rows) for data.

## ICONOGRAPHY

- Packaging uses **custom hand-drawn 2-color line icons** (red outline + blue fill accents): sachet, pot, bowl, scissors, steam. These exist only as raster inside the PDF — no vectors could be copied out.
- **Substitute (flagged):** [Phosphor Icons](https://phosphoricons.com) via CDN, weight "regular", colored `--zn-verification-stamp` — closest match to the friendly rounded stroke. Ask the brand for the original icon vectors to replace.
- The `*` asterisk is set in type or via `assets/logo-stamp.png`. Circular text stamps are built in CSS/SVG-text (see RubberStamp component). No emoji, no icon fonts on pack.
- fssai + recycling marks appear on pack (regulatory, not brand assets).

## Assets (`assets/`)

- `wordmark-adult.png` — chunky adult wordmark, cream, transparent bg (keyed from sky page)
- `wordmark-kids.png` — bubbly kids wordmark, cream, transparent bg
- `wordmark-stacked.png` — 3-line ZERO N\*N-SENSE lockup, cream, transparent bg
- `logo-stamp.png` — secondary ZN\* postage-stamp monogram (cream + red), transparent bg
- `sky-clouds-wide.jpg`, `sky-clouds-tall.jpg` — cloudy sky photo crops for full-bleed backgrounds
- `extract/packaging-p02..p08.jpg` — packaging dielines & mockups (reference)

## Index

- `styles.css` → `tokens/` (colors, typography, spacing, effects)
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/forms/` — Button, Input, Select, Checkbox, Radio, Switch
- `components/display/` — Card, Badge, Tag, StampFrame, RubberStamp
- `components/overlay/` — Tabs, Dialog, Toast, Tooltip
- `ui_kits/website/` — marketing site (premium transparent/glass over sky)
- `SKILL.md` — agent skill entry point

### Intentional additions

- **StampFrame** (postage scallop frame) and **RubberStamp** (rotated circular stamp) — core brand motifs on every pack, needed as reusable primitives.

### Caveats

- No font binaries provided; Averia Serif Libre + Geist Mono are loaded from Google Fonts (exact faces named in guidelines, so no substitution risk — but offline use needs the files).
- Logo assets are chroma-keyed rasters from screenshots — request original SVG/PNG exports.
- Full 21MB guidelines PDF was never machine-readable; only screenshotted pages are reflected here.
- No existing website/app source existed; the website UI kit is an original composition following the guidelines + user direction (transparent glass over cloudy sky).
