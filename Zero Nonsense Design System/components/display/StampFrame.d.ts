/** Postage-stamp scalloped frame — the brand's signature container (as on the ZN* secondary logo). */
export interface StampFrameProps {
  /** Frame fill color */
  color?: 'blue' | 'red' | 'paper' | 'ink';
  /** Inner padding in px */
  inset?: number;
  children?: React.ReactNode;
}