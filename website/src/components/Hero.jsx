import { useCallback, useEffect, useState } from 'react';
import { HERO_SLIDES, HERO_CTA } from './products.js';

/* The hero runs the two supplied frames as a pair, blue first.

   The photographs sit behind; the eyebrow, headline, sub and button are set
   live on top, so they reflow, stay selectable and reach a screen reader. Ink
   is 7.4:1 or better everywhere the copy lands on either frame, measured off
   the retouched files, so there is no scrim over the photography — which is
   just as well, since a scrim would be the gradient the guidelines rule out.

   The two frames swap on a timer, which is content changing without being
   asked — so it stops on hover and stops while anything inside has focus, and
   the dots are there to drive it by hand (WCAG 2.2.2).

   It keeps advancing under prefers-reduced-motion, but the swap becomes a cut
   rather than a fade: nothing here moves, slides or scales — it is a crossfade
   between two still photographs — and the reduced-motion rule in site.css
   already flattens every transition and animation to nothing, which covers the
   photographs and the copy alike.

   The copy block is keyed on the slide id, so React replaces it on every swap
   and the CSS `hero-copy-in` animation runs fresh. That is the whole crossfade
   — it needs no animation library, and an exit fade would mean holding two
   `h1`s in the document at once, which is worse than the plain cut it saves. */
const DWELL = 6500;
const [CTA_LABEL, CTA_HREF] = HERO_CTA;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const slide = HERO_SLIDES[index];

  const go = useCallback((next) => {
    setIndex(((next % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (held || HERO_SLIDES.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), DWELL);
    return () => clearInterval(id);
  }, [held]);

  // The pack shots are the page's largest paint, so the one on screen is
  // eager and the other is fetched quietly behind it.
  return (
    <header
      className="hero"
      id="top"
      style={{ background: slide.ground }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="hero-art">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.id}
            className={i === index ? 'is-on' : ''}
            src={s.image}
            alt={i === index ? s.alt : ''}
            aria-hidden={i === index ? undefined : 'true'}
            width={s.size[0]}
            height={s.size[1]}
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="hero-in">
        <div className="wrap">
          <div className="hero-copy" key={slide.id}>
            <span className="label label-ink">{slide.eyebrow}</span>
            <h1>
              {slide.lines.map((line, i) => (
                <span
                  className={
                    slide.markLast && i === slide.lines.length - 1
                      ? 'hero-line is-marked'
                      : 'hero-line'
                  }
                  key={line}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="lede">{slide.blurb}</p>
            <div className="hero-actions">
              <a className="btn" href={CTA_HREF}>{CTA_LABEL}</a>
              <a className="btn btn-outline" href="#products">See the products</a>
            </div>
          </div>

          <div className="hero-dots" role="group" aria-label="Choose a hero product">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={i === index ? 'hero-dot is-on' : 'hero-dot'}
                aria-label={s.eyebrow}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
