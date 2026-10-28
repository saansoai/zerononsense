import { Reveal } from './motion.jsx';

/* One SKU per full-bleed band, sized to sit inside a single screen.

   The artwork is an absolutely positioned half, but fitted with object-fit:
   contain rather than cover — cover cropped the cartons off at the viewport
   edge. Because the band colour is sampled from the mockup's own ground, the
   space contain leaves around the pack fills with exactly the same colour, so
   the pack is whole and the bleed is still seamless.

   The copy column is deliberately short: a handful of numbers lifted from the
   pack's own panel instead of a bullet list, so the band fits one screen
   without scrolling. A SKU whose back panel has not been supplied — Zero30 —
   carries what its front prints and says so, rather than borrowing figures
   from a sibling.

   A product can override the band's furniture where a design has been supplied
   for it: its own eyebrow, a hand-broken headline, a closing strip. Everything
   falls back to the generic treatment the other two use. */

const FACTS = [
  ['Protein', 'Protein'],
  ['Total Dietary Fiber', 'Fibre'],
  ['Omega Fatty Acids', 'Omega'],
  ['Total Energy', 'Energy'],
];

function factsFor(product) {
  if (product.frontFacts) {
    return product.frontFacts.map(([label, value]) => ({ label, value }));
  }
  const per100 = new Map(product.nutrition.map(([name, value]) => [name, value]));
  return FACTS
    .map(([key, label]) => ({ label, value: per100.get(key) }))
    .filter((f) => f.value);
}

function freeFromFor(product) {
  return product.frontClaims ?? product.love.filter((item) => item.startsWith('No '));
}

export default function ProductBand({ product, artSide = 'right', id }) {
  const facts = factsFor(product);
  const freeFrom = freeFromFor(product);
  const note = product.bandNote ?? product.factsNote
    ?? `Per 100 g · ${product.net} · ${product.count}`;
  const eyebrow = product.bandEyebrow ?? product.label;
  const lines = product.bandLines ?? [product.name];
  const blurb = product.cardClaim ?? product.claim;

  const classes = [
    'pband',
    `band-${product.band}`,
    `art-${artSide}`,
    product.bandStrip ? 'has-strip' : '',
  ].join(' ').trim();

  return (
    <section className={classes} id={id}>
      <div className="pband-art" aria-hidden="true">
        <img
          src={product.art}
          alt=""
          width={product.artSize[0]}
          height={product.artSize[1]}
          loading="lazy"
        />
      </div>

      <div className="pband-in">
        <div className="wrap">
          <Reveal className="pband-copy">
            <span className={product.band === 'red' ? 'chip' : 'label'}>{eyebrow}</span>
            <h2 className="pband-title">
              {lines.map((line) => (
                <span className="pband-line" key={line}>{line}</span>
              ))}
            </h2>

            {product.flavourName && (
              <p className="flavour-plate">
                <span className="flavour-name">{product.flavourName}</span>
                <span className="flavour-note">{product.flavourNote}</span>
              </p>
            )}

            <p className="prod-claim">{blurb}</p>

            <dl className="facts" data-facts={facts.length}>
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="facts-note">{note}</p>

            {product.showFreeFrom !== false && (
              <p className="free-from">{freeFrom.join(' · ')}</p>
            )}

            <div className="pband-actions">
              <a className="btn btn-sm" href="#label">Read its full label</a>
              {product.nameNote && <span className="fine">{product.nameNote}</span>}
            </div>
            {/* The label section names this SKU as missing, so the button still
                leads somewhere truthful — but the band says so first. */}
            {product.labelPending && <p className="fine">{product.labelPending}</p>}
          </Reveal>
        </div>
      </div>

      {product.bandStrip && (
        <div className="pband-strip">
          <span>{product.bandStrip}</span>
        </div>
      )}
    </section>
  );
}
