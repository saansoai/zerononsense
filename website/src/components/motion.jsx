import { useEffect, useRef, useState } from 'react';

/* The only motion on this site: content rises a little and fades in once.
   No tilt, no float, no rotation — the brand's marks are records, and the
   guidelines rule out rotating them (p19, p29).

   This used to be framer-motion's `whileInView`. One fade is not worth 360 kB
   of animation runtime on a static marketing page, so the trigger is an
   IntersectionObserver and the transition itself is CSS (`.reveal` in
   site.css). Reduced motion is handled there too — the media query drops the
   element straight to its final state — so there is no JS branch for it and
   no hydration-time difference between the two.

   `delay` is in seconds, to stagger a row of siblings. */
export function Reveal({ children, delay = 0, className, style, as: Tag = 'div' }) {
  const ref = useRef(null);
  // No observer (an old browser, a test environment, a prerender): start shown,
  // decided at first render so the element never paints invisible.
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      // Matches the old viewport margin: start the fade 60px before the
      // element's edge reaches the viewport edge.
      { rootMargin: '-60px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const classes = shown ? 'reveal is-in' : 'reveal';

  return (
    <Tag
      ref={ref}
      className={className ? `${classes} ${className}` : classes}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
    >
      {children}
    </Tag>
  );
}
