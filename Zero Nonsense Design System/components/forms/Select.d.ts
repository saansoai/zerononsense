/** Native select styled to match Input; red caret. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Array of strings or {value,label} */
  options?: Array<string | { value: string; label: string }>;
  glass?: boolean;
}