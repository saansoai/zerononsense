/** Radio button, red dot when selected. Note: uncontrolled radios in a group don't visually untoggle siblings — prefer controlled `checked` per option. */
export interface RadioProps {
  label?: React.ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}