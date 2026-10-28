/** Text input with mono uppercase label and annotation line. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase mono label above the field */
  label?: string;
  /** Small helper/error text below */
  annotation?: string;
  /** Red border error state */
  invalid?: boolean;
  /** Frosted variant for use over sky imagery */
  glass?: boolean;
}