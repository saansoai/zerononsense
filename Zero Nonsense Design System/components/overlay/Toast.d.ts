/** Inline status toast prefixed by the asterisk. Position it yourself (fixed corner etc). */
export interface ToastProps {
  open?: boolean;
  tone?: 'ink' | 'red' | 'blue';
  children?: React.ReactNode;
  onDismiss?: () => void;
}