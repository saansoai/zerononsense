import { useEffect, useRef, useState } from 'react';

const LINKS = [
  ['#products', 'Products'],
  ['#label', 'The label'],
  ['#ritual', 'How to eat it'],
  ['#promise', 'The promise'],
];

/* The header is an Archival Paper plate floating over whatever is beneath it,
   hero photography included — it is never transparent, because cream type on
   the old red hero was 3.6:1 and unreadable. What the scroll state changes is
   the plate's depth: the hard ink shadow shortens and the plate presses into
   it. A sentinel + IntersectionObserver does the switch without a scroll
   listener firing on every frame. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const sentinel = useRef(null);

  useEffect(() => {
    const el = sentinel.current;
    // Without an observer the plate simply stays in its floating state, which
    // is the state it is designed in — no listener, no fallback to maintain.
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    // The sentinel sits one nav-height down the page, so it leaves the viewport
    // exactly when the hero has scrolled under the header.
    const io = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The drawer is only reachable below 880px; close it if the viewport grows.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 881px)');
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const cls = ['nav', solid || open ? 'nav-solid' : '', open ? 'nav-open' : ''].join(' ').trim();

  return (
    <>
      <div ref={sentinel} className="nav-sentinel" aria-hidden="true" />
      <header className={cls}>
        <div className="nav-shell">
        <nav className="nav-in" aria-label="Primary">
          <a className="nav-brand" href="#top" aria-label="Zero Nonsense — home">
            <span className="wordmark nav-mark" role="img" aria-label="Zero Nonsense" />
          </a>

          <div className="nav-links">
            {LINKS.map(([href, text]) => (
              <a key={href} href={href}>{text}</a>
            ))}
          </div>

          <div className="nav-end">
            <a className="btn btn-sm nav-cta" href="#contact">Enquire</a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="nav-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>

        <div id="nav-drawer" className={open ? 'nav-drawer open' : 'nav-drawer'}>
          {LINKS.map(([href, text]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>Enquire</a>
        </div>
        </div>
      </header>
    </>
  );
}
