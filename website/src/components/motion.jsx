import { motion, useReducedMotionConfig } from 'framer-motion';

/* --ease-brand from the design system, as a framer cubic-bezier array. */
const EASE = [0.33, 1, 0.68, 1];

/* The only motion on this site: content rises a little and fades in once.
   No tilt, no float, no rotation — the brand's marks are records, and the
   guidelines rule out rotating them (p19, p29). Skipped entirely for anyone
   who has asked for reduced motion. */
export function Reveal({ children, delay = 0, className, style, as: Tag = 'div' }) {
  const reduce = useReducedMotionConfig();
  if (reduce) return <Tag className={className} style={style}>{children}</Tag>;

  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
