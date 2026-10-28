/** Segmented pill tabs; active segment is verification red. */
export interface TabsProps {
  items?: Array<{ value: string; label: string }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Frosted variant for over-sky layouts */
  glass?: boolean;
}