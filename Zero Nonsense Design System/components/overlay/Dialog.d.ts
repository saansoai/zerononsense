/** Modal over blurred-sky scrim. Close affordance is the brand asterisk. Esc and scrim-click close. */
export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Action row */
  footer?: React.ReactNode;
  /** Frosted panel instead of paper */
  glass?: boolean;
}