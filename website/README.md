# Zero Nonsense — website

Marketing site built on the Zero Nonsense design system package in
`../Zero Nonsense Design System/`, against the brand guidelines and packaging
artwork in `../../ZN/`.

```bash
npm install
cp .env.example .env.local   # optional; both variables may stay empty

npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve that bundle

npm run lint
npm test           # vitest, once
npm run test:watch
npm run sync:ds    # re-copy the design system (see below)
```

Node 24 (`.nvmrc`); anything from 20.19 works. CI runs lint, the design-system
sync check, the tests and the build on every push.

### Environment

Both variables are optional and neither is a secret — Vite inlines every
`VITE_*` value into the client bundle, so nothing that needs protecting may go
in them. `.env.example` is the template.

| Variable | Effect when unset |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | The contact form hands off to the visitor's mail client instead of POSTing. |
| `VITE_ANALYTICS_DOMAIN` | No analytics script is loaded at all. |
| `BASE_PATH` (build only) | Assets are served from the domain root. Set it to deploy under a subpath. |

### Deploying

The site is **zerononsense.in**, hosted on Hostinger, built by Hostinger's own
Node deployment. Push to `main` and it rebuilds.

In hPanel the settings are: framework preset **Vite**, branch **`main`**, root
directory **`website`**, build and output left at the Vite defaults
(`npm run build` → `dist`), and Node **22.x or newer** — Vite 8 requires
`^20.19.0 || >=22.12.0`, so an older 20.x fails outright.

Two environment variables are set there:

| Key | Value |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | `/contact.php` |
| `VITE_ANALYTICS_DOMAIN` | `zerononsense.in` |

Neither is a secret — Vite inlines both into the client bundle. Both may be
left unset, and the site still works: the form falls back to the visitor's mail
client and no analytics script loads.

#### The contact endpoint

`public/contact.php` is the form's backend. It is copied into `dist/` by the
build, so it is served at `/contact.php` on the same origin as the page —
which is why the Content-Security-Policy can keep `connect-src` at `'self'`.
It validates, rejects line breaks in anything that reaches a mail header,
answers the honeypot with a 200 so a bot cannot tell, throttles to one send
per IP per 20 seconds, and mails `info@zerononsense.in` with the visitor's
address in `Reply-To`.

The `From:` address is `website@zerononsense.in` and has to stay on this
domain, or SPF and DKIM will not vouch for the mail and it lands in spam.

There is no PHP in `vite dev`, so locally the form keeps its mail-client
fallback. **Netlify and Vercel do not run PHP either** — deploying there means
porting this to a function first.

#### Platform rules are written three times

Caching, security headers and the 404 have to be changed in step; no platform
reads another's config:

| Platform | File | Notes |
| --- | --- | --- |
| Hostinger | `public/.htaccess` | Copied into `dist/`, lands at the root of `public_html`. |
| Netlify | `netlify.toml` (repo root) | `base = "website"`. |
| Vercel | `vercel.json` | Set the project's Root Directory to `website`. |

All three set immutable caching on the fingerprinted `assets/`, a week on the
pack artwork, no-cache on HTML, four security headers and the same
Content-Security-Policy. `.htaccess` additionally forces HTTPS and redirects
`www` to the apex, which is what `index.html`'s canonical, `sitemap.xml` and
`robots.txt` all name.

## The organising idea: the open file

Both brand PDFs are subtitled *"the open file"*, the tagline is *"Zero Secrets"*,
and the packaging prints the entire formula — ingredients with percentages, a
14-row nutritional table, % daily values, FSSAI licences, manufacturer address.
The brand's proposition is radical disclosure.

So the homepage prints the label rather than summarising it. `LabelSheet.jsx` is
the centre of the site: the same panel that is on the carton, as real selectable
text rather than a picture of a label. Everything else is arranged around it.

See [BRAND-AUDIT.md](BRAND-AUDIT.md) for the full audit this was rebuilt from,
and [UPGRADES.md](UPGRADES.md) for the engineering backlog.

## How the page is built

The page is a run of **full-bleed colour bands**, the way the packaging deck
presents the product: saturated flat ground, pack shot large, type big.

**Pack artwork is cut out onto transparency** (`public/packs/pack-*.webp`) and
sits directly on the band colour. An earlier version pasted the whole mockup
frame and matched the band to its ground, but the mockups carry a soft vignette,
so the almost-matching rectangle was visible. Cut out, the pack can be any size,
on any band colour, and is never cropped — the bands use `object-fit: contain`,
not `cover`, so a carton is never sliced at the viewport edge.

The cut-outs are made by flood-filling the ground inward from the border. Note
that OBEAT must be keyed from the **blue-ground** page: on the red page its own
red side panels are close enough to the ground that the fill bleeds into them.

Each full-screen band is `min-height: 100svh` with its copy centred, so one
section fills one screen. A `max-height: 800px` rule tightens the display sizes
on laptop screens, where the centred copy would otherwise reach up under the
floating header.

Band order: hero (red) → the range (paper) → OBEAT (blue) → claim strip
(paper) → Blood Sugar (red) → how to eat it (paper) → the promise (ink) → the
label (paper) → footer.

No red band touches a blue or an ink one. That constraint is why the claim strip
sits between the two product bands — running OBEAT straight into Blood Sugar
would put Blueprint Ink against Verification Stamp. Sections cannot be freely
reshuffled; check the grounds either side before moving one.

The header is a floating plate with a hard ink offset shadow, and the footer
closes with the wordmark oversized over the same offset — one letterpress idea
at both ends. The design system's `--airmail-stripe` is deliberately unused: it
is not on any pack and read as a colourful ribbon rather than a brand mark.

## Rules this site follows

Taken from the guidelines; breaking any of them is a regression.

1. **No gradients.** Colour is flat and full strength, never desaturated,
   never blended, never behind glass.
2. **The two forbidden pairings never touch** (guidelines p36): Blueprint Ink on
   Verification Stamp, and Verification Stamp on Zero Black. This governs the
   band order — no red band ever borders a blue or ink one. The Label section
   separates the two product bands, and the airmail stripe buffers red against
   ink. It is also why the solid button on a red band is cream, not ink.
3. **Type colour per band is fixed by contrast**, not taste: cream on red
   (3.6:1, so display sizes only — small text goes in a cream `.chip`), Zero
   Black on blue (6.8:1), cream on ink (14:1), ink on paper (15:1).
4. **The stamp is a record, not decoration** (p58). Nothing rotates, bobs or
   tilts. The only motion is a single fade-and-rise on scroll, skipped entirely
   under `prefers-reduced-motion`.
5. **The wordmark is Blueprint Ink**, as it is on every pack — never Zero Black,
   never rotated, never gradient-filled (p19).

Paper and ink bands carry a very low-opacity SVG grain so large flat areas read
as stock rather than as screen colour.

## Where the content comes from

`src/components/products.js` is transcribed from the packaging artwork. Every
ingredient percentage, nutrition figure, licence number and address is as
printed. Nothing is invented; where the pack does not state something it is
flagged in the data rather than filled in.

Three points worth knowing:

- **OBEAT is spelled OBEIT on the artwork.** The site uses OBEAT, per the brand
  owner. Every piece of supplied artwork — the dieline side panel ("OBEIT is more
  than just a partial meal replacement") and all four carton mockups — spells it
  OBEIT. **The print files need correcting before they go to press.** The pack
  images this site ships still carry the old spelling, visible at small size.

- **The cartons are not powders.** Every sachet says: open, add to 200 ml
  boiling water, simmer 5–10 minutes, serve warm. They are savoury millet
  bowls. The `Ritual` section exists because the previous site hid this. Zero30
  Daily is the one SKU that *is* a powder, and the section says so rather than
  letting the heading speak for all three.
- **The blue SKU has no printed product name.** The carton carries only the Zero
  Nonsense wordmark. "Saansure" appears nowhere on the artwork, so the site shows
  the printed headline and flags the name as unconfirmed.

## The hero frames are retouched

`public/hero/hero-bloodsugar.webp` and `hero-obeat.webp` are the two supplied
hero frames with two things removed: the painted nav plate and the painted
eyebrow, headline, sub and button. The site sets
that copy live instead — `HERO_SLIDES` in `products.js` holds the same words —
so the headline reflows on a phone, the button is a real link, and a screen
reader gets words rather than a picture of them.

The plate is filled, not cropped off. Cropping it was the first attempt and it
was wrong — it took 100px of sky with it, and that sky is the headroom the
design leaves above the annotations, so the site's own nav then sat straight on
top of them. The band is filled by interpolating down each column instead:
wall, red arch and sky all run vertically through it, so what is above the plate
and what is below it are within a few values of each other at every x, and the
arch's edge stays crisp. A pyramid fill reaches sideways for the same pixels and
smears it.

The copy blocks are a push-pull pyramid reconstruction from each hole's own edge. On the
blue frame the ground is sky, which is genuinely low-frequency, so the fill is
the whole job. On the red frame the ground is plaster with leaf shadows across
it, so the holes are cut per line and the wall's grain is added back on top of
the fill — otherwise the patch reads as a pane of glass over the shot. The leaf
shadows that fell inside the holes are gone; nothing else in either photograph
is altered. The script that does it is not in the repo — it was a one-off — so
if new frames arrive, the copy has to come out of them the same way.

Ink is 7.4:1 or better everywhere the copy lands on either frame, measured off
the retouched files, which is why there is no scrim over the photography. A
scrim would also be the gradient the guidelines rule out.

## The lineup section's assets are derived

All three are cut or sampled from artwork that was supplied. Nothing is
generated, and the packaging itself is never redrawn.

**`public/packs/range-*.webp`** — the three pack shots, cut out of the lineup
reference the brand owner supplied (`images/10.png`). These are **regenerated
renders, not the packaging artwork**, used on the brand owner's explicit
decision after the trade-off was put to them. Two things to know:

- Zero30's pack face reads **"NET WT. 360GMS"**. The real pouch prints 500GMS.
  The card's spec line says 500 g, which is correct, so the pack picture and
  the text beside it disagree. Repainting the face would mean regenerating the
  artwork again, which is the thing the brief rules out. The fix is a render
  with the right weight on it.
- The small print on all three packs is gibberish at full size. It is illegible
  at card size, but it is there.

The earlier cut-outs keyed off the deck's own `card-*.jpg` mockups are gone.
`pack-*.webp` and `card-*.jpg` still hold the real packaging and are what the
product bands and the structured data use.

Each pack is lifted off its flat card tint by keying the tint, then taking the
largest connected blob and filling its interior holes. The blob matters: the
reference draws hand-written annotations around every pack — claims the packs
do not print — and they are separate masses, so selecting the pack drops them.

Two approaches failed first and are worth not repeating. Eroding thin things
away kills the brush strokes, but it also eats a 19px square around every
anti-aliasing pinhole in the blue logo, and there are enough of those to wipe
the whole logo band and punch it out of the pack. Closing the pinholes first
fattens the strokes until they survive the same erosion. The region grow also
has to step 1px at a time: 8px steps leap the gap between the OBEAT pack and
the note beside it, and the note comes along as part of the pack.

**`public/bg/sky.webp`** — a patch of the Blood Sugar hero frame's own sky,
clear of the cartons, the annotation and the foreground leaves, lifted toward
white and softened so it stays a ground. The patch carries its cloud bank down
one edge, so the strip is the patch beside a copy of itself turned 180° and
cross-faded through a 220px overlap: clouds low on one side and high on the
other, clear through the middle, and no seam or mirror line to notice. 9 KB.

**`public/bg/mark-simple-honest.webp`** — the brush lettering off the plaster
wall of the OBEAT hero frame, keyed by how much darker each pixel is than its
own surroundings rather than by a flat threshold, because a shadow band runs
across that wall and a global cut takes it as ink.

## Divergences from the package, and why

- `--zn-ink-black` was `#1E1C18`; the guidelines specify Zero Black `#222222`
  (p34). Corrected in `src/styles/colors.css`.
- The package's `Button` renders a pill in full-strength Verification Stamp. A
  soft pill in bright orange reads as confectionery, so the site uses its own
  square-shouldered `.btn`. The package component is unused here.
- The package's `--glass-*` tokens assume a deep blue ground. This site has no
  glass at all, so they are unused rather than redefined.
- `StampFrame`, `RubberStamp` and `Badge` are unused: all three were being used
  decoratively, which p58 rules out.

## Keeping the design system in sync

`src/styles/` and `src/ds/` are copies of the package in
`../Zero Nonsense Design System/`, which ships no `package.json` and so cannot
be imported. Do not edit the copies. Run `npm run sync:ds` instead: it rewrites
them from the package and reapplies the two divergences recorded in
`scripts/sync-ds.mjs` (Zero Black `#222222` over the package's `#1E1C18`, and
dropping the font `@import` that would duplicate what index.html already
preconnects). `npm run sync:ds -- --check` is what CI runs, and it fails on
drift.

If a patch's anchor text has disappeared from the package, the script stops
with an error rather than skipping it — that is the case where the package
changed exactly where the site overrides it, and someone has to decide what the
override should be now.

## Tests

`src/__tests__/` holds twelve tests, aimed at the brand rules above rather than
at coverage: the forbidden band adjacencies, one `h1`, a resolving skip link,
an alt on every image, every in-page anchor landing on a real id, the reveal
content present without an IntersectionObserver, and all four of the contact
form's submit paths.

`vitest.setup.js` stubs `matchMedia`, which jsdom lacks and every browser has.
It deliberately does **not** stub `IntersectionObserver`: `Nav` and `Reveal`
both have to work without one, and leaving it missing keeps that path tested.

## Still needed from the brand

- **Zero30 Daily's back panel.** The front of the Mango Badaam pouch has been
  supplied and the SKU is now live on the page, but with only what that front
  prints: 22 g protein, 7 g fibre, no added sugar, low sugar spike. There is no
  ingredient list, no nutrition table and no FSSAI line for it, so it has no tab
  in `LabelSheet` — the section names it as missing instead. Drop a `nutrition`
  array (and `ingredients`, `dv`, `back`) onto the `zero30` entry in
  `products.js` and the tab appears on its own.
- **Zero30 Daily's other flavours.** One flavour is in production. The band
  prints `flavourName` as a statement, not a chooser; a second flavour is the
  point at which that becomes a selector.
- **The blue SKU's product name.**
- **Photography.** The hero now runs on two supplied photographic frames, but
  everything below it is still the 3D pack mockups from the packaging deck.
  There is no food photography and no people. The shoot brief is
  already written in the guidelines (p43–p50): macro or 50–100 mm at f1.8–f2.8,
  single hard light at 45–90°, no softboxes, off-white/stone/wood surfaces, real
  people on an iPhone 1× lens.
- **SVG exports** of the wordmark and monogram. The wordmarks are currently cream
  PNGs used as CSS masks so they can be filled with Blueprint Ink.
- **Sign-off on "Clinically Proven For Health Support"** — it is printed on the
  carton and reproduced in the pack image, but the site does not repeat it as a
  claim in its own copy.
- **Confirmation that form mail arrives.** `public/contact.php` mails
  `info@zerononsense.in` from `website@zerononsense.in`. Send one real enquiry
  through the live site and check it is not filtered as spam — that depends on
  the domain's SPF and DKIM records, which are a DNS matter rather than a code
  one.
- **A decision on the rest of the sitemap**: Products, Product detail, About,
  Contact. There is no router, and the copy for those pages does not exist.
- **A corrected Zero30 lineup render.** The one on the page reads NET WT.
  360GMS; the pouch is 500 g, and the spec line beside it says so.
- **OBEIT → OBEAT in the print files**, before they go to press.
