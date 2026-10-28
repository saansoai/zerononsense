/** Rotated circular rubber-stamp mark with text on a circle and the asterisk at center. */
export interface RubberStampProps {
  /** Circular text; end with "• " for spacing */
  text?: string;
  /** Diameter px */
  size?: number;
  color?: 'red' | 'blue' | 'paper' | 'ink';
  /** Rotation deg */
  rotate?: number;
}