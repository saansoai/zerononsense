import { Reveal } from './motion.jsx';
import { RITUAL, RITUAL_NOTE, PRODUCTS } from './products.js';

/* The four steps printed on every sachet. This is the single biggest thing the
   first version of the site hid: the cartons are not powders to shake, they are
   savoury bowls you simmer.

   Zero30 Daily is the exception, and now that it is in the range the heading
   cannot be left to speak for all three — the powder gets its own line rather
   than the page quietly over-claiming. */
const POWDER = PRODUCTS.find((product) => product.usage);

export default function Ritual() {
  return (
    <section className="band band-paper grain" id="ritual">
      <div className="wrap">
        <Reveal>
          <span className="label">Cooking instructions · The sachets</span>
          <h2 className="h2" style={{ maxWidth: '16ch', marginTop: 'var(--space-4)' }}>
            Five minutes on the hob. Not a shake.
          </h2>
        </Reveal>

        <div className="ritual-grid">
          {RITUAL.map(([title, body], index) => (
            <Reveal className="step" key={title} delay={index * 0.06}>
              <span className="step-no">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="ritual-note">{RITUAL_NOTE}</p>
          {POWDER && (
            <p className="ritual-note">
              That is the two cartons. {POWDER.label} is the one you do shake —{' '}
              {POWDER.usage.toLowerCase()}.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
