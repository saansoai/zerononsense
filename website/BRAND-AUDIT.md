# Zero Nonsense homepage — brand audit

Checked the live homepage against `Brand Guidelines- Zero Nonsense.pdf` (59pp, Design Asylum,
May 2026) and `Packaging - Zero Nonsense.pdf` (9pp). Page references below are to those files.

**Verdict: the owner's read is correct.** The homepage does not look like this brand. It is not
a matter of taste or polish — the site contradicts the brand's central idea and breaks several
rules the guidelines state explicitly.

---

## 1. What the brand actually is

Both PDFs are subtitled **"the open file"** (Guidelines p01, Packaging p01). That is the whole
concept, and the packaging delivers it literally. A single OBEIT carton carries:

- the full ingredient breakdown *with percentages* — Millets and cereals 41%, Pulses 11%,
  Dry fruits/Nuts & seeds 21%, Dehydrated vegetables 6%, down to "Rock Salt, Tamarind,
  Gingelly Oil, Groundnut oil, Ginger, Garlic, Chillies"
- a 14-row nutritional table, per 100g *and* per 36g serving
- a % Daily Values table against a 2000 kcal diet
- FSSAI licence numbers (two of them), allergen advice, storage instructions
- blank Batch No. / Mfg. Date / Exp. Date / MRP / USP-per-g fields
- manufacturer and marketer addresses in full
- a four-step cooking diagram, and a medicine-interaction warning line

The brand's proposition is **radical disclosure**. "Everything in it is true. Everything not in
it, is not in the product." (p04) The tagline is **"Zero Secrets."** (p31)

The homepage shows three bullet points per product. It communicates the *opposite* of the idea
it is selling. That is the deepest problem here, and no amount of restyling fixes it.

---

## 2. Why it reads as confectionery

Six specific causes, in order of impact:

**1. The colour is drained.** On pack, Blueprint Ink `#5E97DF` and Verification Stamp `#E9461E`
appear as flat, full-strength blocks — the mockups are even shot on solid saturated red and
solid blue grounds (Packaging p04, p07). The site takes the same blue down to `#E7F0FA`,
desaturates the cloud photos to `saturate(0.26) brightness(1.2)` and floats them at 0.34–0.5
opacity. Full-strength flat colour reads as authority. Washed-out pastel reads as sweets.

**2. The stamp tiles.** Three pastel-edged rounded tiles, bobbing on a 7–10s loop with a 9°
mouse tilt. That is a sticker-book motif. It is also a direct rule break — see §3.

**3. There is no food anywhere.** The guidelines give 16 of 59 pages to imagery, and the first
line is **"The product is the hero."** (p43) Then: *"Close-ups only. The texture of a protein
bar, the grain of a powder, the drip of chocolate."* — *"Lushness is non-negotiable... closer to
a high-end food magazine than a supplement catalogue."* — *"Hard, directional light that creates
sharp, graphic shadows. No diffusion panels. No softboxes."* (p48) — *"Real people only. Shot on
an iPhone."* (p49)

The homepage has no product shot, no pack shot, no powder, no texture, no person. A nutrition
brand whose homepage contains no food falls back on abstract shapes, and the abstract shapes
chosen here are rounded pastel rectangles.

**4. Pill buttons in bright orange.** `--radius-pill` filled with `#E9461E`. On pack that red is
a *stamp* — hard-edged, authoritative, a mark of verification. Rounded into a soft pill it stops
being a stamp and becomes a candy button.

**5. Glassmorphism.** Frosted translucent white cards for the nav and the promise tiles. That is
a 2021 consumer-app convention. It has no relationship to "Archival Paper", "Blueprint Ink" or
"the open file", and it appears nowhere in 59 pages of guidelines.

**6. Near-zero information density.** Covered above. The packaging is dense, ordered and
typeset like a document. The homepage is airy and nearly empty.

**In one line:** the packaging is a *document*; the homepage is a *mood board*.

---

## 3. Explicit guideline violations

These are not interpretation — the guidelines state them as don'ts.

| # | Rule | Where | What the site does |
| --- | --- | --- | --- |
| 1 | **"Do not use the stamp as decoration. It is a record, not a design flourish."** | p58 | `RubberStamp` is pure decoration on every product card and in the Promise section. `StampFrame` is decoration in the hero. |
| 2 | **"Don't rotate the Wordmark"** / **"Don't rotate the Favicon in such way"** | p19, p29 | `RubberStamp` is rendered at `rotate={-12}` and `rotate={-14}`; `StampPress` animates the mark in from `rotate: -6`. |
| 3 | **"Don't alter the Wordmark colours (except the brand colours)"** | p19 | The hero and footer wordmarks are masked in `--zn-ink-black` `#1E1C18`. That is not a brand colour — Zero Black is `#222222` (p34). On every pack the wordmark is Blueprint Ink blue. |
| 4 | **Colour pairing to avoid: "Verification Stamp + Zero black"** — *"the red becomes too intense against the black, creating a harsh and heavy contrast"* | p36 | The hero floats a red-framed tile and a black-framed tile side by side; the product grid puts a black card between a blue and a red one. |
| 5 | **Colour pairing to avoid: "Blueprint Ink + Verification Stamp"** — *"both colours are highly saturated and compete for attention"* | p36 | Same two layouts — blue tile adjacent to red tile. Both forbidden pairings are on screen at once. |
| 6 | **"Do not shoot on coloured or gradient backgrounds"** / *"No dramatic coloured backgrounds. The product provides the colour."* | p43, p54 | Every surface on the site sits on a three-stop vertical gradient. |
| 7 | Monogram scale: favicon size is **"Minimum width: 30px"**, for **"Website Favicon, App icon, Profile pictures"**; the next tier up starts at **180px** | p28 | The nav uses the monogram at 38px as a navigation logo — favicon size, non-favicon use, and it visibly pixelates. |

**One thing the site gets right that looks wrong:** the sky is not itself off-brand. The
guidelines' own digital mockups (p30) show `zerononsense.com` on a pale sky gradient and an
Instagram story on a cloud photo. The problem is not that there is sky — it is that sky is *all*
there is, it is desaturated almost to white, and the wordmark sitting on it is black instead of
Blueprint Ink blue.

---

## 4. Factual errors in the site's content

The packaging answers several things the site currently marks as unknown, and contradicts
others.

**The products are not powders — they are cooked savoury meals.** Every pack and sachet carries
the same four-step instruction: *"OPEN — cut open the sachet. MIX — slowly add contents to 200ml
boiling water while stirring. COOK — simmer for 5–10 minutes. ENJOY — serve warm."* plus
*"Create a more nourishing bowl by adding vegetables of your choice."* The ingredients are
millets, pulses, nuts, seeds, dehydrated vegetables, rock salt, tamarind, ginger, garlic,
chillies and mixed masala. This is a hot savoury millet bowl, closer to khichdi than to a shake.
The homepage frames the range as powder/supplement and leads with a product called
"Protein Powder". (The protein powder pack is the one still missing, so it may genuinely be a
powder — but it cannot stand as the hero for a range that is otherwise cooked food.)

**"Saansure" copy is not unconfirmed — it is printed on the box.** The blue SKU reads:
*"Helps Manage HbA1c Levels / Daily Support for Blood Sugar & Metabolic Wellness"*, with side
panel copy beginning *"Zero Nonsense Nutrition is your daily partner in supporting healthy blood
sugar balance..."* The site currently says *"Positioning and claims to be confirmed with the
brand."* — Note: the carton itself never prints the name "Saansure", so the product *name*
does still need confirming, but the positioning does not.

**OBEIT's on-pack claim is stronger and more specific than the site's.** Pack: *"Helps Manage
Hunger And supports metabolic wellness / Daily Nutrition Support For Calorie Conscious Living"*,
with "Detoxifies body" and "Benefits fitness" in the Why You'll Love It list.

**Hard data the site could be using today:** 504 g net, 14 sachets × 36 g. Blue SKU: 391.5 kcal
and 12 g protein per 100 g, 14 g dietary fibre, 7 g omega fatty acids. OBEIT: 394 kcal,
12.5 g protein, 14.5 g fibre. Both carry FSSAI Lic. 13624013002212.

**Two brand stamps exist on pack that the site omits:** "Clinically Proven For Health Support"
and "100% Ingredient Transparency" (plus "Nutrient Rich • Gut Friendly Formula" on OBEIT). The
site's README says the clinical line was deliberately avoided — reasonable caution, but it is
printed on the carton, so the decision should be the brand's to make, not the site's.

**Token error to fix at source:** the design system sets `--zn-ink-black: #1E1C18`. The
guidelines specify Zero Black `#222222` (p34). Every piece of near-black on the site is the
wrong value.

---

## 5. What was rebuilt (done)

The homepage was rebuilt on the brand's own organising idea rather than restyled.

| Finding | Status |
| --- | --- |
| §3.1 Stamps used as decoration | **Fixed** — `StampFrame`, `RubberStamp` and `Badge` are no longer used anywhere. |
| §3.2 Marks rotated | **Fixed** — nothing rotates, bobs or tilts. `tilt.js` deleted; the only motion is one fade-and-rise. |
| §3.3 Wordmark in a non-brand black | **Fixed** — wordmark is Blueprint Ink; `--zn-ink-black` corrected to `#222222`. |
| §3.4 / §3.5 Both forbidden colour pairings on screen | **Fixed** — products are alternating full-width rows with Archival Paper between; red and blue never touch. |
| §3.6 Everything on a gradient | **Fixed** — the gradient sky and both cloud photos are gone. Flat Archival Paper ground throughout. |
| §3.7 Monogram at favicon size in the nav | **Fixed** — the nav uses the wordmark at 148px; the monogram is only an `apple-touch-icon`. |
| §2 Five failing contrast pairings | **Fixed** — ink tints darkened to clear AA, small red type uses `--zn-red-deep` (4.9:1), colour fields carry display type only. |
| §2 No mobile navigation | **Fixed** — a disclosure menu replaces the hidden links. |
| §2 No skip link | **Fixed.** |
| §4 Products framed as powders | **Fixed** — a *How to eat it* section prints the four cooking steps from the sachet. |
| §4 "Saansure" copy marked unconfirmed | **Fixed** — the printed positioning is used; only the *name* is still flagged, since the carton never prints it. |
| §4 Hard data unused | **Fixed** — full ingredients with percentages, the 14-row nutrition table and % daily values are all on the page as real text. |
| §1 (UPGRADES) No `<h1>`, no `scroll-margin`, no focus styles | **Fixed.** |
| §3 (UPGRADES) No OG tags, JSON-LD, robots or sitemap | **Fixed** — all added, plus `Organization` and two `Product` entries with nutrition. |
| §4 (UPGRADES) ~400 kB dead assets | **Fixed** — deleted; `dist/` is now 1.1 MB including the new pack artwork. |

Glassmorphism, the pill buttons and the floating tiles are gone with the
components that carried them.

### Still open

- **Photography.** The hero runs two supplied photographic frames (retouched to
  lift their painted copy out — see the README). Below the hero the site still
  uses the pack artwork from the packaging deck. That satisfies "the product is
  the hero" far better than typographic stand-ins did, but it is still not the
  shoot the guidelines describe (p43–p50).
- **Zero30 Daily** now has its front artwork (Mango Badaam) and a band of its
  own. Its back panel has not been supplied, so it carries front-of-pack figures
  only and is named as missing under the label tabs.
- **The blue SKU's name** is still unconfirmed.
- **framer-motion is still 360 kB.** With the motion reduced to one fade, this is
  now almost entirely unused weight — `LazyMotion` + `domAnimation`, or dropping
  to an `IntersectionObserver` and a CSS class, would remove most of it.
- **Mobile was not visually verified.** The browser window could not be resized
  in this session, so the responsive rules (single-column stacks at 1000/860/520)
  were reasoned through rather than seen. Worth a real device check.
- **No contact form.** `#contact` is still a `mailto:`.
- **Not a git repository**, no CI, no deploy config, no tests. See
  [UPGRADES.md](UPGRADES.md) §6.

### The original recommendation, for reference

1. **Make the label the hero.** The single strongest asset this brand owns is the back of its
   own box. A homepage that opens with the full ingredient list, percentages and all, set in
   Geist Mono on Archival Paper, *is* the brand argument. Nobody else in the category will do
   it. That is "the open file" as a web page.
2. **Restore full-strength colour.** Flat `#5E97DF` and `#E9461E` blocks, cream type on them.
   Drop the gradient, drop the glass, keep the sky as one restrained element if at all.
3. **Wordmark in Blueprint Ink**, not black. Fix `--zn-ink-black` to `#222222` while you are in
   there.
4. **Separate the two forbidden pairings.** Never put the red and the black, or the red and the
   blue, adjacent. Each product gets its own colour field with Archival Paper between.
5. **Stop rotating and floating the stamps.** Use the stamp the way the brand defines it — as a
   record. The guidelines' own stamp system (p51–52) records *"the name of the person, what they
   consumed, the date and time"*. A real timestamped stamp on a real photo is on-brand; a
   decorative one spinning in a hero is not.
6. **Commission the photography.** Until then, the pack renders in the packaging PDF are far
   better heroes than typographic stand-ins, and they are available now. The shoot brief is
   already written for you on p43–p50: macro, 50–100mm, f1.8–f2.8, single hard light at 45–90°,
   no softboxes, off-white/stone/wood surfaces, real people on an iPhone 1x lens.
7. **Lead with the cooking ritual.** Open, mix, simmer, serve. It is a differentiator, it is
   already illustrated in four brand-drawn icons on every pack, and the current site hides the
   fact that this is food you cook.
