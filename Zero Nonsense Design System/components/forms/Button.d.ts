/**
 * Zero Nonsense button. Mono uppercase CTA, pill shape, stamp-press interaction.
 * @startingPoint section="Forms" subtitle="CTA button — primary, secondary, outline, ghost, glass" viewport="360x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. glass = frosted panel for use over sky imagery. */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}