/* The brand's claim line repeated like a franking mark across an envelope.
   Static rather than scrolling: the guidelines ask for restraint, and a marquee
   would be motion for its own sake.

   It sits on Archival Paper and sits between the two product bands, where it
   also keeps Blueprint Ink from meeting Verification Stamp (p36). */
const PHRASE = ['Zero Secrets', 'Zero Shortcuts', '100% Ingredient Transparency', 'No Preservatives'];

export default function Ticker() {
  const run = [...PHRASE, ...PHRASE, ...PHRASE];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-row">
        {run.map((text, i) => (
          <span key={`${text}-${i}`}>
            <span className="ast">*</span> {text}
          </span>
        ))}
      </div>
    </div>
  );
}
