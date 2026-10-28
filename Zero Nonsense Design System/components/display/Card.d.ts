/**
 * Surface card. paper/blue/red are flat print panels; glass variants are frosted for over-sky layouts.
 * @startingPoint section="Display" subtitle="Paper, ink and frosted-glass surface cards" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'paper' | 'blue' | 'red' | 'glass' | 'glassStrong';
  /** Red dashed sachet-style border (paper variant only) */
  dashed?: boolean;
  children?: React.ReactNode;
}