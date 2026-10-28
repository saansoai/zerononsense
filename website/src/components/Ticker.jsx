/* The brand's claim line repeated like a franking mark across an envelope.
   Static rather than scrolling: the guidelines ask for restraint, and a marquee
   would be motion for its own sake.

   It sits on Archival Paper and sits between the two product bands, where it
   also keeps Blueprint Ink from meeting Verification Stamp (p36). */
const PHRASE = ['Zero Secrets', 'Zero Shortcuts', '100% Ingredient Transparency', 'No Preservatives'];

export default function Ticker() {
  // Three passes so the row runs past the viewport edge on a wide screen.
  // Each span carries which pass it came from, so no key is an array index.
  const run = [0, 1, 2].flatMap((pass) => PHRASE.map((text) => ({ key: `${pass}-${text}`, text })));

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-row">
        {run.map((item) => (
          <span key={item.key}>
            <span className="ast">*</span> {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
