import { Reveal } from './motion.jsx';

/* Only claims the brand package already makes. The asterisk line is the
   guidelines' own explanation of the mark (p15). */
const PROMISES = [
  [
    'Full ingredient transparency',
    'Every gram is on the label — millets, pulses, nuts, seeds and dehydrated vegetables, each with the percentage we actually use. Nothing hidden, nothing rounded off.',
  ],
  [
    'Zero additives',
    'No artificial sweeteners. No added colours. No preservatives. The list ends where the food ends.',
  ],
  [
    'The asterisk is not a censor',
    'It is the space where the nonsense used to be — every unnecessary ingredient, every misleading claim, every filler that had no reason to be there.',
  ],
];

export default function BrandPromise() {
  return (
    <section className="band band-ink grain" id="promise">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="label">The Zero Nonsense promise</span>
            <h2 className="h2">Honest food should survive a close read.</h2>
          </div>
        </Reveal>

        <div className="promise-grid">
          {PROMISES.map(([title, body], index) => (
            <Reveal className="promise-item" key={title} delay={index * 0.06}>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
