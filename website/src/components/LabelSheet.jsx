import { useState } from 'react';
import { Reveal } from './motion.jsx';
import { PRODUCTS, COMPANY } from './products.js';

/* The brand's proposition is radical disclosure — "the open file" — so this
   section prints the label in full rather than summarising it. Each block sits
   in its own card so the page reads as a set of panels, the way the carton is
   laid out, rather than as one long run of text.

   The composition bar is derived from the ingredient percentages already in the
   data; the unlisted balance is computed rather than written down, so it can
   never drift from the figures above it.

   Only the SKUs whose back panel has been supplied get a tab here. Zero30 Daily
   has not, so it is named as missing underneath rather than given a sheet made
   of guesses — an empty place in the open file is still the open file. */

/* A product earns a tab by having a nutrition panel transcribed from its back
   carton. Nothing else qualifies. */
const SHEETS = PRODUCTS.filter((product) => product.nutrition);
const UNPRINTED = PRODUCTS.filter((product) => !product.nutrition);

const RAMP = ['var(--comp-1)', 'var(--comp-2)', 'var(--comp-3)', 'var(--comp-4)'];

function composition(product) {
  const parts = product.ingredients.map(([name, pct], i) => ({
    name,
    pct: parseFloat(pct),
    colour: RAMP[i] ?? 'var(--comp-4)',
  }));
  const listed = parts.reduce((sum, p) => sum + p.pct, 0);
  const rest = Math.round((100 - listed) * 10) / 10;
  return { parts, rest };
}

function Sheet({ product }) {
  const { parts, rest } = composition(product);

  return (
    <>
      <div className="sheet">
        <div className="sheet-col">
          <section className="card">
            <div className="card-head">
              <span className="label">Composition by weight</span>
              <span className="fine">{product.net} · {product.count}</span>
            </div>

            <div className="card-body">
              <div className="comp" role="img" aria-label={
                parts.map((p) => `${p.name} ${p.pct}%`).join(', ') + `, remaining ingredients ${rest}%`
              }>
                {parts.map((p) => (
                  <div
                    key={p.name}
                    className="comp-seg"
                    style={{ flex: `${p.pct} 0 0`, background: p.colour }}
                    data-label={`${p.name} · ${p.pct}%`}
                  />
                ))}
                <div
                  className="comp-seg"
                  style={{ flex: `${rest} 0 0`, background: 'var(--comp-rest)' }}
                  data-label={`Jaggery, salt, oils, spices · ${rest}%`}
                />
              </div>
              <div className="comp-scale">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="card-body">
              <ul className="ing-list">
                {parts.map((p, i) => (
                  <li key={p.name}>
                    <div className="ing-top">
                      <span className="swatch" style={{ background: p.colour }} />
                      <span className="ing-name">{p.name}</span>
                      <span className="ing-pct">{p.pct}%</span>
                    </div>
                    <p className="ing-detail">{product.ingredients[i][2]}</p>
                  </li>
                ))}
                <li>
                  <div className="ing-top">
                    <span className="swatch" style={{ background: 'var(--comp-rest)' }} />
                    <span className="ing-name">Everything else</span>
                    <span className="ing-pct">{rest}%</span>
                  </div>
                  <p className="ing-detail">{product.remainder}</p>
                </li>
              </ul>
            </div>

            <div className="card-body">
              <p className="ing-rest">{product.flavour}</p>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="label">On the pack</span>
            </div>
            <div className="card-body">
              <div className="meta-grid">
                <div>
                  <h4>Allergen advice</h4>
                  <p>{product.allergen}</p>
                </div>
                <div>
                  <h4>Storage</h4>
                  <p>{product.storage}</p>
                </div>
                <div>
                  <h4>FSSAI licence</h4>
                  <p>{COMPANY.fssaiMarketer}</p>
                </div>
              </div>
            </div>
            <p className="advisory">{COMPANY.advisory}</p>
          </section>
        </div>

        <div className="sheet-col">
          <section className="card">
            <div className="card-head">
              <span className="label">Nutritional information</span>
              <span className="fine">Approximate values</span>
            </div>
            <div className="card-body">
              <div className="nut-scroll">
                <table className="nut">
                  <thead>
                    <tr>
                      <th scope="col">Per</th>
                      <th scope="col">100 g</th>
                      <th scope="col">Serving (36 g)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.nutrition.map(([name, per100, perServe]) => (
                      <tr key={name}>
                        <th scope="row">{name}</th>
                        <td>{per100}</td>
                        <td>{perServe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="label">% Daily values per 36 g</span>
              <span className="fine">2000 kcal diet</span>
            </div>
            <div className="card-body">
              <div className="dv">
                {product.dv.map(([name, value]) => (
                  <div className="dv-row" key={name}>
                    <span>{name}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="label">Printed on the carton</span>
            </div>
            <div className="card-body">
              <div className="stamps">
                {product.stamps.map((text) => (
                  <span className="stamp-chip" key={text}>{text}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Reveal className="card label-proof">
        <img
          src={product.back}
          alt={product.backAlt}
          width={product.backSize[0]}
          height={product.backSize[1]}
          loading="lazy"
        />
        <div className="label-proof-note">
          <span className="label">The source</span>
          <p className="lede" style={{ fontSize: '14px' }}>
            Everything above is transcribed from this panel — the back of the {product.label} carton,
            exactly as it is printed. Check it line by line.
          </p>
        </div>
      </Reveal>
    </>
  );
}

export default function LabelSheet() {
  const [active, setActive] = useState(SHEETS[0].id);
  const product = SHEETS.find((p) => p.id === active) ?? SHEETS[0];

  return (
    <section className="band band-paper grain" id="label">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="label">The open file</span>
            <h2 className="h2">The whole formula.</h2>
            <p className="lede">
              The same panels that are printed on the carton — composition by weight, the
              complete nutritional table, and the daily values. If it is in the sachet, it is
              on this page.
            </p>
          </div>
        </Reveal>

        <div className="tabs" role="tablist" aria-label="Choose a product label">
          {SHEETS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              className="tab"
              aria-selected={p.id === active}
              aria-controls={`panel-${p.id}`}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${product.id}`} aria-labelledby={`tab-${product.id}`}>
          <Sheet product={product} />
        </div>

        {UNPRINTED.length > 0 && (
          <Reveal>
            <p className="label-missing">
              {UNPRINTED.map((p) => p.label).join(', ')} —{' '}
              {UNPRINTED.length === 1 ? 'its back panel has' : 'their back panels have'} not been
              supplied yet. Everything {UNPRINTED.length === 1 ? 'its front' : 'their fronts'} states
              is on {UNPRINTED.length === 1 ? 'its band' : 'their bands'} above; the full formula
              prints here the day the artwork lands.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
