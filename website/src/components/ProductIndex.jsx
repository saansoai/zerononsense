import { Reveal } from './motion.jsx';
import { PRODUCTS } from './products.js';

/* The lineup: one tinted panel per product, the pack cut out and standing on
   it, then the claim, the spec line and the way in.

   The tint is keyed off each product's own colour, which is also what carries
   the "explore" rule — so the three cards are a set without needing a border
   or a shadow between them, and the Archival Paper ground still shows through
   around them as the page's own colour.

   The pack shots lead with the front panel. The deck's mockups stand the back
   panel at nearly full width on the left, and at card size that was the whole
   card: a wall of nutrition table rather than a product anyone could name. */
export default function ProductIndex() {
  return (
    <section className="band band-sky" id="products">
      <div className="wrap">
        <Reveal>
          <div className="range-head">
            <div>
              <span className="label">The lineup</span>
              <h2 className="h2 range-title">
                <span>Good nutrition.</span>
                <span className="is-marked">No nonsense.</span>
              </h2>
            </div>
            <p className="lede">
              Two bowls you simmer, one powder you mix. Clean ingredients, and the
              whole label.
            </p>
            {/* Brush lettering lifted off the plaster wall of the OBEAT hero
                frame — the brand's own hand, not a typeface standing in for it. */}
            <img
              className="range-mark"
              src="/bg/mark-simple-honest.webp"
              alt="Simple. Honest. Effective."
              width={366}
              height={390}
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className="range">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <a className="range-card" href={`#${product.id}`} data-tone={product.tone}>
                <span className="range-shot">
                  <img
                    src={product.card}
                    alt={`The ${product.label} pack, front panel.`}
                    width={product.cardSize[0]}
                    height={product.cardSize[1]}
                    loading="lazy"
                  />
                </span>
                <span className="range-body">
                <span className="range-name">{product.label}</span>
                <span className="range-claim">{product.cardClaim ?? product.claim}</span>
                <span className="range-rule" aria-hidden="true" />
                {/* Hard spaces inside each item: the row wraps between specs,
                    never through one, so "7 g fibre" cannot break in half. */}
                <span className="range-spec">
                  {product.specs.map((spec) => spec.replace(/ /g, ' ')).join('  |  ')}
                </span>
                <span className="range-go">
                  <span className="range-go-in">
                    Explore product <span aria-hidden="true">→</span>
                  </span>
                </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="range-sign">
            <span>No quick fixes. Only clean nutrition.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
